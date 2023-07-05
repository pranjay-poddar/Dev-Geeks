// Data of the Solar Bodies

const solarBodiesData = {
    "sun": {
        name: "Sun",
        speed: "0 km/h<br>( Orbit Velocity )",
        size: "4,370,005 km<br>( Equatorial Circumference )",
        distance: "0 km<br>( From The Sun )"
    },

    "mer-orbit": {
        name: "Mercury",
        speed: "170,503 km/h<br>( Orbit Velocity )",
        size: "15,329 km<br>( Equatorial Circumference )",
        distance: "57,909,227 km<br>( From The Sun )"
    },

    "ven-orbit": {
        name: "Venus",
        speed: "126,074 km/h<br>( Orbit Velocity )",
        size: "38,024 km<br>( Equatorial Circumference )",
        distance: "108,209,475 km<br>( From The Sun )"
    },

    "ear-orbit": {
        name: "Earth",
        speed: "107,218 km/h<br>( Orbit Velocity )",
        size: "40,075 km<br>( Equatorial Circumference )",
        distance: "149,598,262 km<br>( From The Sun )"
    },

    "mar-orbit": {
        name: "Mars",
        speed: "86,677 km/h<br>( Orbit Velocity )",
        size: "21,296 km<br>( Equatorial Circumference )",
        distance: "227,943,824 km<br>( From The Sun )"
    },

    "jup-orbit": {
        name: "Jupiter",
        speed: "47,002 km/h<br>( Orbit Velocity )",
        size: "439,363 km<br>( Equatorial Circumference )",
        distance: "778,340,821 km<br>( From The Sun )"
    },

    "sat-orbit": {
        name: "Saturn",
        speed: "34,701 km/h<br>( Orbit Velocity )",
        size: "365,882 km<br>( Equatorial Circumference )",
        distance: "1,426,666,422 km<br>( From The Sun )"
    },

    "ura-orbit": {
        name: "Uranus",
        speed: "24,477 km/h<br>( Orbit Velocity )",
        size: "159,354 km<br>( Equatorial Circumference )",
        distance: "2,870,658,186 km<br>( From The Sun )"
    },

    "nep-orbit": {
        name: "Neptune",
        speed: "19,566 km/h<br>( Orbit Velocity )",
        size: "154,704 km<br>( Equatorial Circumference )",
        distance: "4,498,396,441 km<br>( From The Sun )"
    },

    "plu-orbit": {
        name: "Pluto",
        speed: "17,064 km/h<br>( Orbit Velocity )",
        size: "4,493 km<br>( Equatorial Circumference )",
        distance: "5,906,380,000 km<br>( From The Sun )"
    }
};

// Global variables
let data = document.querySelector('.data');
let text = document.querySelector('.text');

let allSolarBodies = document.querySelectorAll('.solarBody');

// Targeting all the solar bodies
allSolarBodies.forEach(body => {
    // Adding event listener on all the solar bodies
    body.addEventListener('mouseenter', event => {
        let solarBody = event.target.classList[1];

        // Adding data
        text.innerHTML = `Name - ${solarBodiesData[solarBody].name}<br><br>
                            Speed - ${solarBodiesData[solarBody].speed}<br><br>
                            Size - ${solarBodiesData[solarBody].size}<br><br>
                            Distance - ${solarBodiesData[solarBody].distance}`;
        
        // Changing opacity of the data on hovering
        data.style.opacity = 1;
    });

    // Removing data after mouse arrow is removed
    body.addEventListener('mouseleave', ()=> {
        data.style.opacity = 0;
    });
});