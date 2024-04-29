import React from 'react';
import styled from 'styled-components';
import { device } from '../../styles/device-braking-points';
import { Link } from 'react-router-dom';
import TextWithLabel from '../Text/TextWithLabel';

const WrapperLink = styled(Link)`
	display: flex;
	align-items: center;
    background-color: ${(props) => props.theme.colors.white};
    border: solid 1px ${(props) => props.theme.colors.gray_40};
    border-radius: 8px;
    cursor: pointer;
	width: 100%;
    @media ${device.laptop} {
        margin-right: 0px;
    }
`;

const Container = styled.div`
	display: flex;
	flex-direction: row;
	padding-top: 8px;
	padding-bottom: 8px;
	align-items: center;
`;

const ImageContainer = styled.div`
	display: flex;
	align-items: center; /* Vertically align items */
	margin-left: 16px;
	margin-right: 10px; /* Add margin to the right to separate from the title */
`;
const Image = styled.img`
	height: 30px; /* Set the height of the image */
	width: auto; /* Automatically adjust width to maintain aspect ratio */
`;
const Title = styled.p`
	line-height: 40px;
	margin-left: 20px;
`;
const Description = styled.p`
	font-size: 14px;
	line-height: 40px;
	margin-left: 20px;

`;
const CardDataTable = ({
	to,
	title,
	description
}) => {

	return (

		<WrapperLink to={to || ''} >

			<Container>
				<ImageContainer>
					<Image src="/integration-logos/google-sheets.png" alt="Google Sheets" />

				</ImageContainer>
				<Title>
					{title || ''}
				</Title>
				<Description>
					{description || ''}
				</Description>

			</Container>

		</WrapperLink >

	);
};

export default CardDataTable;
