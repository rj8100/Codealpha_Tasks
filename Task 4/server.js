const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const axios = require('axios');

const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY';

app.use(express.json());

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('message', (data) => {
        const userInput = data.conversation.question;
        axios.post(`https://api.openai.com/v1/engines/davinci-codex/completions`, {
            prompt: `Translate the following English text to French: "${userInput}"`,
            max_tokens: 60,
        }, {
            headers: {
                Authorization: `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            const answer = response.data.choices[0].text.trim();
            socket.emit('message', {
                answer: {
                    conversationData: {
                        text: answer,
                    },
                },
            });
        })
        .catch((error) => {
            console.error('Error:', error.message);
        });
    });
});

server.listen(1956, () => {
    console.log('Server is listening on port 1956');
});