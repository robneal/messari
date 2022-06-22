import { useEffect, useState } from "react";
// import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import getFormattedDateString from "../../utilities/getFormattedDate";

export type AssetTimeSeries = {
    values: any[];
    contract_addresses: any[]; 
    name: string; 
    parameters: {
        asset_key: string; 
        columns: string[]; 
        end: Date; 
        start: Date;
        timestamp_format: string;
    }
}



      
const AssetChart: React.FunctionComponent<{assetName: string}> = ({assetName}) => {
    const [timeSeries, setTimeSeries] = useState<any| null>(null);
    const [chartData, setChartData] = useState<any| null>(null)
    
    const fetchData = async () => {

        const TIME_SERIES = `https://data.messari.io/api/v1/assets/${assetName}/metrics/price/time-series?start=2021-01-01&end=2021-02-01&interval=1d`;
        const timeSeriesResponse : {data: AssetTimeSeries } = await (await fetch(TIME_SERIES)).json();

        console.log(timeSeriesResponse?.data );
        setTimeSeries(timeSeriesResponse?.data);

        const chartDataValue = normalizeTimeSeriesData(timeSeriesResponse.data); 
        console.log(chartDataValue); 

        setChartData(chartDataValue); 
    }

    // Effects ---> 
    useEffect(() => {
        if (!timeSeries) fetchData();
    }, [timeSeries]);

    if(!chartData) return <h2>loading...</h2>
    
    return (
        <article className="AssetChart">
            <h1 className="AssetChart__title">CHARTS <span>Price</span></h1>
            <Line
                data={chartData}
            />
        </article>
    )
}

const normalizeTimeSeriesData = (data: AssetTimeSeries) => {

    const closingPrice = data.values.map( data => data[4])

    const timeStamps = data.values.map( (data) => getFormattedDateString(data[0]));

    console.log(closingPrice); 


    // ['timestamp', 'open', 'high', 'low', 'close', 'volume']
    return {
        datasets: [{
            data: closingPrice,
            title: 'Price',
            backgroundColor: 'rgb(255, 255, 255, 0.4)',
                // 'rgba(54, 162, 235, 0.2)',
                // 'rgba(255, 206, 86, 0.2)',
                // 'rgba(75, 192, 192, 0.2)',
                // 'rgba(153, 102, 255, 0.2)',
                // 'rgba(255, 159, 64, 0.2)'
            
            // borderColor: [
            //     'rgba(255, 99, 132, 1)',
            //     'rgba(54, 162, 235, 1)',
            //     'rgba(255, 206, 86, 1)',
            //     'rgba(75, 192, 192, 1)',
            //     'rgba(153, 102, 255, 1)',
            //     'rgba(255, 159, 64, 1)'
            // ],
            borderWidth: 1
            
        }],
        labels:  timeStamps, 
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    }
}

export default AssetChart; 