import React, { useContext, useState, useRef } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import Button from '../../Button/Button';
import SpinnerSmall from '../../Spinner/SpinnerSmall';
import { AppContext } from '../../../context/Context';
import ReCAPTCHA from "react-google-recaptcha";
import Checkbox from '../../Input/Checkbox';

const WarningText = styled.p`
    color: red;
	font-size: 18px;
`;

const ButtonRow = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap;
    width: 100%;
    margin-top: ${(props) => props.theme.grid.divider_4};
`;
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
`;

const InputWrapper = styled.div`
    // margin-top: ${(props) => props.theme.grid.divider_4};
    margin-bottom: 16px;
    margin-top: 16px;
`;

const Label = styled.label`
    font-size: 16px;
    font-weight: 400;
    margin-bottom: ${(props) => props.theme.grid.divider_1};
    display: inline-block;
`;
const FormContainer = styled.div`
	// margin-left: auto;
	// margin-right: auto;
	max-width: 400px;
`;

const RegisterForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { Register, loadingUser } = useContext(AppContext);
	const [agreed, setAgreed] = useState(false);
	const onSubmit = async (data) => {
		try {
			const recaptcha_token = await captchaRef.current.getValue();
			captchaRef.current.reset();
			await Register({
				first_name: data.firstName,
				last_name: data.lastName,
				email: data.email,
				password: data.password,
				recaptcha_token: recaptcha_token
			});
		} catch (error) {
			console.error('Error during registration:', error);
		}
	};
	const captchaRef = useRef(null)

	return (
		<FormContainer>
			{
				loadingUser ?
					<SpinnerSmall />
					:
					<form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
						<InputWrapper>
							<Label>Your email address</Label>
							<StyledInput
								type="text"
								{...register('email', { required: true })}
								label="Email"
								placeholder=""
								name="email"
							/>
							{errors.email && (
								<WarningText>Email is required.</WarningText>
							)}
						</InputWrapper>
						<InputWrapper>
							<Label>First name</Label>
							<StyledInput
								type="text"
								{...register('firstName', { required: true })}
								label="First name"
								placeholder=""
								name="firstName"
							/>
							{errors.firstName && (
								<WarningText>First name is required.</WarningText>
							)}
						</InputWrapper>
						<InputWrapper>
							<Label>Family name</Label>
							<StyledInput
								type="text"
								{...register('lastName', { required: true })}
								label="Last name"
								placeholder=""
								name="lastName"
							/>
							{errors.lastName && (
								<WarningText>Last name is required.</WarningText>
							)}
						</InputWrapper>

						<InputWrapper>
							<Label>Create a new Password</Label>
							<StyledInput
								type="input"
								{...register('password', { required: true })}
								label="Create a new Password"
								placeholder=""
								name="password"
							/>
							{errors.password && (
								<WarningText>Password is required.</WarningText>
							)}
						</InputWrapper>
						<InputWrapper>
							<Checkbox
								label='By registering, you agree to Hyperfigures Terms of Use.'
								required={true}
								{...register('agreed', { required: true })}
								name='agreed'
								id={`checkbox-agreed`}
								checked={agreed}
								onChange={() => setAgreed(!agreed)} />
							{errors.password && (
								<WarningText>Please agree to the terms.</WarningText>
							)}
						</InputWrapper>
						<ReCAPTCHA
							sitekey='6LcUjgIqAAAAAFDVbebMdGhEbQU4bNoZWiGZcVQu'
							ref={captchaRef}
						/>
						<ButtonRow>
							<Button primary dividerRight type="submit" title='Register' />
							<Button layoutType='link' to='/' ghost={true} dividerRight type="button" title='Sign In' />

						</ButtonRow>
					</form>

			}

		</FormContainer>

	);
};

export default RegisterForm;
