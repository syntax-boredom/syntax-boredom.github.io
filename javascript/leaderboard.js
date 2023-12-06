// leaderboard.js

document.addEventListener("DOMContentLoaded", async function () {
    let leaderboardData = await fetchLeaderboardData();

    function updateLeaderboard() {
        const leaderboardElement = document.getElementById("leaderboard");
        leaderboardElement.innerHTML = "<h2>Leaderboard</h2>";

        leaderboardData.forEach(entry => {
            leaderboardElement.innerHTML += `<p>${entry.name}: ${entry.count}</p>`;
        });
    }

    window.addToLeaderboard = async function () {
        const nameInput = document.getElementById("nameInput");
        const newName = nameInput.value.trim();

        if (!isValidName(newName)) {
            alert("Please enter a valid name with alphabetic characters only.");
            return;
        }

        const existingEntry = leaderboardData.find(entry => entry.name === newName);

        if (existingEntry) {
            alert("This name already exists in the leaderboard.");
            return;
        }

        leaderboardData.push({ name: newName, count: 0 });
        updateLeaderboard();

        await updateLeaderboardData(leaderboardData);
        nameInput.value = "";
    };

    function isValidName(name) {
        // Regular expression to check if the name contains only alphabetic characters
        const regex = /^[a-zA-ZüöäßÜÖÄ]+$/;
        return regex.test(name);
    }

    async function fetchLeaderboardData() {
        const response = await fetch("https://raw.githubusercontent.com/syntax-boredom/syntax-boredom.github.io/main/json/leaderboard.json");
        return await response.json();
    }

    async function updateLeaderboardData(newData) {
        const response = await fetch("https://api.github.com/repos/syntax-boredom/syntax-boredom.github.io/contents/json/leaderboard.json", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: "Update leaderboard.json",
                content: btoa(JSON.stringify(newData)),
                sha: (await fetchLeaderboardData()).sha
            })
        });

        if (response.ok) {
            console.log("Leaderboard updated successfully.");
        } else {
            console.error("Failed to update leaderboard.");
        }
    }

    // Initial leaderboard update
    updateLeaderboard();
});
