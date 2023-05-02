import React, { useState } from 'react';
// import styles from './ChatBotContainer.module.css';
import ChatBotHeader from './ChatBotHeader/ChatBotHeader';
import ChatBotMessageContainer from './ChatBotMessageContainer/ChatBotMessageContainer';
import ChatBotFooter from './ChatBotFooter/ChatBotFooter';

const questionDomain = ['Who are you?', 'What is this course?', 'What is AI?'];

const answerDomain = [
    "I'm a Chatbot",
    'This is a Udemy Course In NextJS',
    'AI means Artificial Intelligence'
];

const prompt = (message) =>
    `if the question is related to ${questionDomain.join(
        ', '
    )} - answer only one from: ${answerDomain.join(
        ', '
    )} where question is: ${message}, else say: Please try some other question`;

export default function ChatbotContainer() {
    const [messages, setMessages] = useState([
        {
            message: 'How may I help you?',
            userType: 'assistant',
            createdAt: new Date()
        },
        {
            message: 'You can ask what is this course for example.',
            userType: 'assistant',
            createdAt: new Date()
        }
    ]);
    const [message, setMessage] = useState('');

    const onInputChangeHandler = (event) => {
        event.preventDefault();

        const message = event.target.value;
        setMessage(message);
    };

    const onSubmitUserMessageHandler = () => {
        const newMessage = {
            userType: 'user',
            message: message.trim(),
            createdAt: new Date()
        };

        let updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        setMessage('');

        // TODO: Call API for Chatbot
        fetch('/api/chatbot', {
            method: 'POST',
            body: JSON.stringify({
                message: {
                    role: newMessage.userType,
                    content: prompt(newMessage.message)
                }
            })
        })
            .then(async (response) => {
                const responseData = await response.json();
                const newMessage = {
                    message: responseData.data.content,
                    userType: responseData.data.role,
                    createdAt: new Date()
                };

                updatedMessages = [...updatedMessages, { ...newMessage }];
                console.log(updatedMessages);
                setMessages(updatedMessages);
            })
            .catch((error) => {
                console.log('Error', error);
            });
    };

    return (
        <div className="row justify-content-center">
            <div className="col-6 ">
                <ChatBotHeader />
                <ChatBotMessageContainer messages={messages} />
                <ChatBotFooter
                    message={message}
                    onInputChangeHandler={onInputChangeHandler}
                    onSubmitUserMessageHandler={onSubmitUserMessageHandler}
                />
            </div>
        </div>
    );
}
