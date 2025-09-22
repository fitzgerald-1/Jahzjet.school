document.addEventListener('DOMContentLoaded', () => {
  // Hamburger menu toggle
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const mainNav = document.querySelector('.main-nav');

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mainNav.classList.toggle('active');
    navMenu.classList.toggle('active'); // Optional: if you want to animate ul too
  });


  // Subscription form submit handler
  const subscriptionForm = document.querySelector('.subscription-form');
  subscriptionForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Subscription form submitted. Functionality to be implemented.');
  });

  // View all buttons alert
  const viewAllButtons = document.querySelectorAll('.view-all-btn');
  viewAllButtons.forEach(button => {
    button.addEventListener('click', () => {
      alert('View all functionality to be implemented.');
    });
  });

  // See More and See Less button functionality for photo gallery
  const seeMoreBtn = document.querySelector('.see-more-btn');
  const seeLessBtn = document.querySelector('.see-less-btn');
  const galleryImages = document.querySelectorAll('.gallery-img');
  const hiddenImages = document.querySelectorAll('.gallery-img.hidden');

  seeMoreBtn?.addEventListener('click', () => {
    hiddenImages.forEach(img => {
      img.classList.remove('hidden');
    });
    seeMoreBtn.style.display = 'none';
    seeLessBtn.style.display = 'inline-block';
  });

  seeLessBtn?.addEventListener('click', () => {
    galleryImages.forEach((img, index) => {
      if (index >= 4) {
        img.classList.add('hidden');
      }
    });
    seeLessBtn.style.display = 'none';
    seeMoreBtn.style.display = 'inline-block';
  });

  // Image viewer modal functionality
  const imageModal = document.getElementById('image-modal');
  const modalImage = document.getElementById('modal-image');
  const imageCloseBtn = document.getElementById('image-close');

  galleryImages.forEach(img => {
    img.addEventListener('click', () => {
      modalImage.src = img.src;
      modalImage.alt = img.alt;
      imageModal.style.display = 'block';
    });
  });

  imageCloseBtn?.addEventListener('click', () => {
    imageModal.style.display = 'none';
  });

  // Close modal when clicking outside the image
  imageModal?.addEventListener('click', (e) => {
    if (e.target === imageModal) {
      imageModal.style.display = 'none';
    }
  });

  // Hero banner image slider
  const heroBanner = document.querySelector('.hero-banner');
  const heroImages = [
    "../Images/Schoolbackg.jpg",
    "../Images/Seconbg.jpg"
  ];
  let currentHeroIndex = 0;

  function changeHeroImage() {
    currentHeroIndex = (currentHeroIndex + 1) % heroImages.length;
    heroBanner.style.backgroundImage = `url('${heroImages[currentHeroIndex]}')`;
  }

  setInterval(changeHeroImage, 7000);
});


// const heroBanner = document.querySelectorAll


// ---------Responsive-navbar-active-animation-----------
// function test(){
//   var tabsNewAnim = $('#navbarSupportedContent');
//   var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
//   var activeItemNewAnim = tabsNewAnim.find('.active');
//   var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
//   var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
//   var itemPosNewAnimTop = activeItemNewAnim.position();
//   var itemPosNewAnimLeft = activeItemNewAnim.position();
//   $(".hori-selector").css({
//     "top":itemPosNewAnimTop.top + "px", 
//     "left":itemPosNewAnimLeft.left + "px",
//     "height": activeWidthNewAnimHeight + "px",
//     "width": activeWidthNewAnimWidth + "px"
//   });
//   $("#navbarSupportedContent").on("click","li",function(e){
//     $('#navbarSupportedContent ul li').removeClass("active");
//     $(this).addClass('active');
//     var activeWidthNewAnimHeight = $(this).innerHeight();
//     var activeWidthNewAnimWidth = $(this).innerWidth();
//     var itemPosNewAnimTop = $(this).position();
//     var itemPosNewAnimLeft = $(this).position();
//     $(".hori-selector").css({
//       "top":itemPosNewAnimTop.top + "px", 
//       "left":itemPosNewAnimLeft.left + "px",
//       "height": activeWidthNewAnimHeight + "px",
//       "width": activeWidthNewAnimWidth + "px"
//     });
//   });
// }
// $(document).ready(function(){
//   setTimeout(function(){ test(); });
// });
// $(window).on('resize', function(){
//   setTimeout(function(){ test(); }, 500);
// });
// $(".navbar-toggler").click(function(){
//   $(".navbar-collapse").slideToggle(300);
//   setTimeout(function(){ test(); });
// });



// --------------add active class-on another-page move----------
// jQuery(document).ready(function($){
  // Get current path and find target link
  // var path = window.location.pathname.split("/").pop();

  // Account for home page with empty path
//   if ( path == '' ) {
//     path = 'index.html';
//   }

//   var target = $('#navbarSupportedContent ul li a[href="'+path+'"]');
//   // Add active class to target link
//   target.parent().addClass('active');
// });




// Add active class on another page linked
// ==========================================
// $(window).on('load',function () {
//     var current = location.pathname;
//     console.log(current);
//     $('#navbarSupportedContent ul li a').each(function(){
//         var $this = $(this);
//         // if the current path is like this link, make it active
//         if($this.attr('href').indexOf(current) !== -1){
//             $this.parent().addClass('active');
//             $this.parents('.menu-submenu').addClass('show-dropdown');
//             $this.parents('.menu-submenu').parent().addClass('active');
//         }else{
//             $this.parent().removeClass('active');
//         }
//     })
// });