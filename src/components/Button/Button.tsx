import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { device } from '../../styles/device-braking-points';
import { ButtonProps } from '../../interface/ButtonProps';
import {
    faArrowLeft,
    faChevronDown,
    faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';

const StyledButtonBase = styled.button<ButtonProps>`
    text-align: center;
    border-radius: 8px;
    padding-left: 40px;
    padding-right: 40px;
    font-size: 22.6px;
    line-height: 64px;
    font-weight: 700;
    display: flex;
    flex-direction: row;
    align-items: center;

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

    ${({ ghost }) =>
        ghost &&
        `	
		font-weight: 600;
		font-size: 18px;
		padding-left: 0px; important;	
		text-align: left;
		border: none !important;
		background-color: none;
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

const Icon = styled(FontAwesomeIcon)`
    color: ${(props) => props.theme.colors.fontDark};
    font-size: 16px;
    margin-right: ${(props) => props.theme.grid.divider_1};
    align-self: center;
`;
const IconDropdown = styled(FontAwesomeIcon)`
    color: ${(props) => props.theme.colors.white};
    font-size: 16px;
    margin-left: ${(props) => props.theme.grid.divider_2};
    align-self: center;
`;

const DropdownContent = styled.div`
    background-color: ${(props) => props.theme.colors.gray_20};
    border-radius: 8px;
    padding: 16px;
    position: absolute;
    min-width: 200px;
    z-index: 1;
    border: 1px solid ${(props) => props.theme.colors.gray_60};
`;

const Button = ({
    type = 'button',
    layoutType = 'default',
    ghost = false,
    primary = true,
    small = true,
    white = false,
    success = false,
    dividerRight = false,
    children,
    to = '',
    title = 'Button',
    onClick,
}: ButtonProps) => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const history = useHistory();
    const handleGoBack = () => {
        history.goBack();
    };

    const StyledButton = (
        <StyledButtonBase
            onClick={onClick}
            small={small}
            white={white}
            ghost={ghost}
            success={success}
            primary={primary}
            dividerRight={dividerRight}
            type={type}
            layoutType={layoutType}
            title={title}
        >
            {title}
        </StyledButtonBase>
    );

    switch (layoutType) {
        case 'back':
            return (
                <StyledButtonBase ghost={ghost} onClick={handleGoBack}>
                    <Icon icon={faArrowLeft} />
                    {title}
                </StyledButtonBase>
            );
        case 'link':
            return <Link to={to}>{StyledButton}</Link>;
        case 'dropdown':
            return (
                <div>
                    <StyledButtonBase
                        small
                        primary
                        onClick={() => setOpenDropdown(!openDropdown)}
                    >
                        {title}
                        {openDropdown ? (
                            <IconDropdown icon={faChevronDown} />
                        ) : (
                            <IconDropdown icon={faChevronUp} />
                        )}
                    </StyledButtonBase>

                    {openDropdown ? (
                        <DropdownContent
                            onClick={() => setOpenDropdown(!openDropdown)}
                        >
                            {children}
                        </DropdownContent>
                    ) : null}
                </div>
            );
        default:
            return StyledButton;
    }
};

export default Button;
