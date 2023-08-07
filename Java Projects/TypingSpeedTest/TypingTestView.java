package Typing.Speed.Test;

import Typing.Speed.Test.i18n.I18nHelper;

import javax.swing.*;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;
import javax.swing.text.*;
import java.awt.*;
import java.awt.event.*;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.util.Locale;
import java.util.Map;
import java.util.ResourceBundle;

public class TypingTestView extends Component {
    private static final String PROPERTY_TEXT = "text"; // NON-NLS
    private static final String NIMBUS = "Nimbus"; // NON-NLS
    private JPanel panelTopLevel;
    private JLabel labelHeader;
    private JLabel labelStatus;
    private JPanel panelCardContent;
    private JPanel panelInitalContent;
    private JPanel panelWorkingContent;
    private JTextArea textAreaExampleText;
    private JTextArea textAreaTyping;
    private JScrollPane scrollPaneExample;
    private JScrollPane scrollPaneTyping;
    private JPanel panelGoAndSelector;
    private JButton buttonGo;
    private JScrollPane scrollPaneTextSelector;
    private JList<String> selectorList;
    private JSeparator sepIniUpper;
    private JProgressBar progressBarLeader;
    private JProgressBar progressBarYou;
    private JSeparator sepIniLower;
    private JLabel labelTimePassed;
    private JLabel labelCharsTyped;
    private JLabel labelWordsTyped;
    private JLabel labelCharTypos;
    private JLabel labelWordTypos;
    private JRadioButton radioLvlHard;
    private JRadioButton radioLvlEasy;
    private JRadioButton radioLvlMedium;
    private JButton buttonCancelTest;
    private JPanel panelCardInputPrompt;
    private JLabel labelPromptSimple;
    private JPanel panelResultsAndPrompt;
    private JTextArea textAreaInfo;
    private JLabel labelPromptNext;
    private JScrollPane scrollPaneInfo;
    private JSplitPane splitterInitial;
    private JSplitPane splitterWorking;
    private JPanel panelTopHeader;
    private JButton buttonToggleLanguage;
    private JLabel labelPickLvl;
    private JLabel labelYou;
    private JLabel labelLeader;
    private JLabel labelHeaderTime;
    private JLabel labelHeaderCharsTyped;
    private JLabel labelHeaderWordsTyped;
    private JLabel labelHeaderCharTypos;
    private JLabel labelHeaderWordTypos;
    
    private volatile TypingTestController testController;
    private volatile int textIndex;

    private static final Highlighter.HighlightPainter HPTR_BLUE =
            new DefaultHighlighter.DefaultHighlightPainter(new Color(160, 160, 255));

    private static final Object ABORT_KEY = new Object();

    private ApplicationMode mode;

    private final ITextRepository textRepository = TextSampleRepository.getInstance();

    private class ActionAbort extends AbstractAction {

        @Override
        public void actionPerformed(ActionEvent e) {
            pauseTest();
            Object[] options = {I18nHelper.message("option.ok"), I18nHelper.message("option.cancel")};
            Component source = (Component) e.getSource();
            Component rootContainer = SwingUtilities.getRoot(source);
            int selectOpt = JOptionPane.showOptionDialog(rootContainer, I18nHelper.message("prompt.abort"),
                    I18nHelper.message("dialog.caption.abort"),
                    JOptionPane.OK_CANCEL_OPTION, JOptionPane.QUESTION_MESSAGE, null, options, options[0]);
            if (selectOpt == 0) {
                setMode(ApplicationMode.GREETING);
            } else {
                resumeTest();
            }
        }
    }

    public static void main(String[] args) {
        // Init the GUI
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                trySetNimbus();
                createAndShowGUI();
            }
        });
    }

    private static void createAndShowGUI() {
        TypingTestView x_view = new TypingTestView();
        x_view.initApp();
        JFrame x_frame = new JFrame(I18nHelper.message("main.window.title"));
        x_frame.setContentPane(x_view.panelTopLevel);
        x_frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        x_frame.pack();
        x_view.adjustSplittersAuto(); // after pack
        // Now centering the frame at the screen, resizing if necessary
        Toolkit tk = Toolkit.getDefaultToolkit();
        Dimension screenSize = tk.getScreenSize();
        int screenHeight = screenSize.height;
        int screenWidth = screenSize.width;
        int height = x_frame.getHeight();
        int width = x_frame.getWidth();
        if (height > screenHeight) {
            x_frame.setSize(width, screenHeight);
            x_frame.pack();
            height = screenHeight;
        }
        if (width > screenWidth) {
            x_frame.setSize(screenWidth, height);
            x_frame.pack();
            width = screenWidth;
        }
        x_frame.setLocation((screenWidth - width) / 2, (screenHeight - height) / 2);
        x_frame.setVisible(true);
    }

    private static void trySetNimbus() {
        for (UIManager.LookAndFeelInfo info : UIManager.getInstalledLookAndFeels()) {
            if (NIMBUS.equals(info.getName())) {
                try {
                    UIManager.setLookAndFeel(info.getClassName());
                } catch (UnsupportedLookAndFeelException e) {
                    try {
                        UIManager.setLookAndFeel(UIManager.getCrossPlatformLookAndFeelClassName());
                    } catch (Exception e1) {
                        System.err.println(e1.getMessage());
                        System.exit(1);
                    }
                } catch (Exception e) {
                    System.err.println(e.getMessage());
                    System.exit(1);
                }
                break;
            }
        }
    }

    /* Init and mode switch methods */

    public void initApp() {
        // Set the initial mode
        setMode(ApplicationMode.GREETING);

        final TypingTestView instance = this;

        // The timer task start
        new Timer(100, new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                instance.fireTimer();
            }
        }).start();

        // Actions
        panelWorkingContent.getActionMap().put(ABORT_KEY, new ActionAbort());

        // Key bindings
        InputMap imap = panelWorkingContent.getInputMap(JPanel.WHEN_ANCESTOR_OF_FOCUSED_COMPONENT);
        imap.put(KeyStroke.getKeyStroke(KeyEvent.VK_ESCAPE, 0), ABORT_KEY);
        imap.put(KeyStroke.getKeyStroke(KeyEvent.VK_ESCAPE, InputEvent.SHIFT_MASK), ABORT_KEY);

        // Component properties
        ActionMap typingActionMap = textAreaTyping.getActionMap();
        typingActionMap.get("paste").setEnabled(false);
        typingActionMap.get("paste-from-clipboard").setEnabled(false);

        // Listeners
        buttonGo.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                setMode(ApplicationMode.TESTING);
            }
        });

        selectorList.addListSelectionListener(new ListSelectionListener() {
            @Override
            public void valueChanged(ListSelectionEvent e) {
                if (!e.getValueIsAdjusting()) { // do only when the changes are over in the list

                    textIndex = selectorList.getSelectedIndex();
                    if (textIndex == -1) { // No selection, disable Go! button
                        buttonGo.setEnabled(false);
                    } else {
                        buttonGo.setEnabled(true);
                    }
                }
            }
        });

        labelCharTypos.addPropertyChangeListener(new PropertyChangeListener() {
            @Override
            public void propertyChange(PropertyChangeEvent evt) {
                if (PROPERTY_TEXT.equals(evt.getPropertyName())) {
                    if ("0".equals(evt.getNewValue())) {
                        SwingUtilities.invokeLater(new Runnable() {
                            @Override
                            public void run() {
                                labelCharTypos.setVisible(false);
                            }
                        });
                    } else {
                        SwingUtilities.invokeLater(new Runnable() {
                            @Override
                            public void run() {
                                labelCharTypos.setVisible(true);
                            }
                        });
                    }
                }
            }
        });
        labelWordTypos.addPropertyChangeListener(new PropertyChangeListener() {
            @Override
            public void propertyChange(PropertyChangeEvent evt) {
                if (PROPERTY_TEXT.equals(evt.getPropertyName())) {
                    if ("0".equals(evt.getNewValue())) {
                        SwingUtilities.invokeLater(new Runnable() {
                            @Override
                            public void run() {
                                labelWordTypos.setVisible(false);
                            }
                        });
                    }
                    else {
                        SwingUtilities.invokeLater(new Runnable() {
                            @Override
                            public void run() {
                                labelWordTypos.setVisible(true);
                            }
                        });
                    }
                }
            }
        });
        buttonCancelTest.addActionListener(panelWorkingContent.getActionMap().get(ABORT_KEY));

        buttonToggleLanguage.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                if (Locale.ENGLISH.equals(Locale.getDefault())) {
                    Locale.setDefault(Locale.forLanguageTag("ru"));
                } else {
                    Locale.setDefault(Locale.ENGLISH);
                }
                ResourceBundle.clearCache();
                changeLocale();
            }
        });
    }

    void setMode(ApplicationMode p_mode) {
        mode = p_mode;
        CardLayout layoutOuter = (CardLayout) panelCardContent.getLayout();
        switch (p_mode) {
            case GREETING:
                initPicking();
                layoutOuter.show(panelCardContent, "cardInitial");
                break;
            case TESTING:
                initTest();
                adjustSplittersAuto();
                layoutOuter.show(panelCardContent, "cardWorking");
                textAreaTyping.requestFocus();
                break;
            case TURNAROUND:
                initPicking();
                initResults();
                layoutOuter.show(panelCardContent, "cardInitial");
        }
    }

    private void initTest() {
        // Determining the level
        final LeaderLevel lvl;
        if (radioLvlEasy.isSelected()) {
            lvl = LeaderLevel.NORM;
        } else {
            if (radioLvlMedium.isSelected()) {
                lvl = LeaderLevel.GOOD;
            } else {
                lvl = LeaderLevel.PROFI;
            }
        }

        // Clear the typed text
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                textAreaTyping.setText("");
            }
        });

        // Create the test controller and bind to the current view
        String sampleText = textRepository.getTexts().get(textIndex).text.trim();
        testController = new TypingTestController(sampleText, this, lvl); // Ok with ref escape,
                                                                          // we don't call back
                                                                          // right away
        setSampleText(sampleText);

        // The text analyzer start
        new SwingWorker() {
            // On the worker thread
            @Override
            protected Object doInBackground() throws Exception {
                // Spin until the exit command received
                boolean isComplete = false;
                while (!isComplete) {
                    Thread.sleep(500); // 0.5 seconds
                    isComplete = testController != null && testController.updateStats();
                }
                return null;
            }

            // On the EDT when the primary process finishes
            @Override
            protected void done() {
                setMode(ApplicationMode.TURNAROUND);
            }
        }.execute();

        // Associate the typing text editor with the controller
        ((AbstractDocument) textAreaTyping.getDocument()).setDocumentFilter(new DocumentFilter() {
            @Override
            public void remove(FilterBypass fb, int offset, int length) throws
                    BadLocationException {
                if (testController != null) {
                    if (length > 0) {
                        testController.addRemoveEvent(offset, length);
                    }
                }
                super.remove(fb, offset, length);
            }

            @Override
            public void insertString(FilterBypass fb, int offset, String string,
                                     AttributeSet attr) throws BadLocationException {
                if (testController != null) {
                    if (string.length() > 0) {
                        testController.addInsertEvent(offset, string);
                    }
                }
                super.insertString(fb, offset, string, attr);
            }

            @Override
            public void replace(FilterBypass fb, int offset, int length, String text,
                                AttributeSet attrs) throws BadLocationException {
                if (testController != null) {
                    if (length > 0) {
                        testController.addRemoveEvent(offset, length);
                    }
                    if (text.length() > 0) {
                        testController.addInsertEvent(offset, text);
                    }
                }
                super.replace(fb, offset, length, text, attrs);
            }
        });
    }

    private void initPicking() {
        setStatusLine("");
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                textAreaInfo.setText(I18nHelper.message("rules"));
            }
        });

        DefaultListModel<String> listModel = new DefaultListModel<String>();
        Map<Integer, ITextRepository.HeaderAndText> textMap = textRepository.getTexts();
        for (int i = 0; i < textMap.size(); i++) {
            int charLength = textMap.get(i).text.length();
            listModel.add(i, textMap.get(i).header + " (" + charLength + I18nHelper.message("word.characters"));
        }
        selectorList.setModel(listModel);
        selectorList.requestFocus();
    }

    private void initResults() {
        setStatusLine("");
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                textAreaInfo.setText(testController.formatFinalResult());
            }
        });
    }

    /* View update methods */

    private void adjustSplittersAuto() {
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                splitterInitial.setDividerLocation(220);
                splitterWorking.setDividerLocation(0.5);
            }
        });
    }

    void fireTimer() {
        if (mode == ApplicationMode.TESTING) {
            if (testController != null) {
                testController.markTimeAndUpdateLeader();
            }
        }
    }

    void setStatusLine(final String p_DisplayText) {
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                labelStatus.setText(p_DisplayText);
            }
        });
    }

    void setLeaderProgress(final int p_progressPct) {
        if (mode == ApplicationMode.TESTING) {
            SwingUtilities.invokeLater(new Runnable() {
                @Override
                public void run() {
                    progressBarLeader.setValue(p_progressPct);
                }
            });
        }
    }

    void setTime(final String p_timeString) {
        if (mode == ApplicationMode.TESTING) {
            SwingUtilities.invokeLater(new Runnable() {
                @Override
                public void run() {
                    labelTimePassed.setText(p_timeString);
                }
            });
        }
    }

    void setOwnProgress(final int p_progressPct) {
        if (mode == ApplicationMode.TESTING) {
            SwingUtilities.invokeLater(new Runnable() {
                @Override
                public void run() {
                    progressBarYou.setValue(p_progressPct);
                }
            });
        }
    }

    void setCharsTyped(final int p_typedChars) {
        if (mode == ApplicationMode.TESTING) {
            SwingUtilities.invokeLater(new Runnable() {
                @Override
                public void run() {
                    labelCharsTyped.setText(String.valueOf(p_typedChars));
                }
            });
        }
    }

    void setWordsTyped(final int p_typedWords) {
        if (mode == ApplicationMode.TESTING) {
            SwingUtilities.invokeLater(new Runnable() {
                @Override
                public void run() {
                    labelWordsTyped.setText(String.valueOf(p_typedWords));
                }
            });
        }
    }

    void setCharsMisTyped(final int p_mistypedChars) {
        if (mode == ApplicationMode.TESTING) {
            SwingUtilities.invokeLater(new Runnable() {
                @Override
                public void run() {
                    labelCharTypos.setText(String.valueOf(p_mistypedChars));
                }
            });
        }
    }

    void setWordsMisTyped(final int p_mistypedWords) {
        if (mode == ApplicationMode.TESTING) {
            SwingUtilities.invokeLater(new Runnable() {
                @Override
                public void run() {
                    labelWordTypos.setText(String.valueOf(p_mistypedWords));
                }
            });
        }
    }

    void setSampleAreaHighlight(final int p_offset, final int p_length) {
        if (mode == ApplicationMode.TESTING) {
            SwingUtilities.invokeLater(new Runnable() {
                @Override
                public void run() {
                    // Set highlight
                    Highlighter highlighter = textAreaExampleText.getHighlighter();
                    if (highlighter == null) {
                        highlighter = new DefaultHighlighter();
                        textAreaExampleText.setHighlighter(highlighter);
                    }
                    highlighter.removeAllHighlights();
                    if (p_length > 0) {
                        try {
                            highlighter.addHighlight(p_offset, p_offset + p_length, HPTR_BLUE);
                        } catch (BadLocationException e) {
                            setStatusLine(I18nHelper.message("error.highlight.0") + p_offset + I18nHelper.message("error.highlight.1") + p_length);
                        }
                    }
                    // Ensure the highlighted area is in the view
                    try {
                        Rectangle highlightedRect = textAreaExampleText.modelToView(p_offset + p_length);
                        textAreaExampleText.revalidate();
                        scrollPaneExample.revalidate();
                        JViewport vp = scrollPaneExample.getViewport();
                        Point viewPosition = vp.getViewPosition();
                        Dimension viewSize = vp.getExtentSize();
                        Point upperLeft = highlightedRect.getLocation();
                        Point lowerRight = new Point(highlightedRect.x + highlightedRect.width, highlightedRect.y + highlightedRect.height);
                        if (viewPosition.y > upperLeft.y) { // Scroll up?
                            vp.setViewPosition(upperLeft);
                        } else {
                            if (viewPosition.y + viewSize.height < lowerRight.y) {
                                vp.setViewPosition(lowerRight);
                            }
                        }
                    } catch (BadLocationException e) {
                        setStatusLine(I18nHelper.message("error.scroll.0") + p_offset + I18nHelper.message("error.scroll.1") + p_length);
                    }

                }
            });
        }
    }

    void setSampleText(final String p_sampleText) {
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                textAreaExampleText.setText(p_sampleText);
            }
        });
    }

    void pauseTest() {
        if (testController != null) {
            testController.pause();
        }
    }

    void resumeTest() {
        if (testController != null) {
            testController.resume();
        }
    }

    void changeLocale() {
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                labelPromptNext.setText(I18nHelper.message("labelPromptNext.text"));
            }
        });
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                buttonGo.setText(I18nHelper.message("buttonGo.text"));
            }
        });
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                radioLvlHard.setText(I18nHelper.message("radioLvlHard.text"));
            }
        });
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                labelPickLvl.setText(I18nHelper.message("label.pick-lvl.text"));
            }
        });
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                radioLvlEasy.setText(I18nHelper.message("radioLvlEasy.text"));
            }
        });
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                radioLvlMedium.setText(I18nHelper.message("radioLvlMedium.text"));
            }
        });
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                labelYou.setText(I18nHelper.message("labelYou.text"));
            }
        });
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                labelLeader.setText(I18nHelper.message("labelLeader.text"));
            }
        });
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                labelHeaderTime.setText(I18nHelper.message("labelTime.text"));
            }
        });
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                labelHeaderCharsTyped.setText(I18nHelper.message("labelCharsTyped.text"));
            }
        });
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                labelHeaderWordsTyped.setText(I18nHelper.message("labelWordsTyped.text"));
            }
        });
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                labelHeaderCharTypos.setText(I18nHelper.message("labelCharTypos.text"));
            }
        });
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                labelHeaderWordTypos.setText(I18nHelper.message("labelWordTypos.text"));
            }
        });
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                buttonCancelTest.setText(I18nHelper.message("buttonCancelTest.text"));
            }
        });
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                labelHeader.setText(I18nHelper.message("labelHeader.text"));
            }
        });
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                buttonToggleLanguage.setText(I18nHelper.message("buttonToggleLanguage.text"));
            }
        });
        setStatusLine("");
        switch (mode) {
            case GREETING:
                initPicking();
                break;
            case TESTING:
                SwingUtilities.invokeLater(new Runnable() {
                    @Override
                    public void run() {
                        textAreaInfo.setText(I18nHelper.message("rules"));
                    }
                });
                break;
            case TURNAROUND:
                SwingUtilities.invokeLater(new Runnable() {
                    @Override
                    public void run() {
                        textAreaInfo.setText(testController.formatFinalResult());
                    }
                });
        }
    }
}

