import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '/models/Audio.dart';

class PlayerControls extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          // CircleAvatar(
          //   child: IconButton(
          //     icon: Icon(
          //       Icons.repeat_rounded,
          //     ),
          //     onPressed: () {
          //
          //     },
          //   ),
          // ),
          Consumer<Audio>(
            builder: (_, myAudioModel, child) =>
                CircleAvatar(
                  child: IconButton(
                    icon: Icon(
                      Icons.skip_previous_rounded,
                    ),
                    onPressed: () {
                      myAudioModel.setPrevIndex();
                    },
                    color: Color(0xFFf1fbfe),

                  ),
                  backgroundColor: Color(0xff121547),
                ),
          ),
          PlayControl(),
          Consumer<Audio>(
            builder: (_, myAudioModel, child) =>
                CircleAvatar(
                  child: IconButton(
                    icon: Icon(
                      Icons.skip_next_rounded,
                    ),
                    onPressed: () {
                      myAudioModel.setNextIndex();
                    },
                    color: Color(0xFFf1fbfe),
                  ),
                  backgroundColor: Color(0xff121547),
                ),
          ),
          // CircleAvatar(
          //   child: IconButton(
          //     icon: Icon(
          //       Icons.shuffle_rounded,
          //     ),
          //     onPressed: () {
          //
          //     },
          //   ),
          // ),
        ],
      ),
    );
  }
}

class PlayControl extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return Consumer<Audio>(
      builder: (_, myAudioModel, child) =>
          CircleAvatar(
            radius: 35.0,
            child: IconButton(
            icon: Icon(
                myAudioModel.isPlaying ? Icons.pause_rounded : Icons.play_arrow_rounded,
                color: Colors.white,
              ),
              iconSize: 50.0,
              onPressed: () async {
                if (myAudioModel.isPlaying) {
                  await myAudioModel.audioPlayer.pause();
                }
                else {
                  // await audioPlayer.play(url);
                  await myAudioModel.audioPlayer.resume();
                }
              },
            ),
            backgroundColor: Color(0xff121547),
          ),
    );
  }
}

