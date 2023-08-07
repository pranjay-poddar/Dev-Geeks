package Typing.Speed.Test;

import java.util.Map;

public interface ITextRepository {

    public static class HeaderAndText {
        public final String header;
        public final String text;

        public HeaderAndText(String p_header, String p_text) {
            header = p_header;
            text = p_text;
        }
    }

    Map<Integer,HeaderAndText> getTexts();
}
