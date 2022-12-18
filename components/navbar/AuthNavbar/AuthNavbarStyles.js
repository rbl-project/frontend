import styled from "styled-components";

export const AuthNavbarWrapper = styled.div`
    /* display: flex;
    justify-content: space-between;
    align-items: center; */
    /* width: 100%;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    position: absolute;
    flex-wrap: wrap; */

`;

export const AuthNavbarDiv = styled.div`
    max-width: 1280px; // for min-width 1536px
    padding-left: 1rem;
    padding-right: 1rem;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;

`;

export const AuthNavbarLeft = styled.div`

    display: flex;

`;

export const AuthNavbarRight = styled.div`

    display : flex;

`;

export const List = styled.ul`
    display: flex;
`;

export const ListOption = styled.li`

    display: inline-block;
    margin: 0 1rem;

`;

export const HomeButton = styled.a`

    text-transform: uppercase;
    color: rgba(51,65,85,1);
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    outline: 2px solid transparent;
    outline-offset: 2px;
    font-size: .75rem;
    line-height: 1rem;
    font-weight: 700;
    border-radius: 0.25rem;
    background-color: rgba(255,255,255,1);
    text-decoration: inherit;
    transition-timing-function: linear;
    transition-property: all;
    transition-duration: .15s;

`;