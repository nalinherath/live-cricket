let currentTab = "live";

document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentTab = btn.getAttribute("data-tab");
        loadMatches();
    });
});

async function loadMatches() {
    const container = document.getElementById("matches");
    container.innerHTML = "Loading matches...";

    try {
        const res = await fetch("/api/live");
        const data = await res.json();
        container.innerHTML = "";

        let matchCount = 0;

        data.typeMatches.forEach(type => {
            type.seriesMatches.forEach(series => {
                series.seriesAdWrapper?.matches?.forEach(match => {

                    const team1 = match.matchInfo.team1.teamName;
                    const team2 = match.matchInfo.team2.teamName;
                    const status = match.matchInfo.status || "Upcoming";

                    // Determine category
                    let category = "upcoming";
                    if (status.toLowerCase().includes("live")) category = "live";
                    else if (status.toLowerCase().includes("won") || status.toLowerCase().includes("match over")) category = "recent";

                    if (category !== currentTab) return; // only show selected tab

                    matchCount++;

                    let scoreText = "";
                    if (match.matchScore) {
                        const t1 = match.matchScore.team1Score?.inngs1;
                        const t2 = match.matchScore.team2Score?.inngs1;
                        if (t1) scoreText += `${t1.runs}/${t1.wickets} (${t1.overs} ov) `;
                        if (t2) scoreText += `vs ${t2.runs}/${t2.wickets} (${t2.overs} ov)`;
                    }

                    let cls = "upcoming";
                    if (category === "live") cls = "live";
                    else if (category === "recent") cls = "result";

                    const div = document.createElement("div");
                    div.className = "match";
                    div.innerHTML = `
                        <div class="teams">${team1} vs ${team2}</div>
                        <div class="score">${scoreText}</div>
                        <div class="status ${cls}">${status}</div>
                    `;
                    container.appendChild(div);
                });
            });
        });

        if (matchCount === 0) {
            container.innerHTML = "<p style='text-align:center; margin-top:20px;'>No matches in this category.</p>";
        }

    } catch (err) {
        container.innerHTML = "<p style='text-align:center; margin-top:20px; color:red;'>Error loading matches. Try again later.</p>";
        console.error(err);
    }
}

loadMatches();
setInterval(loadMatches, 20000);
