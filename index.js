const http=require("http");
const fs=require("fs");
var requests = require('requests');

const homeFile=fs.readFileSync("index.html","utf-8");

const replaceVal = (tempVal,orgVal)=>{
let temperature=tempVal.replace("{%tempval%}",orgVal.main.temp);
temperature=temperature.replace("{%tempmin%}",orgVal.main.temp_min);
temperature=temperature.replace("{%tempmax%}",orgVal.main.temp_max);
temperature=temperature.replace("{%location%}",orgVal.name);
temperature=temperature.replace("{%country%}",orgVal.sys.country);
temperature=temperature.replace("{%tempstatus%}",orgVal.weather[0].main);
return temperature;
};
const server=http.createServer((req,res)=>{
    if(req.url== "/"){

    //   requests("api.openweathermap.org/data/2.5/weather?q=Delhi&units=metric&appid=810fb92fe23ebb5f7138ae06703b3b5b")
    //   .on("data",(chunk)=>{
    //       const objdata=JSON.parse(chunk);
    //       console.log(objdata);
    //   })
    //   .on("end",(err)=>{
    //       if(err)return console.log("connection closed dueto error",err);
    //       console.log(end);
    //   });
    requests(
        "http://api.openweathermap.org/data/2.5/weather?q=Delhi&units=metric&appid=810fb92fe23ebb5f7138ae06703b3b5b#"
         )
   .on('data',  (chunk)=> {
    const objData=JSON.parse(chunk);
    const arrData=[objData]; 
    // console.log(arrData[0].main.temp);
    const realTimeData=arrData
    .map((val)=>replaceVal(homeFile,val))
    .join("");
    res.write(realTimeData);
    })
    .on('end',  (err)=> {
    if (err) return console.log('connection closed due to errors', err);
    res.end();
    });
    }

 }
 );
server.listen(8000,"127.0.0.1" ,()=>{
    console.log("Listening on server 8000");
});