document.addEventListener("DOMContentLoaded", function () {
  const monthSelect = document.getElementById("recipient-month");
  const daySelect = document.getElementById("recipient-day");
  const halfBirthdayInput = document.getElementById("halfBirthday");
  const timeZoneSelect = document.getElementById("recipientTimeZone");
  const errorMessage = document.getElementById("date-error");

  // Populate month and day dropdowns
  for (let i = 1; i <= 12; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = new Date(0, i - 1).toLocaleString("default", { month: "long" });
    monthSelect.appendChild(option);
  }

  for (let i = 1; i <= 31; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    daySelect.appendChild(option);
  }

  // Populate time zone dropdown dynamically
  const timeZones = Intl.supportedValuesOf("timeZone");
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
  } else {
    timeZoneSelect.value = "UTC"; // Default fallback time zone
  }

  // Validate date and calculate half-birthday
  function calculateHalfBirthday() {
    const month = parseInt(monthSelect.value, 10);
    const day = parseInt(daySelect.value, 10);

    // Check if the selected date is valid
    const isValidDate = (month, day) => {
      const testDate = new Date(2025, month - 1, day); // Use a fixed year for validation
      return testDate.getMonth() === month - 1 && testDate.getDate() === day;
    };

    if (!isValidDate(month, day)) {
      errorMessage.textContent = "Invalid date. Please select a valid day for the chosen month.";
      halfBirthdayInput.value = "";
      return;
    }

    errorMessage.textContent = ""; // Clear any previous error messages

    // Calculate half-birthday
    const today = new Date();
    const currentYear = today.getFullYear();
    const birthdayThisYear = new Date(currentYear, month - 1, day);
    const halfBirthday = new Date(birthdayThisYear);

    // Add 6 months to calculate half-birthday
    halfBirthday.setMonth(halfBirthday.getMonth() + 6);

    // Handle month overflow (e.g., adding 6 months to August 31)
    if (halfBirthday.getDate() !== birthdayThisYear.getDate()) {
      halfBirthday.setDate(0); // Set to the last valid day of the month
    }

    // If the half-birthday has already passed, calculate for next year
    if (halfBirthday < today) {
      halfBirthday.setFullYear(currentYear + 1);
    }

    // Format the half-birthday date
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedHalfBirthday = halfBirthday.toLocaleDateString(undefined, options);

    // Populate the half-birthday field
    halfBirthdayInput.value = formattedHalfBirthday;
  }

  // Add event listeners
  monthSelect.addEventListener("change", calculateHalfBirthday);
  daySelect.addEventListener("change", calculateHalfBirthday);
});
