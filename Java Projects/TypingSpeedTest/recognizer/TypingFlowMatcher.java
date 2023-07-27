package Typing.Speed.Test.recognizer;

import org.apache.commons.lang3.StringUtils;

import java.util.LinkedList;
import java.util.ListIterator;

/**
 * Uses fuzzy logic to fill the match matrix of two TextChains based on measured level of differences between them.
 *
 * NOTE on term usage:
 *    Position is a counter of characters in a text string staring from its beginning, zero-based.
 *    Index is a counter of items in a collection holding text entries (TextChain or array).
 * These two terms should never be mixed in context of this application for clarity.
 */
public class TypingFlowMatcher {

    /**
     * The provisional grades of how much the last inputs dwell away from the ideal.
     */
    public enum Sanity {
        HOMOSAPIENS, // no last typed words are wrong
        HOMINIDE,    // < 6 last typed words are wrong
        MONKEY       // 6 and over last typed words are wrong
    }

    /**
     * Carries staring index and length of the text to highlight in the sample text pane.
     */
    public static class TextSpan {

        public final int position;
        public final int length;

        public TextSpan(int p_position, int p_length) {
            position = p_position;
            length = p_length;
        }
    }

    // The variables holding current statistics, see the getters
    private int typedChars;
    private int typedWords;
    private int mistypedChars;
    private int mistypedWords;
    private int percentTyped;
    private TextSpan nextToType;
    private Sanity sanity;

    // Getters

    /**
     * @return How many characters are typed
     */
    public int getTypedChars() {
        return typedChars;
    }

    /**
     * @return How many words are typed
     */
    public int getTypedWords() {
        return typedWords;
    }

    /**
     * @return How many characters are typed wrongly. This is a sum of Missing Chars + Unexpected Chars
     */
    public int getMistypedChars() {
        return mistypedChars;
    }

    /**
     * @return How many words are typed wrongly
     */
    public int getMistypedWords() {
        return mistypedWords;
    }

    /**
     * @return Percentage of typing measured in text elements (words and separators)
     */
    public int getPercentTyped() {
        return percentTyped;
    }

    /**
     * @return Position + Length of the word (or a separator) in the sample text, which the user should type next
     */
    public TextSpan getNextToType() {
        return nextToType;
    }

    /**
     * @return A measure of how wildly the users is making typing mistakes at the moment
     */
    public Sanity getSanity() {
        return sanity;
    }

    // Input part

    /**
     * A wrapper for the text entry for holding inside a linked list.
     */
    private class IndexedEntry {
        public final int index; // Index in the text chain
        public final TextEntry entry;

        public IndexedEntry(int p_index, TextEntry p_entry) {
            index = p_index;
            entry = p_entry;
        }
    }

    private final TextChain sampleChain; // Holds the sample text
    private final TextChain typingChain; // Holds the user input
    private final LinkedList<IndexedEntry> errorChain; // Holds unmatched entries from the user input, which we cannot match to anything

    /**
     * Is a pair binding between TextEntries in two chains. Mutable.
     */
    private class MatchVector {
        public boolean hasMatch = false;   // true if there is a match
        public int targetIndex = -1;       // Element index in the list of the second chain's element
        public int diffMeasure = -1;       // 0 if there's a full match, the greater, the bigger is the difference
        public boolean inProgress = false; // true if we conclude it's a word which the user is normally typing, but
                                           // just haven't got to the end of that word yet (last in the current text)
    }

    private final MatchVector[] vectors; // Playground for matching, N of elements = N of items in the sampleChain
    private final boolean[] wordMap;     // true if a word, false if a separator, N of elements = N of items in the sampleChain

    /**
     * @param p_sample The text chain containing the sample text
     * @param p_typing The text chain we will operate on, putting the user's inputs to
     */
    public TypingFlowMatcher(TextChain p_sample, TextChain p_typing) {
        sampleChain = p_sample;
        typingChain = p_typing;
        errorChain = new LinkedList<IndexedEntry>();
        vectors = new MatchVector[sampleChain.size()];
        wordMap = new boolean[sampleChain.size()];
        fillAsUnmatched(-1);
        fillWordMap();
        remakeStats();
    }

    /**
     * Blanks out the vectors array with default values, starting from a certain index in the sample chain
     * @param p_since Number preceding the chain index from which to begin
     */
    private void fillAsUnmatched(int p_since) {
        for (int i = p_since + 1; i < vectors.length; i++) {
            if (vectors[i] == null) {
                vectors[i] = new MatchVector(); // Create as necessary
            }
            vectors[i].hasMatch = false;
            vectors[i].targetIndex = -1;
            vectors[i].diffMeasure = -1;
            vectors[i].inProgress = false;
        }
    }

    /**
     * Fills out wordMap array for subsequent use
     */
    private void fillWordMap() {
        int index = 0;
        for (TextEntry entry : sampleChain.getChain()) {
            wordMap[index++] = entry.getType() == TextEntry.TYPE_WORD;
        }
    }

    /**
     * Decides whether two text entries are looking like each other enough to draw a match between them.
     * @param src The first (source) entry to compare
     * @param tgt The second (target) entry to compare
     * @return true if there is even a slight match
     */
    private boolean isGoodEnough(TextEntry src, TextEntry tgt) {
        if (src.getType() != tgt.getType()) return false; // they must be of the same kind
        if (src.getType() == TextEntry.TYPE_SEPARATOR) {
            return src.getDiffMeasure(tgt) == 0; // Separators may only match completely or not at all
        }
        // Words are compared fuzzily, depending on their mutual Levenshtein's distance and length
        int srcLength = src.getLength();
        int diffChars = src.getDiffMeasure(tgt);
        boolean result;
        switch (srcLength) { // The longer the source word is, the more typos in it we tolerate
            case 1:
                result = diffChars == 0;
                break;
            case 2:
            case 3:
            case 4:
                result = diffChars <= 1;
                break;
            case 5:
            case 6:
            case 7:
                result = diffChars <= 2;
                break;
            default:
                result = diffChars <= 3; // Maximum 3 typos are allowed in any word!
        }
        return result;
    }

    /**
     * Checks if a sensible input can be found at some distance down the typing chain, in case the current
     * word's matching fails.
     * @param p_src The source text entry to compare with
     * @param p_typingIndex The item index in the typing chain, from which to begin the search
     * @return Relative shift between source and target indices in case the match ahead is found, -1 otherwise
     */
    private int lookupAhead(TextEntry p_src, int p_typingIndex) {
        int foundShift = -1;
        ListIterator<TextEntry> typingIterator = typingChain.getChain().listIterator(p_typingIndex);
        for (int i = 1; i <= 10 && typingIterator.hasNext(); i++) {
            TextEntry candidate = typingIterator.next();
            if (isGoodEnough(p_src, candidate)) {
                foundShift = i;
                break;
            }
        }
        return foundShift;
    }

    /**
     * Checks if the target text entry can be considered "in progress", meaning a word that is naturally only partly typed
     * at the moment
     * @param p_src The source entry
     * @param p_tgt The target entry we are checking
     * @param isEntryNotLast true in case the entry is NOT last, false if IT IS last in the chain
     * @return true if this is a word in progress of typing
     */
    private boolean acceptableInProgress(TextEntry p_src, TextEntry p_tgt, boolean isEntryNotLast) {
        // Will be true if p_tgt is a "beginning" or full match of p_src
        return !isEntryNotLast && StringUtils.indexOf(p_src.getString(), p_tgt.getString(), 0) == 0;
    }

    /**
     * Remove all entries in the errorChain, starting from a particular text index
     * @param p_sincePosition The index in the text string, starting from which we must disregard following errors
     */
    private void purgeErrorChain(int p_sincePosition) {
        if (errorChain.size() > 0) {
            ListIterator<IndexedEntry> backIter = errorChain.listIterator(errorChain.size());
            while (backIter.hasPrevious()) {
                IndexedEntry prev = backIter.previous();
                if (prev.index >= p_sincePosition) {
                    backIter.remove();
                } else {
                    break;
                }
            }
        }
    }

    /**
     * Will do or repeat matching of entries in the sample and typing chains, starting off the specified index.
     * @param p_sinceIndex The chain index, to begin with. Anything to left of it is considered properly matched.
     */
    private void rematch(int p_sinceIndex) {
        // word matches word, separator matches separator
        // likely to have diff in numbers of separators

        // algo: in case of miss, go ahead up to 10 items until finding
        // Will accept the word in progress of typing, not regarding that a typo

        // 1st, let's forget that there were any errors since the set index...
        purgeErrorChain(p_sinceIndex);

        if (p_sinceIndex < 0) return; // no change was done
        if (p_sinceIndex >= vectors.length) {
            throw new IndexOutOfBoundsException("Index = " + p_sinceIndex + " array length = " + vectors.length);
        }
        ListIterator<TextEntry> sampleIterator = sampleChain.getChain().listIterator(p_sinceIndex);
        ListIterator<TextEntry> typingIterator = typingChain.getChain().listIterator(p_sinceIndex);
        int sampleIndex = p_sinceIndex;
        int typingIndex = p_sinceIndex;
        if (typingIterator.hasNext()) {
            TextEntry candidate = typingIterator.next(); // init the candidate for the 1st time
            boolean iWantMore = false; // flag of optimism
            // the main rematch loop start. iWantMore == true will make it advance the sampleIterator even
            // if the index is beyond the typingChain size. It's necessary top "hop holes" in matching
            // and be able to compare different samples to the tailing candidate.
            for (int i = p_sinceIndex; i < vectors.length && (i < typingChain.size() || iWantMore); i++) {
                sampleIndex = i;
                TextEntry sample = sampleIterator.next();
                if (isGoodEnough(sample, candidate)) {
                    // STRAIGHT MATCH found
                    vectors[i].hasMatch = true;
                    vectors[i].targetIndex = typingIndex++;
                    vectors[i].diffMeasure = sample.getDiffMeasure(candidate);
                    vectors[i].inProgress = false;
                    // now, let's advance typing index
                    if (!typingIterator.hasNext()) break; // eof
                    candidate = typingIterator.next();
                    iWantMore = true; // I'm jumping in expectation of the good!
                } else {
                    // NO MATCH here, Typo processing routine starts:
                    if (sample.getType() == TextEntry.TYPE_WORD) {
                        if (acceptableInProgress(sample, candidate, typingIterator.hasNext())) {
                            // A WORD IN PROGRESS of typing
                            vectors[i].hasMatch = true;
                            vectors[i].targetIndex = typingIndex; // Not ++'ing, because it's always the last element
                            vectors[i].diffMeasure = 0; // explicit setting of diffMeasure to, regardless of the real diff
                            vectors[i].inProgress = true;
                            break; // Will always be the case when that's the last word in the chain
                        } else {
                            // Not a word in progress, now look up next 10...
                            int shift = lookupAhead(sample, typingIndex); // -1 if not found
                            if (shift >= 0) {
                                // FOUND A MATCH AHEAD
                                // Now putting all unexpected tokens in-between into the errorChain
                                errorChain.add(new IndexedEntry(sampleIndex, candidate)); // put the current one into error chain
                                for (int j = 1; j < shift; j++) {
                                    candidate = typingIterator.next();
                                    typingIndex++;
                                    if (j < shift - 1) {
                                        errorChain.add(new IndexedEntry(sampleIndex, candidate)); // put everything in the middle into error chain
                                    }
                                }
                                // SHIFTED MATCH found
                                vectors[i].hasMatch = true;
                                vectors[i].targetIndex = typingIndex++;
                                vectors[i].diffMeasure = sample.getDiffMeasure(candidate);
                                vectors[i].inProgress = false;
                                // now, let's advance typing index
                                if (!typingIterator.hasNext()) break; // eof
                                candidate = typingIterator.next();
                                iWantMore = true; // Okay, let's continue...
                            } else {
                                // ALAS, NOT A MATCH at all (for a word)
                                vectors[i].hasMatch = false;
                                vectors[i].targetIndex = -1;
                                vectors[i].diffMeasure = sample.getLength();
                                vectors[i].inProgress = false;
                                if (!typingIterator.hasNext()) break; // eof
                                iWantMore = false; // No-o-o, it sucks...
                            }
                        }
                    } else {
                        // NOT A MATCH (for a separator)
                        vectors[i].hasMatch = false;
                        vectors[i].targetIndex = -1;
                        vectors[i].diffMeasure = sample.getLength();
                        vectors[i].inProgress = false;
                        if (!typingIterator.hasNext()) break; // eof
                        iWantMore = false; // Boo!..
                    }
                }
            }
            if (sampleIndex < vectors.length - 1) {
                // here we fell out of the loop by the typing chain items; the rest is considered yet uncovered text
                fillAsUnmatched(sampleIndex);
            }
        } else { // typingIterator is empty
            fillAsUnmatched(sampleIndex);
        }
    }

    /**
     * This method calculates cumulative statistical values by the current match vector and error vector
     */
    private void remakeStats() {
        int cntTypedChars = typingChain.getCharsCount();
        int cntTypedWords = typingChain.getWordCount();
        int cntMistypedChars = 0;
        int cntMistypedWords = 0;

        int indexNextToType = 0;
        int badMatchTailCount = 0;
        // The loop to count sum of mistyped characters, words and how many mismatches are at the chain's tail
        for (int i = 0; i < vectors.length; i++) {
            if (vectors[i].diffMeasure > 0) {
                cntMistypedChars += vectors[i].diffMeasure;
                if (wordMap[i]) {
                    cntMistypedWords++;
                }
            }
            if (vectors[i].hasMatch) {
                if (!vectors[i].inProgress) {
                    indexNextToType = i + 1;
                }
                badMatchTailCount = 0;
            } else {
                if (vectors[i].diffMeasure > 0) {
                    badMatchTailCount++; // tokens with mismatches are counted
                }
            }
        }

        // If complete, turn nextToType to zero item (the first word in the text)
        if (indexNextToType >= vectors.length) {
            indexNextToType = 0;
        }

        // Now count the error chain
        if (errorChain.size() > 0) {
            for (IndexedEntry indxEntry : errorChain) {
                TextEntry errorEntry = indxEntry.entry;
                if (errorEntry.getType() == TextEntry.TYPE_WORD) {
                    cntMistypedWords++;
                }
                cntMistypedChars += errorEntry.getLength();
            }
        }

        typedChars = cntTypedChars;
        typedWords = cntTypedWords;
        mistypedChars = cntMistypedChars;
        mistypedWords = cntMistypedWords;
        TextEntry nextSample;
        if (sampleChain.size() > 0) {
            percentTyped = 100 * (typingChain.size() - errorChain.size()) / sampleChain.size();
            nextSample = sampleChain.getChain().get(indexNextToType);
        } else {
            percentTyped = 0;
            nextSample = null;
        }
        if (nextSample != null) {
            nextToType = new TextSpan(nextSample.getPositionStart(), nextSample.getLength());
        } else {
            nextToType = new TextSpan(0, 0);
        }
        if (badMatchTailCount == 0) {
            sanity = Sanity.HOMOSAPIENS;
        } else {
            if (badMatchTailCount < 6) {
                sanity = Sanity.HOMINIDE;
            } else {
                sanity = Sanity.MONKEY;
            }
        }
    }

    /**
     * Find the rightmost index, from which to begin rematching
     * @param p_typingIndex The first touched (added or removed) in the typingChain
     * @return The index in the source chain and match vector, since which rematching is required
     */
    private int getAffectedInSample(int p_typingIndex) {
        // To be sure, always begin rematching when a discrepancy begins, if any
        int lastGood = 0;
        for (int i = 0; i < vectors.length; i++) {
            if (!vectors[i].hasMatch) break;
            if (i == vectors[i].targetIndex) {
                lastGood = i;
            }
        }
        return lastGood < p_typingIndex ? lastGood : p_typingIndex;
    }

    /**
     * Causes insertion to the typingChain, then runs matching and update to summaries.
     * @param p_text String to parse and insert to the chain
     * @param p_position Position in the text where the insert happens
     */
    public void insert(String p_text, int p_position) {
        // Append or insert?
        if (typingChain.size() == 0 || typingChain.getLastEntry().getPositionEnd() == p_position) {
            int firstAffected = typingChain.append(p_text);
            rematch(getAffectedInSample(firstAffected));
            remakeStats();
        } else {
            int firstAffected = typingChain.insert(p_text, p_position);
            rematch(getAffectedInSample(firstAffected));
            remakeStats();
        }
    }

    /**
     * Causes removals from the typingChain, then runs matching and update to summaries.
     * @param p_position Start position in the text for removal
     * @param p_length Length of the text to clip
     */
    public void remove(int p_position, int p_length) {
        int firstAffected = typingChain.remove(p_position, p_length);
        rematch(getAffectedInSample(firstAffected));
        remakeStats();
    }

}
