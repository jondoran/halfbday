document.addEventListener("DOMContentLoaded", function () {
    const recipientBirthdayInput = document.getElementById("recipient-birthday");
    const halfBirthdayInput = document.getElementById("half-birthday");
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

    // Calculate and populate the half-birthday dynamically
    recipientBirthdayInput.addEventListener("change", function () {
        const birthday = new Date(this.value);
        if (isNaN(birthday)) {
            halfBirthdayInput.value = ""; // Clear the field if invalid
            return;
        }

        // Calculate half-birthday (6 months later)
        const halfBirthday = new Date(birthday);
        halfBirthday.setMonth(birthday.getMonth() + 6);

        // Format the half-birthday date
        const options = { year: "numeric", month: "long", day: "numeric" };
        const formattedHalfBirthday = halfBirthday.toLocaleDateString(undefined, options);

        // Populate the half-birthday field
        halfBirthdayInput.value = formattedHalfBirthday;
    });
});
