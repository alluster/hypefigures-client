import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import SpinnerSmall from '../Spinner/SpinnerSmall';
import { AppContext } from '../../context/Context';

// Styled components for the chat AI question component
const QuestionContainer = styled.div`
	margin-bottom: 15px;
	height: 100%;
	bottom: 0px;
	border-top: 1px solid black;
	padding-top: 20px;
	margin-top: 20px;
	width: 600px;
	margin-left: auto;
	margin-right: auto;
`;

const ResponseContainer = styled.div`
	display: flex;
	align-items: flex-start; /* Align items to the start (top) */
`;

const Circle = styled.div`
	width: 34px;
	height: 34px;
	border: 1px solid ${props => props.theme.colors.gray_80};
	border-radius: 50%;
	background-color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 10px; /* Add margin for separation */
`;

const Image = styled.img`
	max-width: 60%;
	max-height: 60%;
`;
const LeftSide = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: flex-start; /* Align items to the start (top) */
	justify-content: flex-start; /* Align content to the start (top) */
`;
const RightSide = styled.div`
	flex: 8;
	display: flex;
	flex-direction: column;
	max-width: 400px;
	align-items: flex-start; /* Align items to the start (top) */
	justify-content: flex-start; /* Align content to the start (top) */
	padding-left: 20px;
`;

const Text = styled.p`
	font-size: 16px;
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
		question
	} = useContext(AppContext);

	const ChatContainer = () => {
		return (
			<QuestionContainer>

				{
					loadingChat ?
						<SpinnerSmall />
						:
						<div>

							{
								chat.length > 0 ?
									<ResponseContainer >
										<LeftSide>
											<Circle>
												<Image src="/logos/icon-dark.svg" alt="Icon" />
											</Circle>
										</LeftSide>

										<RightSide>
											<Text>
												{chat.length > 0 && chat[0].message}
											</Text>
										</RightSide>
									</ResponseContainer>

									:
									<OnBoardingContainer>
										<OnBoardingContent>
											<h5>How can I help you? </h5>
										</OnBoardingContent>
									</OnBoardingContainer>
							}

						</div>
				}
			</QuestionContainer >
		);
	};
	useEffect(() => {
		ChatContainer();
	}, [chat]);
	return ChatContainer();
};

export default Conversation;
