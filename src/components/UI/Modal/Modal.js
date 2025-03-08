import { labels } from '../../../resources/labels';
import styled from "styled-components";

const Modal = (props) => {
    const { closeModal } = props;

    return (
        <ModalWrapper>
            <div className='modal-background'></div>
            <div className='modal'>
                <div className='modal-container'>
                    <span className='close' onClick={closeModal}>&times;</span>
                    <div className='modal-header'>
                        <h2>{labels.updateTransaction}</h2>
                    </div>
                    <div className='modal-body'>
                        <p>test</p>
                    </div>
                </div>
            </div>
        </ModalWrapper>
    );
}

export default Modal;

const ModalWrapper = styled.div`
    /* mobile */
    .modal-background,
    .modal {
        position: fixed;
        z-index: 99999;
        left: 0;
        width: 100%;
        overflow: hidden;
        margin: auto;
    }

    .modal-background {
        top: 0;
        height: 100%;
        backdrop-filter: blur(5px);
    }

    .modal {
        top: 0;
        height: 100%;
    }

    .modal-container {
        background-color: var(--darkteal);
        height: 100%;
        width: 75%;
        margin: auto;
        padding: 0px 16px;
        text-align: left;
    }

    .modal-header {
        width: 60%;
        margin: auto;
        padding: 50px 0px;
    }

    .modal-header h2 {
        margin: 0;
        padding: 10px;
        text-align: center;
        background-color: var(--pink);
        color: var(--darkteal);
    }

    .close {
        color: var(--pink);
        float: right;
        font-size: 30px;
        font-weight: bold;
    }

    .close:hover,
    .close:focus {
        color: var(--darkpink);
        text-decoration: none;
        cursor: pointer;
    }

    /* tablets */
    @media only screen and (min-width: 600px) {
    }

    /* desktop */
    @media only screen and (min-width: 900px) {
        .modal-container {
            width: 55%;
        }

        .modal-header {
            width: 45%;
        }
    }

    @media (prefers-color-scheme: dark) {
        .modal-container {
            border-left: 10px solid var(--pink);
            border-right: 10px solid var(--pink);
        }
    }

    @media (prefers-color-scheme: light) {
    }
`;