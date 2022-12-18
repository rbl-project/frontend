import styled from "styled-components";

export const Section = styled.section`
    height: 100vh;
    padding: 3rem 0rem;
`

export const FormHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

`;

export const SocialButtonWrapper = styled.div`
    text-align: center;
    /* overflow-wrap: break-word; */
    color: rgba(51,65,85,1);
`;

export const SocialLoginBUtton = styled.button`
    display: inline-flex;
    align-items: center;
    border-radius: 0.25rem;
    background-color: rgba(255,255,255,1);
    font-size: .75rem;
    line-height: 1rem;
    font-weight: 700;
    text-transform: uppercase;
    color: rgba(51,65,85,1);
    box-shadow: 1px 1px 4px #9b9b9b;
    padding: 0.5rem 1rem;
    outline: 2px solid transparent;
    outline-offset: 2px;
    margin-right: 0.5rem;
    margin-bottom: 0.25rem;
    border: none;
    cursor: pointer;

    :hover {
        box-shadow: 1px 1px 4px #6a6a6a;
    }
`;

export const CustomFormField = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 0.75rem;

`;

export const CustomLable = styled.label`
    color: rgba(71,85,105,1);
    margin-bottom: 0.5rem;
    font-size: .75rem;
    line-height: 1rem;
    font-weight: 700;
    text-transform: uppercase;

`;

export const CustomInputField = styled.input`
    background-color: rgba(255,255,255,1);
    border-radius: 0.25rem;
    border-width: 0;
    font-size: .875rem;
    line-height: 1.25rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    color: rgba(71,85,105,1);
    width: 100%;
    transition-property: all;
    transition-timing-function: linear;
    transition-duration: .15s;
    margin-top: 0.3rem;
    outline: none;

`

export const CustomCheckBox = styled.input`
    margin-right: 0.5rem;
    width: auto;
    background-color: white;

    :checked{
        background-color: currentColor;
    }

`;

export const SunmitButton = styled.button`
    width: 100%;
    cursor: pointer;
    background-color: rgba(30,41,59,1);
    color: rgba(255,255,255,1);
    text-transform: uppercase;
    border-radius: 0.25rem;
    font-weight: 700;
    font-size: .875rem;
    line-height: 1.25rem;
    outline: 2px solid transparent;
    outline-offset: 2px;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    margin-right: 0.25rem;
    margin-bottom: 0.25rem;
    transition-property: all;
    transition-timing-function: linear;
    transition-duration: .15s;
    

`;

export const CustomHr = styled.hr`
    margin-top: 1.5rem;
    height: 0;
    color: inherit;
    border-top-width: 0px;
    border-color: rgb(203 203 203);
    width: 100%;
`;


export const FormFooter = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    font-weight: 100;

`;

export const FormFooterElement = styled.a`
    display: inline-flex;
    color: white;
    font-size: 0.9rem;
`;