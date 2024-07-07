import React, { useContext } from 'react';
import styled from 'styled-components';
import { device } from '../../styles/device-braking-points';
import { AppContext } from '../../context/Context';

const Wrapper = styled.div`
    z-index: 4;
	position: relative;
    margin-left: 100px;
    min-height: 100vh;
    padding-bottom: 200px;
    padding-right: ${(props) => props.theme.grid.divider_2};
    @media ${device.laptop} {
	    margin-left: 0px;

        padding-left: ${(props) => props.theme.grid.divider_2};
    }
`;
const MarginContainer = styled.div`
    ${({ sideBarOpen, navigationOpen }) => {
		if (sideBarOpen && !navigationOpen) {
			return `
                margin-left: 160px;
				 @media ${device.laptop} {
	    			margin-left: 0px;
				}
            `;
		} else if (!sideBarOpen && navigationOpen) {
			return `
                margin-left: 160px;
				 @media ${device.laptop} {
	    			margin-left: 0px;
				}
            `;
		} else if (!sideBarOpen && !navigationOpen) {
			return `
                margin-left: 10px;
				 @media ${device.laptop} {
	    			margin-left: 0px;
				}
            `;
		} else if (sideBarOpen && navigationOpen) {
			return `
                margin-left: 340px;
				 @media ${device.laptop} {
	    			margin-left: 0px;
				}
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
