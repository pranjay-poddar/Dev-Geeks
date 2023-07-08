var formula = `{
    "conversions": [
        {
            "from": "Millimeter",
            "to": "Centimeter",
            "formula": "Centimeter = Millimeter / 10"
        },
        {
            "from": "Millimeter",
            "to": "Decimeter",
            "formula": "Decimeter = Millimeter / 100"
        },
        {
            "from": "Millimeter",
            "to": "Meter",
            "formula": "Meter = Millimeter / 1000"
        },
        {
            "from": "Millimeter",
            "to": "Kilometer",
            "formula": "Kilometer = Millimeter / 1000000"
        },
        {
            "from": "Millimeter",
            "to": "Foot",
            "formula": "Foot = Millimeter * 0.00328084"
        },
        {
            "from": "Millimeter",
            "to": "Inch",
            "formula": "Inch = Millimeter * 0.0393701"
        },
        {
            "from": "Millimeter",
            "to": "Mile",
            "formula": "Mile = Millimeter * 0.000000621371"
        },
        {
            "from": "Millimeter",
            "to": "Yard",
            "formula": "Yard = Millimeter * 0.00109361"
        },
        {
            "from": "Centimeter",
            "to": "Millimeter",
            "formula": "Millimeter = Centimeter * 10"
        },
        {
            "from": "Centimeter",
            "to": "Decimeter",
            "formula": "Decimeter = Centimeter / 10"
        },
        {
            "from": "Centimeter",
            "to": "Meter",
            "formula": "Meter = Centimeter / 100"
        },
        {
            "from": "Centimeter",
            "to": "Kilometer",
            "formula": "Kilometer = Centimeter / 100000"
        },
        {
            "from": "Centimeter",
            "to": "Foot",
            "formula": "Foot = Centimeter * 0.0328084"
        },
        {
            "from": "Centimeter",
            "to": "Inch",
            "formula": "Inch = Centimeter * 0.393701"
        },
        {
            "from": "Centimeter",
            "to": "Mile",
            "formula": "Mile = Centimeter * 0.00000621371"
        },
        {
            "from": "Centimeter",
            "to": "Yard",
            "formula": "Yard = Centimeter * 0.0109361"
        },

        {
            "from": "Decimeter",
            "to": "Centimeter",
            "formula": "Centimeter = Decimeter * 10"
        },
        {
            "from": "Decimeter",
            "to": "Meter",
            "formula": "Meter = Decimeter / 10"
        },
        {
            "from": "Decimeter",
            "to": "Kilometer",
            "formula": "Kilometer = Decimeter / 10000"
        },
        {
            "from": "Decimeter",
            "to": "Foot",
            "formula": "Foot = Decimeter * 3.28084"
        },
        {
            "from": "Decimeter",
            "to": "Inch",
            "formula": "Inch = Decimeter * 39.3701"
        },
        {
            "from": "Decimeter",
            "to": "Mile",
            "formula": "Mile = Decimeter / 160934.4"
        },
        {
            "from": "Decimeter",
            "to": "Yard",
            "formula": "Yard = Decimeter * 1.09361"
        },
        {
            "from": "Decimeter",
            "to": "Millimeter",
            "formula": "Millimeter = Decimeter * 100"
        },
        {
            "from": "Meter",
            "to": "Centimeter",
            "formula": "Centimeter = Meter * 100"
        },
        {
            "from": "Meter",
            "to": "Kilometer",
            "formula": "Kilometer = Meter / 1000"
        },
        {
            "from": "Meter",
            "to": "Foot",
            "formula": "Foot = Meter * 3.28084"
        },
        {
            "from": "Meter",
            "to": "Inch",
            "formula": "Inch = Meter * 39.3701"
        },
        {
            "from": "Meter",
            "to": "Mile",
            "formula": "Mile = Meter / 1609.344"
        },
        {
            "from": "Meter",
            "to": "Yard",
            "formula": "Yard = Meter * 1.09361"
        },
        {
            "from": "Meter",
            "to": "Decimeter",
            "formula": "Decimeter = Meter * 10"
        },
        {
            "from": "Meter",
            "to": "Millimeter",
            "formula": "Millimeter = Meter * 1000"
        },                
        {
            "from": "Kilometer",
            "to": "Centimeter",
            "formula": "Centimeter = Kilometer * 100000"
        },
        {
            "from": "Kilometer",
            "to": "Decimeter",
            "formula": "Decimeter = Kilometer * 10000"
        },
        {
            "from": "Kilometer",
            "to": "Meter",
            "formula": "Meter = Kilometer * 1000"
        },
        {
            "from": "Kilometer",
            "to": "Foot",
            "formula": "Foot = Kilometer * 3280.84"
        },
        {
            "from": "Kilometer",
            "to": "Inch",
            "formula": "Inch = Kilometer * 39370.1"
        },
        {
            "from": "Kilometer",
            "to": "Mile",
            "formula": "Mile = Kilometer / 1.60934"
        },
        {
            "from": "Kilometer",
            "to": "Yard",
            "formula": "Yard = Kilometer * 1093.613"
        },
        {
            "from": "Kilometer",
            "to": "Millimeter",
            "formula": "Millimeter = Kilometer * 1000000"
        },
        {
            "from": "Foot",
            "to": "Centimeter",
            "formula": "Centimeter = Foot * 30.48"
        },
        {
            "from": "Foot",
            "to": "Decimeter",
            "formula": "Decimeter = Foot * 3.048"
        },
        {
            "from": "Foot",
            "to": "Meter",
            "formula": "Meter = Foot / 3.2808"
        },
        {
            "from": "Foot",
            "to": "Kilometer",
            "formula": "Kilometer = Foot / 3280.84"
        },
        {
            "from": "Foot",
            "to": "Inch",
            "formula": "Inch = Foot * 12"
        },
        {
            "from": "Foot",
            "to": "Mile",
            "formula": "Mile = Foot / 5280"
        },
        {
            "from": "Foot",
            "to": "Yard",
            "formula": "Yard = Foot / 3"
        },
        {
            "from": "Foot",
            "to": "Millimeter",
            "formula": "Millimeter = Foot * 304.8"
        },
        {
            "from": "Inch",
            "to": "Centimeter",
            "formula": "Centimeter = Inch * 2.54"
        },
        {
            "from": "Inch",
            "to": "Decimeter",
            "formula": "Decimeter = Inch * 0.254"
        },
        {
            "from": "Inch",
            "to": "Meter",
            "formula": "Meter = Inch / 39.37"
        },
        {
            "from": "Inch",
            "to": "Kilometer",
            "formula": "Kilometer = Inch / 39370.1"
        },
        {
            "from": "Inch",
            "to": "Foot",
            "formula": "Foot = Inch / 12"
        },
        {
            "from": "Inch",
            "to": "Mile",
            "formula": "Mile = Inch / 63360"
        },
        {
            "from": "Inch",
            "to": "Yard",
            "formula": "Yard = Inch / 36"
        },
        {
            "from": "Inch",
            "to": "Millimeter",
            "formula": "Millimeter = Inch * 25.4"
        },
        {
            "from": "Mile",
            "to": "Centimeter",
            "formula": "Centimeter = Mile * 160934"
        },
        {
            "from": "Mile",
            "to": "Decimeter",
            "formula": "Decimeter = Mile * 16093.4"
        },
        {
            "from": "Mile",
            "to": "Meter",
            "formula": "Meter = Mile * 1609.344"
        },
        {
            "from": "Mile",
            "to": "Kilometer",
            "formula": "Kilometer = Mile * 1.60934"
        },
        {
            "from": "Mile",
            "to": "Foot",
            "formula": "Foot = Mile * 5280"
        },
        {
            "from": "Mile",
            "to": "Inch",
            "formula": "Inch = Mile * 63360"
        },
        {
            "from": "Mile",
            "to": "Yard",
            "formula": "Yard = Mile * 1760"
        },
        {
            "from": "Mile",
            "to": "Millimeter",
            "formula": "Millimeter = Mile * 1609344"
        },
        {
            "from": "Yard",
            "to": "Centimeter",
            "formula": "Centimeter = Yard * 91.44"
        },
        {
            "from": "Yard",
            "to": "Centimeter",
            "formula": "Centimeter = Yard * 91.44"
        },
        {
            "from": "Yard",
            "to": "Decimeter",
            "formula": "Decimeter = Yard * 9.144"
        },
        {
            "from": "Yard",
            "to": "Meter",
            "formula": "Meter = Yard / 1.094"
        },
        {
            "from": "Yard",
            "to": "Kilometer",
            "formula": "Kilometer = Yard / 1093.613"
        },
        {
            "from": "Yard",
            "to": "Foot",
            "formula": "Foot = Yard * 3"
        },
        {
            "from": "Yard",
            "to": "Inch",
            "formula": "Inch = Yard * 36"
        },
        {
            "from": "Yard",
            "to": "Mile",
            "formula": "Mile = Yard / 1760"
        },
        {
            "from": "Yard",
            "to": "Millimeter",
            "formula": "Millimeter = Yard * 914.4"
        }        
    ]

}`
