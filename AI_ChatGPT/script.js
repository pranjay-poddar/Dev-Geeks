const chatbotToggle = document.querySelector(".chatbot__button");
const sendChatBtn = document.querySelector(".chatbot__input-box span");
const chatInput = document.querySelector(".chatbot__textarea");
const chatBox = document.querySelector(".chatbot__box");
const chatbotCloseBtn = document.querySelector(".chatbot__header span");

let userMessage;
// Need GPT key
const inputInitHeight = chatInput.scrollHeight;
const API_KEY = "Enter API key here"; //Important

const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chatbot__chat", className);
  chatLi.innerHTML = `<p>${message}</p>`;
  return chatLi;
};

const generateResponse = (incomingChatLi) => {
  const API_URL = "https://chatgpt53.p.rapidapi.com/";
  const messageElement = incomingChatLi.querySelector("p");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-RapidAPI-Key": "API_KEY", //enter key imp*
      "X-RapidAPI-Host": "chatgpt53.p.rapidapi.com",
    },
    body: JSON.stringify({
      messages: [{ role: "user", content: userMessage }],
    }),
  };

  console.log("Sending API request:", requestOptions);

  fetch(API_URL, requestOptions)
    .then((res) => res.json())
    .then((data) => {
      console.log("API response:", data);
      console.log(data.choices[0].message.content);
      messageElement.textContent = data.choices[0].message.content;
    })
    .catch((error) => {
      console.log("API error:", error);
      messageElement.classList.add("error");
      messageElement.textContent = "Oops! Please try again!";
    })
    .finally(() => chatBox.scrollTo(0, chatBox.scrollHeight));
};

const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;
  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  chatBox.appendChild(createChatLi(userMessage, "outgoing"));
  chatBox.scrollTo(0, chatBox.scrollHeight);

  setTimeout(() => {
    const incomingChatLi = createChatLi("Typing...", "incoming");
    chatBox.appendChild(incomingChatLi);
    chatBox.scrollTo(0, chatBox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 600);
};

chatInput.addEventListener("input", () => {
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});
chatbotToggle.addEventListener("click", () =>
  document.body.classList.toggle("show-chatbot")
);
chatbotCloseBtn.addEventListener("click", () =>
  document.body.classList.remove("show-chatbot")
);
sendChatBtn.addEventListener("click", handleChat);
