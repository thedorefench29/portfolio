
let sections = document.querySelectorAll('section');
let NavLinks = document.querySelectorAll('header nav a');
let lastScrollTop = 0;

window.onscroll = () => {
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('.nav-link');

    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 102;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
            });

            // Check if the element exists before adding active
            let activeLink = document.querySelector('header nav a[href*="'+id+'"]');
            if (activeLink) {
                activeLink.classList.add('active');
            }
            
            sec.classList.add('show-animated');
        } else {
            sec.classList.remove('show-animated');
        }
    });

    // Special case: Handle scroll to top to highlight Home
    if (window.scrollY === 0) {
        navLinks.forEach(link => link.classList.remove('active'));
        document.querySelector('header nav a[href*="Home"]').classList.add('active');
    }
};


const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop) {
    navbar.style.top = "0"; // Hide navbar when scrolling down
  } else {
    navbar.style.top = "0"; // Show navbar when scrolling up
  }
  
  lastScrollTop = scrollTop;
})

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav_links');
const video = document.getElementById("background-video");

video.addEventListener("loadeddata", () => {
    video.play();
});

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});
