import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:marketky/constant/app_color.dart';
import 'package:marketky/core/model/Product.dart';
import 'package:marketky/core/services/ProductService.dart';
import 'package:marketky/views/widgets/item_card.dart';

class SearchResultPage extends StatefulWidget {
  final String searchKeyword;
  SearchResultPage({@required this.searchKeyword});

  @override
  _SearchResultPageState createState() => _SearchResultPageState();
}

class _SearchResultPageState extends State<SearchResultPage> with TickerProviderStateMixin {
  TabController tabController;
  TextEditingController searchInputController = TextEditingController();
  List<Product> searchedProductData = ProductService.searchedProductData;
  @override
  void initState() {
    super.initState();
    searchInputController.text = widget.searchKeyword;
    tabController = TabController(length: 4, vsync: this);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        centerTitle: false,
        backgroundColor: AppColor.primary,
        elevation: 0,
        leading: IconButton(
          onPressed: () => Navigator.of(context).pop(),
          icon: SvgPicture.asset(
            'assets/icons/Arrow-left.svg',
            color: Colors.white,
          ),
        ),
        actions: [
          IconButton(
            onPressed: () {},
            icon: SvgPicture.asset(
              'assets/icons/Filter.svg',
              color: Colors.white,
            ),
          ),
        ],
        title: Container(
          height: 40,
          child: TextField(
            autofocus: false,
            controller: searchInputController,
            style: TextStyle(fontSize: 14, color: Colors.white),
            decoration: InputDecoration(
              hintStyle: TextStyle(fontSize: 14, color: Colors.white.withOpacity(0.3)),
              hintText: 'Find a products...',
              prefixIcon: Container(
                padding: EdgeInsets.all(10),
                child: SvgPicture.asset('assets/icons/Search.svg', color: Colors.white),
              ),
              contentPadding: EdgeInsets.symmetric(vertical: 0, horizontal: 0),
              enabledBorder: OutlineInputBorder(
                borderSide: BorderSide(color: Colors.transparent, width: 1),
                borderRadius: BorderRadius.circular(16),
              ),
              focusedBorder: OutlineInputBorder(
                borderSide: BorderSide(color: Colors.white.withOpacity(0.1), width: 1),
                borderRadius: BorderRadius.circular(16),
              ),
              fillColor: Colors.white.withOpacity(0.1),
              filled: true,
            ),
          ),
        ),
        bottom: PreferredSize(
          preferredSize: Size.fromHeight(50),
          child: Container(
            width: MediaQuery.of(context).size.width,
            height: 50,
            color: AppColor.secondary,
            child: TabBar(
              controller: tabController,
              indicatorColor: AppColor.accent,
              indicatorWeight: 5,
              unselectedLabelColor: Colors.white.withOpacity(0.5),
              labelStyle: TextStyle(fontWeight: FontWeight.w500, fontFamily: 'poppins', fontSize: 12),
              unselectedLabelStyle: TextStyle(fontWeight: FontWeight.w400, fontFamily: 'poppins', fontSize: 12),
              tabs: [
                Tab(
                  text: 'Related',
                ),
                Tab(
                  text: 'Newest',
                ),
                Tab(
                  text: 'Popular',
                ),
                Tab(
                  text: 'Best Seller',
                ),
              ],
            ),
          ),
        ), systemOverlayStyle: SystemUiOverlayStyle.light,
      ),
      body: TabBarView(
        controller: tabController,
        children: [
          // 1 - Related
          ListView(
            shrinkWrap: true,
            physics: BouncingScrollPhysics(),
            children: [
              Padding(
                padding: EdgeInsets.only(left: 16, top: 16),
                child: Text(
                  'Search result of ${widget.searchKeyword}',
                  style: TextStyle(color: Colors.grey, fontSize: 12, fontWeight: FontWeight.w400),
                ),
              ),
              Container(
                padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                child: Wrap(
                  spacing: 16,
                  runSpacing: 16,
                  children: List.generate(
                    searchedProductData.length,
                    (index) => ItemCard(
                      product: searchedProductData[index],
                    ),
                  ),
                ),
              ),
            ],
          ),
          SizedBox(),
          SizedBox(),
          SizedBox(),
        ],
      ),
    );
  }
}
