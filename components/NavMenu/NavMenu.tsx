import { useEffect, useState } from "react";

export type AllAssets = {
    contract_addresses: string | null; 
    id: string; 
    metrics: any;
    name: string;
    profile: { 
        tagline: string,
    }
    serial_id: number;
    slug: string;
    symbol: string;
}

const ALL_ASSETS = `https://data.messari.io/api/v1/assets`;

const NavMenu: React.FunctionComponent = () => {
    const [allAssets, setAllAssets] = useState<AllAssets[] | null>(null);
    
    const fetchData = async () => {
        const allAssets = await (await fetch(ALL_ASSETS)).json();
        setAllAssets(allAssets?.data);
    }

    // Effects ---> 
    useEffect(() => {
        if (!allAssets) fetchData();
    }, [allAssets]);
    
    return (
        <nav>
            <input />
        </nav>
    )
}

export default NavMenu; 