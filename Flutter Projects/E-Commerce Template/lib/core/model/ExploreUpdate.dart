class ExploreUpdate {
  String logoUrl;
  String image;
  String storeName;
  String caption;

  ExploreUpdate({
    this.logoUrl,
    this.storeName,
    this.caption,
    this.image,
  });

  factory ExploreUpdate.fromJson(Map<String, dynamic> json) {
    return ExploreUpdate(
      logoUrl: json['logo_url'],
      image: json['image'],
      storeName: json['store_name'],
      caption: json['caption'],
    );
  }
}
