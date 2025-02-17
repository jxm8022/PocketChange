import styled from "styled-components";
import { labels } from "../../resources/labels";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllTransactionAPI } from "../../api/transactionAPI";
import { deleteAllTransactions } from "../../actions/transactionActions";

const DataManagement = () => {
    const dispatch = useDispatch();
    const { userId, token } = useSelector((state) => state.user);

    const deleteData = () => {
        const response = window.confirm('Are you sure you want to delete all transaction?');
        if (response) {
            deleteAllTransactionAPI(userId, token).then((res) => {
                dispatch(deleteAllTransactions());
            });
        }
    }

    return (
        <DataManagementWrapper>
            <button className="deleteDataBtn" onClick={deleteData}>{labels.deleteData}</button>
        </DataManagementWrapper>
    );
}

export default DataManagement;

const DataManagementWrapper = styled.div`
    .deleteDataBtn {
        cursor: pointer;
        border: none;
        border-radius: 50px;
        margin: 10px 0px;
        padding: 10px 20px;
        font: inherit;
    }

    @media (prefers-color-scheme: dark) {
        .deleteDataBtn {
            background-color: var(--pink);
            color: var(--teal);
        }
    }

    @media (prefers-color-scheme: light) {
        .deleteDataBtn {
            background-color: var(--teal);
            color: var(--pink);
        }
    }
`;