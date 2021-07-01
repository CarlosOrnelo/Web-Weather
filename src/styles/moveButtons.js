import styled from "styled-components";
const nextIcon = "icons/next-icon.svg";

export const Button = styled.button`
    border: transparent;
    width: 5%;
    max-width: 50px;
    background-color: transparent;
    background-image: url(${nextIcon});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    transform: rotate(${props => props.orientation});
`