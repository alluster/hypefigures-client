import React, { useContext } from 'react';
import styled from 'styled-components';
import { device } from '../../styles/device-braking-points';
import { AppContext } from '../../context/Context';

const Wrapper = styled.div`
    z-index: 2;
    // max-width: 1200px;
    // margin-left: auto;
    // margin-right: auto;
    min-height: 100vh;
    padding-bottom: 200px;
    padding-top: ${(props) => props.theme.grid.divider_4};
    padding-left: 138px;
    padding-right: ${(props) => props.theme.grid.divider_2};

    @media ${device.laptop} {
        padding-left: ${(props) => props.theme.grid.divider_2};
        padding-top: ${(props) => props.theme.grid.divider_12};
    }
`;
const SideBarMargin = styled.div`
    ${({ sideBarOpen }) =>
		sideBarOpen &&
		`
			margin-left: 260px;
	`}
`;
const NavigationMargin = styled.div`
    ${({ navigationOpen }) =>
		navigationOpen &&
		`
			margin-left: 220px;

	`}
`;

const Container = ({ children }) => {
	const { sideBarOpen, navigationOpen } = useContext(AppContext);

	return (
		<Wrapper>
			<SideBarMargin sideBarOpen={sideBarOpen}>
				<NavigationMargin navigationOpen={navigationOpen}>
					{children}
				</NavigationMargin>
			</SideBarMargin>
		</Wrapper>
	);
};

export default Container;
