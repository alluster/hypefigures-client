import React from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import { device } from '../../device';

const HeaderTextWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    flex-wrap: wrap;

    * {
        margin-bottom: ${(props) => props.theme.grid.divider_1};
    }
`;
const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
const ButtonContainer = styled.div`
    margin-left: auto;
    @media ${device.laptop} {
        margin-left: 0px;
    }
`;

const HeaderText = ({
	locationText,
	title,
	description,
	onClickFunction,
	buttonTitle,
}) => {
	return (
		<HeaderTextWrapper>
			<TextContainer>
				<h6>{locationText || ''}</h6>
				<h4>{title || ''}</h4>
				<h5>{description || ''}</h5>
			</TextContainer>
			{buttonTitle != null && (
				<ButtonContainer>
					<Button
						onClick={onClickFunction}

					>
						{buttonTitle}
					</Button>
				</ButtonContainer>
			)}
		</HeaderTextWrapper>
	);
};

export default HeaderText;
