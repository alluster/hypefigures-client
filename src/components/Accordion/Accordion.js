import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';

const AccordionContainer = styled.div`
    background-color: ${(props) => props.theme.colors.gray_20};
    border-radius: 8px;
    padding: 16px;
    margin-top: ${(props) => props.theme.grid.divider_2};
    margin-bottom: ${(props) => props.theme.grid.divider_2};
`;

const Content = styled.div``;

const Title = styled.div`
    display: flex;
    flex-direction: row;
    &: hover {
        cursor: pointer;
    }
`;
const TitleText = styled.p`
    font-size: 14px;
    font-weight: 700;
`;
const IconContainer = styled.div`
    margin-left: auto;
`;

const ArrowIcon = styled(FontAwesomeIcon)`
    font-size: 14px;
`;

const Accordion = ({ children, title }) => {
    const [open, setOpen] = useState(false);

    return (
        <AccordionContainer>
            <Content>
                <Title onClick={() => setOpen(!open)}>
                    <TitleText>{title}</TitleText>
                    <IconContainer>
                        {open ? (
                            <ArrowIcon icon={faChevronDown} />
                        ) : (
                            <ArrowIcon icon={faChevronUp} />
                        )}
                    </IconContainer>
                </Title>

                {open ? children : null}
            </Content>
        </AccordionContainer>
    );
};

export default Accordion;
