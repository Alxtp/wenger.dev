gsap.from("#greeting", {duration: 2, scale: 0.1, ease: "elastic.out(1, 0.3)"});
gsap.to("#greeting", {duration: 2, y: "-=20", repeat: -1, yoyo: true, ease: "power1.inOut", delay: 2});

gsap.fromTo("#greeting", 
    {scale: 0.1, rotation: 0, opacity: 0, duration: .5, ease: "power1.inOut"}, 
    {scale: 1, rotation: 360, opacity: 1, duration: .5, ease: "power1.inOut"}
);