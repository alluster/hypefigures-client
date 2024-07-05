import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import SpinnerSmall from '../Spinner/SpinnerSmall';
import { AppContext } from '../../context/Context';
import Button from '../Button/Button';

// Styled components for the chat AI question component
const QuestionContainer = styled.div`
	margin-bottom: 15px;
	height: 100%;
	bottom: 0px;
	// border-top: 1px solid black;
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
	// max-width: 400px;
	align-items: flex-start; /* Align items to the start (top) */
	justify-content: flex-start; /* Align content to the start (top) */
	padding-left: 20px;
`;

const Text = styled.p`
	font-size: 16px;
`;

const TextContainer = styled.div`
	  padding-top: ${(props) => props.theme.grid.divider_2};
    padding-bottom: ${(props) => props.theme.grid.divider_2};
    padding-left: ${(props) => props.theme.grid.divider_2};
    padding-right: ${(props) => props.theme.grid.divider_2};
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    background-color: ${(props) => props.theme.colors.white};
    border: solid 1px ${(props) => props.theme.colors.gray_110};
    border-radius: 8px;
    margin-right: ${(props) => props.theme.grid.divider_2};
    margin-bottom: ${(props) => props.theme.grid.divider_2};

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
		question,
		activeTeam
	} = useContext(AppContext);
	const Banner = () => {
		return (

			activeTeam[0]?.stripe_subscription != true && activeTeam[0]?.ai_requests > 3
				?
				<div className="relative isolate flex justify-center items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">

					<div className="flex flex-wrap justify-center text-center ml-auto mr-auto items-center gap-x-4 gap-y-2">
						<h4 className="text-smleading-6 text-gray-900">
							<strong className="font-semibold">Your team seems to be running on too small tier</strong>
							<br />
							<svg viewBox="0 0 2 2" aria-hidden="true" className="mx-2 inline h-0.5 w-0.5 fill-current">
								<circle r={1} cx={1} cy={1} />
							</svg>
							<br />

							Join us and update your subscription.
						</h4>
						<Button
							title='View plans'
							small
							type='button'
							layoutType='link'
							primary
							to={`/teams/${activeTeam[0]?.id}`}
						/>
					</div>

				</div>
				:
				null
		)
	}
	useEffect(() => {
		Banner

	}, [activeTeam])

	const ChatContainer = () => {
		return (
			<QuestionContainer>
				<Banner />
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
											<TextContainer>
												<Text>
													{chat.length > 0 && chat[0].message}
												</Text>
											</TextContainer>

										</RightSide>
									</ResponseContainer>

									:
									<OnBoardingContainer>
										<OnBoardingContent>
											<h5></h5>
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
