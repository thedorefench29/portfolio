const form = document.getElementById("contact-form myForm");
  const thankYouBox = document.getElementById("thankYouMessage");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // prevent actual submission
    thankYouBox.style.display = "block";
  });

  function resetForm() {
    form.reset();
    thankYouBox.style.display = "none"; // hide message on reset
  }

      const form = document.getElementById("contact-form");
      const thankYouBox = document.getElementById("thankYouMessage");
    
      form.addEventListener("submit", function (event) {
        event.preventDefault();
      
        const fields = [
          { id: "firstName", name: "First Name" },
          { id: "lastName", name: "Last Name" },
          { id: "email", name: "Email" },
          { id: "phone", name: "Phone Number" },
          { id: "message", name: "Message" },
        ];
      
        let allFilled = true;
      
        fields.forEach(field => {
          const input = document.getElementById(field.id);
          const errorSpan = document.getElementById("error-" + field.id);
      
          if (input.value.trim() === "") {
            input.classList.add("error-border");
            errorSpan.textContent = "⚠️ This field is required.";
            errorSpan.style.display = "block";
            allFilled = false;
          } else {
            input.classList.remove("error-border");
            errorSpan.textContent = "";
            errorSpan.style.display = "none";
          }
        });
      
        // Optional: if all fields filled, show thank you
        if (allFilled) {
          thankYouBox.style.display = "block"; // make sure this is defined!
        } else {
          thankYouBox.style.display = "none";
        }
      });
    
      function resetForm() {
        const form = document.getElementById("contact-form");
        form.reset(); // clears inputs
      
        const errorMessages = document.querySelectorAll(".field-error");
        const inputs = document.querySelectorAll(".input, .textinput");
      
        errorMessages.forEach(span => {
          span.textContent = "";
          span.style.display = "none";
        });
      
        inputs.forEach(input => {
          input.classList.remove("error-border");
        });
      }

