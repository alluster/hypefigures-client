import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useForm } from 'react-hook-form';
import Spreadsheet from 'react-spreadsheet';
import FormCompiler from '../../../supportFunctions/FormComplier';

const Title = styled.h4`
    margin-top: ${(props) => props.theme.grid.divider_2};
    margin-bottom: ${(props) => props.theme.grid.divider_2};
`;
const SpreadsheetGoogle = ({
    openModal,
    onSubmitFunction,
    resetFunction,
    fields,
    buttonTitle,
    googleSheetsList,
    dashboardsList,
    setOpenModal,
}) => {
    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const {
        error: googleError,
        loading: googleLoading,
        data: googleData,
    } = useQuery(GET_GOOGLE_SHEET, {
        variables: {
            // spreadsheetId: `${selectedSheetData.length > 0 ? selectedSheetData[0].spreadsheet_id : null}`,
            // sheetId: `${selectedSheetData.length > 0 ? selectedSheetData[0].sheet_id : null}`,
            // org_id: `${selectedSheetData.length > 0 ? selectedSheetData[0].org_id : null}`
            spreadsheetId: '1sZa5SFz5sHx7oB7MtZZMjOq4e-UG5PlAPhoTXj_0QBQ',
            sheetId: '2038099975',
            org_id: 'org_b3rZUXPLA1nX18Fm',
        },
    });
    const [selectedSheet, setSelectedSheet] = useState('');
    const [selectedSheetData, setSelectedSheetData] = useState([]);
    const [data, setData] = useState([
        [{ value: 'Vanilla' }, { value: 'Chocolate' }],
        [{ value: 'Strawberry' }, { value: 'Cookies' }],
    ]);

    const onSubmit = async (data) => {
        try {
            // console.log(spreadsheetId);
        } catch (error) {
            console.log(error);
        } finally {
            reset();
        }
    };

    const GetSelectedSheetData = () => {
        let response =
            googleSheetsList.length > 0
                ? googleSheetsList.filter((item) => item.id === selectedSheet)
                : [];
        setSelectedSheetData(response);
    };

    useEffect(() => {
        GetSelectedSheetData();
    }, [selectedSheet]);

    useEffect(() => {
        console.log(selectedSheetData);
        console.log('google data', googleData);
    }, [selectedSheetData]);

    useEffect(() => {
        if (googleLoading) {
            console.log('google data from GoogleSheetGetter', googleData);
        } else {
            console.log(
                'google data from GoogleSheetGetter',
                googleData.getGoogleSpreadsheet,
            );
        }
    }, [googleData]);

    return (
        <div>
            <FormCompiler
                reset={reset}
                errors={errors}
                onSubmit={() => handleSubmit(onSubmit)}
                register={register}
                noButtons={true}
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
                        onChange: (e) => setSelectedSheet(e),
                    },
                ]}
            ></FormCompiler>

            <Spreadsheet data={data} onChange={setData} />
        </div>
    );
};

export default SpreadsheetGoogle;
