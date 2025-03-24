import React, { useEffect, useRef } from 'react';
import '../css/Chat.css';

function Chat() {

    const socket = io('http://localhost:8081');
    const senderRef = useRef(null);
    const messageRef = useRef(null);
    const submitBtnRef = useRef(null);
    const outputRef = useRef(null);
    const feedbackRef = useRef(null);

    useEffect(() => {
        const sender = senderRef.current;
        const message = messageRef.current;
        const submitBtn = submitBtnRef.current;
        const output = outputRef.current;
        const feedback = feedbackRef.current;

    
        if (!sender || !message || !submitBtn || !output || !feedback) {
            console.error('DOM element not found');
            return;
        }

        const handleSendMessage = () => {
            if (sender.value.trim() && message.value.trim()) {
                socket.emit('chat', {
                    message: message.value,
                    sender: sender.value
                });
                message.value = ''; 
            }
        };

        submitBtn.addEventListener('click', handleSendMessage);

        socket.on('chat', data => {
            output.innerHTML += `<p><strong>${data.sender}:</strong> ${data.message}</p>`;
        });

        return () => {
            submitBtn.removeEventListener('click', handleSendMessage);
            socket.disconnect();
        };
    }, []);

    return (
        <div className='container-chat'>
            <div id='chat-wrap'>
                <h2>Mesajlaşma</h2>
                <div id='chat-window'>
                    <div id='output' ref={outputRef}></div>
                    <div id='feedback' ref={feedbackRef}></div>
                </div>
                <input type="text" id='sender' ref={senderRef} placeholder='Ad' />
                <input type="text" id='message' ref={messageRef} placeholder='Mesaj' />
                <button id='submitBtn' ref={submitBtnRef}>Gönder</button>
            </div>
        </div>
    );
}

export default Chat;
