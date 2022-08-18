const { default: axios } = require("axios");
const { EndPoints } = require("../config/constant");

const cheapestOrder = async (data, cb) => {
    if(!data.amount) 
        return cb("You shoud set the amount when requesting.");

    const amount = Number(data.amount);

    try {
        // Get data from API
        const binanceInfo = await axios.get(EndPoints.binance);
        const coinbaseInfo = await axios.get(EndPoints.coinbase);
        const krakenInfo = await axios.get(EndPoints.kraken);

        // Get average price for each api
        const binancePrice = averagePrice(binanceInfo.data.asks, amount);
        const coinbasePrice = averagePrice(coinbaseInfo.data.asks, amount);
        const krakenPrice = averagePrice(krakenInfo.data.result.XBTUSDT.asks, amount);

        // lowest price
        let usdAmount = binancePrice > coinbasePrice ? coinbasePrice : binancePrice;
        usdAmount = usdAmount > krakenPrice ? krakenPrice : usdAmount;

        // api name of lowest price
        let exchange = binancePrice > coinbasePrice ? "coinbase" : "binance";
        exchange = exchange > krakenPrice ? "kraken" : exchange;

        const res = {
            btcAmount: amount,
            usdAmount: usdAmount,
            exchange: exchange
        }

        return cb(null, { data: res });
    } catch (error) {
        return cb("There is an error in binance or coinbase api.");
    }
}

// Calculate the average price to buy a limited amount.
const averagePrice = (data, amount) => {
    let totalPrices = 0, 
        totalAmount = 0,
        totalCount = 0;
        
    data.map((item) => {
        if( totalAmount >= amount)
            return;

        totalPrices += Number(item[0]);
        totalAmount += Number(item[1]);
        totalCount += 1;
    });
    
    return (totalPrices / totalCount).toFixed(2);
}

module.exports = {
    cheapestOrder
}