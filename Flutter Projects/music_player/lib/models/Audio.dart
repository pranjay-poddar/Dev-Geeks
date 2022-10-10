import 'package:flutter/material.dart';
import 'package:audioplayers/audioplayers.dart';
import 'Sounds.dart';

class Audio extends ChangeNotifier {
  final audioPlayer = AudioPlayer();
  bool isPlaying = false;
  Duration duration = Duration.zero;
  Duration position = Duration.zero;
  int index = 0;

  Audio() {
    initAudio();
  }

  void initAudio() {
    setAudio();

    // playing, paused, stopped
    audioPlayer.onPlayerStateChanged.listen((state) {
      isPlaying = state == PlayerState.playing;
      notifyListeners();
    });

    // handle duration state
    audioPlayer.onDurationChanged.listen((newDuration) {
      duration = newDuration;
      notifyListeners();
    });

    // audio position
    audioPlayer.onPositionChanged.listen((newPosition) {
      position = newPosition;
      notifyListeners();
    });

    audioPlayer.onPlayerComplete.listen((value) {
      setNextIndex();
      notifyListeners();
    });
  }

  void dispose() {
    audioPlayer.stop();
    audioPlayer.dispose();
    super.dispose();
  }

  Future setAudio() async {
    // final player = AudioCache(prefix: 'assets/sounds/');
    // final url = await player.load('white-noise.mp3');
    // audioPlayer.setSourceUrl(url.path);
    // String url = 'https://drive.google.com/file/d/1ecPcSAjlFYRk72Gx-xDrKNuwf2lXkt80/view?usp=sharing';
    // print(index);
    // printIndex(index);
    audioPlayer.setSourceUrl('${sounds[0]['soundUrl']}');
    //notifyListeners();
  }

  playAudio() {
    audioPlayer.resume();
  }

  pauseAudio() {
    audioPlayer.pause();
  }

  setNextIndex() {
    Duration start = Duration(hours: 0, minutes: 0, seconds: 0);
    index = (index + 1) % 3;
    pauseAudio();
    audioPlayer.setSourceUrl('${sounds[index]['soundUrl']}');
    audioPlayer.seek(start);
    notifyListeners();
  }

  setPrevIndex() {
    Duration start = Duration(hours: 0, minutes: 0, seconds: 0);
    if (index == 0) {
      index = 2;
    } else {
      index = (index - 1);
    }
    pauseAudio();
    audioPlayer.setSourceUrl('${sounds[index]['soundUrl']}');
    audioPlayer.seek(start);
    notifyListeners();
  }
}