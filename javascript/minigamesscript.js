document.addEventListener("DOMContentLoaded", function () {
    const darkOverlay = document.getElementById("darkOverlay");
    let isOverlayActive = false;

    // Function to toggle the dark overlay
    function toggleDarkOverlay() {
        isOverlayActive = !isOverlayActive;

        if (isOverlayActive) {
            // Overlay is active, show overlay with a black semi-transparent sheet
            darkOverlay.style.display = "block";
            darkOverlay.style.pointerEvents = "none"; // Allow pointer events to pass through
            darkOverlay.style.zIndex = "9999"; // Set a high z-index to make sure it's on top
        } else {
            // Overlay is not active, hide overlay
            darkOverlay.style.display = "none";
            darkOverlay.style.pointerEvents = "auto"; // Enable pointer events on the overlay
        }
    }

    // Initial state: overlay is on
    toggleDarkOverlay();

    // Mousemove event for the dim light effect and "light" in the overlay
    document.addEventListener("mousemove", function (event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        // Adjust the size of the "light" (larger)
        const lightSize = "45px";

        // Set the position of the "light" in the overlay
        darkOverlay.style.background = `radial-gradient(circle ${lightSize} at ${mouseX}px ${mouseY}px, transparent 30%, rgba(0, 0, 0, 0.9))`;
    });

    // Button click event to toggle the overlay
    document.getElementById("removeDarkOverlay").addEventListener("click", toggleDarkOverlay);
});
