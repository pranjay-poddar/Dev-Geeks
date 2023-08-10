import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.Clip;
import javax.sound.sampled.LineUnavailableException;
import javax.sound.sampled.UnsupportedAudioFileException;
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
import java.io.IOException;



public class PianoApp extends JFrame {

    private static final int NUM_KEYS = 14;
    private static final String[] SOUND_FILES = {
        "C3.wav", "D3.wav", "E3.wav", "F3.wav", "G3.wav", "A3.wav", "B3.wav",
        "C4.wav", "D4.wav", "E4.wav", "F4.wav", "G4.wav", "A4.wav", "B4.wav"
    };
    
    private JButton[] pianoKeys;
    private ImageIcon[] keyImages;
    private JButton currentKey;

    public PianoApp() {
        setTitle("Simple Piano");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setResizable(false);

        // Load piano key images
        keyImages = new ImageIcon[NUM_KEYS];
        for (int i = 0; i < NUM_KEYS; i++) {
            keyImages[i] = new ImageIcon("key_" + i + ".png"); // Replace with your own images
        }

        // Create piano keys
        pianoKeys = new JButton[NUM_KEYS];
        for (int i = 0; i < NUM_KEYS; i++) {
            final int keyIndex = i;
            pianoKeys[i] = new JButton(keyImages[i]);
            // Adjust the button size here (width and height)
            pianoKeys[i].setPreferredSize(new Dimension(80, 160));
            pianoKeys[i].addActionListener(new ActionListener() {
                @Override
                public void actionPerformed(ActionEvent e) {
                    playSound(SOUND_FILES[keyIndex]);
                    if (currentKey != null) {
                        currentKey.setIcon(keyImages[currentKey == pianoKeys[keyIndex] ? keyIndex : keyIndex + NUM_KEYS / 2]);
                    }
                    currentKey = pianoKeys[keyIndex];
                }
            });
        }

// ...


        // Layout piano keys on the frame
        JPanel pianoPanel = new JPanel(new GridLayout(1, NUM_KEYS));
        for (int i = 0; i < NUM_KEYS; i++) {
            pianoPanel.add(pianoKeys[i]);
        }

        // Add piano panel to the frame
        add(pianoPanel);

        pack();
        setLocationRelativeTo(null);
    }

    

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            PianoApp pianoApp = new PianoApp();
            pianoApp.setVisible(true);
        });
    }
    private void playSound(String soundFile) {
    try {
        File file = new File(soundFile);
        if (file.exists()) {
            Clip clip = AudioSystem.getClip();
            clip.open(AudioSystem.getAudioInputStream(file));
            clip.start();
        } else {
            System.err.println("Sound file not found: " + soundFile);
        }
    } catch (IOException | LineUnavailableException | UnsupportedAudioFileException e) {
        e.printStackTrace();
    }
    }
}
