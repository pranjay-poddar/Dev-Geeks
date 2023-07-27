package Typing.Speed.Test.recognizer;

import java.util.*;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.text.StrMatcher;
import org.apache.commons.lang3.text.StrTokenizer;

/**
 * Parses input lines and updates the inner representation in the smart way: only the really affected part is reparsed.
 *
 * NOTE on term usage:
 *    Position is a counter of characters in a text string staring from its beginning, zero-based.
 *    Index is a counter of items in a collection holding text entries (TextChain or array).
 * These two terms should never be mixed in context of this application for clarity.
 */
public class TextChain {

    private static final Set<Character> DELIMITERS; // Keeps all the possible delimiters for literary texts (Rus + Eng)

    static {
        Set<Character> newDelimSet = new HashSet<Character>(30);
        // The non-ambiguous delimiters
        newDelimSet.add('.');
        newDelimSet.add(',');
        newDelimSet.add(':');
        newDelimSet.add(';');
        newDelimSet.add('!');
        newDelimSet.add('?');
        newDelimSet.add('(');
        newDelimSet.add(')');
        // The ambiguous delimiters are defined by CompareHelper class
        newDelimSet.addAll(CompareHelper.SPACES);
        newDelimSet.addAll(CompareHelper.LINE_SEPARATORS);
        newDelimSet.addAll(CompareHelper.HYPHENS);
        newDelimSet.addAll(CompareHelper.QUOTES_OPENING);
        newDelimSet.addAll(CompareHelper.QUOTES_CLOSING);
        DELIMITERS = Collections.unmodifiableSet(newDelimSet);
    }

    // Turning the set of delimiters to a static matcher from StringUtils
    private final static StrMatcher DELIM_MATCHER =
            StrMatcher.charSetMatcher(
                    new String(
                            ArrayUtils.toPrimitive(
                                    DELIMITERS.toArray(
                                            new Character[
                                                    DELIMITERS.size()
                                                    ]
                                    )
                            )
                    )
            );

    private final LinkedList<TextEntry> chain; // the chain

    /**
     * This stateful class will recognize \n\r and \r\n pairs
     * and return \n separators instead (also converting \r to \n)
     */
    private class SepMerger {

        private Character rememberedCrLf = null;
        private int position = -1;

        /**
         * Is where you put the input to and returns the string representing zero, one or two separators.
         * zero - don't insert now, skip to the next char in the string
         * one - just insert the returned character as a separator
         * two - insert both characters as two subsequent separators following each other
         * @param p_str The source string
         * @param p_position The base position of the 1st character in the string
         * @param p_is_last Must be true if the current separator is followed by a non-separator char or nothing
         * @return null, one, or two - char string, see the method description
         */
        String put (String p_str, int p_position, boolean p_is_last) {
            Character chr = p_str.charAt(0);
            if (rememberedCrLf == null) {
                return empty(chr, p_position, p_is_last); // doing afresh
            } else {
                return full(chr); // doing when there was "something" before
            }
        }

        private String empty(Character p_chr, int p_position, boolean p_is_last) {
            position = p_position;
            if (CompareHelper.LINE_SEPARATORS.contains(p_chr)) {
                // Is last?
                if (p_is_last) {
                    return convert(p_chr);
                } else {
                    // Not last, do remember
                    rememberedCrLf = p_chr;
                    return null;
                }
            } else { // Not a line sep
                return String.valueOf(p_chr);
            }
        }

        private String full(Character p_chr) {
            String toReturn;
            if (CompareHelper.LINE_SEPARATORS.contains(p_chr)) {
                if (!rememberedCrLf.equals(p_chr)) {
                    // then it's mergeable
                    toReturn = convert(rememberedCrLf);
                } else {
                    // then it's not mergeable, concat
                    StringBuilder sb = new StringBuilder();
                    sb.append(convert(rememberedCrLf));
                    sb.append(convert(p_chr));
                    toReturn = sb.toString();
                }
            } else { // Concat the remembered and the current one too
                StringBuilder sb = new StringBuilder();
                sb.append(convert(rememberedCrLf));
                sb.append(p_chr);
                toReturn = sb.toString();
            }
            rememberedCrLf = null;
            return toReturn;
        }

        private String convert(Character p_chr) {
            if (p_chr == '\r') {
                return "\n";
            } else {
                return String.valueOf(p_chr);
            }
        }

        /**
         * @return The base position for the 1st separator
         */
        int getPosition() {
            return position;
        }

    }

    /**
     * @param p_iniText The initial text to parse and initialize the chain with
     */
    public TextChain(String p_iniText) {
        chain = new LinkedList<TextEntry>();
        if (p_iniText.length() > 0) {
            append(p_iniText);
        }
    }

    /**
     * An alternative constructor for an empty chain
     */
    public TextChain() {
        this("");
    }

    // Getters

    /**
     * @return The chain represented as a list
     */
    public List<TextEntry> getChain() {
        return Collections.unmodifiableList(chain);
    }

    /**
     * @return Number of items in the chain
     */
    public int size() {
        return chain.size();
    }

    /**
     * @return Count of characters in all items of the chain
     */
    public int getCharsCount() {
        int result = 0;
        for (TextEntry aChain : chain) {
            result += aChain.getLength();
        }
        return result;
    }

    /**
     * @return Count of words only in the chain
     */
    public int getWordCount() {
        int result = 0;
        for (TextEntry entry : chain) {
            result += entry.getType() == TextEntry.TYPE_WORD ? 1 : 0;
        }
        return result;
    }

    /**
     * @return The last entry in the chain, or null if the chain is empty
     */
    public TextEntry getLastEntry() {
        if (chain.size() > 0) {
            return chain.getLast();
        } else {
            return null;
        }
    }

    /**
     * @return A string combined of all chain items, concatenated together in their proper order
     */
    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();
        for (TextEntry aChain : chain) {
            builder.append(aChain.getString());
        }
        return builder.toString();
    }

    // Input methods

    /**
     * Appends the supplied text to the end of existing chain
     * @param p_text The text to append
     * @return The index of the first "new" element in the chain
     */
    public int append(String p_text) {
        if (p_text.length() > 0) {
            int firstAffected = chain.size();
            // Check if we can merge words in the end of chain and in the beginning
            // of the appended text
            String toAppend = p_text;
            // if ends with a word
            if (chain.size() > 0 &&
                    chain.getLast().getType() == TextEntry.TYPE_WORD) {
                // and begins with a word
                if (!DELIMITERS.contains(p_text.charAt(0))) {
                    toAppend = chain.removeLast().getString() + p_text;
                    firstAffected--;
                }
            }
            if (chain.size() > 0) {
                chain.addAll(parseText(toAppend, chain.getLast().getPositionEnd()));
            } else {
                chain.addAll(parseText(toAppend, 0));
            }
            return firstAffected;
        } else {
            return -1;
        }
    }

    /**
     * Inserts a text to an arbitrary place in the chain, defined by the position character number
     * @param p_text The text to insert
     * @param p_position The position where to insert
     * @return The index of the first chain item which begins the freshly inserted piece
     */
    public int insert(String p_text, int p_position) {
        if (p_text.length() > 0) {
            LinkedList<TextEntry> tailReversed = cutTailFrom(p_position);
            String toAppend = p_text;
            if (tailReversed.size() > 0) {
                // Making an insertion into the middle of a word
                if (tailReversed.getLast().getPositionStart() < p_position) {
                    // then extract the word and split it to left and right parts,
                    // surrounding the string to insert
                    TextEntry splitEntry = tailReversed.removeLast();
                    String leftPart = StringUtils.substring(splitEntry.getString(), 0, p_position - splitEntry.getPositionStart());
                    String rightPart = StringUtils.substring(splitEntry.getString(), p_position - splitEntry.getPositionStart());
                    toAppend = leftPart + p_text + rightPart;
                } else {
                    // Are we prepending the word in the beginning?
                    if (tailReversed.getLast().getType() == TextEntry.TYPE_WORD) {
                        // If ends with a word
                        if (!DELIMITERS.contains(p_text.charAt(p_text.length()-1))) {
                            toAppend = p_text + tailReversed.removeLast().getString();
                        }
                    }
                }
            }
            int firstAffected = append(toAppend);
            // append the rest of the tail
            reappendTail(tailReversed);
            return firstAffected;
        } else {
            return -1;
        }
    }

    /**
     * Clips a text from an arbitrary place in the chain
     * @param p_position The start char position for the text removal
     * @param p_length How many characters to remove
     * @return The index of the first chain item affected by remove (clipped or shifted back)
     */
    public int remove(int p_position, int p_length) {
        if (p_length > 0) {
            // Get the tail after the last pos
            LinkedList<TextEntry> tailReversed = cutTailFrom(p_position + p_length);
            // Remove affected entries in the range
            TextEntry lastRemoved = null;
            while (chain.size() > 0 && chain.getLast().getPositionEnd() > p_position) {
                lastRemoved = chain.removeLast();
            }
            int firstAffected = chain.size();
            // the edge case left
            if (lastRemoved != null && lastRemoved.getPositionEnd() > p_position) {
                String piece = StringUtils.substring(lastRemoved.getString(), 0, p_position - lastRemoved.getPositionStart());
                append(piece);
            }
            // the edge case right
            if (tailReversed.size() > 0 &&
                    tailReversed.getLast().getPositionStart() < p_position + p_length) {
                TextEntry tailCut = tailReversed.removeLast();
                String pieceLeft = StringUtils.substring(tailCut.getString(), 0, p_position - tailCut.getPositionStart());
                String pieceRight = StringUtils.substring(tailCut.getString(), p_position + p_length - tailCut.getPositionStart());
                append(pieceLeft + pieceRight);
            }
            // append the rest of the tail
            reappendTail(tailReversed);
            return firstAffected;
        } else {
            return -1;
        }
    }

    // The parsing and splitting routines

    /**
     * Turns a line of text into an ordered list of TextEntries
     * @param p_text The text to parse
     * @param p_relative The base position index for created TextEntries (so they would know where they are in the text)
     * @return An ordered list of positioned TextEntries representing the same text
     */
    private List<TextEntry> parseText(String p_text, int p_relative) {
        if (p_text.length() == 0) return (List<TextEntry>) Collections.EMPTY_LIST;
        List<TextEntry> newList = new LinkedList<TextEntry>();
        // tokenize with StrTokenizer
        StrTokenizer tokens = new StrTokenizer(p_text, DELIM_MATCHER);
        int localPosition;
        int nextPos = 0;
        while (tokens.hasNext()) {
            String currentPart = tokens.next();
            // find index of the current part in the supplied string, beginning from nextPos
            localPosition = StringUtils.indexOf(p_text, currentPart, nextPos);
            if (localPosition == -1) {
                throw new RuntimeException("Could not find " + currentPart + " within " + p_text);
            }
            if (localPosition > nextPos) { // There are separators in the gap
                putSeparators (newList, p_text, nextPos, localPosition, p_relative);
            }
            TextEntryWord newWord = new TextEntryWord(currentPart, p_relative + localPosition);
            newList.add(newList.size(), newWord);
            nextPos = localPosition + currentPart.length();
        }
        // What if there are any trailing separators left?
        if (nextPos < p_text.length()) {
            putSeparators(newList, p_text, nextPos, p_text.length(), p_relative);
        }
        return newList;
    }

    /**
     * Appends to the end of the supplied list a chain of TextEntrySeparator objects, each one corresponding
     * to the characters in the specified range in the supplied string
     * @param p_list The list to append separators to
     * @param p_text The string where to get separators from
     * @param p_from Start position of the separator sequence
     * @param p_to End position of the separator sequence
     * @param p_relative Base position for creating of new TextEntries
     */
    private void putSeparators(List<TextEntry> p_list, String p_text, int p_from, int p_to, int p_relative) {
        // Turn all chars from p_from to p_to into separators
        SepMerger sepMerger = new SepMerger();
        for (int i = p_from; i < p_to; i++) {
            String strSep = StringUtils.substring(p_text, i, i+1); // Get the next single characters
            String strToAdd = sepMerger.put(strSep, i, i == p_to - 1); // Feed it to the SepMerger
            if (strToAdd == null) continue; // Indication that we must skip to the next character
            // May return 2 characters!
            int position = sepMerger.getPosition();
            if (strToAdd.length() == 2) {
                // then 1st add the 1st one
                p_list.add(p_list.size(), new TextEntrySeparator(
                        StringUtils.substring(strToAdd, 0, 1),
                        position + p_relative));
                p_list.add(p_list.size(), new TextEntrySeparator(
                        StringUtils.substring(strToAdd, 1, 2),
                        position + 1 + p_relative));
            } else {
                // then just add the character we have
                p_list.add(p_list.size(), new TextEntrySeparator(
                        strToAdd,
                        position + p_relative));
            }
        }
    }

    /**
     * Removes TextEntries from the chain and arranges them in the backwards order in a separate list, starting from
     * the element in the specified per-character text position.
     * @param p_position Will cut starting from this position number in the text
     * @return A list of removed TextEntries in backwards order; the chain itself is modified
     */
    private LinkedList<TextEntry> cutTailFrom(int p_position) {
        LinkedList<TextEntry> tailReversed = new LinkedList<TextEntry>();
        // Will cut the tail one by one from the end
        while (chain.size() > 0 && chain.getLast().getPositionEnd() > p_position) {
            tailReversed.add(chain.removeLast());
        }
        return tailReversed;
    }

    /**
     * Appends a sequence of TextEntries to the current chain in the backwards order, recreating each TextEntry with
     * the same content and adjusted position locations, based on the position of the entries that are already in the chain.
     * @param p_revTail The sequence of TextEntries to append in the reversed order
     */
    private void reappendTail(LinkedList<TextEntry> p_revTail) {
        // In the backwards order
        ListIterator<TextEntry> iteratorTail = p_revTail.listIterator(p_revTail.size());
        while (iteratorTail.hasPrevious()) {
            TextEntry oldTailEntry = iteratorTail.previous();
            if (chain.size() > 0) {
                // The last position is extracted from the last element in the chain
                chain.add(TextEntry.cloneAndReIndex(oldTailEntry, chain.getLast().getPositionEnd()));
            } else {
                // The last position assumed 0
                chain.add(TextEntry.cloneAndReIndex(oldTailEntry, 0));
            }
        }
    }

}
