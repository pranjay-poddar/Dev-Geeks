package Typing.Speed.Test.recognizer;

public abstract class TextEntry {

    public static final int TYPE_WORD = 0;
    public static final int TYPE_SEPARATOR = 1;

    private final int positionStart;
    final String content;
    private final int positionEnd;

    public static <V extends TextEntry> V cloneAndReIndex (V p_source, int p_newPos) {
        return p_source.makeCopy(p_newPos);
    }

    public abstract int getType();
    public abstract int getDiffMeasure(TextEntry o_entry);
    protected abstract <V extends TextEntry> V makeCopy(int p_newPos);

    // Already separated content comes here
    TextEntry(String p_Text, int p_position) {
        if (p_position < 0) {
            throw new IllegalArgumentException("Position can't be negative, supplied: " + p_position);
        }
        content = p_Text;
        positionStart = p_position;
        positionEnd = positionStart + content.length();
    }

    public int getPositionStart() {
        return positionStart;
    }

    public int getPositionEnd() {
        return positionEnd;
    }

    public int getLength() {
        return positionEnd - positionStart;
    }

    public String getString() {
        return content;
    }

}