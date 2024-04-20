import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import SpinnerSmall from '../Spinner/SpinnerSmall';
import Button from '../Button/Button';
import { AppContext } from '../../context/Context';
const iconImage = '/integration-logos/hyperfigures.png'; // Import the icon image

// Styled components for the chat AI question component
const QuestionContainer = styled.div`
    border-radius: 15px;
    margin-bottom: 15px;
`;

const InputContainer = styled.div`
    position: relative;
`;

const InputField = styled.input`
    width: calc(100% - 100px); /* Adjusted for the send button */
    margin-top: 10px;
    padding: 8px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding-left: 40px; /* Adjust the padding to accommodate the icon */
    background-image: url(${iconImage}); /* Set the icon as background image */
    background-repeat: no-repeat;
    background-position: 10px center; /* Adjust the position of the icon */
    background-size: 20px; /* Adjust the size of the icon */
`;

const SendButton = styled(Button)`
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 8px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const ResponseText = styled.p`
    margin-top: 10px;
`;

// ChatAIQuestion component
const Chat = () => {
    const [question, setQuestion] = useState('');
    const { setLoadingChat, setChat, chat, Post, loadingChat } =
        useContext(AppContext);

    const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.target.value);
    };

    const handleSendQuestion = async () => {
        try {
            setLoadingChat(true);
            setQuestion('');
            const response = await Post({
                params: {
                    model: 'llama2',
                    prompt: question,
                    system: 'You are an expert physicist.',
                    stream: false,
                    options: {
                        temperature: 0.2,
                    },
                },
                path: 'llama2',
                dataSetter: setChat,
                loader: setLoadingChat,
            });
            console.log(response);
            setLoadingChat(false);
        } catch (error) {
            console.error(error);
        }
    };
    const ChatContainer = () => {
        return (
            <QuestionContainer>
                <InputContainer>
                    <InputField
                        type="text"
                        value={question}
                        onChange={handleQuestionChange}
                        placeholder="Type your question here..."
                    />
                    <SendButton
                        small
                        title="Ask"
                        onClick={handleSendQuestion}
                    />
                </InputContainer>
                {loadingChat ? (
                    <SpinnerSmall />
                ) : (
                    chat && <ResponseText>{chat}</ResponseText>
                )}
            </QuestionContainer>
        );
    };
    useEffect(() => {
        ChatContainer();
    }, [chat]);
    return ChatContainer();
};

export default Chat;
