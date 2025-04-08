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
          const firstName = document.getElementById("firstName").value.trim();
          thankYouBox.textContent = `✅ Thank you, ${firstName}! Your message was received.`;
          thankYouBox.style.display = "block";
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
            
        thankYouBox.style.display = "none";
        thankYouBox.textContent = ""; // optional: clear the message
      }

