import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from './Card';
import TextWithLabel from '../Text/TextWithLabel';
import CurrencyFormatter from '../../supportFunctions/CurrencyFormatter';
import Chart from '../Chart';
import Button from './Button';

const Description = styled.p`
    margin-bottom: ${(props) => props.theme.grid.divider_2};
`;
const Updated = styled.p`
    margin-bottom: ${(props) => props.theme.grid.divider_2};
`;

const DataDisplay = styled.div`
    margin-top: ${(props) => props.theme.grid.divider_4};
    margin-bottom: ${(props) => props.theme.grid.divider_4};
`;
const CardDataGroup = ({ dataPoints, title, description, updated_at }) => {
	const [data, setData] = useState([]);
	const [barChart, setBarChart] = useState(false);

	useEffect(() => {
		setData(dataPoints);
	}, [dataPoints]);
	return (
		<Card>
			<TextWithLabel title={title} label="Data Point Group" />

			<Updated>{updated_at || ''}</Updated>
			<Description>{description || ''}</Description>

			{barChart ? (
				<DataDisplay>
					<Chart data={data} />
				</DataDisplay>
			) : (
				<DataDisplay>
					{data ? (
						data.map((item, i) => {
							return (
								<Card
									small="true"
									key={i}
									to={`/datapoints/${item.id}`}
								>
									<TextWithLabel
										small="true"
										label={item.title}
										title={CurrencyFormatter.format(
											item.value,
										)}
									/>
								</Card>
							);
						})
					) : (
						<p>no data</p>
					)}
				</DataDisplay>
			)}
			<Button
				type="button"
				primary
				small
				onClick={() => setBarChart(!barChart)}
				title={barChart ? 'Vie wValues' : 'View Bar Chart'}
			/>
		</Card>
	);
};

export default CardDataGroup;
