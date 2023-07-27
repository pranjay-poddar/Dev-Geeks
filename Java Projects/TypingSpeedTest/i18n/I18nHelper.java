//
package Typing.Speed.Test.i18n;

import org.jetbrains.annotations.PropertyKey;

import java.text.MessageFormat;
import java.util.Locale;
import java.util.ResourceBundle;

public class I18nHelper {

    private static final String BUNDLE_NAME = "i18n.TypingTest"; //NON-NLS

    public static String message(@PropertyKey(resourceBundle=BUNDLE_NAME) String key,
                                 Object... params) {
        ResourceBundle bundle = ResourceBundle.getBundle(BUNDLE_NAME, Locale.getDefault());
        String value = bundle.getString(key);
        if (params.length > 0) {
            return MessageFormat.format(value, params);
        }
        return value;
    }

}
