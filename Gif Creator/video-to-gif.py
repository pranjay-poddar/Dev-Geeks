from moviepy.editor import *

from moviepy.editor import *
clip = (VideoFileClip("Gif-Creator/video.webm").subclip((2.25),(6.25))
        .resize(0.3))
clip.write_gif("output.gif")