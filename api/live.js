export default async function handler(req, res) {
    try {
        const response = await fetch("https://cricbuzz-cricket.p.rapidapi.com/matches/v1/live", {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "b0d9720e6bmsh92fbc195fcfa86ap1ab0afjsnf17af6585b48",
                "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com"
            }
        });

        const data = await response.json();

        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch matches" });
    }
}
