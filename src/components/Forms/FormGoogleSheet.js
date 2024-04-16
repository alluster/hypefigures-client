import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../context/Context';

import { useForm } from 'react-hook-form';
import TextWithLabel from '../Text/TextWithLabel';
import { useAuth0 } from '@auth0/auth0-react';
import { device } from '../../device';
import DividerLine from '../Container/DividerLine';
import Button from '../Button/Button';

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
`;
const StyledSelect = styled.select`
    background-color: ${(props) => props.theme.colors.white};
    height: 56px;
    width: calc(100% - ${(props) => props.theme.grid.divider_6});
    border: 1px solid ${(props) => props.theme.colors.fontDark};
    border-radius: 8px;
    font-size: 18px;
    color: ${(props) => props.theme.colors.fontDark};
    padding-left: ${(props) => props.theme.grid.divider_2};
    padding-right: ${(props) => props.theme.grid.divider_2};
    margin-bottom: ${(props) => props.theme.grid.divider_1};
    // padding: 0.4%;
    line-height: 56px;
    -ms-box-sizing: content-box;
    -moz-box-sizing: content-box;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    @media ${device.laptop} {
    }
`;
const StyledTextArea = styled.textarea`
    background-color: ${(props) => props.theme.colors.white};
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
    ${({ disabled }) =>
		disabled &&
		`
		border: 1px solid gray;
		background-color: #dddddd;

	`};
    @media ${device.laptop} {
    }
`;
const WarningText = styled.p`
    color: red;
    font-size: 10px;
`;

const ButtonRow = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    margin-top: ${(props) => props.theme.grid.divider_4};
`;
const HelperText = styled.p`
    margin-top: ${(props) => props.theme.grid.divider_2};
    margin-bottom: ${(props) => props.theme.grid.divider_2};
`;
const Title = styled.h4`
    margin-top: ${(props) => props.theme.grid.divider_2};
    margin-bottom: ${(props) => props.theme.grid.divider_2};
`;
const FormGoogleSheet = ({ openModal, buttonTitle, setOpenModal }) => {
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const { user } = useAuth0();

	const { setNotifyMessage } = useContext(AppContext);
	const onSubmit = async (data) => {
		try {
			setNotifyMessage(`New integration ${data.displayName} added`);
			openModal(false);
			reset();
		} catch (error) {
			console.log(error);
			setNotifyMessage(`Something went wrong, ${error}`);
		}
	};

	return (
		<form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
			<TextWithLabel
				title={
					<p>
						1. Invite{' '}
						<a
							target="blank"
							style={{ color: 'blue' }}
							href="/datasources"
						>
							Hyperfigures Google Service Account
						</a>{' '}
						as viewer to the Google Sheet you want to connect to.
					</p>
				}
				label=""
			/>
			<DividerLine />

			<HelperText>
				2. Copy the spreadsheet ID as displayed in the image.
			</HelperText>
			<img src="/spreadsheet_id.jpg" />
			<InputWrapper>
				<StyledInput
					type="text"
					{...register('spreadsheetId', { required: true })}
					label="Spreadsheet ID"
					placeholder="Paste the copied ID here"
					name="spreadsheetId"
				/>
				{errors.spreadsheetId && (
					<WarningText>Spreadsheet ID is required.</WarningText>
				)}
			</InputWrapper>

			<DividerLine />
			<HelperText>
				3. Copy the Sheet ID as displayed in the image.
			</HelperText>
			<img src="/sheet_id.jpg" />
			<InputWrapper>
				<StyledInput
					type="text"
					{...register('sheetId', { required: true })}
					label="Sheet ID"
					placeholder="Paste the copied ID here"
					name="sheetId"
				/>
				{errors.sheetId && (
					<WarningText>Sheet ID is required.</WarningText>
				)}
			</InputWrapper>

			<DividerLine />
			<HelperText>
				4. Provide additional information about the sheet
			</HelperText>
			<InputWrapper>
				<Label>Name</Label>
				<StyledInput
					type="text"
					{...register('displayName', { required: true })}
					label="Display name"
					placeholder="Annual report, Financial numbers.. etc."
					name="displayName"
				/>
				{errors.displayName && (
					<WarningText>Name is required.</WarningText>
				)}
			</InputWrapper>
			<InputWrapper>
				<Label>Description</Label>
				<StyledInput
					type="text"
					{...register('description', { required: true })}
					label="Description"
					placeholder="Numbers from marketing, Business unit data... etc."
					name="description"
				/>
				{errors.description && (
					<WarningText>Description is required.</WarningText>
				)}
			</InputWrapper>

			<ButtonRow>
				<Button primary dividerRight type="submit">
					{buttonTitle || 'Integrate'}
				</Button>
				<Button type="reset" white onClick={() => openModal(false)}>
					Cancel
				</Button>
			</ButtonRow>
		</form>
	);
};

export default FormGoogleSheet;
