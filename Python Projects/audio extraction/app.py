#pip install moviepy

import moviepy.editor


input_video="input_video.mp4"

file=moviepy.editor.VideoFileClip(input_video)

audio_file=file.audio

audio_file.write_audiofile("output_audio.mp3")

print("Succesfully extracted audio")
