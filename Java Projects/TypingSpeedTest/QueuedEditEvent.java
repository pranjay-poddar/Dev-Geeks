package Typing.Speed.Test;

abstract class QueuedEditEvent {

    public abstract String getText();
    public abstract int getOffset();
    public abstract int getLength();
    protected abstract <V extends QueuedEditEvent> V innerMerge(V o_other);

    /**
     * @param o_other - The event to merge with. The argument is understood as an event happening after.
     * @return - The merged event or null if not possible to merge with
     */
    public <V extends QueuedEditEvent> V mergeWithAnother(V o_other) {
        if (o_other == null) return null;
        if (!(this.getClass().equals(o_other.getClass()))) return null; // checks if they are the same kind
        return innerMerge(o_other);
    }

}
