const currentPath = window.location.pathname;

document.querySelectorAll('.navbar a').forEach(link => {
    const linkPath = link.getAttribute('href');

    if (currentPath.includes(linkPath) && linkPath !== '/') {
        link.classList.add('active');
    }
});

 

