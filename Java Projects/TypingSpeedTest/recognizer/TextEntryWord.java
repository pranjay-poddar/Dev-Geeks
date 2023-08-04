package Typing.Speed.Test.recognizer;

import org.apache.commons.lang3.StringUtils;

public class TextEntryWord extends TextEntry {

    @SuppressWarnings("HardCodedStringLiteral")
    private static String unYo (String input) {
        return input.replaceAll("Ё","Е").replaceAll("ё","е");
    }

    public TextEntryWord(String p_Text, int p_position) {
        super(unYo(p_Text), p_position);
    }

    @Override
    protected TextEntryWord makeCopy(int p_newPos) {
        return new TextEntryWord(this.content, p_newPos);
    }

    @Override
    public int getType() {
        return TYPE_WORD;
    }

    @Override
    public int getDiffMeasure(TextEntry o_entry) {
        if (o_entry == null) {
            return content.length();
        }
        if (this == o_entry) {
            return 0;
        }
        if (!(o_entry instanceof TextEntryWord)) {
            return content.length();
        }
        return StringUtils.getLevenshteinDistance(content, o_entry.content);
    }
}
