package Typing.Speed.Test;

import Typing.Speed.Test.i18n.I18nHelper;
import Typing.Speed.Test.recognizer.TextChain;
import Typing.Speed.Test.recognizer.TypingFlowMatcher;

import java.util.concurrent.ConcurrentLinkedQueue;

class TypingTestController {

    private final TypingTestView hostView;
    private final TypingFlowMatcher matcher;
    private final TimeCounter timeCounter;
    private final int totalChars;

    private final ConcurrentLinkedQueue<QueuedEditEvent> editQueue;

    public TypingTestController(String p_sampleText,
                                TypingTestView p_typingTest, LeaderLevel p_level) {
        hostView = p_typingTest;
        String sampleText = p_sampleText;
        totalChars = sampleText.length();
        timeCounter = new TimeCounter(totalChars, p_level);
        matcher = new TypingFlowMatcher(new TextChain(sampleText), new TextChain());
        editQueue = new ConcurrentLinkedQueue<QueuedEditEvent>();
        timeCounter.reset();
    }

    // On the EDT
    public void addRemoveEvent(int offset, int length) {
        editQueue.add(new QueuedRemove(offset, length));
    }

    // On the EDT
    public void addInsertEvent(int offset, String text) {
        editQueue.add(new QueuedInsert(text, offset));
    }

    // On the EDT (from Timer)
    public void markTimeAndUpdateLeader() {
        timeCounter.mark();
        hostView.setTime(timeCounter.getTimeString());
        hostView.setLeaderProgress(timeCounter.getLeaderPct());
    }

    // On the worker thread
    private void flushQueue() {
        QueuedEditEvent topEvent = editQueue.poll();
        if (topEvent != null) {
            // Try to merge with the next event
            QueuedEditEvent comboEvent;
            do {
                comboEvent = topEvent;
                topEvent = topEvent.mergeWithAnother(editQueue.peek());
                if (topEvent != null) {
                    editQueue.poll(); // to delete the merged event from the queue
                }
            } while (topEvent != null);
            // Now action the event
            if (comboEvent instanceof QueuedInsert) {
                matcher.insert(comboEvent.getText(), comboEvent.getOffset());
            } else { // this is QueuedRemove
                matcher.remove(comboEvent.getOffset(), comboEvent.getLength());
            }
        }
    }

    // On the worker thread
    /**
     * @return true if end of the text reached
     */
    public boolean updateStats() {
        flushQueue();
        int pct;
        pct = matcher.getPercentTyped();
        hostView.setOwnProgress(pct);
        hostView.setCharsTyped(matcher.getTypedChars());
        hostView.setWordsTyped(matcher.getTypedWords());
        hostView.setCharsMisTyped(matcher.getMistypedChars());
        hostView.setWordsMisTyped(matcher.getMistypedWords());
        TypingFlowMatcher.TextSpan highSpan = matcher.getNextToType();
        hostView.setSampleAreaHighlight(highSpan.position, highSpan.length);
        String sanityMessage = "";
        switch (matcher.getSanity()) {
            case HOMOSAPIENS:
                sanityMessage = I18nHelper.message("sanity.homosapiens");
                break;
            case HOMINIDE:
                sanityMessage = I18nHelper.message("sanity.hominide");
                break;
            case MONKEY:
                sanityMessage = I18nHelper.message("sanity.monkey");
        }
        hostView.setStatusLine(sanityMessage);
        return pct  >= 100 || timeCounter.getLeaderPct() >= 100;
    }

    public void pause() {
        timeCounter.pause();
    }

    public void resume() {
        timeCounter.resume();
    }

    public String formatFinalResult() {
        timeCounter.stop();
        StringBuilder result = new StringBuilder();
        int pctOwn = matcher.getPercentTyped();
        int pctLeader = timeCounter.getLeaderPct();
        int mistypedChars = matcher.getMistypedChars();
        int fine = (int) Math.round(100.0 * ((double)mistypedChars / totalChars));
        int pctCorrected = pctOwn - fine;
        if (pctCorrected < pctLeader) { // lost
            result.append(I18nHelper.message("line.top.you.lost"));
        } else { // won
            result.append(I18nHelper.message("line.top.you.won"));
        }
        result.append(I18nHelper.message("line.final.stats.and.time"));
        result.append(timeCounter.getTimeString());
        result.append(I18nHelper.message("line.words.typed"));
        result.append(matcher.getTypedWords());
        result.append(I18nHelper.message("line.words.typos"));
        result.append(matcher.getMistypedWords());
        result.append(I18nHelper.message("line.chars.typed"));
        result.append(matcher.getTypedChars());
        result.append(I18nHelper.message("line.chars.typos"));
        result.append(mistypedChars);
        result.append(I18nHelper.message("line.points"));
        result.append(pctOwn);
        result.append(I18nHelper.message("line.fines"));
        result.append(fine);
        result.append(I18nHelper.message("line.points.total"));
        result.append(pctCorrected);
        int time = timeCounter.getTime(); // in seconds
        int speed = (int) Math.round(matcher.getTypedChars() / ((double) time / 60.0));
        result.append(I18nHelper.message("line.typing.speed"));
        result.append(speed);
        result.append(I18nHelper.message("line.cpm"));
        if (speed < LeaderLevel.NORM.getSpeed()) {
            result.append(I18nHelper.message("line.rating.0"));
        } else {
            if (speed < LeaderLevel.GOOD.getSpeed()) {
                result.append(I18nHelper.message("line.rating.1"));
            } else {
                if (speed < LeaderLevel.PROFI.getSpeed()) {
                    result.append(I18nHelper.message("line.rating.2"));
                } else {
                    result.append(I18nHelper.message("line.rating.3"));
                }
            }
        }
        return result.toString();
    }

}
