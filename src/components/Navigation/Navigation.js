import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { device } from '../../styles/device-braking-points';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faDatabase,
	faTh,
	faUser,
	faBars,
	faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../../context/Context';

const SideNav = styled.div`
    position: fixed;
    background-color: ${(props) => props.theme.colors.white};
    border-right: 1px solid ${(props) => props.theme.colors.gray_60};
    color: .primary_100;
    width: 40px;
    height: 100vh;
    min-height: 500px;
    left: 0px;
    top: 0px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    z-index: 10000000;
    ${({ open }) =>
		open &&
		`
		width: 200px;
		-webkit-transition: width 0.2s ease-in-out;
		-moz-transition: width 0.2s ease-in-out;
		-o-transition: width 0.2s ease-in-out;
		transition: width 0.2s ease-in-out;
	`}
    @media ${device.laptop} {
        display: none;
    }
`;

const Tooltip = styled.div`
    visibility: hidden;
    background-color: ${(props) => props.theme.colors.primary_100};
    color: ${(props) => props.theme.colors.white};
    text-align: left;
    line-height: 44px;
    padding: 32px;
    border-radius: 4px;
    position: absolute;
    margin-top: -4px;
    margin-left: 70px;
    width: 400px;
    box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 2px 0px;
    ::before {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border-width: 8px;
        border-style: solid;
        border-color: transparent ${(props) => props.theme.colors.primary_100}
            transparent transparent;
        top: 14px;
        left: -16px;
    }
`;

const Links = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 60px;
    align-items: left;
    @media ${device.laptop} {
        margin-top: ${(props) => props.theme.grid.divider_2};
    }
`;

const BarsIcon = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    align-items: left;
    &:hover {
        color: white;
        cursor: pointer;
    }
`;

const LogoIcon = styled.img`
    height: 18px;
    fill: white;
`;
const Logo = styled.img`
    height: 12px;
    align-self: flex-start;
    margin-left: 16px;
    fill: white;
`;


const IconContainer = styled.div`
    height: 20px;
    width: 40px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Icon = styled(FontAwesomeIcon)`
    color: ${(props) => props.theme.colors.primary_100};
    height: 16px;
    width: 40px;
`;
// const IconPhone = styled(FontAwesomeIcon)`
// 	color: ${props => props.theme.colors.gray_100};
// 	height: 32px;
// 	min-width: 64px;
// `;
const LinkText = styled.h6`
    color: ${(props) => props.theme.colors.gray_fontDark};
    margin-left: 0px;
    white-space: nowrap;
    line-height: 20px;
    font-weight: 500;
	font-size: 16px;
`;

const LinkContainer = styled(Link)`
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    &:hover {
        cursor: pointer;
        color: ${(props) => props.theme.colors.fontDark};
        background-color: ${(props) => props.theme.colors.gray_20};
        ${Tooltip} {
            visibility: visible;
        }
        ${Icon} {
            color: ${(props) => props.theme.colors.primary_100};
        }
        ${LinkText} {
            color: ${(props) => props.theme.colors.fontDark};
        }
    }
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
		-webkit-transition: width 0.2s ease-in-out;
		-moz-transition: width 0.2s ease-in-out;
		-o-transition: width 0.2s ease-in-out;
		transition: width 0.2s ease-in-out;
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

const Navigation = () => {
	const { setNavigationOpen, navigationOpen, isAuthenticated } = useContext(AppContext);


	const routeList = [
		// {
		// 	link: '/datapoints',
		// 	icon: faTh,
		// 	title: 'Hyperfigures',
		// 	ingress: 'Welcome to Hyperfigures!',
		// 	description: 'Business Data Supersets'
		// },
		{
			link: '/dashboards',
			icon: faTh,
			title: 'Dashboards',
			ingress: 'All data in one view!',
			description: 'Connect data points from various sources',
		},
		{
			link: '/datasources',
			icon: faDatabase,
			title: 'Data Sources',
			ingress: 'Your Business Data in One View!',
			description: 'Combined view to your business data',
		},
		{
			link: '/user',
			icon: faUser,
			title: 'User',
			ingress: 'Your Business Data in One View!',
			description: 'Combined view to your business data',
		},
	];
	const [mobileNavOpen, setMobileNavOpen] = useState(false);

	return isAuthenticated ? (
		<div>
			<MobileNavToggleContainer mobileNavOpen={mobileNavOpen}>
				<LogoMobile>
					<LogoMobileImage src="/logos/icon-dark.svg" />
				</LogoMobile>

				<MobileNavToggler
					mobileNavOpen={mobileNavOpen}
					onClick={() => setMobileNavOpen(!mobileNavOpen)}
				>
					{!mobileNavOpen && <ToggleIcon icon={faBars} />}
					{mobileNavOpen && <ToggleIcon icon={faTimes} />}
				</MobileNavToggler>
			</MobileNavToggleContainer>

			<MobileNav mobileNavOpen={mobileNavOpen}>
				<Links>
					{routeList.map((item, i) => {
						return (
							<LinkContainer
								key={i}
								to={item.link}
								onClick={() => setMobileNavOpen(false)}
							>
								<IconContainer>
									<Icon icon={item.icon} />
								</IconContainer>

								{mobileNavOpen && (
									<LinkText>{item.title}</LinkText>
								)}
							</LinkContainer>
						);
					})}
				</Links>
			</MobileNav>
			<SideNav open={navigationOpen}>
				<BarsIcon onClick={() => setNavigationOpen(!navigationOpen)}>
					{!navigationOpen && <LogoIcon src="/logos/icon-dark.svg" />}
					{navigationOpen && <Logo src="/logos/text-dark.svg" />}
				</BarsIcon>
				<Links>
					{routeList.map((item, i) => {
						return (
							<LinkContainer
								key={i}
								to={item.link}
							// onClick={() => setSideBarOpen(false)}
							>
								<IconContainer>
									<Icon icon={item.icon} />
								</IconContainer>
								{
									// !sideBarOpen &&
									// <Tooltip>
									// 	<p style={{ fontWeight: 'bold' }}>
									// 		{item.ingress}
									// 	</p>
									// 	<h4 style={{ fontWeight: 'bold', marginTop: '8px', marginBottom: '8px' }}>
									// 		{item.title}
									// 	</h4>
									// 	{/* <p>
									// 		{item.description}
									// 	</p> */}
									// </Tooltip>
								}
								{navigationOpen && (
									<LinkText>{item.title}</LinkText>
								)}
							</LinkContainer>
						);
					})}
				</Links>
				{/* <Phone to="/contact"
				onClick={() => setSideBarOpen(false)}

			>
				<IconPhone icon={faPhone}></IconPhone>
				{!sideBarOpen && <Tooltip>Ota yhteyttä</Tooltip>}
				{sideBarOpen && <LinkText>Ota yhteyttä</LinkText>}
			</Phone> */}
			</SideNav>
		</div>
	) : null;
};

export default Navigation;
