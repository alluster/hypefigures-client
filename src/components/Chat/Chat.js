import React, { useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import { AppContext } from '../../context/Context';
const iconImage = '/integration-logos/hyperfigures.png'; // Import the icon image
import { device } from '../../styles/device-braking-points';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

// Styled components for the chat AI question component

const InputWrapper = styled.div`
display: flex;
justify-content: center;
`;

const InputContainer = styled.form`
    bottom: 0px;	
    position: fixed;
	width: calc(100% - 300px);
    margin-bottom: 50px;
    display: flex;
    flex-direction: row;
	// border: 1px solid #ccc;
    border-radius: 30px;
	max-width: 800px;
    background-color: #F4F4F4;
	align-items: center;
	padding-right: 10px;


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
    // padding: 8px 10px;
   
    padding-left: 20px;
    // background-image: url(${iconImage});
    background-repeat: no-repeat;
    background-position: 10px center;
    background-size: 30px;
	height: 60px;
	font-size: 18px ;
	font-weight: 400;
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
	const removeKeysToOptimizeData = (data) => {
		if (!Array.isArray(data) || data.length === 0) {
			throw new Error('Input data must be a non-empty array of objects.');
		}
		const keys = Object.keys(data[0]);
		const valuesArray = data.map(item => keys.map(key => item[key]));
		return [keys, ...valuesArray];
	}

	const combineDataTablesIntoCSVModel = useMemo(() => {
		return (tables) => {
			const combinedCSVData = [];
			tables.forEach(table => {
				console.log(table)
				let optimizedTable = removeKeysToOptimizeData(table[0].value);
				console.log('optimizedTable:', optimizedTable)
				optimizedTable && optimizedTable.length > 0 && optimizedTable.forEach(dataObject => {
					const rowData = {
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
			setQuestion('');

		}
	};
	const firstQuestion = async () => {
		try {
			const response = await Post({
				params: {
					prompt: 'Hello',
				},
				path: 'chatgpt',
				dataSetter: setChat,
				loader: setLoadingChat,
			});
			return response;
		} catch (error) {
			setNotifyMessage('Something went wrong');
		}
	};

	// useEffect(() => {
	// 	firstQuestion();

	// }, [])

	return (
		<InputWrapper>
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
					iconBall
					small
					layoutType='iconBall'
					title=""
					type='submit'
					disabled={!question.length > 0 || activeTeam[0]?.stripe_subscription != true && activeTeam[0]?.ai_requests > 3
						? true : false}
					onClick={(e) => handleSendQuestion(e)}
				/>
			</InputContainer>
		</InputWrapper>

	);
}

export default Chat;
