
var cID = "nl7bbxsawa4msprdwoklvghvbxr0vr";
var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var logos = [], links = [], bios = [], stat = []; //https://www.twitch.tv/user
var url = "https://api.twitch.tv/kraken/streams/"+ streamers[0] +"?client_id=" + cID;
var userUrl = "https://api.twitch.tv/kraken/users/"+ streamers[0] +"?client_id="+cID;
var html = "";

for(var i = 0 , len = streamers.length; i < len ; i++ ){
  loadData("https://api.twitch.tv/kraken/users/"+ streamers[i] +"?client_id="+cID, getDatas);
  loadData("https://api.twitch.tv/kraken/streams/"+ streamers[i] +"?client_id=" + cID, checkStatus);
}


function loadData(url, returnedData){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      //document.getElementById("main").innerHTML = this.responseText;
      //console.log(this.responseText);
      returnedData(this);
    }
  };
  xhttp.open("GET", url ,false);
  xhttp.send();
}

function getDatas(data){
    var json = JSON.parse(data.responseText);


    logos.push(json.logo);
    links.push("https://www.twitch.tv/" + json.name);
    bios.push(json.bio);

}


function checkStatus(data){
  var json = JSON.parse(data.responseText);
  stat.push(json.stream);
}


function deployHtml(){
  for(var x = 0 , len = streamers.length; x < len ; x++ ){

    if(stat[x] !== null){
      html += "<div class='row stream online bg-success' data-sname='"+ streamers[x] +"'>";
    }else{
      html += "<div class='row stream offline bg-info' data-sname='"+ streamers[x] +"'>";
    }
    html += "<div class='col-sm-2'><a target='_blank' href='"+ links[x] +"'>";
    if(logos[x] !== null){
      html += "<img src='"+ logos[x] +"' alt='"+ streamers[x] +"' class='img-fluid image' /></a></div>";
    }else{
      html += "<img src='https://placeholdit.imgix.net/~text?txtsize=33&txt=" + streamers[x] + "&w=200&h=200' alt='"+ streamers[x] +"' class='img-fluid image' /></a></div>";
    }

    html += "<div class='col-sm-3'><div class='valign'><a target='_blank' href='"+ links[x] +"'>"+ streamers[x] +"</a></div></div>";
    if(stat[x] !== null){
      html += "<div class='col-sm-7'><div class='valign'><strong>"+ stat[x]["game"] + ": " + stat[x].channel.status +"</strong></div></div></div>";
    }else{
      html += "<div class='col-sm-7 align-middle'><div class='valign'><strong>Offline</strong></div></div></div>";
    }

    //console.log(stat);
    document.getElementById("main").innerHTML = html;

  }
}
// wait a bit, server is slow
setTimeout(deployHtml, 3000);
