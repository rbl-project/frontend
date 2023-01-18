import styled from "styled-components";

export const DropzoneArea = styled.div`
    border: 2px dashed black;
    height:30vh;
    display: flex;
    justify-content:center;
    align-items: center;
    cursor: pointer;
    &:hover{
        border-color: blue;
        color: blue;
        background-color:lightGray;
    }
`