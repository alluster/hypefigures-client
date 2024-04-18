import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { device } from '../../styles/device-braking-points';

const Wrapper = styled.div`
    width: 100%;
    margin-top: ${(props) => props.theme.grid.divider_4};
    margin-right: ${(props) => props.theme.grid.divider_2};
`;

const StyledSelect = styled.select`
    height: 56px;
    width: calc(100% - 60px);
    border: 1px solid ${(props) => props.theme.colors.fontDark};
    border-radius: 8px;
    font-size: 18px;
    color: ${(props) => props.theme.colors.fontDark};
    padding-left: ${(props) => props.theme.grid.divider_4};
    padding-right: ${(props) => props.theme.grid.divider_2};
    // padding: 0.4%;
    line-height: 56px;
    -ms-box-sizing: content-box;
    -moz-box-sizing: content-box;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    background: url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png)
        no-repeat right #ffffff;
    -webkit-appearance: none;
    background-position-x: 98%;
    ${({ disabled }) =>
		disabled &&
		`
		border: 1px solid gray;
		background-color: #dddddd;

	`};
    @media ${device.laptop} {
    }
`;

const Label = styled.label`
    font-size: 16px;
    font-weight: bold;
    margin-bottom: ${(props) => props.theme.grid.divider_2};
    display: inline-block;
    ${({ disabled }) =>
		disabled &&
		`
		color: gray;

	`};
`;

const Select = ({ label, required, register, name, options, type }) => {
	const [disabled, setDisabled] = useState(false);

	const checkOptions = () => {
		if (options && options.length > 0) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	};
	useEffect(() => {
		checkOptions();
	}, [options]);
	return (
		<Wrapper>
			<Label disabled={disabled}>{label}</Label>
			<StyledSelect
				{...register(name, { required })}
				label={label}
				type={type}
				disabled={disabled}
			>
				<option hidden></option>

				{options &&
					options.map((item, i) => {
						return (
							<option key={i} value={item.id}>
								{item.title}
							</option>
						);
					})}
			</StyledSelect>
		</Wrapper>
	);
};

export default Select;
