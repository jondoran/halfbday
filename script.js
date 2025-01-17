// JavaScript for custom validation
document.addEventListener("DOMContentLoaded", function () {
  const halfBirthdayInput = document.getElementById("half-birthday");

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
});

// Form validation function
function validateForm() {
  const halfBirthdayInput = document.getElementById("half-birthday");
  const dateError = document.getElementById("date-error");

  // Check if the selected date is within the valid range
  const selectedDate = new Date(halfBirthdayInput.value);
  const minDate = new Date(halfBirthdayInput.min);
  const maxDate = new Date(halfBirthdayInput.max);

  if (selectedDate < minDate || selectedDate > maxDate) {
    dateError.style.display = "block";
    return false; // Prevent form submission
  } else {
    dateError.style.display = "none";
    return true; // Allow form submission
  }
}
