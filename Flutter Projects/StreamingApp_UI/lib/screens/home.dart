import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';
import 'package:flutter_streaming_ui/theme.dart';

class Home extends StatelessWidget {
  Home({Key? key}) : super(key: key);

  List categories = [
    "Action",
    "Drama",
    "Crime",
    "Thriller",
    "Isekai",
    "Adventure",
    "Comedy",
    "Sport"
  ];
  List videoTitle = [
    "One Piece",
    "Fairy Tail",
    "kemtsu no yaiba",
    "Code Geass"
  ];
  List images = ['1.png', '2.jpg', '3.jpg', '4.jpg'];

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      body: Container(
        width: size.width,
        height: size.height,
        color: Theme.of(context).backgroundColor,
        child: Padding(
          padding: const EdgeInsets.only(top: 20, left: 30),
          child: SafeArea(
              child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      padding: EdgeInsets.only(left: 15),
                      decoration: BoxDecoration(
                          color: CustomTheme.mPrimaryColor,
                          borderRadius: BorderRadius.circular(12)),
                      width: size.width * 0.65,
                      child: TextField(
                        style: TextStyle(color: Colors.white),
                        decoration: InputDecoration(
                            border: InputBorder.none,
                            focusedBorder: InputBorder.none,
                            enabledBorder: InputBorder.none,
                            errorBorder: InputBorder.none,
                            disabledBorder: InputBorder.none,
                            hintText: "Search anime",
                            hintStyle: TextStyle(color: Colors.white),
                            icon: Icon(
                              Icons.search,
                              color: Colors.white,
                            )),
                        enabled: true,
                      ),
                    ),
                    Container(
                      margin: EdgeInsets.only(right: 30),
                      height: size.height * 0.066,
                      width: size.height * 0.066,
                      decoration: BoxDecoration(
                          color: CustomTheme.mPrimaryColor,
                          borderRadius: BorderRadius.circular(12)),
                      child: Icon(
                        Icons.bookmark_border,
                        color: Colors.white,
                      ),
                    )
                  ],
                ),
                SizedBox(height: 10),
                Container(
                  // color: Colors.red,
                  width: size.width,
                  height: size.height * 0.045,
                  child: ListView.builder(
                      scrollDirection: Axis.horizontal,
                      itemCount: categories.length,
                      itemBuilder: (context, index) {
                        return Padding(
                          padding: const EdgeInsets.fromLTRB(0, 8, 16, 8),
                          child: Text(
                            categories[index],
                            style: Theme.of(context).textTheme.caption,
                          ),
                        );
                      }),
                ),
                SizedBox(height: 10),
                Text(
                  "Update",
                  style: Theme.of(context).textTheme.headline2,
                ),
                Container(
                  // color: Colors.red,
                  width: size.width,
                  height: size.height * 0.35,
                  child: ListView.builder(
                      scrollDirection: Axis.horizontal,
                      itemCount: videoTitle.length,
                      itemBuilder: (context, index) {
                        return Container(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Padding(
                                padding:
                                    const EdgeInsets.only(top: 15, bottom: 8),
                                child: Text(videoTitle[index],
                                    style:
                                        Theme.of(context).textTheme.headline3),
                              ),
                              Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(
                                    "Episode 2414",
                                    style:
                                        Theme.of(context).textTheme.headline4,
                                  ),
                                  SizedBox(
                                    width: size.width * 0.32,
                                  ),
                                  Text("Read on Manga",
                                      style:
                                          Theme.of(context).textTheme.headline4)
                                ],
                              ),
                              SizedBox(height: 15),
                              Container(
                                decoration: BoxDecoration(
                                    // color: Colors.white,
                                    borderRadius: BorderRadius.circular(12)),
                                margin: EdgeInsets.only(right: 15),
                                width: size.width * 0.855,
                                child: CustomVideoPlayer(),
                              ),
                            ],
                          ),
                        );
                      }),
                ),
                SizedBox(height: 10),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      "New release",
                      style: Theme.of(context).textTheme.headline2,
                    ),
                    Padding(
                      padding: const EdgeInsets.only(right: 30),
                      child: Text(
                        "see also",
                        style: Theme.of(context).textTheme.caption,
                      ),
                    )
                  ],
                ),
                SizedBox(
                  height: 10,
                ),
                Container(
                  width: size.width,
                  height: size.height * 0.25,
                  child: ListView.builder(
                      scrollDirection: Axis.horizontal,
                      itemCount: videoTitle.length,
                      itemBuilder: (context, index) {
                        return Padding(
                          padding: const EdgeInsets.only(right: 10),
                          child: Container(
                            decoration: BoxDecoration(
                                color: Colors.black38,
                                image: DecorationImage(
                                    colorFilter: new ColorFilter.mode(
                                        Colors.black.withOpacity(0.6),
                                        BlendMode.dstATop),
                                    fit: BoxFit.cover,
                                    image:
                                        AssetImage("images/${images[index]}")),
                                borderRadius: BorderRadius.circular(20)),
                            width: size.width * 0.4,
                            child: Column(
                                mainAxisAlignment: MainAxisAlignment.end,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Padding(
                                    padding: const EdgeInsets.only(left: 8),
                                    child: Text(
                                      videoTitle[index],
                                      style:
                                          Theme.of(context).textTheme.caption,
                                    ),
                                  ),
                                  Padding(
                                    padding: const EdgeInsets.all(8.0),
                                    child: Row(
                                      children: [
                                        Icon(
                                          Icons.star,
                                          color: Colors.yellow[700],
                                        ),
                                        Text(
                                          "(4.5)",
                                          style: TextStyle(color: Colors.white),
                                        ),
                                        SizedBox(
                                          width: 20,
                                        ),
                                        Icon(
                                          Icons.remove_red_eye,
                                          color: Colors.white,
                                        ),
                                        Text(
                                          "(4.5)",
                                          style: TextStyle(color: Colors.white),
                                        )
                                      ],
                                    ),
                                  )
                                ]),
                          ),
                        );
                      }),
                ),
                SizedBox(height: 10),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      "Popular Anime",
                      style: Theme.of(context).textTheme.headline2,
                    ),
                    Padding(
                      padding: const EdgeInsets.only(right: 30),
                      child: Text(
                        "see also",
                        style: Theme.of(context).textTheme.caption,
                      ),
                    )
                  ],
                ),
                SizedBox(
                  height: 10,
                ),
                Container(
                  width: size.width,
                  height: size.height * 0.1,
                  child: ListView.builder(
                      scrollDirection: Axis.horizontal,
                      itemCount: videoTitle.length,
                      itemBuilder: (context, index) {
                        return Padding(
                          padding: const EdgeInsets.only(right: 10),
                          child: Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Container(
                                  decoration: BoxDecoration(
                                      color: Colors.black38,
                                      image: DecorationImage(
                                          colorFilter: new ColorFilter.mode(
                                              Colors.black.withOpacity(0.6),
                                              BlendMode.dstATop),
                                          fit: BoxFit.cover,
                                          image: AssetImage(
                                              "images/${images[index]}")),
                                      borderRadius: BorderRadius.circular(20)),
                                  width: size.height * 0.1,
                                ),
                                Padding(
                                  padding:
                                      const EdgeInsets.only(left: 5, top: 15),
                                  child: Container(
                                      width: size.width * 0.4,
                                      child: Text(
                                        videoTitle[index],
                                        style:
                                            Theme.of(context).textTheme.caption,
                                      )),
                                )
                              ]),
                        );
                      }),
                ),
                SizedBox(
                  height: 50,
                )
              ],
            ),
          )),
        ),
      ),
      bottomNavigationBar: CustomBottomNavigation(size),
    );
  }
}

class CustomBottomNavigation extends StatelessWidget {
  Size size = new Size(100, 100);
  CustomBottomNavigation(this.size);
  @override
  Widget build(BuildContext context) {
    return Container(
      color: CustomTheme.mPrimaryColor,
      height: size.height * 0.07,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 30),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Container(
                decoration: BoxDecoration(
                  color: CustomTheme.mAccentColor,
                  borderRadius: BorderRadius.circular(15),
                ),
                padding: EdgeInsets.only(right: 13),
                child: Row(
                  children: [
                    IconButton(
                        onPressed: () {},
                        icon: Icon(
                          Icons.home_outlined,
                          color: CustomTheme.mPrimaryColor,
                          size: 28,
                        )),
                    Text("Home", style: Theme.of(context).textTheme.caption)
                  ],
                )),
            IconButton(
                onPressed: () {},
                icon: Icon(
                  Icons.play_arrow_outlined,
                  color: Colors.white,
                  size: 30,
                )),
            IconButton(
                onPressed: () {},
                icon: Icon(
                  Icons.notifications_outlined,
                  color: Colors.white,
                  size: 30,
                )),
            IconButton(
                onPressed: () {},
                icon: Icon(
                  Icons.settings_outlined,
                  color: Colors.white,
                  size: 30,
                )),
          ],
        ),
      ),
    );
  }
}

class CustomVideoPlayer extends StatefulWidget {
  const CustomVideoPlayer({Key? key}) : super(key: key);

  @override
  _VideoPlayerState createState() => _VideoPlayerState();
}

class _VideoPlayerState extends State<CustomVideoPlayer> {
  // final String url = "http://getvideo.watch/index.php?output=yt/M_OauHnAFc8/128%7e%7e1%7e%7eAttack_on_Titan_Season_4_Final_Season_-_Official_Trailer_uuid-60eae0c9314b6.mp4";
  late VideoPlayerController controller;
  @override
  void initState() {
    super.initState();
    controller = VideoPlayerController.asset('assets/video.mp4')
      ..addListener(() => setState(() {}))
      ..initialize().then((value) => controller.initialize());
  }

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return controller.value.isInitialized
        ? Container(
            decoration: BoxDecoration(borderRadius: BorderRadius.circular(20)),
            child: Stack(children: [
              AspectRatio(
                aspectRatio: 1 / 0.53,
                child: ClipRRect(
                    borderRadius: BorderRadius.circular(20),
                    child: VideoPlayer(controller)),
              ),
              Positioned.fill(
                  child: BasicOverlayWidget(controller: controller)),
            ]),
          )
        : Center(
            child: CircularProgressIndicator(
            backgroundColor: Theme.of(context).accentColor,
          ));
  }
}

class BasicOverlayWidget extends StatelessWidget {
  final VideoPlayerController controller;

  const BasicOverlayWidget({
    Key? key,
    required this.controller,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) => GestureDetector(
        behavior: HitTestBehavior.opaque,
        onTap: () =>
            controller.value.isPlaying ? controller.pause() : controller.play(),
        child: Stack(
          children: <Widget>[
            buildPlay(),
            Positioned(
              bottom: 0,
              left: 0,
              right: 0,
              child: buildIndicator(),
            ),
          ],
        ),
      );

  Widget buildIndicator() => Container(
        margin: EdgeInsets.symmetric(horizontal: 10),
        child: VideoProgressIndicator(
          controller,
          allowScrubbing: true,
        ),
      );

  Widget buildPlay() => controller.value.isPlaying
      ? Container()
      : Container(
          alignment: Alignment.center,
          color: Colors.black38,
          child: CircleAvatar(
              backgroundColor: CustomTheme.mPrimaryColor,
              child: Icon(Icons.play_arrow_rounded,
                  color: Colors.white, size: 30)),
        );
}
