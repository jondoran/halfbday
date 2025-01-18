function populateTimeZones() {
  const timeZoneSelect = document.getElementById("recipientTimeZone");
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Predefined list of time zones
  const timeZones = [
    "US/Eastern",
    "US/Central",
    "US/Mountain",
    "US/Pacific",
    "UTC",
    "Europe/London",
    "Asia/Tokyo",
    "Australia/Sydney",
  ];

  // Add the user's detected time zone to the list if it's not already there
  if (!timeZones.includes(userTimeZone)) {
    timeZones.unshift(userTimeZone); // Add to the beginning
  }

  timeZoneSelect.innerHTML = ""; // Clear existing options

  timeZones.forEach((tz) => {
    const option = document.createElement("option");
    option.value = tz;
    option.text = tz;
    if (tz === userTimeZone) {
      option.selected = true; // Set detected time zone as default
    }
    timeZoneSelect.appendChild(option);
  });
}


// Call this function when the page loads
window.addEventListener('DOMContentLoaded', (event) => {
    populateTimeZones();
});


function calculateHalfBirthday(birthdayMonth, birthdayDay) {
    // Get current date
    let today = new Date();
    let currentYear = today.getFullYear();

    // Create birthday date object for the current year
    let birthdayThisYear = new Date(currentYear, birthdayMonth - 1, birthdayDay);

    // Calculate half-birthday
    let halfBirthday = new Date(birthdayThisYear);
    halfBirthday.setMonth(halfBirthday.getMonth() + 6);

    // Adjust year if half-birthday is in the next year
    if (halfBirthday < today) {
        halfBirthday.setFullYear(currentYear + 1);
    }

    return halfBirthday;
}

function showForm() {
    document.getElementById("form-section").scrollIntoView({ behavior: "smooth" });
}


document.getElementById('halfBirthdayForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    let recipientName = document.getElementById('recipientName').value;
    let recipientEmail = document.getElementById('recipientEmail').value;
    let recipientTimeZone = document.getElementById('recipientTimeZone').value;
    let birthdayMonth = parseInt(document.getElementById('birthdayMonth').value);
    let birthdayDay = parseInt(document.getElementById('birthdayDay').value);

    // Calculate half-birthday
    let halfBirthday = calculateHalfBirthday(birthdayMonth, birthdayDay);

    // Format half-birthday as MM/DD/YYYY
    let formattedHalfBirthday = (halfBirthday.getMonth() + 1).toString().padStart(2, '0') + '/' +
        halfBirthday.getDate().toString().padStart(2, '0') + '/' +
        halfBirthday.getFullYear();

    // Update the read-only half-birthday field
    document.getElementById('halfBirthdayDate').value = formattedHalfBirthday;

    // For demonstration, just log the form data and half-birthday
    console.log('Recipient Name:', recipientName);
    console.log('Recipient Email:', recipientEmail);
    console.log('Recipient Time Zone:', recipientTimeZone);
    console.log('Half Birthday:', formattedHalfBirthday);

    // In a real application, you would submit this data to your backend/Netlify forms
});
