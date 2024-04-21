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

const Value = styled.h3`
    font-weight: bold;
`;

const Divider = styled.div`
    border-bottom: 1px solid ${(props) => props.theme.colors.gray_60};
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
`;
const Label = styled.p`
    color: ${(props) => props.theme.colors.gray_130};
    font-size: 14px;
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
				<Button
					ghost
					layoutType='back'
					title='Go Back'
				/>
				<Table data={dataTable && dataTable.length > 0 ? dataTable[0].value : []} />

				<Button
					type="button"
					onClick={() => DeleteDataTable()}
					title='Delete Data Table'
				/>

			</div>
		);

	};

	return <Container>{DataTableContent()}</Container>;
};

export default DataTable;
