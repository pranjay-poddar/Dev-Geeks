import 'package:flutter/material.dart';
import 'package:flutter_icons/flutter_icons.dart';
import 'package:slack_clone_app_ui/config/palette.dart';
import 'package:slack_clone_app_ui/models/screen.dart';
import 'package:slack_clone_app_ui/screens/home_screen.dart';

class NavigationScreen extends StatefulWidget {
  @override
  _NavigationScreenState createState() => _NavigationScreenState();
}

class _NavigationScreenState extends State<NavigationScreen> {
  int selectedIndex = 0;
  List<Screen> screens = [
    Screen(
        screenName: 'Team11',
        screenUI: HomeScreen(),
        icon: FlutterIcons.home_ent,
        iconName: 'Home'),
    Screen(
        screenName: 'Direct messages',
        screenUI: Container(
          color: Colors.yellow,
        ),
        icon: FlutterIcons.chat_bubble_outline_mdi,
        iconName: 'DMs'),
    Screen(
        screenName: 'Mentions & reactions',
        screenUI: Container(color: Colors.blue),
        icon: FlutterIcons.email_ent,
        iconName: 'Mentions'),
    Screen(
        screenName: 'You',
        screenUI: Container(color: Colors.green),
        icon: FlutterIcons.face_mdi,
        iconName: 'You'),
  ];

  void _onTap(int index) {
    print('index: $index');
    setState(() {
      selectedIndex = index;
      print('selectedIndex: $selectedIndex');
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(47),
        child: AppBar(
          backgroundColor: Palette.appbar,
          title: Text(
            screens[selectedIndex].screenName,
            style: TextStyle(
                fontSize: 18, fontWeight: FontWeight.bold, letterSpacing: -0.3),
          ),
          actions: [
            IconButton(
              padding: EdgeInsets.only(right: 10),
              icon: Icon(
                FlutterIcons.search1_ant,
                size: 20,
                color: Colors.white,
              ),
              onPressed: () => print('search'),
            )
          ],
          elevation: 0,
        ),
      ),
      body: screens[selectedIndex].screenUI,
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          border: Border(
            top: BorderSide(color: Colors.grey[300]),
          ),
        ),
        child: BottomNavigationBar(
          elevation: 0,
          items: screens
              .asMap()
              .map(
                (index, screen) => MapEntry(
                  index,
                  BottomNavigationBarItem(
                    icon: Padding(
                      padding: const EdgeInsets.only(bottom: 5),
                      child: Icon(screen.icon),
                    ),
                    title: Text(
                      screen.iconName,
                      style: TextStyle(fontSize: 12),
                    ),
                    backgroundColor: Colors.white,
                  ),
                ),
              )
              .values
              .toList(),
          type: BottomNavigationBarType.fixed,
          iconSize: 22,
          backgroundColor: Colors.white,
          selectedItemColor: Colors.black,
          unselectedItemColor: Colors.grey,
          showUnselectedLabels: true,
          currentIndex: selectedIndex,
          onTap: _onTap,
        ),
      ),
    );
  }
}
