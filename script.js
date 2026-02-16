const API_KEY = "b0d9720e6bmsh92fbc195fcfa86ap1ab0afjsnf17af6585b48";

async function loadMatches(){
const res = await fetch("https://cricbuzz-cricket.p.rapidapi.com/matches/v1/live",{
method:"GET",
headers:{
"X-RapidAPI-Key":API_KEY,
"X-RapidAPI-Host":"cricbuzz-cricket.p.rapidapi.com"
}
});

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
<p>Status: ${match.matchInfo.status}</p>
`;

container.appendChild(div);
});
});
});
}

loadMatches();
setInterval(loadMatches,20000);
