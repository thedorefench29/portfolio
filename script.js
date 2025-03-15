
let sections = document.querySelectorAll('section');
let NavLinks = document.querySelectorAll('header nav a');
let lastScrollTop = 0;

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight ;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            NavLinks.forEach(links => {
                links.classList.remove('Active');
                document.querySelector('header nav a[href*='+id+']').classList.add('Active');
            });
            sec.classList.add('show-animated');

        }
        else{
            sec.classList.remove('show-animated');
        }
    });
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
