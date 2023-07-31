function convertToWords() {
    const numberInput = document.getElementById('numberInput');
    const output = document.getElementById('output');
  
    const number = numberInput.value;
    const words = convertNumberToWords(number);
    output.textContent = words;
  }
  
  function convertNumberToWords(number) {
    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
    if (number === '0') {
      return 'Zero';
    }
  
    let words = '';
    let billion, million, thousand, hundreds, remainder;
  
    if (number.length === 10) {
      billion = number.slice(0, 1);
      number = number.slice(1);
      words += units[billion] + ' Billion ';
    }
  
    if (number.length >= 7) {
      million = number.slice(0, number.length - 6);
      number = number.slice(million.length);
      words += convertThreeDigits(million) + ' Million ';
    }
  
    if (number.length >= 4) {
      thousand = number.slice(0, number.length - 3);
      number = number.slice(thousand.length);
      words += convertThreeDigits(thousand) + ' Thousand ';
    }
  
    if (number.length >= 1) {
      words += convertThreeDigits(number);
    }
  
    return words.trim();
  }
  
  function convertThreeDigits(number) {
    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
    let words = '';
    let hundreds, tensAndUnits;
  
    if (number.length === 3) {
      hundreds = number.slice(0, 1);
      number = number.slice(1);
      words += units[hundreds] + ' Hundred ';
    }
  
    if (number.length >= 2) {
      tensAndUnits = number.slice(0, 2);
      number = number.slice(2);
  
      if (tensAndUnits[0] === '1') {
        words += teens[tensAndUnits[1]] + ' ';
      } else {
        words += tens[tensAndUnits[0]] + ' ' + units[tensAndUnits[1]] + ' ';
      }
    }
  
    if (number.length >= 1) {
      words += units[number];
    }
  
    return words;
  }
  