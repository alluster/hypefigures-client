import React from 'react';
import styled from 'styled-components';
import { device } from '../../device';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
    padding-top: ${(props) => props.theme.grid.divider_2};
    padding-bottom: ${(props) => props.theme.grid.divider_2};
    padding-left: ${(props) => props.theme.grid.divider_2};
    padding-right: ${(props) => props.theme.grid.divider_2};
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    background-color: ${(props) => props.theme.colors.white};
    border: solid 1px ${(props) => props.theme.colors.gray_60};
    border-radius: 8px;
    margin-right: ${(props) => props.theme.grid.divider_2};
    margin-bottom: ${(props) => props.theme.grid.divider_2};
    ${({ row }) =>
		row &&
		`
		flex-direction: row;
	`};

    @media ${device.laptop} {
        margin-right: 0px;
    }
`;
const WrapperLink = styled(Link)`
	padding-top: ${(props) => props.theme.grid.divider_2} ;
	padding-bottom: ${(props) => props.theme.grid.divider_2} ;
	padding-left: ${(props) => props.theme.grid.divider_2} ;
	padding-right: ${(props) => props.theme.grid.divider_2} ;
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	background-color: ${(props) => props.theme.colors.white};
	border: solid 1px ${(props) => props.theme.colors.gray_60};
	border-radius: 8px;
	margin-right: ${(props) => props.theme.grid.divider_2};
	margin-bottom: ${(props) => props.theme.grid.divider_2};
	&: hover: {
		cursor:pointer
	}
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
const CardSmall = ({ children, to, row, small, onClick }) => {
	return (
		<div onClick={onClick}>
			{to ? (
				<WrapperLink small={small} row={row} to={to || ''}>
					{children}
				</WrapperLink>
			) : (
				<Wrapper small={small} row={row}>
					{children}
				</Wrapper>
			)}
		</div>
	);
};

export default CardSmall;
