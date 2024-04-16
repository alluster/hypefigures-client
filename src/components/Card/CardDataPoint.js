import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { device } from '../../device';
import { Link } from 'react-router-dom';
import TextWithLabel from '../Text/TextWithLabel';
import SpinnerSmall from '../Spinner/SpinnerSmall';
import { AppContext } from '../../context/Context';

const Wrapper = styled.div`
    padding-top: ${(props) => props.theme.grid.divider_4};
    padding-bottom: ${(props) => props.theme.grid.divider_4};
    padding-left: ${(props) => props.theme.grid.divider_4};
    padding-right: ${(props) => props.theme.grid.divider_4};
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    background-color: ${(props) => props.theme.colors.white};
    border: solid 1px ${(props) => props.theme.colors.gray_110};
    border-radius: 8px;
    margin-right: ${(props) => props.theme.grid.divider_2};
    margin-bottom: ${(props) => props.theme.grid.divider_2};
    ${({ row }) =>
		row &&
		`
		flex-direction: row;
	`};
    ${({ onClick }) =>
		onClick &&
		`
		cursor:pointer
	`};

    @media ${device.laptop} {
        margin-right: 0px;
    }
`;
const WrapperLink = styled(Link)`
    padding-top: ${(props) => props.theme.grid.divider_2};
    padding-bottom: ${(props) => props.theme.grid.divider_2};
    padding-left: ${(props) => props.theme.grid.divider_2};
    padding-right: ${(props) => props.theme.grid.divider_2};
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    background-color: ${(props) => props.theme.colors.white};
    border: solid 1px ${(props) => props.theme.colors.gray_40};
    border-radius: 8px;
    margin-right: ${(props) => props.theme.grid.divider_2};
    margin-bottom: ${(props) => props.theme.grid.divider_2};
    cursor: pointer;
    ${({ row }) =>
		row &&
		`
		flex-direction: row;
	`};
    ${({ small }) =>
		small &&
		`
	padding-top: 16px ;
	padding-bottom: 16px ;
	padding-left: 16px ;
	padding-right: 16px ;
`};
    @media ${device.laptop} {
        margin-right: 0px;
    }
`;

const Container = styled.div`
	display: flex;
	flex-direction: row;
`;

const ImageContainer = styled.div`
	max-height: 30px;
	max-width: 60px;
	margin-right: 30px;
`

const CardDataPoint = ({
	to,
	row,
	small,
	onClick,
	title,
	description,
	value,
	loading,
	spreadsheet_id,
	sheet_id,
	cell,
	type
}) => {
	const {
		Get,
		setLoadingDataPoints,
		setDataPoints
	} = useContext(AppContext)

	const ImageSelector = () => {
		switch (type) {
			case 'google-sheet':
				return (
					<img src="/integration-logos/google-sheets.png" alt="Google Sheets" />
				);
			case 'google-analytics':
				return (
					<img src="/integration-logos/google-analytics.png" alt="Google Analytics" />

				);
			case 'hyperfigures':
				return (
					<img src="/integration-logos/hyperfigures.png" alt="Hyperfigures" />

				);
			default:
				return;
		}
	};
	return (
		<div onClick={onClick}>
			{to ? (
				<WrapperLink small={small} row={row} to={to || ''}>
					{loading ? (
						<SpinnerSmall />
					) : (
						<Container>
							<ImageContainer>
								{
									ImageSelector()
								}
							</ImageContainer>
							<TextWithLabel
								small
								title={title || '-'}
								label="Name"
								description=''
							/>
							<TextWithLabel
								small
								title={value || '-'}
								label="Value"
								description=''
							/>
							<TextWithLabel
								small
								title={description || '-'}
								label="Description"
								description=''
							/>
						</Container>


					)}
				</WrapperLink>
			) : (
				<Wrapper small={small} row={row}>
					{loading ? (
						<SpinnerSmall />
					) : (
						<TextWithLabel
							title={value || ''}
							label={title || ''}
							description={description || ''}
						/>
					)}
				</Wrapper>
			)}
		</div>
	);
};

export default CardDataPoint;
