const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

function sendMessage() {
  let message = userInput.value.trim();
  if (message === "") return;

  // Display user message
  displayMessage(message, "user-message");

  // Send message to backend
  fetch("https://chatbot-backend-egnk.onrender.com/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: message }),
  })
    .then((response) => response.json())
    .then((data) => {
      displayMessage(data.response, "bot-message");
    })
    .catch((error) => {
      console.error("Error:", error);
      displayMessage("Error communicating with the chatbot.", "bot-message");
    });

  userInput.value = "";
}

function displayMessage(text, className) {
  let messageDiv = document.createElement("div");
  messageDiv.classList.add(className);
  messageDiv.textContent = text;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Allow sending message with Enter key
userInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});
