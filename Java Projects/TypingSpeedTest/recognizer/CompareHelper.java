package Typing.Speed.Test.recognizer;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class CompareHelper {

    public static final Set<Character> QUOTES_OPENING;
    public static final Set<Character> QUOTES_CLOSING;
    public static final Set<Character> HYPHENS;
    public static final Set<Character> SPACES;
    public static final Set<Character> LINE_SEPARATORS;

    static {
        // Opening quotes
        Set<Character> quotesOpening = new HashSet<Character>(6);
        quotesOpening.add('"');
        quotesOpening.add('„');
        quotesOpening.add('«');
        quotesOpening.add('“');
        quotesOpening.add('‘');
        quotesOpening.add('‹');
        QUOTES_OPENING = Collections.unmodifiableSet(quotesOpening);
        // Closing quotes
        Set<Character> quotesClosing = new HashSet<Character>(6);
        quotesClosing.add('\"');
        quotesClosing.add('“');
        quotesClosing.add('»');
        quotesClosing.add('”');
        quotesClosing.add('’');
        quotesClosing.add('›');
        QUOTES_CLOSING = Collections.unmodifiableSet(quotesClosing);
        // Hyphens
        Set<Character> hyphens = new HashSet<Character>(6);
        hyphens.add('-');
        hyphens.add('‑');
        hyphens.add('‒');
        hyphens.add('–');
        hyphens.add('—');
        hyphens.add('―');
        HYPHENS = Collections.unmodifiableSet(hyphens);
        // Spaces
        Set<Character> spaces = new HashSet<Character>(2);
        spaces.add(' ');
        spaces.add('\u00a0'); // non-breakable space
        SPACES = Collections.unmodifiableSet(spaces);
        Set<Character> lineSeparators = new HashSet<Character>(2);
        lineSeparators.add('\n'); // CR
        lineSeparators.add('\r'); // LF
        LINE_SEPARATORS = Collections.unmodifiableSet(lineSeparators);
    }

    public static boolean isTheSame(char pChar1, char pChar2) {
        if (pChar1 == pChar2) return true;
        if (SPACES.contains(pChar1) && SPACES.contains(pChar2)) return true;
        if (HYPHENS.contains(pChar1) && HYPHENS.contains(pChar2)) return true;
        if (QUOTES_OPENING.contains(pChar1) && QUOTES_OPENING.contains(pChar2)) return true;
        return QUOTES_CLOSING.contains(pChar1) && QUOTES_CLOSING.contains(pChar2);
    }

}
