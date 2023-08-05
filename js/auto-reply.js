const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbot = document.querySelector(".chatbot");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

const autoReplyMessage = "Thank you for your message. We will get back to you as soon as possible.";
const autoReplyImage = "img/logo.png";

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined"><img src="${autoReplyImage}" class="logo-chat"></span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

const saveChatHistory = () => {
    // Save the chat history to local storage
    localStorage.setItem("chatHistory", chatbox.innerHTML);
}

const loadChatHistory = () => {
    // Load the chat history from local storage
    const chatHistory = localStorage.getItem("chatHistory");
    if(chatHistory) {
        chatbox.innerHTML = chatHistory;
        chatbox.scrollTop = chatbox.scrollHeight;
    }
}

const handleChat = () => {
    const userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if(!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = "auto";

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTop = chatbox.scrollHeight;
    saveChatHistory();
    
    setTimeout(() => {
        // Display the auto-reply message with image
        const autoReplyLi = createChatLi(autoReplyMessage, "incoming");
        chatbox.appendChild(autoReplyLi);
        chatbox.scrollTop = chatbox.scrollHeight;
        saveChatHistory();
    }, 600);
}

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = "auto";
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

loadChatHistory(); // Load the chat history when the page is reloaded