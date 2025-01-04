document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("half-birthday-form");
  const successMessage = document.getElementById("success-message");

  form.addEventListener("submit", (event) => {
    // Prevent the default form submission
    event.preventDefault();

    // Validate the date
    const sendDate = document.getElementById("send-date").value;
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    if (sendDate <= today) {
      alert("The send date must be in the future.");
      return;
    }

    // If validation passes, submit the form
    form.submit();

    // Show success message
    successMessage.style.display = "block";

    // Clear the form
    form.reset();
  });
});
