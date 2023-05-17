// let url = `wss://${window.location.host}/ws/socket-server/`
let url = `ws://${window.location.host}/ws/socket-server/`
console.log(url,"url")
const chatSocket = new WebSocket(url)
var market = false
/////////////////////////////////////
//var ws = new WebSocket("wss://gateway.discord.gg/?v=6&encoding=json");
//var interval = 0;
//var token = "ODI1ODkzOTA2OTEzNjg5Njcw.GoOagg.i6_moS96y7bM2pSFY_lkblBqQ29P0B17xDzf9Q"
////var token = "Nzg2NzAxMjkyNTI1NDUzMzQz.Gm1gfy.JmLWllDzpD9QC4oUSfATLqD3nxMnonpNl7_UoA"  // real

//payload = {
//   op: 2,
//   d: {
//      token: token,
////      intents: 512,
//      properties: {
//         $os: "windows",
//         $browser: "chrome",
//         $device: "chrome",
//      },
//   },
//};

//ws.addEventListener("open", function open(x) {
//   console.log("open")
//   ws.send(JSON.stringify(payload));
//});
//
//ws.addEventListener("message", function incoming(data) {
//
//   var x = data.data;
//   var payload = JSON.parse(x);
//
//   const { t, event, op, d } = payload;
//   console.log(op,"op")
//   switch (op) {
//      // OPCODE 10 GIVES the HEARTBEAT INTERVAL, SO YOU CAN KEEP THE CONNECTION ALIVE
//      case 10:
//         const { heartbeat_interval } = d;
//         setInterval(() => {
//            ws.send(JSON.stringify({ op: 1, d: null }));
//         }, heartbeat_interval);
//
//   }
//   switch (t) {
//
//      // IF MESSAGE IS CREATED, IT WILL LOG IN THE CONSOLE
//      case "MESSAGE_CREATE":
//        if(d.author.username === "Bullwinkle"){
//            console.log("Bul", d)
//            chatSocket.send(JSON.stringify({
//            "check": true,
//            "message": payload,
//            "channel": d.author.username
//          }))
//        }
//        else if(d.author.username === "EvaPanda Alerts"){
//            console.log("Eva ", d)
//            chatSocket.send(JSON.stringify({
//            "check": true,
//            "message": payload,
//            "channel": d.author.username
//          }))
//        }
//   }
//});


function connect() {
    var ws = new WebSocket("wss://gateway.discord.gg/?v=6&encoding=json");
    var interval = 0;
    //var token = "ODI1ODkzOTA2OTEzNjg5Njcw.Ga4kJ2.kCKIJJ7RDriPRBAXM4wRXAFffAmzJCB2Zai2cI"
    var token = "Nzg2NzAxMjkyNTI1NDUzMzQz.Gm1gfy.JmLWllDzpD9QC4oUSfATLqD3nxMnonpNl7_UoA"  // real
    payload = {
       op: 2,
       d: {
          token: token,
    //      intents: 512,
          properties: {
             $os: "windows",
             $browser: "chrome",
             $device: "chrome",
          },
       },
    };

    ws.addEventListener("open", function open(x) {
       console.log("open")
       ws.send(JSON.stringify(payload));
    });

    ws.addEventListener("message", function incoming(data) {

       var x = data.data;
       var payload = JSON.parse(x);

       const { t, event, op, d } = payload;
       console.log(op,"op")
       switch (op) {
          // OPCODE 10 GIVES the HEARTBEAT INTERVAL, SO YOU CAN KEEP THE CONNECTION ALIVE
          case 10:
             const { heartbeat_interval } = d;
             setInterval(() => {
                if (ws.readyState === 1){
                    ws.send(JSON.stringify({ op: 1, d: null }));
                }
             }, heartbeat_interval);

       }
       switch (t) {

          // IF MESSAGE IS CREATED, IT WILL LOG IN THE CONSOLE
          case "MESSAGE_CREATE":
            if(d.author.username === "Bullwinkle"){
                console.log("Bul", d)
                chatSocket.send(JSON.stringify({
                "check": true,
                "message": payload,
                "channel": d.author.username
              }))
            }
            else if(d.author.username === "EvaPanda Alerts"){
                console.log("Eva ", d)
                chatSocket.send(JSON.stringify({
                "check": true,
                "message": payload,
                "channel": d.author.username
              }))
            }
       }
    });

    ws.addEventListener("error", function incoming(data) {
        console.log("error", data)
    });

    ws.addEventListener("close", function incoming(data) {
        console.log("closed", data)
        connect();
    });

}

connect();
//$(document).ready(function () {
//
//
////    To get Discord data
//    $.ajax({
//        type: 'GET',
//        url: "discord-data",
//        data: {
////                'csrfmiddlewaretoken': $('[name="csrfmiddlewaretoken"]').val()
//        },
//        success: function(data){
//            alert("Delete Successfully");
//        },
//        error: function(data){
//            alert("something wrong occurs");
//        }
//    });
//
//});

chatSocket.addEventListener("open", function open(x) {
   console.log("open chatSocket")

//   chatSocket.send(JSON.stringify(payload));
});

chatSocket.onmessage = function(event){
    let data = JSON.parse(event.data)
    if(data.type === 'websocket.bid'){
        var btn_bid = document.getElementById("p_bid"+data.ticker_id)
        if(data.message > data.old_bid){
//            btn_bid.style.backgroundColor = 'green';
            btn_bid.style.color = 'green';
        }
        else{
//            btn_bid.style.backgroundColor = 'red';
            btn_bid.style.color = 'red';
        }
        document.getElementById("p_bid"+data.ticker_id).innerHTML = data.message;
    }
    if(data.type === 'websocket.ask'){
        var btn_ask = document.getElementById("p_ask"+data.ticker_id)
        if(data.message > data.old_ask){
//            btn_ask.style.backgroundColor = 'green';
            btn_ask.style.color = 'green';
        }
        else{
//            btn_ask.style.backgroundColor = 'red';
            btn_ask.style.color = 'red';
        }
        var id = 'p_ask'+data.ticker_id
        document.getElementById(id).innerHTML = data.message;
    }
    if(data.type === 'websocket.current'){
        var btn_current = document.getElementById("p_current"+data.ticker_id)
        if(data.message > data.old_current){
//            btn_current.style.backgroundColor = 'green';
            btn_current.style.color = 'green';
        }
        else{
//            btn_current.style.backgroundColor = 'red';
            btn_current.style.color = 'red';
        }
        document.getElementById("p_current"+data.ticker_id).innerHTML = data.message;
    }

    if(data.type === 'websocket.desc'){
        console.log(data,"receiving from chnanels desc")

        var id = 'p_msg'+data.ticker_id
        document.getElementById(id).innerHTML = data.message;

        var ids = 'top_bar'+data.ticker_id
        var span_id = 'top_span'+data.ticker_id
        if(data.parser==="BullWinkle"){
            document.getElementById(ids).style.backgroundColor = "#2963A4";
            document.getElementById(span_id).innerHTML = "BullWinkle";
        }
        else{
            document.getElementById(ids).style.backgroundColor = "#435971";
            document.getElementById(span_id).innerHTML = "EvaPanda";
        }


    }
    if(data.type === 'websocket.account_pl'){
        document.getElementById("id_account_pl").innerHTML = data.message;
        if(data.message >= 0){
            document.getElementById("id_account_pl").style.color = 'green';
        }
        else{
            document.getElementById("id_account_pl").style.color = 'red';
        }
    }
    if(data.type === 'websocket.ticker_pl'){
        document.getElementById("id_ticker_pl"+data.ticker_id).innerHTML = data.message;
        if(data.message >= 0){
            document.getElementById("id_ticker_pl"+data.ticker_id).style.color = 'green';
        }
        else{
            document.getElementById("id_ticker_pl"+data.ticker_id).style.color = 'red';
        }
    }

    if(data.type === 'websocket.trade_color'){
        document.getElementById("id_ticker_pl"+data.ticker_id).innerHTML = data.message;
        if(data.color == true){
            document.getElementById("Buy"+data.ticker_id).style.color = 'teal';
        }
        else{
            document.getElementById("Buy"+data.ticker_id).style.color = 'black';
        }
    }

    if(data.type === 'websocket.ingest'){

        let message = document.getElementById(id)
        message.insertAdjacentHTML('beforeend', `<div>
                <p>${data.message}</p>
            </div>`)
    }
    if(data.type === 'websocket.test_msg'){

    }
    if(data.type === 'websocket.counter'){
        console.log("finally ,", data)
        ticker_id = data.count
        card_id = ticker_id - 2
        div_id = "card`+card_id+`"
        let message = document.getElementById("holder")
        message.insertAdjacentHTML('beforeend', `<div
        id="card`+ticker_id+`" class="card">
                <div class="top-bar" id="top_bar`+ticker_id+`">
                    <span id="top_span`+ticker_id+`">EvaPanda - TSLA</span>
                    <button type="button" id="close`+ticker_id+`" onclick="Close(`+ticker_id+`)" class="btn-close float-end" aria-label="Close"></button>
                </div>
                <div class="message" id="id_msg`+ticker_id+`">
                    <span id="p_msg`+ticker_id+`">BTO TSLA @ 1.40 (day trade)</span>

                </div>
                <div class="trade">
                    <div class="buy-bar">
                        <span onclick="Buy(`+ticker_id+`)" id="Buy`+ticker_id+`" >Buy <span id="p_buy_time`+ticker_id+`">1</span>x <span id="p_buy`+ticker_id+`">0</span></span>
                        <button onclick="myBuyTime(1,`+ticker_id+`)">1x</button>
                        <button onclick="myBuyTime(2,`+ticker_id+`)">2x</button>
                        <button onclick="myBuyTime(3,`+ticker_id+`)">3x</button>
                        <button onclick="myBuyTime(4,`+ticker_id+`)">4x</button>
                    </div>
                    <div class="ask" id="id_ask`+ticker_id+`" onclick="myAsk(`+ticker_id+`)">
                        <h6>Ask:</h6>
                        <p id="p_ask`+ticker_id+`">0</p>
                    </div>
                    <div class="sell-bar">
                        <span onclick="Sell(`+ticker_id+`)" id="Sell`+ticker_id+`" >Sell <span id="p_sell_time`+ticker_id+`">1</span>x <span id="p_sell`+ticker_id+`">0</span></span>
                        <button onclick="mySellTime(1,`+ticker_id+`)">1x</button>
                        <button onclick="mySellTime(2,`+ticker_id+`)">2x</button>
                        <button onclick="mySellTime(3,`+ticker_id+`)">3x</button>
                        <button onclick="mySellTime(4,`+ticker_id+`)">4x</button>

                    </div>
                    <div class="bid" id="id_bid`+ticker_id+`" onclick="myBid(`+ticker_id+`)">
                        <h6>Bid:</h6>
                        <p id="p_bid`+ticker_id+`">0</p>
                    </div>

                    <div class="selling">
                        <span>Selling</span>
                        <button>1x</button>
                        <button>2x</button>
                        <button>3x</button>
                        <button>4x</button>
                    </div>
                    <div class="current-value" id="id_current`+ticker_id+`">
                        <h6>Current Value</h6>
                        <p id="p_current`+ticker_id+`">0</p>
                    </div>
                    <div class="MKT">
                        <button onclick="Order_Type(`+ticker_id+`)" >MKT</button>
                    </div>
                    <div class="current-status">
                        <h6>Profit/Loss</h6>
                        <p id="id_ticker_pl`+ticker_id+`">0</p>
                    </div>




                </div>
            </div>



            `)
    }

}

chatSocket.addEventListener('error', function (event) {
  console.log('WebSocket error: ', event);
});

function myAsk(counter) {
 market = false
  var asking = document.getElementById("p_ask"+counter).innerHTML;
  document.getElementById("p_buy"+counter).innerHTML = asking;
}


function myBid(counter) {
 market=false
  var biding = document.getElementById("p_bid"+counter).innerHTML;
  document.getElementById("p_sell"+counter).innerHTML = biding;
}

function myBuyTime(data,counter) {
  document.getElementById("p_buy_time"+counter).innerHTML = data;
}

function mySellTime(data,counter) {
  document.getElementById("p_sell_time"+counter).innerHTML = data;
}

//Buy Stock
function Buy(counter) {
  var quantity = document.getElementById("p_buy_time"+counter).innerHTML;
  var value = document.getElementById("p_buy"+counter).innerHTML;
  var limit_price = document.getElementById("p_buy"+counter).innerHTML;

    // Getting discord msg
  var msg = document.getElementById("p_msg"+counter).innerHTML
  var str = document.getElementById("p_msg"+counter).innerHTML
  const myArray = str.split(" ");

  if(myArray[0] === 'BTO' || myArray[0] === 'STC'){
        var channel = "EvaPanda"
    }
  else{
        var channel = "Bullwinkle"
  }
  chatSocket.send(JSON.stringify({
    'times':quantity,
    'amount':value,
    'operation':"BUY",
    'msg':msg,
    "check": false,
    'channel':channel,
    'order_type_btn':market,
    'ticker_id':counter
  }))
  market = false
}

function Sell(counter) {
  var order_type_btn = "LMT"
  var quantity = document.getElementById("p_sell_time"+counter).innerHTML;
  var value = document.getElementById("p_sell"+counter).innerHTML;

    // Getting discord msg
  var msg = document.getElementById("p_msg"+counter).innerHTML
  var str = document.getElementById("p_msg"+counter).innerHTML
  const myArray = str.split(" ");

  if(myArray[0] === 'BTO' || myArray[0] === 'STC'){
        var channel = "EvaPanda"
    }
  else{
        var channel = "Bullwinkle"
  }
  chatSocket.send(JSON.stringify({
    'times':quantity,
    'amount':value,
    'operation':"SELL",
    'msg':msg,
    "check": false,
    'channel':channel,    // EvaPanda or Bullwinkle
    'order_type_btn':market,  //tells us whether order is of MKT type or not
    'ticker_id':counter
//    'order_type_btn':order_type_btn
  }))
  market = false
}

function Close(counter) {


  chatSocket.send(JSON.stringify({
    "check": "close",
    'ticker_id':counter
  }))

  var close_div = document.getElementById("card"+counter);
  close_div.style.display = "none";
}

function Order_Type(counter){
    console.log("market",market)
    market = false

    if(market === false){
        document.getElementById("p_buy"+counter).innerHTML = "M";
        document.getElementById("p_sell"+counter).innerHTML = "M";
        market = true;
    }
    else{
        market = false;
    }


}