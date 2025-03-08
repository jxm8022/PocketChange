import styled from "styled-components";

const Table = (props) => {
    const {
        headerLabels = [],
        data = [],
        addItemLabel = '',
        setDisplayModal = () => { },
        handleDelete = () => { },
    } = props;

    const MapData = () => {
        return data.map((item) => {
            const tableData = headerLabels.map((header) => <td key={item[header.property]}>{item[header.property]}</td>);
            return <tr key={item.id} onClick={() => { handleDelete(item.id) }}>{tableData}</tr>
        });
    }

    const NoData = () => {
        return <tr style={{ height: '24px' }}>{headerLabels.map((header) => <td key={header.id}></td>)}</tr>;
    }

    return (
        <TableWrapper>
            <table>
                <thead>
                    <tr>
                        {headerLabels.map((header) => <th key={header.id}>{header.value}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? MapData() : NoData()}
                    <tr>
                        <td
                            colSpan={headerLabels.length}
                            onClick={() => setDisplayModal(true)}
                        >
                            {addItemLabel}
                        </td>
                    </tr>
                </tbody>
            </table>
        </TableWrapper>
    );
}

export default Table;

const TableWrapper = styled.div`
    /* mobile */
    table {
        border-collapse: collapse;
        width: 90%;
        margin: 20px auto;
        table-layout: fixed;
    }

    th,
    tr,
    td {
        padding: 5px;
        font-size: .75em;
    }

    td {
        word-wrap: break-word;
        overflow-wrap: break-word;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    /* tablets */
    @media only screen and (min-width: 600px) {
        {
            width: 80%;
        }

        th,
        tr,
        td {
            padding: 10px;
            font-size: .85em;
        }
    }

    /* desktop */
    @media only screen and (min-width: 900px) {
        {
            width: 70%;
        }

        th,
        tr,
        td {
            padding: 10px;
            font-size: 1em;
        }

        tr:hover {
            background-color: rgba(156, 156, 156, 0.25);
        }
    }

    @media (prefers-color-scheme: dark) {
        table {
            color: var(--pink);
        }

        th {
            background-color: var(--pink);
            color: var(--teal);
        }

        th,
        tr,
        td {
            border: 1px solid var(--pink);
        }
    }

    @media (prefers-color-scheme: light) {
        table {
            color: var(--teal);
        }

        th {
            background-color: var(--teal);
            color: var(--pink);
        }

        th,
        tr,
        td {
            border: 1px solid var(--teal);
        }
    }
`;