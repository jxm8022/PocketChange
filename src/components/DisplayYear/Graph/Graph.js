import ReactApexChart from "react-apexcharts";
import { labels, months } from "../../../resources/labels";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Graph = (props) => {
    const [isDarkMode] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);
    const [width, setWidth] = useState(window.innerWidth);
    const [dashArray, setDashArray] = useState([]);

    useEffect(() => {
        const updateWidth = () => {
            setWidth(window.innerWidth);
        }
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    useEffect(() => {
        const seriesCount = props.series.length > 0 ? props.series.length - 1 : props.series.length;
        let accountsDashArray = Array(seriesCount).fill(0);
        seriesCount > 1 && accountsDashArray.push(5);
        setDashArray(accountsDashArray);
    }, [props]);

    const data = {
        series: props.series,
        options: {
            noData: {
                text: labels.noDataText,
                style: {
                    color: 'var(--lightred)',
                    fontSize: '32px',
                }
            },
            chart: {
                type: 'line',
                zoom: {
                    enabled: false
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: 5,
                curve: 'straight',
                dashArray: dashArray
            },
            legend: {
                labels: {
                    colors: `${isDarkMode ? 'var(--pink)' : 'var(--teal)'}`
                }
            },
            markers: {
                size: 0,
                hover: {
                    sizeOffset: 6
                }
            },
            xaxis: {
                categories: months.map(month => month.value),
                axisTicks: {
                    show: true,
                    borderType: 'dotted'
                },
                labels: {
                    style: {
                        colors: `${isDarkMode ? 'var(--pink)' : 'var(--teal)'}`,
                    }
                },
                crosshairs: {
                    show: true,
                    stroke: {
                        color: `${isDarkMode ? 'var(--pink)' : 'var(--teal)'}`
                    }
                },
                tooltip: {
                    enabled: false,
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: `${isDarkMode ? 'var(--pink)' : 'var(--teal)'}`,
                    },
                    formatter: function (val) {
                        return val?.toFixed(2)
                    }
                }
            },
            tooltip: {
                theme: true,
                y: props.series.map(item => {
                    return {
                        title: {
                            formatter: function (val) {
                                return val + " $"
                            }
                        }
                    }
                })
            },
            grid: {
                borderColor: `${isDarkMode ? 'var(--pink)' : 'var(--teal)'}`,
            }
        },
    };

    return (
        <GraphWrapper>
            <ReactApexChart options={data.options} series={data.series} type="line" height={400} width={width > 600 ? width * .8 : width} />
        </GraphWrapper>
    );
}

export default Graph;

const GraphWrapper = styled.div`
    .apexcharts-toolbar {
        color: var(--teal);
    }

    @media (prefers-color-scheme: dark) {
        .apexcharts-tooltip {
            background: var(--pink);
            color: var(--teal);
        }
    }

    @media (prefers-color-scheme: light) {
        .apexcharts-tooltip {
            background: var(--teal);
            color: var(--pink);
        }
    }
`;