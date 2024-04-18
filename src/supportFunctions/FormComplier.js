import React from 'react';
import styled from 'styled-components';
import { device } from '../styles/device-braking-points';
import Button from '../components/Button/Button';

const ButtonRow = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    margin-top: ${(props) => props.theme.grid.divider_4};
`;
const Wrapper = styled.div`
    margin-top: ${(props) => props.theme.grid.divider_3};
`;

const Label = styled.label`
    font-size: 16px;
    font-weight: 400;
    margin-bottom: ${(props) => props.theme.grid.divider_1};
    display: inline-block;
`;

// form element styles

const StyledInput = styled.input`
    background-color: ${(props) => props.theme.colors.white};
    height: 36px;
    width: calc(100% - ${(props) => props.theme.grid.divider_6});
    border: 1px solid ${(props) => props.theme.colors.gray_80};
    border-radius: 4px;
    font-size: 14px;
    color: ${(props) => props.theme.colors.fontDark};
    padding-left: ${(props) => props.theme.grid.divider_1};
    padding-right: ${(props) => props.theme.grid.divider_2};
    margin-bottom: ${(props) => props.theme.grid.divider_1};
    // padding: 0.4%;
    line-height: 36px;
    -ms-box-sizing: content-box;
    -moz-box-sizing: content-box;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    ${({ disabled }) =>
		disabled &&
		`
	border: 1px solid gray;
	background-color: #dddddd;

`};
    @media ${device.laptop} {
    }
`;
const StyledSelect = styled.select`
    background-color: ${(props) => props.theme.colors.white};
    height: 36px;
    width: calc(100% - ${(props) => props.theme.grid.divider_6});
    border: 1px solid ${(props) => props.theme.colors.gray_80};
    border-radius: 4px;
    font-size: 14px;
    color: ${(props) => props.theme.colors.fontDark};
    padding-left: ${(props) => props.theme.grid.divider_1};
    padding-right: ${(props) => props.theme.grid.divider_2};
    margin-bottom: ${(props) => props.theme.grid.divider_1};
    // padding: 0.4%;
    line-height: 36px;
    -ms-box-sizing: content-box;
    -moz-box-sizing: content-box;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    @media ${device.laptop} {
    }
`;
const StyledTextArea = styled.textarea`
    background-color: ${(props) => props.theme.colors.white};
    height: 36px;
    width: calc(100% - ${(props) => props.theme.grid.divider_6});
    border: 1px solid ${(props) => props.theme.colors.gray_80};
    border-radius: 4px;
    font-size: 14px;
    color: ${(props) => props.theme.colors.fontDark};
    padding-left: ${(props) => props.theme.grid.divider_1};
    padding-right: ${(props) => props.theme.grid.divider_2};
    margin-bottom: ${(props) => props.theme.grid.divider_1};
    // padding: 0.4%;
    line-height: 36px;
    -ms-box-sizing: content-box;
    -moz-box-sizing: content-box;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    ${({ disabled }) =>
		disabled &&
		`
		border: 1px solid gray;
		background-color: #dddddd;

	`};
    @media ${device.laptop} {
    }
`;

const FormCompiler = ({
	fields,
	onSubmit,
	buttonTitle,
	errors,
	openModal,
	register,
	noButtons,
}) => {
	return (
		<form onSubmit={onSubmit()}>
			{fields.length > 0 &&
				fields.map((item, i) => {
					let name = item.name;
					switch (item.type) {
						case 'input':
							return (
								<Wrapper key={i}>
									<Label>{item.label}</Label>
									<StyledInput
										type="text"
										{...register(item.name, {
											required: item.required,
										})}
										label={item.label}
										placeholder={item.placeholder}
										name={item.name}
									/>
									{name in errors ? (
										<p>{item.errorMessage}</p>
									) : null}
								</Wrapper>
							);
						case 'textarea':
							return (
								<Wrapper key={i}>
									<Label>{item.label}</Label>
									<StyledTextArea
										type="textarea"
										{...register(item.name, {
											required: item.required,
										})}
										label={item.label}
										placeholder={item.placeholder}
										name={item.name}
										rows={3}
									/>
									{name in errors ? (
										<p>{item.errorMessage}</p>
									) : null}
								</Wrapper>
							);
						case 'select':
							return (
								<Wrapper key={i}>
									<Label>{item.label}</Label>
									<StyledSelect
										type="select"
										{...register(item.name, {
											required: item.required,
										})}
										label={item.label}
										placeholder={item.placeholder}
										name={item.name}
										onChange={(e) =>
											item.onChange(e.target.value) ||
											null
										}
									>
										<option hidden></option>
										<option value={null}></option>

										{item.options &&
											item.options.map((item, i) => {
												return (
													<option
														key={i}
														value={item.id}
													>
														{item.title}
													</option>
												);
											})}
									</StyledSelect>
									{name in errors ? (
										<p>{item.errorMessage}</p>
									) : null}
								</Wrapper>
							);
						default:
							return <p>No form element</p>;
					}
				})}
			{noButtons ? null : (
				<ButtonRow>
					<Button
						type='submit'
						dividerRight
						title={buttonTitle || 'Create'}

					/>
					<Button
						white
						onClick={() => openModal(false)}
						title='Peruuta'
					/>
				</ButtonRow>
			)}
		</form>
	);
};

export default FormCompiler;
