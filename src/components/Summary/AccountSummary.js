import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CREDITACCOUNTTYPES } from "../../resources/constants";
import { FloatString } from "../../utilities/FormatData";

const AccountSummary = (props) => {
    const navigate = useNavigate();

    const [accounts, setAccounts] = useState([]);
    const [columnCount,] = useState(2);
    const [placeholderSpan, setPlaceholderSpan] = useState(1);

    useEffect(() => {
        let accountArray = [...Object.entries(props.accounts)];

        accountArray.push([
            'Total',
            {
                name: 'Total', currentBalance: accountArray.reduce((p, c) => {
                    let account = c[1];
                    let isCreditAccount = CREDITACCOUNTTYPES.includes(account.typeId);
                    return isCreditAccount ? p - account.currentBalance : p + account.currentBalance;
                }, 0)
            }
        ]);

        accountArray.push(['placeholder', { isPlaceHolder: true }]);

        setAccounts(accountArray);
        setPlaceholderSpan(accountArray.length % columnCount === 1 ? columnCount : 1)
    }, [props, columnCount, setPlaceholderSpan]);

    const handleAddAccount = () => {
        // this should eventually open modal
        navigate({
            pathname: '/account',
        });
    }

    const AccountWrapper = (accountPayload) => {
        const accountId = accountPayload[0];
        const account = accountPayload[1];

        if (account.isPlaceHolder) {
            return <div key={accountId} className="placeholder">
                <button onClick={handleAddAccount}>Add account</button>
            </div>;
        }

        return <div key={accountId} className="accountWrapper">
            <p className="accountHeader">{account.name}</p>
            <hr className="accountSeparator" />
            <p className="accountBody">${FloatString(account.currentBalance)}</p>
        </div>;
    }

    return (
        <AccountsWrapper $numColumns={columnCount} $placeholderSpan={placeholderSpan}>
            {accounts.map(account => AccountWrapper(account))}
        </AccountsWrapper>
    );
}

export default AccountSummary;

const AccountsWrapper = styled.div`
    /* mobile */
    display: grid;
    grid-template-columns: ${({ $numColumns }) => `repeat(${$numColumns}, 1fr)`};
    grid-gap: 25px;
    margin: 0px;

    .accountWrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    
        .accountHeader {
            height: 3em;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            margin: 0px;
        }

        .accountSeparator {
            margin: 0px;
        }

        .accountBody {
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
        }
    }

    .placeholder {
        grid-column: span ${({ $placeholderSpan }) => `${$placeholderSpan}`};
        margin: auto;
        ${({ $numColumns }) => `${($numColumns % 2) === 0 ? '' : 'padding-bottom: 25px;'}`}
    }

    /* tablets */
    @media only screen and (min-width: 600px) {
        grid-template-columns: ${({ $numColumns }) => `repeat(${$numColumns * 1.5}, 1fr)`};
    }

    /* desktop */
    @media only screen and (min-width: 900px) {
        grid-template-columns: ${({ $numColumns }) => `repeat(${$numColumns * 2}, 1fr)`};
    }

    @media (prefers-color-scheme: dark) {
    }

    @media (prefers-color-scheme: light) {
    }
`;