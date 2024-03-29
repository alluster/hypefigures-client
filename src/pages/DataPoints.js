import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import CardDataPoint from '../components/CardDataPoint';
import Card from '../components/Card';

import CardGrid from '../components/CardGrid';
import HeaderText from '../components/HeaderText';
import Container from '../components/Container';
import { useForm } from 'react-hook-form';
import Modal from '../components/Modal';
import FormGoogleSpreadsheetDataPoint from '../components/Forms/DataPoints/FormGoogleSpreadsheetDataPoint';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import DividerLine from '../components/DividerLine';
import { useAuth0 } from '@auth0/auth0-react';
import { AppContext } from '../context/Context';

const Logo = styled.div`
   	max-width: 40px;
	align-self: center;
	margin-right: ${(props) => props.theme.grid.divider_4};

}
`;
const GoBackContainer = styled.div`
    display: flex;
    flex-direction: row;
`;
const Icon = styled(FontAwesomeIcon)`
    color: ${(props) => props.theme.colors.fontDark};
    font-size: 20px;
    margin-right: ${(props) => props.theme.grid.divider_1};
    align-self: center;
    margin-bottom: ${(props) => props.theme.grid.divider_2};

    &:hover {
        cursor: pointer;
    }
`;
const Text = styled.h5`
    color: ${(props) => props.theme.colors.fontDark};
    white-space: nowrap;
    align-self: center;
    margin-bottom: ${(props) => props.theme.grid.divider_2};

    &:hover {
        cursor: pointer;
    }
`;
const DataPoints = () => {
    const { setPath } = useContext(AppContext);
    const { user } = useAuth0();
    const { error, loading, data } = useQuery(
        LOAD_GOOGLE_SPREADSHEET_DATA_POINTS,
        {
            variables: { org_id: user.org_id },
        },
    );
    const {
        error: sheetError,
        loading: sheetLoading,
        data: sheetData,
    } = useQuery(LOAD_GOOGLE_SHEETS, {
        variables: { org_id: user.org_id },
    });
    const {
        data: dashboardsData,
        error: dashboardsError,
        loading: dashboardsLoading,
    } = useQuery(LOAD_DASHBOARDS, {
        variables: { org_id: user.org_id },
    });
    const [openDataPointModal, setOpenDataPointModal] = useState(false);
    const [dataPoints, setDataPoints] = useState([]);
    const [dataPointSelector, setDataPointSelector] = useState('');
    const [googleSheets, setGoogleSheets] = useState([]);
    const [dashboards, setDashboards] = useState([]);

    const [googleValue, setGoogleValue] = useState({
        value: 'Loading data...',
    });
    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const DataPointSelectorHandler = () => {
        switch (dataPointSelector) {
            case 'Google Sheets':
                return (
                    <FormGoogleSpreadsheetDataPoint
                        setOpenDataPointModal={setOpenDataPointModal}
                        googleSheetsList={(googleSheets && googleSheets) || []}
                        dashboardsList={(dashboards && dashboards) || []}
                    />
                );
            case 'Google Sheets with Spreadsheet':
                return (
                    <FormGoogleSpreadsheetDataPoint
                        setOpenDataPointModal={setOpenDataPointModal}
                        googleSheetsList={(googleSheets && googleSheets) || []}
                        dashboardsList={(dashboards && dashboards) || []}
                    />
                );

            default:
                return;
        }
    };

    const DataPoints = () => {
        if (loading) {
            return <p>Loading data...</p>;
        }
        if (error) {
            console.log('error occurred', error);
        } else {
            return (
                <div>
                    <CardGrid>
                        {dataPoints.map((item, i) => {
                            return (
                                <CardDataPoint
                                    key={i}
                                    to={`/datapoints/${item.id}`}
                                    cell={item.cell || ''}
                                    spreadsheetId={item.spreadsheet_id || ''}
                                    sheetId={item.sheet_id || ''}
                                    serviceAccount={item.service_account || ''}
                                    org_id={user.org_id}
                                    title={item.title}
                                    description={item.sheet_title}
                                ></CardDataPoint>
                            );
                        })}
                    </CardGrid>
                </div>
            );
        }
    };

    useEffect(() => {
        if (data) {
            setDataPoints(data.getAllGoogleSpreadsheetDataPoints);
        }
        DataPoints();
    }, [data]);

    useEffect(() => {
        if (sheetData) {
            setGoogleSheets(sheetData.getAllGoogleSheets);
        }
    }, [sheetData]);
    useEffect(() => {
        if (dashboardsData) {
            setDashboards(dashboardsData.getAllDashboards);
        }
    }, [dashboardsData]);
    useEffect(() => {
        setPath('/dataPoints');
        window.scroll(0, 0);
    }, []);
    return (
        <div>
            <Container>
                <HeaderText
                    buttonTitle="Connect to a new Data Point"
                    onClickFunction={() =>
                        setOpenDataPointModal(!openDataPointModal)
                    }
                    locationText="Business Data Superset™"
                    title="Hyperfigures"
                    description="All your organization Hyperfigures in one dashboard"
                />

                {DataPoints()}
            </Container>
            <Modal
                open={openDataPointModal}
                openDataPointModal={() => setOpenDataPointModal()}
                modalTitle="New Data Point"
            >
                {dataPointSelector === '' ? (
                    <div>
                        <GoBackContainer>
                            <h5>Select Data Source</h5>
                        </GoBackContainer>
                        <DividerLine />

                        <Card
                            onClick={() =>
                                setDataPointSelector('Google Sheets')
                            }
                            row
                        >
                            <Logo>
                                <img
                                    src="/google_sheets.png"
                                    alt="Google Sheets"
                                />
                            </Logo>
                            <div>
                                <p>integration</p>
                                <h5>Google Sheets with selected Cell</h5>
                            </div>
                        </Card>
                        <Card
                            onClick={() =>
                                setDataPointSelector(
                                    'Google Sheets with Spreadsheet',
                                )
                            }
                            row
                        >
                            <Logo>
                                <img
                                    src="/google_sheets.png"
                                    alt="Google Sheets"
                                />
                            </Logo>
                            <div>
                                <p>integration</p>
                                <h5>Google Sheets with Spreadsheet</h5>
                            </div>
                        </Card>
                    </div>
                ) : (
                    <div>
                        <GoBackContainer
                            onClick={() => setDataPointSelector('')}
                        >
                            <Icon icon={faArrowLeft} />
                            <Text>Go Back</Text>
                        </GoBackContainer>
                        <DividerLine />
                    </div>
                )}

                {DataPointSelectorHandler()}
            </Modal>
        </div>
    );
};

export default DataPoints;
