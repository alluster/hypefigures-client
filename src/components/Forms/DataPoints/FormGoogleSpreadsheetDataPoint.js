import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../../context/Context';

import { useForm } from 'react-hook-form';

import FormCompiler from '../../../supportFunctions/FormComplier';

const Title = styled.h4`
    margin-top: ${(props) => props.theme.grid.divider_2};
    margin-bottom: ${(props) => props.theme.grid.divider_2};
`;
const FormGoogleSpreadsheetDataPoint = ({
    openDataPointModal,
    onSubmitFunction,
    resetFunction,
    fields,
    buttonTitle,
    googleSheetsList,
    dashboardsList,
    setDataPointOpenModal,
}) => {
    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const { user } = useAuth0();
    const [sheetId, setSheetId] = useState('');
    const [spreadsheetId, setSpreadsheetId] = useState('');
    const [sheetTitle, setSheetTitle] = useState('');
    const [sheetIdFromDatabase, setSheetIdFromDatabase] = useState('');
    const [serviceAccount, setServiceAccount] = useState(
        'No Data Source Detected',
    );

    const { setNotifyMessage } = useContext(AppContext);

    const onSubmit = async (data) => {
        try {
            console.log(spreadsheetId);
            setNotifyMessage(`New Data Point ${data.dataPointName} added`);
        } catch (error) {
            console.log(error);
            setNotifyMessage(`Something went wrong, ${error}`);
        } finally {
            setDataPointOpenModal(false);
            reset();
        }
    };

    return (
        <div>
            <FormCompiler
                reset={reset}
                openModal={() => openDataPointModal()}
                errors={errors}
                onSubmit={() => handleSubmit(onSubmit)}
                register={register}
                fields={[
                    {
                        type: 'select',
                        name: 'googleSheet',
                        label: 'Select Google Sheet',
                        options: googleSheetsList,
                        placeholder: 'Select',
                        required: true,
                        errorMessage:
                            'Google Sheet is required. Add new Sheet in Data Sources view',
                        onChange: (e) => setSheetIdFromDatabase(e),
                    },
                    {
                        type: 'input',
                        name: 'cell',
                        label: 'Cell',
                        options: '',
                        required: true,
                        errorMessage: 'Data Point cell is required',
                        placeholder: 'A1, C56 ... etc.',
                    },
                    {
                        type: 'input',
                        name: 'dataPointName',
                        label: 'Name',
                        options: '',
                        required: true,
                        errorMessage: 'Data Point name is required',
                        placeholder: 'Budget, Profit, Revenue ... etc.',
                    },
                    {
                        type: 'input',
                        name: 'dataPointDescription',
                        label: 'Description',
                        options: '',
                        required: false,
                        errorMessage: '',
                        placeholder:
                            'Calculated profit for this month ... etc.',
                    },
                    {
                        type: 'select',
                        name: 'dashboard_id',
                        label: 'Add to Dashboard',
                        options: dashboardsList,
                        placeholder: 'Select',
                        required: false,
                        errorMessage: 'Dashboard',
                        onChange: () => null,
                    },
                ]}
            ></FormCompiler>
        </div>
    );
};

export default FormGoogleSpreadsheetDataPoint;
