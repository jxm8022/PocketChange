import React from 'react';
import styled from "styled-components";

const Loader = ({ isLoading }) => {
    return isLoading ? (
        <LoaderWrapper>
            <div className="loader"></div>
        </LoaderWrapper>
    ) : null;
};

export default Loader;

const LoaderWrapper = styled.div`
    /* mobile */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /* Semi-transparent black background */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    /* Set z-index to ensure it appears above other content */

    .loader {
        border: 4px solid #f3f3f3;
        /* Light gray border for the loader */
        border-top: 4px solid var(--teal);
        /* Blue border for animation */
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
        /* Rotate animation */
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }

    /* tablets */
    @media only screen and (min-width: 600px) {}

    /* desktop */
    @media only screen and (min-width: 900px) {}

    @media (prefers-color-scheme: dark) {}

    @media (prefers-color-scheme: light) {}
`;