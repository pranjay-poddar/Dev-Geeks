class SearchHistory {
  String title;

  SearchHistory({this.title});

  factory SearchHistory.fromJson(Map<String, dynamic> json) {
    return SearchHistory(title: json['title']);
  }
}

class PopularSearch {
  String title;
  String imageUrl;

  PopularSearch({this.title, this.imageUrl});

  factory PopularSearch.fromJson(Map<String, dynamic> json) {
    return PopularSearch(title: json['title'], imageUrl: json['image_url']);
  }
}
