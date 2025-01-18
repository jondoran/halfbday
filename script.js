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

function calculateHalfBirthday() {
    const birthdayInput = document.getElementById('recipient-birthday');
    const halfBirthdayInput = document.getElementById('half-birthday-date');

    birthdayInput.addEventListener('change', () => {
        const birthdayDate = birthdayInput.value;
        if (birthdayDate) {
            try {
                const [month, day] = birthdayDate.split('/').map(Number);
                let halfBirthday = new Date(new Date().getFullYear(), month - 1 + 6, day); // Add 6 months

                // Adjust the year if the half-birthday is in the next year
                if (halfBirthday < new Date()) {
                    halfBirthday.setFullYear(halfBirthday.getFullYear() + 1);
                }

                const formattedHalfBirthday = halfBirthday.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
                halfBirthdayInput.value = formattedHalfBirthday;
            } catch (error) {
                halfBirthdayInput.value = 'Invalid date format';
            }
        } else {
            halfBirthdayInput.value = '';
        }
    });
}


function showPrivacyPolicy() {
    document.getElementById('privacy-policy').style.display = 'block';
}

function hidePrivacyPolicy() {
    document.getElementById('privacy-policy').style.display = 'none';
}


populateTimezones();
calculateHalfBirthday();
