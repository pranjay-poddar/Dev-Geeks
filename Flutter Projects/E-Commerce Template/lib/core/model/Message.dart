class Message {
  final bool isReaded;
  final String shopName;
  final String message;
  final String shopLogoUrl;

  Message({
    this.isReaded,
    this.shopLogoUrl,
    this.message,
    this.shopName,
  });

  factory Message.fromJson(Map<String, dynamic> json) {
    return Message(
      isReaded: json['is_readed'],
      shopLogoUrl: json['shop_logo_url'],
      message: json['message'],
      shopName: json['shop_name'],
    );
  }
}
