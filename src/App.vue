<!--<template>
  <div id="app">
    <button v-on:click="sendMessage('xx')">blabel</button>
  </div>
</template>-->

<script>
var dataPlot;
var maxVals=120;//anzahl der wert die im plot gleichzeitig angezeigt werden
var count=0;
var lastVal=0;
var lastDate=0;
var datetime; var datasplit; var data;

//heartbeatvals
var up1=false; var up2=false; var up3=false;
var down1=false; var down2=false; var down3=false;
var upcount=0; var downcount=0; var beatcount=0; var heartbeat=0; var lastbeattime;


function removeData(){
  dataPlot.data.labels.shift();
  dataPlot.data.datasets[0].data.shift();
}

function addData(label,data){
  if (dataPlot.data.datasets[0].data.length>maxVals) removeData();
  //bar
  //if (dataPlot.data.labels.length>maxVals) removeData();
  //dataPlot.data.labels.push(label);
  //dataPlot.data.datasets[0].data.push(data);

  //scatter
  //dataPlot.data.datasets.data.x.push(label)
  //dataPlot.data.datasets.data.y.push(data)
  //dataPlot.data.labels.push(label)
  //dataPlot.data.datasets.push([{label: label, fill: false, data: [{x: label, y: data}] }]);
  //dataPlot.data.datasets.push([{ data: [{x: label, y: data}] }]);
  dataPlot.data.datasets[0].data.push({x: count, y: data});
  //if (count<400) {
    dataPlot.update();
    //}
  count++;
  //if (count>280 & count<300){
    //console.log("count ",count)
    //console.log("dataPlot: ",dataPlot)
    //console.log(count, "=count, ", dataPlot.data)
    //console.log(dataPlot.length)
  //}
  if (dataPlot.length==30) {console.log(dataPlot)}

}
dataPlot=new Chart(document.getElementById("heartbeatplot"), {//myChart line-chart
  type: 'scatter',//bar scatter
  data: {
    datasets: [{
      label: "Heartbeat",
      data: [],
      //borderColor: "#3e95cd",
    }]
  },
  options: {
    maintainAspectRatio: false
    }
  });

dataPlot.height=200
//  var ctx = document.getElementById("myChart");
//  ctx.height = 200;

/*
function sendDataRate(){
  var dataRate=document.getElementById("dataRateSlider").value;
  //ws.send(dataRate);
  console.log(dataRate)
  dataRate=1.0/dataRate;
  document.getElementById("dataRateLabel").innerHTML="Rate: "+dataRate.toFixed(2) + "Hz";
}*/



export default {
  name: 'App',
  data: function() {
    return {
      connection: null
    }
  },
  methods: {
    sendMessage: function(message){
      console.log(this.connection)
      this.connection.send(message)
      console.log("Message sent: "+message)

    }
  },
  created: function() {
    console.log("starting conn to websock")
    this.connection = new WebSocket("ws://localhost:8081");//, ['soap', 'xmpp']);
    //this.connection = new WebSocket("wss://192.168.8.102:8081")
    //console.log(socket)
    this.connection.onopen = function (e) {
      console.log(e);
      console.log("Successful open")
    }
    this.connection.onmessage = function (e) {
      //console.log("Successful message: "+e)
    }
    this.connection.addEventListener("message",event => {
      //console.log("Received msg from server: ",event.data)
      var wsdata=event.data;
      datasplit=wsdata.split("=")
      if (datasplit.length>0){
        if (datasplit[0]=="hbval"){
          data=datasplit[1];//console.log("hbval "+data)
          }
        if (datasplit[0]=="datetime"){
          datetime=new Date(datasplit[1]);
          //datetime.setMilliseconds(parseInt(datasplit[2]))
          //console.log("datasplit[2] "+datasplit[2],typeof parseInt(datasplit[2]))
          //console.log("datetimexx "+datetime,typeof datetime)
          }
      }

if (beatcount==0) {        lastbeattime=datetime}
      //var today=new Date();
      //var t= today.getHours() + ":" +today.getMinutes() + ":"+today.getSeconds();

      //HEARTBEAT Berechnungen
      if (data>=lastVal & downcount==0) {
        upcount++;//console.log("upcount ",upcount)
      }
      if (data<lastVal & upcount>10) {
        downcount++;//console.log("downcount ",downcount)
      }
      if (data<lastVal & upcount>10 & downcount>10) {
        beatcount++; //console.log("beatcount=",beatcount);
        downcount=0; upcount=0;
        //var x=datetime instanceof Date;
        //var y=lastbeattime instanceof Date;
        //console.log("types",typeof datetime," ",typeof lastbeattime,x,y)
        heartbeat=60/(Math.abs(Math.round((datetime-lastbeattime))/1000))
        console.log("Diffxx=",datetime-lastbeattime,", ",datetime.getMilliseconds()-lastbeattime.getMilliseconds(),", ms=",datetime.getMilliseconds())
        console.log("hb=",heartbeat,", diff=",(datetime-lastbeattime)/1000,", lastbeattime=",lastbeattime," time=",datetime)

        lastbeattime=datetime//new Date(datetime)
      }
      

      /*if ((up1==false & up2==false & up3==false) & (data>lastval)) {up1=true}
      if ((up1==true & up2==false & up3==false) & (data>lastval)) {up2=true}
      if ((up1==true & up2==true & up3==false) & (data>lastval)) {up3=true}
      if ((up1==false & up2==false & up3==false) & (data>lastval)) {up1=true}
      if ((up1==true & up2==false & up3==false) & (data>lastval)) {up2=true}
      if ((up1==true & up2==true & up3==false) & (data>lastval)) {up3=true}*/
      

      addData(datetime,data)//.value)
      lastVal=data;
      lastDate=datetime

    })


  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 75%;
}
</style>
