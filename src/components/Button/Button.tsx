import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { device } from '../../device';
import { ButtonProps } from '../interface/ButtonProps';

const StyledButtonBase = styled.button<ButtonProps>`
    text-align: center;
    font-weight: 400;
    border-radius: 8px;
    height: 100%;
    padding-left: 40px;
    padding-right: 40px;
    font-size: 22.6px;
    line-height: 64px;
    font-weight: 700;

    ${({ small }) =>
        small &&
        `
		height: 42px;
		line-height: 32px;
		padding-left: 32px;
		padding-right: 32px;
		font-size: 14px;
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

const Button = ({
    type = 'button',
    primary = true,
    small = true,
    white = false,
    success = false,
    dividerRight = false,
    children,
    to = '',
    onClick,
}: ButtonProps) => {
    const StyledButton = (
        <StyledButtonBase
            onClick={onClick}
            small={small}
            white={white}
            success={success}
            primary={primary}
            dividerRight={dividerRight}
            type={type}
        >
            {children}
        </StyledButtonBase>
    );
    return to ? <Link to={to}>{StyledButton}</Link> : StyledButton;
};

export default Button;
