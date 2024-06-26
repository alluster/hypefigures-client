import React, { useContext } from 'react';
import styled from 'styled-components';
import { device } from '../../styles/device-braking-points';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppContext } from '../../context/Context';
import {
	faChevronLeft,
	faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

const SideNav = styled.div`
    position: fixed;
    background-color: ${(props) => props.theme.colors.white};
    border-right: 1px solid ${(props) => props.theme.colors.gray_60};
    margin-left: 40px;
    width: 40px;
    height: 100%;
    top: 0px;
    display: flex;
    flex-direction: column;
    z-index: 10000000;
    box-sizing: border-box;

    &: hover {
        overflow-y: auto;
    }

    ${({ open }) =>
		open &&
		`
		width: 200px;
		// -webkit-transition: width 0.2s ease-in-out;
		// -moz-transition: width 0.2s ease-in-out;
		// -o-transition: width 0.2s ease-in-out;
		// transition: width 0.2s ease-in-out;
	`}
    ${({ navigationOpen }) =>
		navigationOpen &&
		`
		margin-left: 200px;
		// -webkit-transition: width 0.2s ease-in-out;
		// -moz-transition: width 0.2s ease-in-out;
		// -o-transition: width 0.2s ease-in-out;
		// transition: width 0.2s ease-in-out;
	`}
	@media ${device.laptop} {
        display: none;
    }
`;

const Links = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 0px;
    margin-left: 20px;
    margin-right: 20px;
    height: 100%;
    align-items: left;

    @media ${device.laptop} {
        margin-top: ${(props) => props.theme.grid.divider_2};
    }
`;

const ArrowContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    align-items: flex-end;
    &:hover {
        cursor: pointer;
    }
`;

const Icon = styled(FontAwesomeIcon)`
    color: ${(props) => props.theme.colors.primary_100};
    height: 12px;
    min-width: 64px;
`;
const IconArrow = styled(FontAwesomeIcon)`
    height: 12px;
    min-width: 40px;
`;

// Mobile nav styles

const MobileNav = styled.div`
    position: absolute;
    width: 100%;
    min-height: 100vh;
    left: 0px;
    top: 0px;
    display: none;
    flex-direction: column;
    z-index: 10000000;
    background-color: ${(props) => props.theme.colors.white};

    ${({ mobileNavOpen }) =>
		mobileNavOpen &&
		`
		display: flex;
		width: 100%;
		// -webkit-transition: width 0.2s ease-in-out;
		// -moz-transition: width 0.2s ease-in-out;
		// -o-transition: width 0.2s ease-in-out;
		// transition: width 0.2s ease-in-out;
	`}
    @media ${device.laptop} {
    }
`;

const MobileNavToggleContainer = styled.div`
    display: none;
    flex-direction: row;
    width: 100%;
    height: 60px;
    background-color: rgba(255, 255, 255, 0.8);
    @media ${device.laptop} {
        display: flex;
        position: absolute;
    }
`;
const LogoMobile = styled.div`
    z-index: 2;
    height: 20px;
    align-self: center;
    padding-left: ${(props) => props.theme.grid.divider_2};
`;

const LogoMobileImage = styled.img`
    align-self: center;
    height: 16px;
`;

const MobileNavToggler = styled.div`
    margin-left: auto;
    justify-content: right;
    display: none;
    z-index: 10000000000;
    text-align: right;
    align-items: flex-end;

    @media ${device.laptop} {
        display: flex;
    }
`;

const ToggleIcon = styled(Icon)`
    align-self: center;
    color: ${(props) => props.theme.colors.fontDark};
    line-height: 30px;
`;

const SideBar = ({ children }) => {
	const { sideBarOpen, setSideBarOpen, navigationOpen } =
		useContext(AppContext);

	return (
		<SideNav open={sideBarOpen} navigationOpen={navigationOpen}>
			<ArrowContainer onClick={() => setSideBarOpen(!sideBarOpen)}>
				{!sideBarOpen && <IconArrow icon={faChevronRight} />}
				{sideBarOpen && <IconArrow icon={faChevronLeft} />}
			</ArrowContainer>
			<Links>{sideBarOpen ? children : null}</Links>
		</SideNav>
	);
};

export default SideBar;
