package Typing.Speed.Test;

import org.jetbrains.annotations.NonNls;

import java.io.*;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

public class TextSampleRepository implements ITextRepository {

    private final Map<Integer,HeaderAndText> textContents;

    private final static String FNAME_PART = "TextFragment"; //NON-NLS
    @NonNls
    private final static String HEADER_PART = "header:"; //NON-NLS
    private final static String LINE_SEP = System.getProperty("line.separator"); //NON-NLS

    private final ClassLoader classLoader = getClass().getClassLoader();

    private static TextSampleRepository instance;

    public static ITextRepository getInstance() {
        if (instance == null) {
            instance = new TextSampleRepository();
        }
        return instance;
    }

    @NonNls
    private BufferedReader getReaderFromResource(String p_fileName) {
        URL fileResource = classLoader.getResource(p_fileName);
        if (fileResource == null) {
            return null; // no such file
        }
        try {
            return new BufferedReader(
                    new InputStreamReader(
                            fileResource.openStream(),
                            "UTF-8"
                    )
            );
        } catch (IOException e) {
            System.err.println("Error reading resource " + p_fileName + e.getMessage());
            return null; // could not find the file (we are not atomic here...)
        }
    }

    private String concatTillTheEnd(BufferedReader reader) throws IOException {
        StringBuilder sb = new StringBuilder();
        String readLine;
        while ((readLine = reader.readLine()) != null) {
            sb.append(readLine);
            sb.append(LINE_SEP);
        }
        return String.format(sb.toString());
    }

    private void initContents() {
        // Load resource files, extract text names and texts themselves and put them into the map
        for (int i=0; ; i++) {
            String fileName = FNAME_PART + i;
            BufferedReader textReader = null;
            try {
                textReader = getReaderFromResource(fileName);
                if (textReader != null) {
                    String readLine;
                    readLine = textReader.readLine();
                    // Check that the 1st line is the valid header
                    assert (HEADER_PART.equals(readLine.substring(0, HEADER_PART.length())));
                    // Get the header
                    String textHeader = readLine.substring(HEADER_PART.length(), readLine.length());
                    // get text from cdata inside
                    String text = concatTillTheEnd(textReader);
                    assert (textHeader.length() > 0);
                    assert (text != null);
                    assert (text.length() > 0);
                    textContents.put(i, new HeaderAndText(textHeader, text));
                } else {
                    break; // reached the end of available files
                }
            } catch (IOException e) {
                System.err.print(e.getMessage());
            }
            finally {
                if (textReader != null) {
                    try {
                        textReader.close();
                    } catch (IOException e) {}
                }
            }
        }
    }

    private TextSampleRepository() {
        textContents = new HashMap<Integer,HeaderAndText>();
        initContents();
    }

    public Map<Integer,HeaderAndText> getTexts() {
        return textContents;
    }

}
