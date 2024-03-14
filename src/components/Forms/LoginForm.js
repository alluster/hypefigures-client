import React, { useContext } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import Container from '../Container';
import SpinnerSmall from '../SpinnerSmall';
import { AppContext } from '../../context/Context';

const WarningText = styled.p`
    color: red;
	font-size: 18px;
`;

const ButtonRow = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
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
	margin-left: auto;
	margin-right: auto;
	max-width: 400px;
`;



const LoginForm = () => {
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const { Login, loadingUser } = useContext(AppContext);

	const onSubmit = (data) => {
		Login({
			email: data.email,
			password: data.password
		})
	};
	return (
		<FormContainer>
			{
				loadingUser ?
					<SpinnerSmall />
					:
					<form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
						<InputWrapper>
							<Label>Email</Label>
							<StyledInput
								type="text"
								{...register('email', { required: true })}
								label="Email"
								placeholder=""
								name="email"
							/>
							{errors.username && (
								<WarningText>Username is required.</WarningText>
							)}
						</InputWrapper>
						<InputWrapper>
							<Label>Password</Label>
							<StyledInput
								type="password"
								{...register('password', { required: true })}
								label="Password"
								placeholder=""
								name="password"
							/>
							{errors.password && (
								<WarningText>Password is required.</WarningText>
							)}
						</InputWrapper>
						<ButtonRow>
							<Button primary dividerRight type="submit">
								{'Login'}
							</Button>

						</ButtonRow>
					</form>


			}

		</FormContainer>

	);
};

export default LoginForm;
