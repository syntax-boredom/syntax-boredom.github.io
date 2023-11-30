// Function to fetch the count from the Gist
async function fetchCount() {
    try {
        const response = await fetch("https://gist.githubusercontent.com/syntax-boredom/84c467d185726e27ce0ca57232646955/raw/counter.json");
        const jsonData = await response.json();

        return jsonData.count || 0;
    } catch (error) {
        console.error("Error fetching count:", error);
    }

    return 0;
}

// Function to update the count in the Gist
async function updateCount(newCount) {
    try {
        const gistData = {
            count: newCount,
        };

        await fetch("https://gist.githubusercontent.com/syntax-boredom/84c467d185726e27ce0ca57232646955/raw/counter.json", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(gistData),
        });

        count = newCount;
        updateCounterText();
    } catch (error) {
        console.error("Error updating count:", error);
    }
}
