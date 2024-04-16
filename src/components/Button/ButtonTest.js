import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { device } from '../device';

const StyledButton = styled.button`
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
		height: 32px;
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

const Button = ({
	style,
	download,
	target,
	onClick,
	type,
	form,
	children,
	to,
	primary,
	color,
	className,
	textColor,
	small,
	white,
	success,
	alert,
	dividerRight,
}) => {
	return (
		<div onClick={onClick}>
			{type === 'submit' || type === 'reset' || type === 'button' ? (
				<StyledButton
					download={download}
					target={target}
					style={style}
					className={className}
					color={color}
					textColor={textColor}
					onClick={onClick}
					small={small}
					white={white}
					success={success}
					alert={alert}
					primary={primary}
					dividerRight={dividerRight}
					type={type}
					form={form}
				>
					{children}
				</StyledButton>
			) : (
				<Link to={to || ''}>
					<StyledButton
						style={style}
						className={className}
						color={color}
						textColor={textColor}
						onClick={onClick}
						small={small}
						white={white}
						success={success}
						alert={alert}
						primary={primary}
						dividerRight={dividerRight}
						type={type}
						form={form}
					>
						{children}
					</StyledButton>
				</Link>
			)}
		</div>
	);
};

Button.propTypes = {
	onClick: PropTypes.any,
	children: PropTypes.any,
	style: PropTypes.any,
	download: PropTypes.any,
	target: PropTypes.any,
	type: PropTypes.any,
	form: PropTypes.any,
	to: PropTypes.any,
	primary: PropTypes.any,
	color: PropTypes.any,
	className: PropTypes.any,
	textColor: PropTypes.any,
	small: PropTypes.any,
	white: PropTypes.any,
	success: PropTypes.any,
	alert: PropTypes.any,
	dividerRight: PropTypes.any,
};

export default Button;