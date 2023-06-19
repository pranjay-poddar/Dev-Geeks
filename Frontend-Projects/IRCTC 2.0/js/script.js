$(document).ready(function() {

    $(function() {
      $("#datepicker").datepicker();
    });
  
    $(function() {
      $("#timepicker").timepicker();
    });
  
    var tnum, tnam, ttime, tcost, classname;
    var from, to, date, availableCities = [
      "Mumbai",
      "Kolkata",
      "Delhi",
      "Chennai",
      "Bangalore",
      "Hyderabad",
      "Ahmadabad",
      "Pune",
      "Surat",
      "Kanpur",
      "Jaipur",
      "Lucknow",
      "Nagpur",
      "Patna",
      "Indore",
      "Vadodara",
      "Bhopal",
      "Coimbatore",
      "Ludhiana",
      "Kochi",
      "Visakhapatnam",
      "Agra",
      "Varanasi",
      "Madurai",
      "Meerut",
      "Nashik",
      "Jabalpur",
      "Jamshedpur",
      "Asansol",
      "Dhanbad",
      "Faridabad",
      "Allahabad",
      "Amritsar",
      "Vijayawada",
      "Rajkot"
    ];
    $("#from").autocomplete({
      source: availableCities
    });
    $("#to").autocomplete({
      source: availableCities
    });
  
    $(".invis").hide();
    $("#page2").hide();
    $(".final").hide();
  
    $("#search").click(function() {
      from = $("#from").val();
      to = $("#to").val();
      date = $("#datepicker").val();
      if (!(from && to && date)) {
        alert("Please Select All Fields !");
        return False;
      } else if (from == to) {
        alert("From and To can't be same");
        return False;
      }
      $("#page1").hide();
      $("#page2").show();
  
      $("#trainname1").html(from + " Express");
      $("#trainname2").html(to + " Express");
      $("#trainname3").html(from + " Passenger");
      $("#trainname4").html(to + " Passenger");
      $("#trainname5").html(from + " - " + to + " Super Fast Train");
  
      $("tbody > tr").mouseover(function() {
        $(this).css("backgroundColor", "rgba(41, 103, 182, 0.89)");
  
      }).mouseout(function() {
        $(this).css("backgroundColor", "");
      });
  
      $("tbody > tr").click(function() {
        $(this).parent().children().removeClass("selected");
        $(this).addClass("selected");
      });
  
      $(".book").click(function() {
        tcost = $(".selected").find(".tcost")
          .text();
        tnum = $(".selected").find(".tnum").text();
  
        tnam = $(".selected").find(".tnam").text();
  
        ttime = $(".selected").find(".ttime").text();
        /* alert(tnum);*/
        if (!tnum) {
          alert("Please Select Your Train !")
          return False;
        }
        $(".invis").show();
  
        $(".booknow").click(function() {
          classname = document.querySelector('input[name="toggle"]:checked+span').innerHTML;
  
          $(".invis").hide(function() {
            $("#page2").hide()
          });
          $(".index").hide();
          $(".final").show();
  
        });
        $(".bookcancel").click(function() {
  
          $(".invis").hide();
        })
  
        $("#From").html(from);
        $("#To").html(to);
        $(".trainname").html(tnam);
        $("#number").html(tnum);
  
        var d = new Date();
        var n = d.toLocaleDateString();
        document.getElementById("date").innerHTML = n;
  
        var code = '1101001000010011101100101110111101101000111010111001100110111001001011110111011100101100100100001101100011101011';
  
        table = $('#barcodes tr');
        for (var i = 0; i < code.length; i++) {
          if (code[i] == 1) {
            table.append('<td bgcolor="black">')
          } else {
            table.append('<td bgcolor="white">')
          }
        }
  
      });
  
    })
  
  });