import styled from "styled-components";

export const ToggleContainer = styled.label`
    background: ${({ theme }) => theme.gradient};
    border: 2px solid ${({ theme }) => theme.toggleBorder};
    border-radius: 15px;
    cursor: pointer;
    display: flex;
    font-size: 0.5rem;
    justify-content: space-between;
    margin: 0;
    overflow: hidden;
    position: relative;
    width: 3rem;
    height: 1.5rem;
    &::after {
        content: "";
        display: block;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        margin: 1px;
        background: ${({ theme}) => theme.text};
        box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
        transition: 0.2s;
    }`;

export const ToggleInput = styled.input`
    display: none;
    opacity: 0;
    z-index: 1;
    border-radius: 15px;
    &:checked + ${ToggleContainer} {
        background: ${({theme}) => theme.gradient};
        &::after {
            content:"";
            display: block;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            margin-left: 23px;
            transition: 0.2s;
        }
    }
`;

