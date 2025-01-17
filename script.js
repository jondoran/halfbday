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

    // Calculate and populate the next half-birthday dynamically
    recipientBirthdayInput.addEventListener("input", function () {
        const today = new Date();
        const [month, day] = this.value.split("-").map(Number);

        if (!month || !day || month < 1 || month > 12 || day < 1 || day > 31) {
            halfBirthdayInput.value = ""; // Clear the field if invalid
            return;
        }

        const currentYear = today.getFullYear();
        const birthdayThisYear = new Date(currentYear, month - 1, day);
        const halfBirthday = new Date(birthdayThisYear);

        // Add 6 months to calculate half-birthday
        halfBirthday.setMonth(halfBirthday.getMonth() + 6);

        // If the half-birthday has already passed, calculate for next year
        if (halfBirthday < today) {
            halfBirthday.setFullYear(currentYear + 1);
        }

        // Format the half-birthday date
        const options = { year: "numeric", month: "long", day: "numeric" };
        const formattedHalfBirthday = halfBirthday.toLocaleDateString(undefined, options);

        // Populate the half-birthday field
        halfBirthdayInput.value = formattedHalfBirthday;
    });
});
