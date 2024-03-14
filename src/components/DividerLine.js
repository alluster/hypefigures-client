import React from 'react';
import styled from 'styled-components';

const LineWrapper = styled.div`
    border-bottom: 1px solid #000000;
    width: 100%;
    margin-top: ${(props) => props.theme.grid.divider_3};
    margin-bottom: ${(props) => props.theme.grid.divider_3};
`;

const DividerLine = () => {
    return <LineWrapper />;
};

export default DividerLine;
