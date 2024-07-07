import React, { useContext, useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
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
    border-radius: 25px;
	background-color: red;
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

const ChatInput = () => {
	const {
		setLoadingChat,
		setChat,
		chat,
		Post,
		loadingChat,
		selectedDataTables,
		question,
		setQuestion,
		setRetrievedTables,
		dashboard,
		Get,
		setLoadingRetrievedTables,
		setNotifyMessage
	} = useContext(AppContext);

	const handleQuestionChange = (e) => {
		setQuestion(e.target.value);
	};

	const combineDataTablesIntoCSVModel = useMemo(() => {
		return (tables) => {
			const combinedCSVData = [];
			tables.forEach(table => {
				console.log(table)
				table && table.length > 0 && table[0].value.forEach(dataObject => {
					const rowData = {
						table_name: table[0].title,
						...dataObject
					};
					combinedCSVData.push(rowData);
				});
			});
			const csvToString = JSON.stringify(combinedCSVData)

			return csvToString;
		};
	}, []);

	const GetTables = async () => {
		try {
			const tables = await Promise.all(
				selectedDataTables.map(table => {
					return Get({
						addToState: true,
						params: {
							id: table,
							dashboard_id: dashboard[0].id,
							get_data: true,
						},
						path: 'data_table',
						dataSetter: setRetrievedTables,
						loader: setLoadingRetrievedTables,
					});
				}),
			);
			return combineDataTablesIntoCSVModel(tables);
		} catch (err) {
			console.log(err);
			throw err;
		}
	};

	const handleSendQuestion = async (e) => {
		e.preventDefault()
		try {
			setLoadingChat(true);
			const tablesToChat = await GetTables();
			console.log(tablesToChat);
			await Post({
				params: {
					prompt: `${question}: ${JSON.stringify(tablesToChat)}`,
				},
				path: 'chatgpt',
				dataSetter: setChat,
				loader: setLoadingChat,
			});
		} catch (error) {
			console.log(error);
			setNotifyMessage(error.message)

		} finally {
			setQuestion('');
			setLoadingChat(false);
		}
	};

	const ChatContainer = () => {
		return (
			<QuestionContainer>
				<InputContainer>
					<form>

						<InputField
							type="text"
							value={question}
							onChange={handleQuestionChange}
							placeholder="Type your question here..."
						/>
						<SendButton
							small
							title="Ask"
							type='submit'
							onClick={(e) => handleSendQuestion(e)}
						/>
					</form>

				</InputContainer>
				{loadingChat ? (
					<SpinnerSmall />
				) : (
					chat && (
						<ResponseText>
							{chat.length > 0 && chat[0].message}
						</ResponseText>
					)
				)}
			</QuestionContainer>
		);
	};
	useEffect(() => {
		ChatContainer();
	}, [chat]);
	return ChatContainer();
};

export default ChatInput;
