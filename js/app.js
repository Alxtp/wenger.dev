gsap.from("#greeting", {duration: 2, scale: 0.1, ease: "elastic.out(1, 0.3)"});
gsap.to("#greeting", {duration: 2, y: "-=20", repeat: -1, yoyo: true, ease: "power1.inOut", delay: 2});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#toggleButton').addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('expanded');
    });
});