import React from 'react';
import styled from 'styled-components';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { device } from '../../styles/device-braking-points';

const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    flex-direction: column;

    @media ${device.laptop} {
        width: 100%;
    }
`;

const SpinnerSmall = () => {
	return (
		<SpinnerContainer>
			<ScaleLoader color="#BDBDBD" />
		</SpinnerContainer>
	);
};

export default SpinnerSmall;
