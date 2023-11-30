document.addEventListener("DOMContentLoaded", function () {
    const counterButton = document.getElementById("counterButton");

    // Check if the count is stored in local storage
    let count = localStorage.getItem("counter") || 0;

    // Display the initial count
    updateCounterText();

    // Function to update the counter text
    function updateCounterText() {
        counterButton.innerText = `This Button has been clicked ${count} times.`;
    }

    // Event listener for button click
    counterButton.addEventListener("click", function () {
        // Increase the count
        count++;

        // Update the counter text
        updateCounterText();

        // Save the count to local storage
        localStorage.setItem("counter", count);
    });
});
