window.addEventListener('scroll', function() {
    let nav = document.querySelector('.nav-area');

    // Check if user has scrolled more than 50px
    if (window.scrollY > 50) {
        nav.classList.add('sticky_navigation');
    } else {
        nav.classList.remove('sticky_navigation');
    }

    // Calculate the scroll percentage
    let scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight);

    // Convert that percentage into color values
    let backgroundColorValue = 255 - Math.floor(scrollPercentage * 255); // Background goes from white to black
    let textColorValue = Math.floor(scrollPercentage * 255); // Text goes from black to white

    // Apply background color to body
    document.body.style.backgroundColor = `rgb(${backgroundColorValue}, ${backgroundColorValue}, ${backgroundColorValue})`;

    // Apply background color to .nav-area
    nav.style.backgroundColor = `rgb(${backgroundColorValue}, ${backgroundColorValue}, ${backgroundColorValue})`;

    // Apply text color to body and headings
    document.body.style.color = `rgb(${textColorValue}, ${textColorValue}, ${textColorValue})`;

    let headings = document.querySelectorAll('h1, h2, h4, h5, h6');
    headings.forEach(function(heading) {
        heading.style.color = `rgb(${textColorValue}, ${textColorValue}, ${textColorValue})`;
    });

    let paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(function(paragraph) {
        paragraph.style.color = `rgb(${textColorValue}, ${textColorValue}, ${textColorValue})`;
    });
});
