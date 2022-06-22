import getFormattedDateString from "../../utilities/getFormattedDate";
import getFormattedCurrencyFromNumber from "../../utilities/getFormattedCurrencyFromNumber";

export type AssetMetric = {
    id: string;
    symbol: string;
    slug: string;
    name: string;
    serial_id: number;
    contract_addresses: any;
    market_data: {
        price_usd: number;
        ohlcv_last_1_hour? : {
            high: number;
            low: number;
        }
        ohlcv_last_24_hour?: {
            high: number;
            low: number; 
        }
        real_volume_last_24_hours: number;
        percent_change_usd_last_24_hours: number; 
    }
    marketcap: {
        current_marketcap_usd: number;
    }
    all_time_high: {
        price: number;
        at: Date;
        percent_down: number,
    }
    cycle_low: {
        price: number; 
        at: Date; 
        percent_up: number;
    }
}



const KeyMetrics: React.FunctionComponent<{data: AssetMetric | null}> = ({data}) => {
    const selectedMetrics = {
        'Price': {value: getFormattedCurrencyFromNumber(data?.market_data.price_usd)},
        '1H Range': 
            {value: `${ getFormattedCurrencyFromNumber(data?.market_data.ohlcv_last_1_hour?.low)} - ${getFormattedCurrencyFromNumber(data?.market_data.ohlcv_last_1_hour?.high)}`},
        '24H Range': 
            {value: `${ getFormattedCurrencyFromNumber(data?.market_data.ohlcv_last_24_hour?.low)} - ${getFormattedCurrencyFromNumber(data?.market_data.ohlcv_last_24_hour?.high)}`},
        'Real Volume (24H)': {value: getFormattedCurrencyFromNumber(data?.market_data.real_volume_last_24_hours)},
        'Marketcap': {value: getFormattedCurrencyFromNumber(data?.marketcap.current_marketcap_usd)},
        'ATH': {value: getFormattedCurrencyFromNumber(data?.all_time_high.price)},
        'ATH Date': {value: getFormattedDateString(data?.all_time_high?.at)},
        'Down from ATH': {
            value: `${((data?.all_time_high?.percent_down || 0 )* -1).toFixed(2)}%`, 
            style: data?.all_time_high?.percent_down || 0 > 0? 'negative': 'positive'
        },
        'Cycle Low': {
            value: getFormattedCurrencyFromNumber(data?.cycle_low.price)
        },
        'Cycle Low Date': {
            value: getFormattedDateString(data?.cycle_low.at)
        },
        'Up From Cycle Low': {
            value: `+${( data?.cycle_low.percent_up || 0).toFixed(2)}%`,
            style: data?.cycle_low.percent_up || 0 > 0? 'positive': 'negative'
        }

    }

    return (
        <article className="keyMetrics">
            <h2 className="keyMetrics__title">Key Metrics</h2>

            {Object.keys(selectedMetrics).map( (metric, index ) => {
                return (
                    <div key={metric} className={ index % 2 === 0? "keyMetrics__row--odd": "keyMetrics__row"}>
                        <p className="keyMetrics__row-title"> {metric} </p>
                        <p className={
                            selectedMetrics[metric]?.style === undefined?  "keyMetrics__row-value" : `keyMetrics__row-value ${selectedMetrics[metric]?.style}`
                        }
                        >{selectedMetrics[metric].value}</p>
                    </div>
                )
            })}
        </article>
    )
}

export default KeyMetrics; 