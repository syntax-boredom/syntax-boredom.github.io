document.addEventListener("DOMContentLoaded", async function () {
    const counterButton = document.getElementById("counterButton");

    // Function to update the counter text
    function updateCounterText() {
        counterButton.innerText = `This Button has been clicked ${count} times.`;
    }

    // Function to fetch the count from the JSON file
    async function fetchCount() {
        try {
            const response = await fetch("path/to/counter.json");
            const jsonData = await response.json();

            // Extract the count from the JSON data
            return jsonData.count || 0;
        } catch (error) {
            console.error("Error fetching count:", error);
        }

        return 0;
    }

    // Function to update the count in the JSON file
    async function updateCount(newCount) {
        try {
            const response = await fetch("path/to/counter.json", {
                method: "PUT", // Use the appropriate HTTP method for updating files
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ count: newCount }),
            });

            if (response.ok) {
                count = newCount;
                updateCounterText();
            }
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
