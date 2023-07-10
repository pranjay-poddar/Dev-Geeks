// On Form submission prevent the default action and call the function to update the result

$('form').submit(function (event) {
    event.preventDefault();
    convertInputDegree()
});

// Realtime Update
$('#inputDegree').on('input', () => convertInputDegree());
$('#selectInputDegreeType').change(() => convertInputDegree());
$('#selectConversionType').change(() => convertInputDegree());


// Main function which chechks the input and output degree type and then launch the function
function convertInputDegree() {

    let inputDegree = parseInt($('#inputDegree').val());
    let selectInputDegreeType = $('#selectInputDegreeType').val();
    let conversionType = $('#selectConversionType').val();

    let resultValue = "";

    switch (selectInputDegreeType) {

        case "C":
            resultValue = cTo(inputDegree, conversionType);
            break;

        case "F":
            resultValue = fTo(inputDegree, conversionType);
            break;

        case "K":
            resultValue = kTo(inputDegree, conversionType);
            break;

    }

    // To prevent NaN
    if (isNaN(inputDegree)) {
        $('#convertedDegree').text('');
        return;
    }

    // To update the Degree Unit
    $('#convertedUnit').text(conversionType)


    // To update the Degree Value
    $('#convertedDegree').text(resultValue.toFixed(2));

}


// Fahrenheit Converter
function fTo(inputDegreeValue, conversionDegreeType) {

    let temperature = '';

    switch (conversionDegreeType) {
        case 'F':
            temperature = inputDegreeValue;
            break;
        case 'C':
            temperature = eval((inputDegreeValue - 32) * (5 / 9));
            break;
        case 'K':

            temperature = eval((inputDegreeValue + 459.67) * (5 / 9));
            break;

    }
    return temperature;
}

// Celcius Converter


function cTo(inputDegreeValue, conversionDegreeType) {


    let temperature = '';

    switch (conversionDegreeType) {

        case 'C':
            temperature = inputDegreeValue;
            break;
        case 'F':
            temperature = eval((inputDegreeValue * (9 / 5)) + 32);
            break;
        case 'K':
            temperature = eval(inputDegreeValue + 273.15);
            break;

    }

    return temperature;
}

// Kelvin Converter

function kTo(inputDegreeValue, conversionDegreeType) {


    let temperature = '';

    switch (conversionDegreeType) {
        case 'K':
            temperature = inputDegreeValue;
            break;
        case 'F':
            temperature = eval((inputDegreeValue - 273.15) * (9 / 5) + 32);
            break;
        case 'C':
            temperature = eval((inputDegreeValue - 273.15));
            break;

    }
    return temperature;
}
