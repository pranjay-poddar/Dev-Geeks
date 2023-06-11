# Melodify

## 🚀 Features

- Introducing our web music player built using ReactJS, the cutting-edge JavaScript library for building user interfaces. This modern and intuitive music player offers a seamless and immersive listening experience for music enthusiasts of all genres.

- The player's playback controls offer a range of options to enhance the listening experience. Users can easily play, pause, skip, or repeat tracks, adjust the volume, and access additional playback settings. 
- Furthermore, the player supports dynamic queue management, allowing users to create, edit, and reorder their personalized playlists effortlessly.

- To add new song use `email-admin@gmail.com` and `password: 12345678` and go to *https://melodify-y42f.onrender.com/admin*.
Now you can add new songs in Melodify!
![Admin Panel](https://i.imgur.com/ZYv7zNI.png)

## Preview

[Deployed Link](https://melodify-y42f.onrender.com/)

Deployed at [Render](https://render.com/).

- Login Page
![Login Page](https://i.imgur.com/PNAKovQ.png)

- Homescreen Page
![Homescreen Page](https://i.imgur.com/nQv7M8m.png)

- Admin Page
![Admin Page](https://i.imgur.com/lUFtlMA.png)

## 📥 Installation

Use these commands and follow mentioned steps to get your web app ready with installation.

- First Fork the main repo [pranjay-poddar/Dev-Geeks](https://github.com/pranjay-poddar/Dev-Geeks)

```bash
git clone https://github.com/<your-github-username>/Dev-Geeks.git
```

```bash
cd MERN/Melodify
npm install
```

```bash
cd client
npm install
```

After installations, make a file `.env` in root directory(for this project) and add some env variables there.

- First add `MONGO_URL` which is the mongodb database link.
  Visit [Mongo DB](https://www.mongodb.com/) and sign up for the free API Key. Then go back to your [Mongo DB](https://www.mongodb.com/) account and must create a database cluster as your server for this application. Here is a [guide](https://docs.mongodb.com/manual/tutorial/atlas-free-tier-setup/) on how to create
- Second one is `JWT_SECRET` The secret key is combined with the header and the payload to create a unique hash. You are only able to verify this hash if you have the secret key. You can use use your name as `SECRET_KEY`. Example:- `SECRET_KEY='ANURAGKUMARTHAKUR'`
- Third one is `CLOUDINARY_API_SECRET` and `CLOUDINARY_API_KEY` [This will guide you to generate both keys](https://www.contentstack.com/docs/developers/marketplace-apps/cloudinary/)


To run your app use these commands.

```bash
cd ..
node server.js
```
Open new window of your Terminal

```bash
cd client
npm start
```

## 🎁 Contributing

If you find bugs with this project, pull requests are always welcome. You can [create an issue here](https://github.com/pranjay-poddar/Dev-Geeks/issues/new).
Your :star: is also greatly appreciated.

Checkout other awesome projects on my GitHub : [ann29-tdk](https://github.com/ann29-tdk)