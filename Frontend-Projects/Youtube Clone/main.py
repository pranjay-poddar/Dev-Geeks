from yt import youtube_data
from flask import Flask, render_template
from numerize.numerize import numerize
import random

app = Flask(__name__, template_folder='static')

Yt_Ids = [ #channel name   #channel id                 #channel logo url
         ["CodeWithHarry", "UCeVMnSShP_Iviwkknt83cww", "https://yt3.ggpht.com/ytc/AMLnZu8dZQJYCt6Ffcd-pl113huuo_HJ3PpvgkyFk5FkrQ=s176-c-k-c0x00ffffff-no-rj"],
         ["Apna College", "UCBwmMxybNva6P_5VmxjzwqA", "https://yt3.ggpht.com/O12gYmCwBASezJpxddXOj1PEirMgxCGX2gOiJ3plomaK4E0K1hr_iobbQEWz1e4QVMflTmug=s176-c-k-c0x00ffffff-no-rj-mo"], 
         ["College Wallah", "UCDrf0V4fcBr5FlCtKwvpfwA", "https://yt3.googleusercontent.com/RyeP9L6S_rfuxMCcs9OnWaODqDpgSi9NyzQTtT_aSXIvdoe1jBuVr7kPBvsZJB6T3EEKQWlTnw=s176-c-k-c0x00ffffff-no-rj"], 
         ["Clever Programmer", "UCqrILQNl5Ed9Dz6CGMyvMTQ", "https://yt3.ggpht.com/ytc/AMLnZu_GS4vuibuZjr4ZBgVr97RrriUQrrhqeyWQWqMYfQ=s176-c-k-c0x00ffffff-no-rj-mo"],
         ["edureka!", "UCkw4JCwteGrDHIsyIIKo4tQ", "https://yt3.ggpht.com/OtB--dcR_oNUZUaUsuyk2ShT5nFYjEcj9Yxx50-Nner03vXKt4IWXtP--JrnSGQbwRSHYuVb38g=s176-c-k-c0x00ffffff-no-rj"],
         ["Simplilearn", "UCsvqVGtbbyHaMoevxPAq9Fg", "https://yt3.ggpht.com/ytc/AMLnZu9vk_jSZZqpKOw6TohZDkc4e2ekKVYPlcioQjttfQ=s176-c-k-c0x00ffffff-no-rj"]
         ]



@app.route('/')
def hello():
    id_lst = random.choice(Yt_Ids)
    videos = youtube_data(id_lst[1])
    return render_template("home.html", videos = videos, channel_name = id_lst[0], channel_logo = id_lst[2] )

@app.route('/keep_alive')
def alive():
  return "I am Alive"

@app.template_filter()
def display_views(views):
    return numerize(views,1)

@app.template_filter()
def minute(duration):
    try:
        return duration//60
    except:
        return "none"

@app.template_filter()
def second(duration):
    try:
        return duration%60
    except:
        return "none"
        

app.run(host="0.0.0.0", port=5500)