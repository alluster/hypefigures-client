import React from 'react';
import styled from 'styled-components';
import { device } from '../../device';

const FooterWrapper = styled.div`
    bottom: 0px !important;
    background-color: ${(props) => props.theme.colors.primary_200};
    z-index: 2;
    position: relative;
    width: 100%;
`;
const FooterContent = styled.div`
    display: flex;
    flex-direction: column;
    max-width: calc(100% - ${(props) => props.theme.grid.divider_10});
    padding-left: calc(280px + ${(props) => props.theme.grid.divider_2});
    padding-top: ${(props) => props.theme.grid.divider_6};
    margin-left: ${(props) => props.theme.grid.divider_10};

    color: ${(props) => props.theme.colors.white};
    width: 100%;
    background-color: ${(props) => props.theme.colors.primary_200};

    @media ${device.laptop} {
        margin-left: 0px;
        text-align: center;
        align-items: center;
        justify-content: center;
        max-width: 100%;
    }
`;
const Links = styled.div`
	margin-top: 60px;	
	margin-right: ${(props) => props.theme.grid.divider_2};
	margin-bottom: 20px;
	display: flex;
	flex-direction: row;
	text-align: center;
	bottom: 0px;
	justify-content: space-between;
	background-color: ${(props) => props.theme.colors.primary_200};
	@media ${device.laptop} {
		flex-direction: column;
		margin-right: 0px;
		width: 100%;
		align-items: center;
		justify-content: center;

}
  
}
`;

const Logo = styled.div`
    max-width: 260px;
    margin-bottom: ${(props) => props.theme.grid.divider_2};
    @media ${device.laptop} {
        width: 100%;
        margin-left: auto;
        margin-right: auto;
    }
`;
const Description = styled.h6`
    max-width: 500px;
    @media ${device.laptop} {
        max-width: 100vw;
        padding-left: ${(props) => props.theme.grid.divider_2};
        padding-right: ${(props) => props.theme.grid.divider_2};
    }
`;

const Footer = ({ locationText, title, description }) => {
	return (
		<FooterWrapper>
			<FooterContent>
				<Logo>
					<img src="/logos/logo-text-light.svg" alt="Logo" />
				</Logo>
				<Description>
					We help organizations create Supersets™ from business data
					stored in online data providers.
				</Description>
				<Links>
					<h6>www.hyperfigures.com</h6>
					<h6>© HYPERFIGURES 2024</h6>
				</Links>
			</FooterContent>
		</FooterWrapper>
	);
};

export default Footer;
