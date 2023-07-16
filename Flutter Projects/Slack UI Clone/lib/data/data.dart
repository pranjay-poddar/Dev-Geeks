import 'package:slack_clone_app_ui/config/constants.dart';
import 'package:slack_clone_app_ui/models/models.dart';

final List<Channel> channels = [
  Channel(name: 'announcement'),
  Channel(name: 'general'),
  Channel(name: 'tech-team', isPublic: false),
  Channel(name: 'design', isPublic: false),
  Channel(name: 'android-dev', isPublic: false),
  Channel(name: 'quarterly-planning'),
];

final List<User> users = [
  currentUser,
  User(
    name: 'Virat Kohli',
    imageUrl:
        'https://img2.pngio.com/virat-kohli-png-image-6-png-image-virat-kohli-png-350_509.png',
    isActive: true,
  ),
  User(
      name: 'Rohit Sharma',
      imageUrl:
          'https://www.cricdost.com/blog/wp-content/uploads/2019/01/rohit-sharma.png',
      isActive: false,
      status: Status.commuting),
  User(
      name: 'Jasprit Bumrah',
      imageUrl:
          'https://resources.pulse.icc-cricket.com/players/champions-trophy-2017/284/1124.png',
      isActive: false,
      status: Status.sick),
  User(
      name: 'Hardik Pandya',
      imageUrl:
          'https://toppng.com/public/uploads/preview/hardik-pandya-india-bcci-cricket-odi-icc-champions-hardik-pandya-11563176115osoe1y1o8g.png',
      isActive: false,
      status: Status.plannedLeave),
  User(
      name: 'Rishabh Pant',
      imageUrl: 'https://resources.pulse.icc-cricket.com/players/210/2972.png',
      isActive: true,
      status: Status.workingRemotely),
];

final User currentUser = User(
  name: 'Ravi Shastri',
  imageUrl:
      'https://www.theindianwire.com/wp-content/uploads/2017/07/Ravi-Shastri.jpg',
  isActive: true,
  status: Status.meeting,
);
