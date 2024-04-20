import React from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import { device } from '../../styles/device-braking-points';

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
	small
}) => {
	return (
		small ?
			<HeaderTextWrapper>
				<TextContainer>
					<p>{locationText || ''}</p>
					<h5>{title || ''}</h5>
					<h6>{description || ''}</h6>
				</TextContainer>
				{buttonTitle != null && (
					<ButtonContainer>
						<Button onClick={onClickFunction} title={buttonTitle} />
					</ButtonContainer>
				)}
			</HeaderTextWrapper>
			:
			<HeaderTextWrapper>
				<TextContainer>
					<p>{locationText || ''}</p>
					<h5>{title || ''}</h5>
					<h6>{description || ''}</h6>
				</TextContainer>
				{buttonTitle != null && (
					<ButtonContainer>
						<Button onClick={onClickFunction} title={buttonTitle} />
					</ButtonContainer>
				)}
			</HeaderTextWrapper>
	);
};

export default HeaderText;
