import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-right: ${(props) => props.theme.grid.divider_4};
    margin-bottom: ${(props) => props.theme.grid.divider_1};
`;

const Label = styled.p`
    color: ${(props) => props.theme.colors.gray_80};
    font-size: 22px;
    font-weight: 400;
    // text-transform: uppercase;
    margin-bottom: ${(props) => props.theme.grid.divider_2};
`;
const LabelSmall = styled.p`
    color: ${(props) => props.theme.colors.gray_80};
    font-size: 14px;
    font-weight: 400;
    // text-transform: uppercase;
    // margin-bottom: ${(props) => props.theme.grid.divider_1};
`;
const Title = styled.h3`
    // color: ${(props) => props.theme.colors.gray_80};
    font-weight: 400;
    // text-transform: uppercase;
    // margin-bottom: ${(props) => props.theme.grid.divider_2};
`;
const TitleSmall = styled.h5`
    // color: ${(props) => props.theme.colors.gray_80};
    font-size: 16px;
    font-weight: 400;
    // text-transform: uppercase;
    // margin-bottom: ${(props) => props.theme.grid.divider_1};
`;
const Description = styled.p`
    color: ${(props) => props.theme.colors.gray_80};
    font-size: 18px;
    font-weight: 400;
    align-self: flex-end;
    // text-transform: uppercase;
`;
const Content = styled.div`
    ${({ line }) =>
		line &&
		`
	padding-top: 16px;
	padding-bottom: 16px;
	padding-left: 32px;
	padding-right: 16px;
		background-color: ${(props) => props.theme.colors.white};
		border: solid 1px gray;
		border-radius: 8px;
	`}
`;

const TextWithLabel = ({ title, label, description, line, small }) => {
	return (
		<Wrapper>
			{small ? (
				<Content line={line}>
					{/* <LabelSmall>{label || ''}</LabelSmall> */}
					<TitleSmall>{title || ''}</TitleSmall>
					<Description>{description || ''}</Description>
				</Content>
			) : (
				<Content line={line}>
					<Label>{label || ''}</Label>
					<Title>{title || ''}</Title>
					<Description>{description || ''}</Description>
				</Content>
			)}
		</Wrapper>
	);
};

export default TextWithLabel;
