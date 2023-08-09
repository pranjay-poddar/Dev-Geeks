function process() {
    const inputUrl = document.getElementById('inputUrl').value;
    const action = document.querySelector('input[name="action"]:checked').value;
    let result;

    if (action === 'encode') {
        result = encodeURIComponent(inputUrl);
    } else if (action === 'decode') {
        try {
            result = decodeURIComponent(inputUrl);
        } catch (error) {
            result = 'Invalid URL';
        }
    }

    document.getElementById('result').innerText = result;
}
