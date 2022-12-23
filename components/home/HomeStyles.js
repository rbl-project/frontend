import styled from "styled-components";

export const HeadingTextPrimary = styled.h2`
    tab-size: 4;
    font-weight: 600;
    font-size: 2.25rem;
    line-height: 2.5rem;
    color: rgba(71,85,105,1);
`;

export const HeadingTextSecondary = styled.p`
    color: rgba(100,116,139,1);
    font-size: 1.125rem;
    line-height: 1.625;
    margin-top: 1rem;

`

export const HomeButton = styled.a`

    text-transform: uppercase;
    color: ${props => props.type === 'dark' ? "white" : "rgba(51,65,85,1)"};
    background-color: ${props => props.type === 'dark' ? "rgba(51,65,85,1)" : "white"};
    border: 1px solid rgba(51,65,85,1);
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    outline: 2px solid transparent;
    outline-offset: 2px;
    font-size: 1rem;
    line-height: 1rem;
    font-weight: 700;
    border-radius: 0.25rem;
    text-decoration: inherit;
    transition-timing-function: linear;
    transition-property: all;
    transition-duration: .15s;
    margin-right: 1rem;

`;