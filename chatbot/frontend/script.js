async function sendMessage() {
  let userInput = document.getElementById("userInput").value.trim();
  if (!userInput) return;

  let chatbox = document.getElementById("chatbox");
  chatbox.innerHTML += `<p class="user-message"><strong>You:</strong> ${userInput}</p>`;
  document.getElementById("userInput").value = "";
  chatbox.scrollTop = chatbox.scrollHeight;

  try {
    let response = await fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userInput }),
    });

    let data = await response.json();
    chatbox.innerHTML += `<p class="bot-message"><strong>Bot:</strong> ${data.response}</p>`;
    chatbox.scrollTop = chatbox.scrollHeight;
  } catch (error) {
    chatbox.innerHTML += `<p class="bot-message"><strong>Bot:</strong> Error connecting to the server.</p>`;
  }
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}
