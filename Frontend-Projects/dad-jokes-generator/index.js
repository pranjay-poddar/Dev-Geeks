const btnEl = document.getElementById("btn");
const jokeEl = document.getElementById("joke");
<<<<<<< HEAD

=======
// GET THE API THROUGH API KEY
>>>>>>> 30c50b75ff5ad6cf249875f551b784aa11529699
const apiKey = "4kqGcJx8uDXo3XIskcbzokAz7rN8nWJs3PL9Mcll";

const options = {
  method: "GET",
  headers: {
    "X-Api-Key": apiKey,
  },
};

const apiURL = "https://api.api-ninjas.com/v1/dadjokes?limit=1";

<<<<<<< HEAD
=======
// TRY-CATCH CODE FOR ERROR HANDLING

>>>>>>> 30c50b75ff5ad6cf249875f551b784aa11529699
async function getJoke() {
  try {
    jokeEl.innerText = "Updating...";
    btnEl.disabled = true;
    btnEl.innerText = "Loading...";
    const response = await fetch(apiURL, options);
    const data = await response.json();

    btnEl.disabled = false;
    btnEl.innerText = "Tell me a joke";

    jokeEl.innerText = data[0].joke;
  } catch (error) {
    jokeEl.innerText = "An error happened, try again later";
    btnEl.disabled = false;
    btnEl.innerText = "Tell me a joke";
    console.log(error);
  }
}

btnEl.addEventListener("click", getJoke);

