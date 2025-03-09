import styled from "styled-components";

const Form = (props) => {
    const {
        formDefs = [],
        setError = () => { },
    } = props;

    return (
        <FormWrapper>
            <form onFocus={() => { setError() }}>
                {formDefs.map((def) => <label key={def.label}>
                    <p>{def.label}</p>
                    {def.input}
                </label>)}
            </form>
        </FormWrapper>
    );
}

export default Form;

const FormWrapper = styled.div`
    /* mobile */
    display: flex;
    justify-content: center;
    width: 100%;
    align-items: center;

    form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        max-width: 400px;
        margin: auto;
    }

    label {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        margin: 10px 0px;
    }

    label p {
        margin: 0;
        width: 120px;
        text-align: right;
        flex-shrink: 0;
    }

    input,
    select {
        flex-grow: 1;
        padding: 5px;
    }

    /* tablets */
    @media only screen and (min-width: 600px) {
    }

    /* desktop */
    @media only screen and (min-width: 900px) {
    }

    @media (prefers-color-scheme: dark) {
    }

    @media (prefers-color-scheme: light) {
    }
`;