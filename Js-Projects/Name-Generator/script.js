document.getElementById("generate-names").addEventListener('submit', loadNames);

function loadNames(event) {
    event.preventDefault();

    const list = document.querySelector('#list');
    const gender = document.getElementById('gender').value;
    const heading = document.querySelector('h2');
    let amount = parseInt(document.getElementById('quantity').value);

    if (gender === '' || amount === '' || amount <= 0) {
        return;
    }

    list.innerHTML = '';
    heading.innerHTML = "Please wait...";
    function showData(name, gen) {
        if (gender === gen || gender === 'random') {
            list.innerHTML += `<li>${name['first']} ${name['last']}</li>`;
            --amount;
        }
    }

    function fetchData() {
        let url = 'https://randomuser.me/api/';
        conn = new XMLHttpRequest();

        conn.open('GET', url, true);

        conn.onload = function () {
            if (this.status === 200) {
                const names = JSON.parse(this.responseText);
                let nam = names.results[0].name; //name
                let gen = names.results[0].gender; //gender
                if (amount > 0) {
                    showData(nam, gen);
                }
            }
        }
        conn.send();
    }

    intervalId = setInterval(function () {
        if (amount <= 0) {
            heading.innerHTML = 'Generated Names';
            clearInterval(intervalId);
        }
        fetchData();
    }, 1000);
}
