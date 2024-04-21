import React, { useContext } from 'react';
import styled from 'styled-components';
import { device } from '../../styles/device-braking-points';
import { AppContext } from '../../context/Context';

const Wrapper = styled.div`
    z-index: 2;
    margin-left: 100px;
    min-height: 100vh;
    padding-bottom: 200px;
    padding-right: ${(props) => props.theme.grid.divider_2};
    @media ${device.laptop} {
        padding-left: ${(props) => props.theme.grid.divider_2};
        padding-top: ${(props) => props.theme.grid.divider_12};
    }
`;
const MarginContainer = styled.div`
    ${({ sideBarOpen, navigationOpen }) => {
		if (sideBarOpen && !navigationOpen) {
			return `
                margin-left: 160px;
            `;
		} else if (!sideBarOpen && navigationOpen) {
			return `
                margin-left: 160px;
            `;
		} else if (!sideBarOpen && !navigationOpen) {
			return `
                margin-left: 10px;
            `;
		} else if (sideBarOpen && navigationOpen) {
			return `
                margin-left: 340px;
            `;
		}
	}}
`;

const Container = ({ children }) => {
	const { sideBarOpen, navigationOpen } = useContext(AppContext);

	return (
		<Wrapper>
			<MarginContainer sideBarOpen={sideBarOpen} navigationOpen={navigationOpen}>
				{children}
			</MarginContainer>
		</Wrapper>
	);
};

export default Container;
