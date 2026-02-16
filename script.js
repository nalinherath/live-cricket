async function loadMatches(){

const res = await fetch("/api/live");
const data = await res.json();

const container = document.getElementById("matches");
container.innerHTML="";

data.typeMatches.forEach(type=>{
type.seriesMatches.forEach(series=>{
series.seriesAdWrapper?.matches?.forEach(match=>{

const div=document.createElement("div");
div.className="match";

div.innerHTML=`
<h2>${match.matchInfo.team1.teamName} vs ${match.matchInfo.team2.teamName}</h2>
let cls="upcoming";
if(status.toLowerCase().includes("live")) cls="live";
if(status.toLowerCase().includes("won") || status.toLowerCase().includes("match over")) cls="result";

<p class="status ${cls}">${status}</p>

`;

container.appendChild(div);

});
});
});

}

loadMatches();
setInterval(loadMatches,20000);

