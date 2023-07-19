import requests
import json
import os

url = "https://youtube138.p.rapidapi.com/channel/videos/"
headers = {
	"X-RapidAPI-Key": str(os.environ['X-RapidAPI-Key']),
	"X-RapidAPI-Host": str(os.environ['X-RapidAPI-Host'])
}

def youtube_data(id):
    querystring = {"id":id,"hl":"en","gl":"US"}
    response = requests.request("GET", url, headers=headers, params=querystring)

    data_text = response.text
    data = json.loads(data_text)

    contents = data["contents"]

    videos = []

    for i in contents:
        video = []
        # title, thumbnail, duration, views, vid_code, time_text, moving_thumbnail, live_now
        title = i["video"]["title"]
        video.append(title)

        thumbnail = i["video"]["thumbnails"][-1]["url"]
        video.append(thumbnail)

        duration = i["video"]["lengthSeconds"]
        video.append(duration)

        if duration == "null":
            duration = "none"
        else:
            pass

        views = i["video"]["stats"]["views"]
        video.append(views)

        vid_code = i["video"]["videoId"]
        video.append(vid_code)

        time_text = i["video"]["publishedTimeText"]
        video.append(time_text)

        if time_text == "null":
            time_text = "none"
        else:
            pass

        try:
            moving_thumbnail = i["video"]["movingThumbnails"][0]["url"]
        except:
            moving_thumbnail = ""
        video.append(moving_thumbnail)

        live_now = i["video"]["isLiveNow"]
        video.append(live_now)

        videos.append(video)

    return videos