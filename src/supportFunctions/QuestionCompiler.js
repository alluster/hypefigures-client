import React, { useContext, useEffect, useState, useMemo } from 'react';

import { AppContext } from '../../context/Context';

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
	const {
		selectedDataTables,
		setRetrievedTables,
		dashboard,
		Get,
		setLoadingRetrievedTables,
	} = useContext(AppContext);

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

export const QuestionCompiler = async (e) => {
	const {
		setLoadingChat,
		setChat,
		Post,
		question,
		setQuestion,
		setNotifyMessage
	} = useContext(AppContext);

	e.preventDefault()
	try {
		setLoadingChat(true);
		const tablesToChat = await GetTables();
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
