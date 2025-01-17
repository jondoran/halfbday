document.addEventListener("DOMContentLoaded", function () {
    const recipientBirthdayInput = document.getElementById("recipient-birthday");
    const timeZoneSelect = document.getElementById("timezone");

    // Populate time zone dropdown dynamically
    const timeZones = Intl.supportedValuesOf("timeZone"); // Get all IANA time zones
    timeZones.forEach((zone) => {
        const option = document.createElement("option");
        option.value = zone;
        option.textContent = zone.replace("_", " "); // Replace underscores with spaces for readability
        timeZoneSelect.appendChild(option);
    });

    // Auto-detect user's time zone and pre-select it
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timeZones.includes(userTimeZone)) {
        timeZoneSelect.value = userTimeZone;
    }
});

// Form validation function
function validateForm() {
    const recipientBirthdayInput = document.getElementById("recipient-birthday");
    const timeZoneSelect = document.getElementById("timezone");

    // Check if a valid date is selected
    if (!recipientBirthdayInput.value) {
        alert("Please select a valid birthday.");
        return false; // Prevent form submission
    }

    // Check if a time zone is selected
    if (!timeZoneSelect.value) {
        alert("Please select a valid time zone.");
        return false; // Prevent form submission
    }

    return true; // Allow form submission
}
