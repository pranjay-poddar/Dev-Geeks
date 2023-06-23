// Declaring the global variables
let url = "https://api.genderize.io?name="; // Api used to guess the gender by name
let wrapper = document.getElementById("wrapper");

// Arrow function to guess the gender by the name
let guessGender = () => {
	let name = document.getElementById("name").value;
	let error = document.getElementById("error");
	let finalURL = url + name;

	// After taking the name or function is triggered then input box and error pop-up will be empty
	wrapper.innerHTML = "";
	error.innerHTML = "";

	//Check if input field is not empty and the entered name does not contain anything but alphabets.
	if (name.length > 0 && /^[A-Za-z]+$/.test(name)) {
		fetch(finalURL)
			.then((resp) => resp.json())
			.then((data) => {
				// After fetching the data from the json file, send this information to the user
				let div = document.createElement("div");
				div.setAttribute("id", "info");

				// Calculating the probability in percentage
				let prob = Math.floor(data.probability * 100);
				div.innerHTML = `<h2 id="result-name">${data.name}</h2><img src="" id="gender-icon"/> <h1 id="gender">${data.gender}</h1><h4 id="prob">Probability: ${prob}%</h4>`;

				wrapper.append(div);

				// Showing the image according to the gender
				if (data.gender == "female") {
					div.classList.add("female");
					document
						.getElementById("gender-icon")
						.setAttribute("src", "female.svg");
				} else {
					div.classList.add("male");
					document
						.getElementById("gender-icon")
						.setAttribute("src", "male.svg");
				}
			});
		document
			.getElementById("name").value = "";
	} else {
		error.innerHTML = "Enter a valid name with no spaces";
	}
};

// Functioning on click the submit button
document.getElementById("submit").addEventListener("click", guessGender);

// Functioning of the pressing of the enter button
document.addEventListener("keyup", (event) => {
	if (event.key === 'Enter') guessGender();
});
