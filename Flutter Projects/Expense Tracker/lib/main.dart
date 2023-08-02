import 'package:expense_tracker/screens/home.dart';
import 'package:flutter/material.dart';

import 'package:sizer/sizer.dart';

var kColorScheme = ColorScheme.fromSeed(
  seedColor: Color.fromARGB(255, 96, 59, 181),
);

var kDarkColorScheme = ColorScheme.fromSeed(
  seedColor: const Color.fromARGB(255, 5, 99, 125),
  brightness: Brightness.dark,
);

void main() {
  // WidgetsFlutterBinding.ensureInitialized();
  // SystemChrome.setPreferredOrientations([
  //   DeviceOrientation.portraitUp,
  // ]);
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  Widget build(BuildContext context) {
    return Sizer(
      builder: (buildContext, orientation, deviceType) {
        return MaterialApp(
          darkTheme: ThemeData.dark().copyWith(
            useMaterial3: true,
            colorScheme: kDarkColorScheme,
            cardTheme: CardTheme(
              color: kDarkColorScheme.secondaryContainer,
              margin: EdgeInsets.symmetric(
                horizontal: 4.w,
                vertical: 1.h,
              ),
            ),
            elevatedButtonTheme: ElevatedButtonThemeData(
              style: ElevatedButton.styleFrom(
                backgroundColor: kDarkColorScheme.primaryContainer,
                foregroundColor: kDarkColorScheme.onPrimaryContainer,
              ),
            ),
          ),
          theme: ThemeData().copyWith(
            useMaterial3: true,
            colorScheme: kColorScheme,
            appBarTheme: AppBarTheme(
              backgroundColor: kColorScheme.onPrimaryContainer,
              foregroundColor: kColorScheme.primaryContainer,
            ),
            cardTheme: CardTheme(
              color: kColorScheme.secondaryContainer,
              margin: EdgeInsets.symmetric(
                horizontal: 4.w,
                vertical: 1.h,
              ),
              elevation: 1.5,
              shadowColor: Colors.grey,
            ),
            elevatedButtonTheme: ElevatedButtonThemeData(
              style: ElevatedButton.styleFrom(
                backgroundColor: kColorScheme.primaryContainer,
              ),
            ),
            textTheme: ThemeData().textTheme.copyWith(
                  titleLarge: TextStyle(
                    fontWeight: FontWeight.w600,
                    color: kColorScheme.onSecondaryContainer,
                    fontSize: 14.sp,
                  ),
                ),
          ),
          debugShowCheckedModeBanner: false,
          // themeMode: ThemeMode.system, :- Default Theme mode.
          home: Home(),
        );
      },
    );
  }
}
