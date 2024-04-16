import React, { useState } from 'react';
import styled from 'styled-components';

import { device } from '../../device';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const StyledButton = styled.button`
    // text-align: center;
    border-radius: 8px;
    margin-left: auto;
    height: 100%;
    padding-right: 40px;
    line-height: 64px;
    font-weight: 700;
    margin-bottom: 42px;

    ${({ small }) =>
		small &&
		`
		height: 42px;
		line-height: 42px;
		padding-left: 16px;
		padding-right: 16px;
		font-size: 14px;
		min-width: 120px;
	`};
    ${({ primary }) =>
		primary &&
		`
		-webkit-text-fill-color: #ffffff;
		color: #ffffff;
		background-color: #000B42;	
	`};
    ${({ white }) =>
		white &&
		`
		-webkit-text-fill-color: #252525;
  		color: #252525 !important;
		background-color: #FBFBFB;
		border: 1px solid #252525;
		font-weight: 400;


	`};
    ${({ success }) =>
		success &&
		`
		-webkit-text-fill-color: #ffffff;
		color: #ffffff;
		background-color: #0F6F00;

	`};

    ${({ alert }) =>
		alert &&
		`
		-webkit-text-fill-color: #ffffff;
		color: #ffffff;
		background-color: #8E0000;
	`};
    ${({ dividerRight }) =>
		dividerRight &&
		`
		margin-right: 32px;

	`};
    @media ${device.laptop} {
        height: 100%;
        padding-left: 24px;
        padding-right: 24px;
        font-size: 16px;
        line-height: 40px;
        font-weight: 600;
    }
`;

const Content = styled.div`
    background-color: ${(props) => props.theme.colors.gray_20};
    border-radius: 8px;
    padding: 16px;
    position: absolute;
    min-width: 200px;
    margin-top: -42px;
    z-index: 1;
    border: 1px solid ${(props) => props.theme.colors.gray_60};
`;

const Title = styled.div`
    display: flex;
    flex-direction: row;

    &: hover {
        cursor: pointer;
    }
`;
const TitleText = styled.div`
    margin-right: 42px;
`;
const IconContainer = styled.div`
    margin-left: auto;
`;

const ArrowIcon = styled(FontAwesomeIcon)`
    font-size: 14px;
`;
const ButtonWithOptions = ({ title, children }) => {
	const [open, setOpen] = useState(false);

	return (
		<div>
			<StyledButton primary small onClick={() => setOpen(!open)}>
				<Title>
					<TitleText>{title}</TitleText>
					<IconContainer>
						{open ? (
							<ArrowIcon icon={faChevronDown} />
						) : (
							<ArrowIcon icon={faChevronUp} />
						)}
					</IconContainer>
				</Title>
			</StyledButton>

			{open ? (
				<Content onClick={() => setOpen(!open)}>{children}</Content>
			) : null}
		</div>
	);
};

export default ButtonWithOptions;
