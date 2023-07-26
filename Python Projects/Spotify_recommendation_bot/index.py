import telebot
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import base64
import requests
import json
# Telegram Bot API Token
TELEGRAM_TOKEN = 'Your Telegram Bot API Token'

# Spotify API Credentials
SPOTIFY_CLIENT_ID = 'Your Spotify Client ID'
SPOTIFY_CLIENT_SECRET = 'Your Spotify Client Secret'


# Initialize Telegram Bot
bot = telebot.TeleBot(TELEGRAM_TOKEN)

# Initialize Spotify Client
spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id=SPOTIFY_CLIENT_ID,
                                                                            client_secret=SPOTIFY_CLIENT_SECRET))

def get_token():
    auth_string=SPOTIFY_CLIENT_ID+":"+SPOTIFY_CLIENT_SECRET
    auth_bytes=auth_string.encode('utf-8')
    auth_base64=str(base64.b64encode(auth_bytes),'utf-8')
    url=" https://accounts.spotify.com/api/token"
    headers={"Authorization":"Basic "+auth_base64,
            "Content-Type":"application/x-www-form-urlencoded"
            }
    data={"grant_type":"client_credentials"}
    result=requests.post(url,headers=headers,data=data)
    json_result=json.loads(result.content)
    token=json_result["access_token"]
    
    return token

    
    
    
@bot.message_handler(commands=['start'])
def start(message):
    bot.send_message(chat_id=message.chat.id, text='Hello there! This is a spotify bot that recommends songs based on your input.\n\n.To start, type /recommend followed by the name of a song.\n\nFor example: /recommend O re Piya\n\n Made with ❤️ by @alwenarvind19')


@bot.message_handler(commands=['recommend'])
def recommend_songs(message):
    # Get the list of songs from the user's message
    print(get_token())
    song_list = message.text.split()[1:]

    # Check if the user provided any songs
    if not song_list:
        bot.send_message(chat_id=message.chat.id, text='Please provide at least one song.')
        return

    recommended_songs = []

    # Iterate over the given songs and retrieve recommendations from Spotify
    for song in song_list:
        # Search for the given song on Spotify
        results = spotify.search(q='track:' + song, type='track', limit=1)

        if results['tracks']['items']:
            track_id = results['tracks']['items'][0]['id']

            # Get track recommendations based on the given song
            recommendations = spotify.recommendations(seed_tracks=[track_id], limit=5)

            # Extract the names of the recommended songs
            recommended_songs.extend([track['name'] for track in recommendations['tracks']])

    # Send the recommended songs as a message
    if recommended_songs:
        bot.send_message(chat_id=message.chat.id, text='Recommended songs:\n\n' + '\n'.join(recommended_songs))
    else:
        bot.send_message(chat_id=message.chat.id, text='No recommendations found.')

@bot.message_handler(commands=['topsongs'])
def top_songs(message):
    # Get the user's authorization token
    token=get_token()
    spotify_auth = spotipy.Spotify(auth=token)
    
    try:
        # Get the user's top tracks from Spotify
        top_tracks = spotify_auth.current_user_top_tracks(limit=5, time_range='short_term')

        # Extract the names of the top tracks
        top_track_names = [track['name'] for track in top_tracks['items']]

        # Send the user's top songs as a message
        if top_track_names:
            bot.send_message(chat_id=message.chat.id, text='Your top songs:\n\n' + '\n'.join(top_track_names))
        else:
            bot.send_message(chat_id=message.chat.id, text='No top songs found.')
    except spotipy.SpotifyException as e:
        bot.send_message(chat_id=message.chat.id, text='Failed to retrieve top songs. Please check your authorization token.')



@bot.message_handler(commands=['suggest'])
def suggest_songs(message):
    # Get the mood from the user's message
    mood = message.text.split()[1]

    # Suggest songs based on mood
    suggested_songs = suggest_songs_by_mood(mood)

    # Send the suggested songs as a message
    if suggested_songs:
        bot.send_message(chat_id=message.chat.id, text='Suggested songs for ' + mood + ':\n\n' + '\n'.join(suggested_songs))
    else:
        bot.send_message(chat_id=message.chat.id, text='No songs found for ' + mood)


def suggest_songs_by_mood(mood):
    # Map mood keywords to Spotify genre or playlist
    mood_map = {
        'happy': 'happy',
        'sad': 'sad',
        'energetic': 'workout',
        'chill': 'chill'
        # Add more mood-keyword to genre/playlist mappings as needed
    }

    # Search for the mood playlist on Spotify
    if mood.lower() in mood_map:
        search_query = 'playlist:' + mood_map[mood.lower()]  # Use 'genre:' for genres, 'playlist:' for playlists
        results = spotify.search(q=search_query, type='playlist', limit=1)
        if results['playlists']['items']:
            playlist_id = results['playlists']['items'][0]['id']

            # Get the tracks from the playlist
            playlist_tracks = spotify.playlist_tracks(playlist_id=playlist_id, limit=5)
            track_names = [track['track']['name'] for track in playlist_tracks['items']]
            return track_names
    return []



bot.polling()