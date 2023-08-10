const imagePromptFromLocalStorage = localStorage.getItem("imagePrompt")
const quotePromptFromLocalStorage = localStorage.getItem("quotePrompt")
const imageUrlFromLocalStorage = localStorage.getItem("imageUrl")
const quoteFromLocalStorage = localStorage.getItem("quote")
const quoteSpan = document.querySelector(".quote-span")
const quoteWrapper = document.querySelector(".quote-wrapper")
const nameSpan = document.querySelector(".name-span")
const loader = document.getElementById("loader")
const obj = document.querySelector("#inputcontent");
const tryagainBtn = document.querySelector("#tryagain");
const header = document.querySelector(".header");

function startLoading() {
  loader.style.display = "block"
  obj.style.display = "none" ;
  header.style.display = "none" ;
}

function stopLoading(name, url, quote) {
  nameSpan.style.display = "inline"
  quoteWrapper.style.display = "block"
  quoteSpan.style.display = "inline"
  loader.style.display = "none"
  nameSpan.textContent = `${name} - ${getDate()}`
  document.body.style.backgroundImage = `url(${url})`
  quoteSpan.textContent = quote
  tryagainBtn.style.display = "block"
}

export async function generateTextAndImage(
  name,
  favActivity,
  favPlace,
  temperature
) {
  startLoading()
  let url = await getImage(favPlace)
  let quote = await getQuote(favActivity, favPlace, temperature)
  stopLoading(name, url, quote)
  return
}

function getDate() {
  const date = new Date()
  const monthIndex = date.getMonth()
  const year = date.getFullYear()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const monthName = monthNames[monthIndex]

  return `${monthName} ${year}`
}

async function getImage(query) {
  const response = await fetch(
    `https://apis.scrimba.com/unsplash/photos/random/?count=1&query=${query}`
  )

  if (response.ok) {
    const data = await response.json()
    const imageUrl = data[0].urls.full
    return imageUrl
  } else {
    console.error(`Error: ${response.status}`)
  }
}

async function getQuote(favActivity, favPlace, temperature) {
  let quotePrompt = `Create a poetic phrase about ${favActivity} and ${favPlace} in the insightful, witty and satirical style of Oscar Wilde. Omit Oscar Wilde's name.`

  if (quotePrompt === quotePromptFromLocalStorage) {
    return quoteFromLocalStorage
  }

  localStorage.setItem("quotePrompt", quotePrompt)
  let body = {
    model: "text-davinci-003",
    prompt: quotePrompt,
    temperature: temperature,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  }

  let res = await fetch("https://apis.scrimba.com/openai/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  let response = await res.json()
  console.log(response);
  let newQuote = response.choices[0].text
  localStorage.setItem("quote", newQuote)
  return newQuote
}
