import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { device } from '../device';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledButton = styled.button`
    text-align: left;
    font-weight: 400;
    display: flex;
    flex-direction: row;

    ${({ small }) =>
        small &&
        `
		font-size: 12px;
	`};
    ${({ primary }) =>
        primary &&
        `
		-webkit-text-fill-color: #ffffff;
		color: #ffffff;
	`};
    ${({ white }) =>
        white &&
        `
		-webkit-text-fill-color: #252525;
  		color: #252525;

	`};
    ${({ success }) =>
        success &&
        `
		-webkit-text-fill-color: #ffffff;
		color: #ffffff;

	`};
    ${({ alert }) =>
        alert &&
        `
		-webkit-text-fill-color: #ffffff;
		color: #ffffff;
	`};

    @media ${device.laptop} {
    }
`;

const Icon = styled(FontAwesomeIcon)`
    color: ${(props) => props.theme.colors.fontDark};
    font-size: 20px;
`;
const Text = styled.p`
    font-size: 14px;
    color: ${(props) => props.theme.colors.fontDark};
    margin-right: ${(props) => props.theme.grid.divider_1};
    white-space: nowrap;
`;

const ButtonWithIcon = ({
    onClick,
    icon,
    text,
    to,
    primary,
    color,
    className,
    textColor,
    small,
    white,
    success,
    alert,
}) => {
    return (
        <Link to={to || ''}>
            <StyledButton
                className={className}
                color={color}
                textColor={textColor}
                onClick={onClick}
                small={small}
                white={white}
                success={success}
                alert={alert}
                primary={primary}
            >
                <Text>{text}</Text>
                <Icon icon={icon} />
            </StyledButton>
        </Link>
    );
};

ButtonWithIcon.propTypes = {
    onClick: PropTypes.any,
    children: PropTypes.any,
};

export default ButtonWithIcon;
