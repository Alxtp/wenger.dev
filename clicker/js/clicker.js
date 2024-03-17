let count = 0;

function increment() {
    count++;
    document.getElementById("counter").innerText = count;

    gsap.to("#clicker", {scale: 0.8, duration: 0.05, onComplete: resetScale});

    // Generate a banana emoji
    generateBanana();
}

function resetScale() {
    gsap.to("#clicker", {scale: 1, duration: 0.1});
}

function generateBanana() {
    // Create a new div for the banana emoji
    let banana = document.createElement("div");
    banana.innerText = "🍌";
    banana.style.position = "absolute";
    banana.style.fontSize = "2em";

    // Position the banana at the button's location
    let button = document.getElementById("clicker");
    banana.style.left = (button.offsetLeft + button.offsetWidth / 2) + "px";
    banana.style.top = (button.offsetTop + button.offsetHeight / 2) + "px";

    // Add the banana to the body
    document.body.appendChild(banana);

    // Animate the banana to move in a random direction
    gsap.to(banana, {
        x: Math.random() * 200 - 100, // Random value between -100 and 100
        y: Math.random() * 200 - 100, // Random value between -100 and 100
        opacity: 0,
        duration: 2,
        onComplete: function() {
            // Remove the banana when the animation is complete
            document.body.removeChild(banana);
        }
    });
}

document.getElementById("clicker").addEventListener("click", increment);