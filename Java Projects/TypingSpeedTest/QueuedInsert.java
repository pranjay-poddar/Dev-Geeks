package Typing.Speed.Test;

public class QueuedInsert extends QueuedEditEvent {

    private final String text;
    private final int offset;
    private final int length;

    public QueuedInsert(String p_text, int p_offset) {
        text = p_text;
        offset = p_offset;
        length = text.length();
    }

    @Override
    public String getText() {
        return text;
    }

    @Override
    public int getOffset() {
        return offset;
    }

    @Override
    public int getLength() {
        return length;
    }

    @Override
    protected <V extends QueuedEditEvent> V innerMerge(V o_other) {
        QueuedInsert next = (QueuedInsert) o_other;
        if (this.offset + this.length == next.offset) {
            return (V) new QueuedInsert(this.text + next.text, this.offset);
        }
        if (this.offset == next.offset + next.length) {
            return (V) new QueuedInsert(next.text + this.text, next.offset);
        }
        return null;
    }
}
