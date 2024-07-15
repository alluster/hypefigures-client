import React from 'react';
import styled from 'styled-components';

const BackgroundDiv = styled.div`
  position: fixed;
  width: 100%;
  height: 100%; /* Adjust this as per your layout requirements */
  overflow: hidden;
  background-color: #060218;

  left:0px;
  top: 0px;
    z-index: -10;
`;

const BGImg = styled.img`
display:fixed;
  margin-left: auto;
  margin-right: auto;
  top: 0px;
  height: 100%;
  width: 100%;
  object-fit: cover;

  z-index: 10;
`;

const Background = () => {
	return (
		<BackgroundDiv>
			<BGImg src='./app-images/bg-lila.svg' />
		</BackgroundDiv>
	);
}

export default Background;
