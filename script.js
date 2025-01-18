function scrollToForm() {
    document.getElementById('form').scrollIntoView({ behavior: 'smooth' });
}

function populateTimezones() {
    const timezoneSelect = document.getElementById('recipient-timezone');
    const timezones = Intl.supportedValuesOf('timeZone');

    // Attempt to autodetect the user's timezone
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    timezones.forEach(timezone => {
        const option = document.createElement('option');
        option.value = timezone;
        option.text = timezone;

        // Set the autodetected timezone as the default selected option
        if (timezone === userTimezone) {
            option.selected = true;
        }

        timezoneSelect.appendChild(option);
    });
}

const recipientMonth = document.getElementById('recipient_month');
const recipientDay = document.getElementById('recipient_day');
const halfBirthday = document.getElementById('half-birthday');

function updateRecipientDayDropdown() {
    const month = parseInt(recipientMonth.value);
    const daysInMonth = new Date(2000, month, 0).getDate(); // Using year 2000 avoids leap year issues

    recipientDay.innerHTML = ''; // Clear existing options

    for (let day = 1; day <= daysInMonth; day++) {
        const option = document.createElement('option');
        option.value = (day < 10 ? '0' : '') + day; // Pad with leading zero if needed
        option.text = day;
        recipientDay.appendChild(option);
    }

    updateHalfBirthday();
}

function calculateHalfBirthday(month, day) {
    const today = new Date();
    const currentYear = today.getFullYear();
    let halfBirthday = new Date(currentYear, month - 1, day); // Month is 0-indexed

    halfBirthday.setMonth(halfBirthday.getMonth() + 6);

    if (halfBirthday < today) {
        halfBirthday.setFullYear(currentYear + 1);
    }

    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return halfBirthday.toLocaleDateString('en-GB', options);
}

function updateHalfBirthday() {
    const month = parseInt(recipientMonth.value);
    const day = parseInt(recipientDay.value);
    const halfBirthdayDate = calculateHalfBirthday(month, day); // Use the new function
    halfBirthday.value = halfBirthdayDate;
}

recipientMonth.addEventListener('change', updateRecipientDayDropdown);
recipientDay.addEventListener('change', updateHalfBirthday);
updateRecipientDayDropdown(); // Initial population
updateHalfBirthday(); // Call to initialize the half-birthday field

function showPrivacyPolicy() {
    document.getElementById('privacy-policy').style.display = 'block';
}

function hidePrivacyPolicy() {
    document.getElementById('privacy-policy').style.display = 'none';
}


populateTimezones();
calculateHalfBirthday();
