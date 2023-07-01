class CardModel {
  
  final int id;
  final String name;
  final String bankName;
  final String number;
  final String currency;

  final int available;

  CardModel({this.id, this.name, this.bankName, this.number, this.currency, this.available});

  Map toJson() => {
    'id': id,
    'name': name,
    'bankName': bankName,
    'number': number,
    'currency': currency,
    'available': available
  };

  CardModel.fromJson(Map json) :
  id = json['id'],
  name = json['name'],
  bankName = json['bankName'],
  number = json['number'],
  currency = json['currency'],
  available = json['available'];
  
}
