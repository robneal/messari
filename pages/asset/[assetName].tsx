import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AssetChart from "../../components/AssetChart/AssetChart";
import KeyMetrics, { AssetMetric } from "../../components/KeyMetrics/KeyMetrics";
import NavMenu from "../../components/NavMenu/NavMenu";
import getFormattedCurrencyFromNumber from "../../utilities/getFormattedCurrencyFromNumber";

const AssetPage: NextPage = () => {
    const { assetName } = useRouter()?.query;  
    const [assetMetrics, setAssetMetrics] = useState<AssetMetric | null>(null);
  
    const fetchData = async (assetName: string) => {
        const metrics = await (await fetch(`https://data.messari.io/api/v1/assets/${assetName}/metrics`)).json();

        // console.log(metrics?.data);
        setAssetMetrics(metrics?.data);
    }

    // Effects ---> 
    useEffect(() => {
        if (assetName) fetchData(assetName as string);
    }, [assetName]);


    if (!assetMetrics) return <h1>Loading Animation or skeleton screen...</h1>

    return (
        <>
            {/* <NavMenu /> */}
            <section className="wrapper borderBottom page-section">
                <header className="AssetHeader">
                    <img className="AssetHeader__image" src={`https://messari.io/asset-images/${assetMetrics.id}/128.png?v=2`} alt={`${assetMetrics.name} logo`} />
                    <div>
                        <h1 className="AssetHeader__name">
                            {assetMetrics.name} <span className="AssetHeader__symbol">{assetMetrics.symbol}</span>
                        </h1>
                        <p className="AssetHeader__price">
                            {getFormattedCurrencyFromNumber(assetMetrics.market_data.price_usd)}
                            <span className={assetMetrics.market_data.percent_change_usd_last_24_hours > 0 ? 'positive': 'negative'}>
                                {`(${assetMetrics.market_data.percent_change_usd_last_24_hours > 0 ? '+': ''} ${assetMetrics.market_data.percent_change_usd_last_24_hours.toFixed(2)}%`})
                            </span>
                        </p>
                    </div>
                </header>
            </section>
            
            <section>
                <nav className="AssetHeader__nav wrapper">
                    <Link href="#"><a className="active">Overview</a></Link>
                    <Link href="/"><a>Home</a></Link>
                    <Link href="https://github.com/robneal/messari" target="_blank"><a target="_blank">GitHub ↗</a></Link>
                </nav>
            </section>

            <section className="wrapper page-section AssetContent">
                <AssetChart assetName={assetName as string} />
                <KeyMetrics data={assetMetrics} />
            </section>
        </>
    )
}

export default AssetPage; 