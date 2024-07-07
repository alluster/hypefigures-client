import React, { useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import { AppContext } from '../../context/Context';
const iconImage = '/integration-logos/hyperfigures.png'; // Import the icon image
import { device } from '../../styles/device-braking-points';

// Styled components for the chat AI question component

const InputContainer = styled.form`
    bottom: 0px;	
    position: fixed;
	width: calc(100% - 300px);
    margin-bottom: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center; /* Center the items horizontally */
    // align-items: center; /* Center the items vertically */
		@media ${device.laptop} {
	    margin-left: 16px;
		margin-right: 16px;
		width: calc(100vw - 68px);

  }
`;

const InputField = styled.input`
    flex: 3;
    margin-right: 10px; /* Add margin to the right to create space between the input field and the button */
    padding: 8px 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: white;
    padding-left: 40px;
    background-image: url(${iconImage});
    background-repeat: no-repeat;
    background-position: 10px center;
    background-size: 20px;
	height: 24px;
`;

const SendButton = styled(Button)`
    flex: 1;
    padding: 8px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const Chat = () => {
	const {
		setLoadingChat,
		setChat,
		chat,
		Post,
		selectedDataTables,
		question,
		setQuestion,
		setRetrievedTables,
		dashboard,
		Get,
		setLoadingRetrievedTables,
		setNotifyMessage,
		activeTeam
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
		e.preventDefault();
		try {
			setLoadingChat(true);
			const tablesToChat = await GetTables();
			const response = await Post({
				params: {
					prompt: !tablesToChat == [] ? `${question}: ${tablesToChat}` : `${question}`,
				},
				path: 'chatgpt',
				dataSetter: setChat,
				loader: setLoadingChat,
			});

		} catch (error) {
			setNotifyMessage('Something went wrong')

		} finally {
			setLoadingChat(false);
			setQuestion('');

		}
	};

	return (

		<InputContainer>

			<InputField
				type="text"
				value={question}
				onChange={handleQuestionChange}
				disabled={activeTeam[0]?.stripe_subscription != true && activeTeam[0]?.ai_requests > 3
					? true : false} placeholder={activeTeam[0]?.stripe_subscription != true && activeTeam[0]?.ai_requests > 3
						?
						"Your plan seems to be too small for using the AI"
						:
						"Select data and ask me anything about it"

					}
			/>
			<SendButton
				small
				title="Send a question"
				type='submit'
				disabled={!question.length > 0 || activeTeam[0]?.stripe_subscription != true && activeTeam[0]?.ai_requests > 3
					? true : false}
				onClick={(e) => handleSendQuestion(e)}
			/>
		</InputContainer>

	);
}

export default Chat;
