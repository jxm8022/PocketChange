import styled from "styled-components";

const Modal = (props) => {
    const {
        isDisplayModal = false,
        title,
        submitLabel,
        setDisplayModal = () => { },
        submitHandler = () => { },
        error,
    } = props;

    if (!isDisplayModal) return null;

    return (
        <ModalWrapper>
            <div className='modal-overlay'>
                <div className="modal-content">
                    <div className="modal-header">
                        <h3>{title}</h3>
                        <button className="close-button" onClick={() => setDisplayModal(false)}>&times;</button>
                    </div>
                    {props.children}
                    <div className="modal-footer">
                        <p className="error">{error}</p>
                        <button onClick={() => submitHandler()}>{submitLabel}</button>
                    </div>
                </div>
            </div>
        </ModalWrapper>
    );
}

export default Modal;

const ModalWrapper = styled.div`
    /* mobile */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.4); /* Semi-transparent */
        backdrop-filter: blur(8px); /* Blur effect */
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
    }

    .modal-content {
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        width: 75%;
        max-width: 500px; /* Prevents it from getting too large */
        text-align: center;
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ddd;
        padding-bottom: 10px;
        margin-bottom: 15px;
    }

    .modal-header h3 {
        margin: 0;
        font-size: 1.2em;
    }

    .closeButton {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
        background: none;
        border: none;
        font-size: 20px;
    }

    .modal-footer {
        display: flex;
        justify-content: space-between;
        border-top: 1px solid #ddd;
        padding-top: 10px;
        margin-top: 15px;
    }

    .error {
        margin: 0;
        color: var(--red);
    }

    /* tablets */
    @media only screen and (min-width: 600px) {
    }

    /* desktop */
    @media only screen and (min-width: 900px) {
    }

    @media (prefers-color-scheme: dark) {
        .modal-content {
            background: var(--darkteal);
        }
    }

    @media (prefers-color-scheme: light) {
        .modal-content {
            background: var(--pink);
        }
    }
`;