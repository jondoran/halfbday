// JavaScript for populating time zone dropdown and validation
document.addEventListener("DOMContentLoaded", function () {
    const halfBirthdayInput = document.getElementById("half-birthday");
    const timeZoneSelect = document.getElementById("time-zone");

    // Set the min and max date for the half-birthday field
    const today = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(today.getFullYear(), today.getMonth() + 12, today.getDate());

    // Format the dates as YYYY-MM-DD
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    // Set min and max attributes for the date input
    halfBirthdayInput.min = formatDate(today);
    halfBirthdayInput.max = formatDate(maxDate);

    // Populate time zone dropdown
    const timeZones = Intl.supportedValuesOf('timeZone'); // Get all IANA time zones
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
    const halfBirthdayInput = document.getElementById("half-birthday");
    const dateError = document.getElementById("date-error");
    const timeZoneSelect = document.getElementById("time-zone");

    // Check if the selected date is within the valid range
    const selectedDate = new Date(halfBirthdayInput.value);
    const minDate = new Date(halfBirthdayInput.min);
    const maxDate = new Date(halfBirthdayInput.max);

    if (selectedDate < minDate || selectedDate > maxDate) {
        dateError.style.display = "block";
        return false; // Prevent form submission
    } else {
        dateError.style.display = "none";
    }

    // Check if a time zone is selected
    if (!timeZoneSelect.value) {
        alert("Please select a valid time zone.");
        return false; // Prevent form submission
    }

    return true; // Allow form submission
}
