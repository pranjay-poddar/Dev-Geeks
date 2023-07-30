package Typing.Speed.Test.recognizer;

public class TextEntrySeparator extends TextEntry {

    private final char realSep;

    public TextEntrySeparator(String p_Text, int p_position) {
        super(p_Text, p_position);
        if (p_Text.length() <= 0 || p_Text.length() > 1) {
            throw new IllegalArgumentException("Should only be a single character, supplied: " + p_Text);
        }
        realSep = p_Text.charAt(0);
    }

    @Override
    protected TextEntrySeparator makeCopy(int p_newPos) {
        return new TextEntrySeparator(this.content, p_newPos);
    }

    @Override
    public int getType() {
        return TYPE_SEPARATOR;
    }

    @Override
    public int getDiffMeasure(TextEntry o_entry) {
        if (o_entry == null) {
            return 1;
        }
        if (this == o_entry) {
            return 0;
        }
        if (!(o_entry instanceof TextEntrySeparator)) {
            return 1;
        }
        if (realSep != ((TextEntrySeparator) o_entry).realSep) {
            if (CompareHelper.isTheSame(realSep, ((TextEntrySeparator) o_entry).realSep)) {
                return 0;
            } else {
                return 1;
            }
        }
        // Otherwise, it's the same
        return 0;
    }

}
