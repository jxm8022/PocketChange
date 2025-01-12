import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Graph from "../DisplayYear/Graph/Graph";
import YearSummary from "./YearSummary";
import styled from "styled-components";

const NetSummary = (props) => {
    const { accountDictionary } = useSelector((state) => state.accounts);
    const [netGraphData, setNetGraphData] = useState({});
    const [graphData, setGraphData] = useState([]);

    useEffect(() => {
        let updatedGraphData = [];
        for (const month in props.statistics) {
            const monthIndex = month - 1;
            for (const accountId in props.statistics[month]) {
                const accountName = accountDictionary[accountId];
                let accountSeries = updatedGraphData.find(d => d.name === accountName);
                if (!accountSeries) {
                    let accountData = new Array(12).fill(0);
                    accountData[monthIndex] = props.statistics[month][accountId].income - props.statistics[month][accountId].expenses;
                    updatedGraphData.push({ name: accountName, data: accountData });
                }
                else {
                    accountSeries.data[monthIndex] = props.statistics[month][accountId].income - props.statistics[month][accountId].expenses;
                }
            }
        }

        let updatedNetGraphData = { name: 'Net', data: new Array(12).fill(0) };
        if (updatedGraphData.length > 1) {
            updatedNetGraphData.data = updatedGraphData.reduce((acc, val) => {
                for (const monthIndex in val.data) {
                    acc[monthIndex] += val.data[monthIndex];
                }
                return acc;
            }, new Array(12).fill(0));
            updatedGraphData.push(updatedNetGraphData);
        }

        setNetGraphData(updatedGraphData.length === 1 ? updatedGraphData[0] : updatedNetGraphData);
        setGraphData(updatedGraphData);
    }, [props.statistics, accountDictionary]);

    return (
        <NetSummaryWrapper>
            <YearSummary netGraphData={netGraphData?.data} />
            <Graph series={graphData} />
        </NetSummaryWrapper>
    );
}

export default NetSummary;

const NetSummaryWrapper = styled.div`
`;