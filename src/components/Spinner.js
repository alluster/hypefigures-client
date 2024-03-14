import React from 'react';
import styled from 'styled-components';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { device } from '../device';

const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    flex-direction: column;
    height: 100vh;
    @media ${device.laptop} {
        width: 100%;
    }
`;

const Spinner = () => {
    return (
        <SpinnerContainer>
            <ScaleLoader color="#BDBDBD" />
            <p style={{ color: '#BDBDBD', marginTop: '24px' }}>
                Ladataan sisältöä...
            </p>
        </SpinnerContainer>
    );
};

export default Spinner;
