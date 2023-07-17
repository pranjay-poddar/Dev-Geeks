import 'package:marketky/core/model/Search.dart';

class SearchService {
  static List<SearchHistory> listSearchHistory = listSearchHistoryRawData.map((data) => SearchHistory.fromJson(data)).toList();
  static List<PopularSearch> listPopularSearch = listPopularSearchRawData.map((data) => PopularSearch.fromJson(data)).toList();
}

var listSearchHistoryRawData = [
  {'title': 'Nike Air Jordan'},
  {'title': 'Adidas Alphabounce'},
  {'title': 'Curry 5'},
  {'title': 'Jordan BRED'},
  {'title': 'Heiden Heritage Xylo'},
  {'title': 'Ventela Public'},
];

var listPopularSearchRawData = [
  {
    'title': 'Heiden Heritage',
    'image_url': 'assets/images/search/popularsearchitem8.jpg',
  },
  {
    'title': 'Tech Wear',
    'image_url': 'assets/images/search/popularsearchitem4.jpg',
  },
  {
    'title': 'Local Brand',
    'image_url': 'assets/images/search/popularsearchitem7.jpg',
  },
  {
    'title': 'Flannel Hoodie',
    'image_url': 'assets/images/search/popularsearchitem3.jpg',
  },
  {
    'title': 'Sport Shoes',
    'image_url': 'assets/images/search/popularsearchitem6.jpg',
  },
  {
    'title': 'Black Tshirt',
    'image_url': 'assets/images/search/popularsearchitem2.jpg',
  },
  {
    'title': 'Sport Wear',
    'image_url': 'assets/images/search/popularsearchitem5.jpg',
  },
  {
    'title': 'Oversized Tshirt',
    'image_url': 'assets/images/search/popularsearchitem1.jpg',
  },
];
