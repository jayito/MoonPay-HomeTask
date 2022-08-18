// Binance API
const binance_api = 'https://api.binance.com/';
const binance_symbol = 'BTCUSDT';
const binance_limit = 5000; // To get more order book by using limit paramer. Default 100; max 5000 

// Coinbase API
const coinbase_api = 'https://api.exchange.coinbase.com/';
const coinbase_product_id = 'BTC-USDT';
const coinbase_level = 2; // To get more order book by using level paramer. Default 1; Others 2, 3

// Kraken API
const kraken_api = 'https://api.kraken.com/';
const kraken_pair = 'BTCUSDT';
const kraken_count = 500; // To get more order book by using limit paramer. Default 100; maximum number of asks/bids

const EndPoints = {
    binance: binance_api + 'api/v3/depth?symbol=' + binance_symbol + '&limit=' + binance_limit,
    coinbase: coinbase_api + 'products/' + coinbase_product_id + '/book?level=' + coinbase_level,
    kraken: kraken_api + '0/public/Depth?pair=' + kraken_pair + '&count=' + kraken_count
}

module.exports = {
    EndPoints
}