function createStars(x, y) {
  var arr = [1, 0.9, 0.8, 0.5, 0.2];

  arr.forEach(function(i) {
    var offset = (1 - i) * 75;
    var star = document.createElement('div');

    star.className = 'star';
    star.style.top = y + Math.round(Math.random() * offset - offset / 2) + 'px';
    star.style.left = x + Math.round(Math.random() * offset - offset / 2) + 'px';

    document.body.appendChild(star);

    setTimeout(function() {
      document.body.removeChild(star);
    }, Math.round(Math.random() * i * 600));
  });
}

window.addEventListener('mousemove', function(e) {
  createStars(e.clientX, e.clientY); // fixed here
}, false);

window.addEventListener('touchmove', function(e) {
  if (e.touches.length > 0) {
    var touch = e.touches[0];
    createStars(touch.clientX, touch.clientY); // and fixed here
  }
}, false);

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

    
      
