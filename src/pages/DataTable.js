import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/Context';
import Card from '../components/Card/Card';
import HeaderText from '../components/Text/HeaderText';
import Container from '../components/Container/Container';
import { useForm } from 'react-hook-form';
import { useParams, useHistory } from 'react-router-dom';
import TextWithLabel from '../components/Text/TextWithLabel';
import Button from '../components/Button/Button';
import Table from '../components/Table/Table';

const Row = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 32px;

`;
const ButtonContainer = styled.div`
	margin-left: auto;
	justify-self: flex-end;
`;

const DataTable = () => {

	let { id } = useParams();
	const history = useHistory();
	const { setNotifyMessage, setPath, setDataTable, setDataTables, Post, setLoadingDataTables, Get, dataTable } = useContext(AppContext);
	const DeleteDataTable = async () => {
		try {
			const response = await Post({
				params: {
					id: id,
					deleted_at: true
				}, path: 'data_table', dataSetter: setDataTables, loader: setLoadingDataTables
			})
			if (response.status === 200) {
				history.goBack();
				setNotifyMessage('Data Table Deleted')
			} else {
				setNotifyMessage('Data Table removal failed')

			}
		}
		catch (err) { console.log(err), setNotifyMessage('Data Point removal failed') }
	}

	useEffect(() => {
		setPath('/datatable');
		window.scroll(0, 0);
		Get({ params: { id: id, get_data: true }, path: 'data_table', dataSetter: setDataTable, loader: setLoadingDataTables })

	}, []);
	useEffect(() => {
		DataTableContent()
	}, [dataTable])

	const DataTableContent = () => {

		return (
			<div>
				<Row>
					<Button
						ghost
						layoutType='back'
						title='Go Back'
					/>
					<ButtonContainer>
						{
							dataTable && dataTable.length > 0
								?
								<Button
									type="button"
									onClick={() => DeleteDataTable()}
									title='Delete Data Table'
								/>
								:
								null
						}
					</ButtonContainer>
				</Row>

				<Table data={dataTable && dataTable.length > 0 ? dataTable[0].value : []} />

			</div>
		);

	};

	return <Container>{DataTableContent()}</Container>;
};

export default DataTable;
