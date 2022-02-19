
// fetch cryptocurrency data and store it in the variable data
var xhReq = new XMLHttpRequest();
xhReq.open("GET", "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr", false);
xhReq.send(null);
var data = JSON.parse(xhReq.responseText); 

// initialization
var cryptocurrencies;
var timerId;
var updateInterval = 10000;


function ascending(a, b) { return a.percent_change_24h > b.percent_change_24h ? 1 : -1; }
function descending(a, b) { return a.percent_change_24h < b.percent_change_24h ? 1 : -1; }
function reposition() {
    var height = $("#cryptocurrencies .cryptocurrency").height();
    var y = height;
    for(var i = 0; i < cryptocurrencies.length; i++) {
        cryptocurrencies[i].$item.css("top", y + "px");
        y += height;			
    }
}  
function updateRanks(cryptocurrencies) {
    for(var i = 0; i < cryptocurrencies.length; i++) {
        cryptocurrencies[i].$item.find(".rank").text(i + 1);	
    }
}
     
function updateBoard() {
    var cryptocurrency = getRandomCoin();	
    cryptocurrency.percent_change_24h += getRandomScoreIncrease();
    cryptocurrency.$item.find(".percent_change_24h").text(cryptocurrency.percent_change_24h);
    cryptocurrencies.sort(descending);
    updateRanks(cryptocurrencies);
    reposition();
}

function getNewData(){

    var data = JSON.parse(xhReq.responseText); 

    for(var i = 0; i < cryptocurrencies.length; i++) {
        var cryptocurrency = cryptocurrencies[i];
        cryptocurrency.percent_change_24h += getRandomScoreIncrease();
        cryptocurrency.$item.find(".percent_change_24h").text(cryptocurrency.percent_change_24h);
    }
    cryptocurrencies.sort(descending);
    updateRanks(cryptocurrencies);
    reposition();
    console.log('Finished retrieving new data');
    
}
function getRandomScoreIncrease() {
    return getRandomBetween(50, 150);
}
function getRandomBetween(minimum, maximum) {
        return Math.floor(Math.random() * maximum) + minimum;
}
function resetBoard() {
    let  $list = $("#cryptocurrencies");
    $list.find(".cryptocurrency").remove();
    if(timerId !== undefined) {
        clearInterval(timerId);
    }
    cryptocurrencies = [];
    for(let i = 0;i <35;i++){
        cryptocurrencies.push(
            {
                name : data[i].name,
                symbol: data[i].symbol,
                price: data[i].current_price,
                market_cap: data[i].market_cap,
                circulating_supply: Math.round(data[i].circulating_supply),
                volume_24h: data[i].total_volume,
                percent_change_24h: data[i].market_cap_change_percentage_24h,
            }
        )
    }
    
    for(var i = 0; i < cryptocurrencies.length; i++) {
        var $item = $(
            "<tr class='cryptocurrency'>" + 
                "<th class='rank hlo'>" + (i + 1) + "</th>" + 
                "<td class='name hlo'>" + cryptocurrencies[i].name + "</td>" + 
                "<td class='symbol hlo'>" + cryptocurrencies[i].symbol + "</td>" + 
                "<td class='price hlo'>" + cryptocurrencies[i].price + "</td>" + 
                "<td class='market_cap hlo'>" + cryptocurrencies[i].market_cap + "</td>" + 
                "<td class='circulating_supply hlo'>" + cryptocurrencies[i].circulating_supply + "</td>" + 
                "<td class='volume_24h hlo'>" + cryptocurrencies[i].volume_24h + "</td>" + 
                "<td class='percent_change_24h hlo'>" + cryptocurrencies[i].percent_change_24h + "</td>" +
            "</tr>"
        );

        cryptocurrencies[i].$item = $item;
        $list.append($item);
    }
    cryptocurrencies.sort(descending);
    updateRanks(cryptocurrencies);
    reposition();
    
    // fetch new data for the updateInterval
    timerId = setInterval("getNewData();", updateInterval);

}	
resetBoard();
