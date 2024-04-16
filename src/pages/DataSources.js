import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../components/Card/Card';
import HeaderText from '../components/Text/HeaderText';
import Container from '../components/Container/Container';
import ButtonGoBack from '../components/Button/ButtonGoBack';
import { useForm } from 'react-hook-form';
import TextWithLabel from '../components/Text/TextWithLabel';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '../components/Button/Button';
import DividerLine from '../components/Container/DividerLine';
import { AppContext } from '../context/Context';

const Logo = styled.div`
   	max-width: 40px;
	align-self: center;
	margin-right: ${(props) => props.theme.grid.divider_4};

}
`;

const Wrapper = styled.div`
    margin-top: ${(props) => props.theme.grid.divider_4};
`;

const DataSources = () => {
	const { user } = useAuth0();
	const { setPath, loadingDataProviders, dataProviders } = useContext(AppContext);


	useEffect(() => {
		setPath('/dataSources');
		window.scroll(0, 0);
	}, []);

	const DataSources = () => {
		if (loadingDataProviders) {
			return <p>Loading data...</p>;
		}
		else {
			return (
				dataProviders.length > 0 ? dataProviders.map((item, i) => {
					return (
						<Card key={i}>
							{/* <Logo>
								<img src="/google_sheets.png" alt="Google Sheets" />
							</Logo> */}

							<TextWithLabel
								small
								title={item.title}
								label="Data Provider"
							/>
							<TextWithLabel
								small
								title={item.service_account}
								label="Service Account Email"
							/>

						</Card>
					);
				}) :
					<p>No data Providers added</p>);

		}
	};

	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		window.scroll(0, 0);
	}, []);

	return (
		<Container>
			<ButtonGoBack text="Go Back" />
			<HeaderText
				locationText=""
				title="Data Integrations"
				description="List of all Data Streams available for you."
			/>
			<Wrapper>{DataSources()}</Wrapper>
		</Container>
	);
};

export default DataSources;
