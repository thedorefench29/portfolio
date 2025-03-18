let sections = document.querySelectorAll('section');
let NavLinks = document.querySelectorAll('header nav a');
let lastScrollTop = 0;

window.onscroll = () => {
    let sections = document.querySelectorAll('section');
    
    let navLinks = document.querySelectorAll('.nav-link');
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
    } else {
        console.warn('No nav links found.');
    }

    let contactBtn = document.querySelector('.btn-primary'); // Contact button

    

    // Check scroll position and add/remove active class dynamically
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 180; // Increased offset to handle larger screens
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
    
        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
            });
    
            // Add active class to the matching nav link
            let activeLink = document.querySelector('header nav a[href*="' + id + '"]');
            if (activeLink) {
                activeLink.classList.add('active');
            }
    
            sec.classList.add('show-animated');
        } else {
            sec.classList.remove('show-animated');
        }
    });

    // Special case: Handle Contact section separately
    let contactSection = document.querySelector('#contact');
    if (contactSection) {
        let contactOffset = contactSection.offsetTop - 110; // Increase offset to fix larger screens
        let contactHeight = contactSection.offsetHeight;
    
        if (window.scrollY >= contactOffset && window.scrollY < contactOffset + contactHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class for Contact button or link
            let contactLink = document.querySelector('header nav a[href*="contact"]');
            if (contactLink) {
                contactLink.classList.add('active');
            }
    
            contactSection.classList.add('show-animated');
        } else {
            contactSection.classList.remove('show-animated');
        }
    }

    // Handle Home section active class when scrolling to top
    if (window.scrollY === 0) {
        navLinks.forEach(link => link.classList.remove('active'));
        document.querySelector('header nav a[href*="Home"]').classList.add('active');
    }
};

// Add smooth scroll for Contact button and add active class when clicked
let contactBtn = document.querySelector('.btn-primary');

if (contactBtn) {
    contactBtn.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default link behavior
        let contactSection = document.querySelector('#contact');

        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            

            // Add active class to Contact button
            contactBtn.classList.add('active');

            // Add animation to Contact section
            contactSection.classList.add('show-animated');
        }
    });
} else {
    console.warn('Contact button not found.');
}



const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        navbar.style.top = "0"; // Hide navbar when scrolling down
    } else {
        navbar.style.top = "0"; // Show navbar when scrolling up
    }

    lastScrollTop = scrollTop;
});


const video = document.getElementById("background-video");

if (video) {
    video.addEventListener("loadeddata", () => {
        video.play();
    });
} else {
    console.warn('Background video not found.');
}

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav_links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
} 

function resetForm() {
    document.getElementById('contact-form').reset();
  }
