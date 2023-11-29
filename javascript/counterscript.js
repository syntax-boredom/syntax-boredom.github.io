document.addEventListener("DOMContentLoaded", async function () {
    const counterButton = document.getElementById("counterButton");

    // Function to update the counter text
    function updateCounterText() {
        counterButton.innerText = `This Button has been clicked ${count} times.`;
    }

    // Function to fetch the count from the JSON file
    async function fetchCount() {
        try {
            const response = await fetch("https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO_NAME/main/json/counter.json");
            const jsonData = await response.json();

            return jsonData.count || 0;
        } catch (error) {
            console.error("Error fetching count:", error);
        }

        return 0;
    }

    // Function to update the count in the JSON file
    async function updateCount(newCount) {
        try {
            const jsonData = { count: newCount };
            await fetch("https://raw.githubusercontent.com/syntax-boredom/syntax-boredom.github.io/main/json/counter.json", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(jsonData),
            });

            count = newCount;
            updateCounterText();
        } catch (error) {
            console.error("Error updating count:", error);
        }
    }

    // Initialize count from the JSON file
    count = await fetchCount();

    // Display the initial count
    updateCounterText();

    // Event listener for button click
    counterButton.addEventListener("click", async function () {
        // Increase the count
        count++;

        // Update the counter text
        updateCounterText();

        // Update the count in the JSON file
        await updateCount(count);
    });
});
