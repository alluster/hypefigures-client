import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import SpinnerSmall from '../Spinner/SpinnerSmall';
import { AppContext } from '../../context/Context';
import Spinner from '../Spinner/Spinner';

// Styled components for the chat AI question component
const QuestionContainer = styled.div`
    margin-bottom: 15px;
	height: 100%;
	bottom: 0px;
	border-top: 1px solid black;
	padding-top: 20px;
	margin-top: 20px;
`;

const ResponseText = styled.p`
    margin-top: 10px;
`;

const OnBoardingContainer = styled.div`
	flex-direction: column;
	display: flex;
	vertical-align: center;
	justify-content: center;
	text-align: center;
	height: 100%;
`;
const OnBoardingContent = styled.div`
	color: ${props => props.theme.colors.gray_120};
	margin-top: 20px;
	flex-direction: column;
	text-align: center;
	display: flex;
	vertical-align: center;
	justify-content: center;
`;
const Conversation = () => {
	const {
		chat,
		loadingChat,
	} = useContext(AppContext);

	const ChatContainer = () => {
		return (
			<QuestionContainer>

				{loadingChat ? (
					<Spinner text='hello' />
				) : (
					chat.length > 0 ? (
						<ResponseText>
							{chat.length > 0 && chat[0].message}
						</ResponseText>
					) :
						<OnBoardingContainer>
							<OnBoardingContent>
								<h5>How can I help you? </h5>

							</OnBoardingContent>
						</OnBoardingContainer>
				)}
			</QuestionContainer>
		);
	};
	useEffect(() => {
		ChatContainer();
	}, [chat]);
	return ChatContainer();
};

export default Conversation;
