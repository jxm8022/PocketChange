import styled from "styled-components";

const Button = (props) => {
    const {
        label = '#ERR#',
        onClick = () => { },
        hide = false
    } = props;

    if (hide) {
        return <></>;
    }

    return (
        <ButtonWrapper onClick={onClick}>{label}</ButtonWrapper>
    );
}

export default Button;

const ButtonWrapper = styled.button`
    cursor: pointer;
    border: none;
    border-radius: 50px;
    margin: 10px 0px;
    padding: 10px 20px;
    font: inherit;

    @media (prefers-color-scheme: dark) {
        background-color: var(--pink);
        color: var(--teal);
    }

    @media (prefers-color-scheme: light) {
        background-color: var(--teal);
        color: var(--pink);
    }
`;