package Typing.Speed.Test;

public class QueuedRemove extends QueuedEditEvent {

    private final int offset;
    private final int length;

    public QueuedRemove (int p_offset, int p_length) {
        offset = p_offset;
        length = p_length;
    }

    @Override
    public String getText() {
        return "";
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
        QueuedRemove next = (QueuedRemove) o_other;
        if (next.offset + next.length == this.offset) {
            return (V) new QueuedRemove(next.offset, next.length + this.length);
        }

        if (this.offset == next.offset) {
            return (V) new QueuedRemove(this.offset, next.length + this.length);
        }

        return null;
    }
}
