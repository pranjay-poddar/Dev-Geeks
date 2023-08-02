package Typing.Speed.Test;

import Typing.Speed.Test.i18n.I18nHelper;

class TimeCounter {

    private final int charLength;
    private final LeaderLevel level;

    private long startTime = -1L;
    private long markTime = -1L;
    private long pauseBegin = -1L;
    private long pauses = 0L;
    private boolean isPaused = false;
    private boolean isStopped = false;

    public TimeCounter(int p_charLength, LeaderLevel p_level) {
        charLength = p_charLength;
        level = p_level;
    }

    public void reset() {
        startTime = System.currentTimeMillis();
        markTime = -1L;
        pauseBegin = -1L;
        pauses = 0L;
        isPaused = false;
        isStopped = false;
    }

    public void mark() {
        if (!isStopped) {
            markTime = System.currentTimeMillis();
        }
    }

    public void stop() {
        if (!isStopped) {
            mark();
            isStopped = true;
        }
    }

    public void pause() {
        if (!isStopped) {
            pauseBegin = System.currentTimeMillis();
            isPaused = true;
        }
    }

    public void resume() {
        if (!isStopped && isPaused) {
            pauses += System.currentTimeMillis() - pauseBegin;
            isPaused = false;
        }
    }

    public int getTime() {
        if (startTime < 0 || markTime < 0) return 0;
        long checkTime = (isPaused ? pauseBegin : markTime) - pauses;
        int millis = (int) (checkTime - startTime);
        return millis / 1000;
    }

    public String getTimeString() {
        if (startTime < 0 || markTime < 0) return "00:00";
        int secs = getTime();
        int mins = secs / 60;
        if (mins > 99) return I18nHelper.message("time.too.long");
        StringBuilder sb = new StringBuilder();
        if (mins < 10) {
            sb.append('0');
        }
        sb.append(mins);
        sb.append(':');
        int secPrn = secs - mins * 60;
        if (secPrn < 10) {
            sb.append('0');
        }
        sb.append(secPrn);
        return sb.toString();
    }

    public int getLeaderPct() {
        if (startTime < 0 || markTime < 0) return 0;
        long checkTime = (isPaused ? pauseBegin : markTime) - pauses;
        int charsLeader = level.getSpeed() * (int)(checkTime - startTime) / 60000;
        int pct = 100 * charsLeader / charLength;
        return pct > 100 ? 100 : pct;
    }

}
