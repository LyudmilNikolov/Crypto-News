interface Coin {    
    '24hVolume': number,
    allTimeHigh: { price: number; timestamp: number },
    change: string,
    coinrankingUrl: string,
    color: string,
    description: string,
    fullyDilutedMarketCap: string,
    hasContent: boolean,
    iconUrl: string,
    links: Array<{ name: string; type: string, url: string}>,
    listedAt: number,
    lowVolume: boolean,
    marketCap: number,
    name: string,
    notices: unknown,
    numberOfExchanges: number,
    numberOfMarkets: number,
    price: number,
    priceAt: number,
    rank: number,
    sparkline: Array<string>,
    supply: { circulating: number; confirmed: boolean; max: string; supplyAt: number; total: number } 
    symbol: string,
    tags: Array<string>,
    tier: number,
    uuid: string,
    websiteUrl: string
}

export interface CoinDetails {
    status: string,
    data: { coin: Coin }
}

export interface Coins {
    status: string,
    data: {
        coins: Array<Coin>,
        stats: {
            total: number,
            total24hVolume: number,
            totalCoins: number,
            totalExchanges: number,
            totalMarketCap: number,
            totalMarkets: number,
        }
    }
}