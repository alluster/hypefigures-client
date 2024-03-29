import styled from 'styled-components';

const BackgroundOverlay = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
`;

export default BackgroundOverlay;
