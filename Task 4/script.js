const socket = new WebSocket('ws://localhost:1956');

const chatLog = document.getElementById('chat-log');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', () => {
    const userInput = chatInput.value.trim();
    if (userInput !== '') {
        socket.send(JSON.stringify({
            source: 'applicationName',
            destination: 'chatGPT',
            conversation: {
                question: userInput
            }
        }));
        chatInput.value = '';
    }
});

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const answer = data.answer.conversationData.text;
    const chatMessage = document.createElement('li');
    chatMessage.textContent = `ChatGPT: ${answer}`;
    chatLog.appendChild(chatMessage);
    chatLog.scrollTop = chatLog.scrollHeight;
};

socket.onopen = () => {
    console.log('Connected to the WebSocket server');
};

socket.onerror = (event) => {
    console.log(`Error occurred: ${event}`);
};

socket.onclose = () => {
    console.log('Disconnected from the WebSocket server');
};