let bananas = 0;

let items = {
  monkey: { count: 0, cost: 100, generates: 1, icon: "🐒" },
  gorilla: { count: 0, cost: 870, generates: 5, icon: "🦍" },
  orangutan: { count: 0, cost: 6800, generates: 10, icon: "🦧" },
  sloth: { count: 0, cost: 94000, generates: 100, icon: "🦥" },
};

let lastClickTime = 0;
let clickRateLimit = 100; //only allow a click every 100ms

function increment() {

  let currentTime = new Date().getTime();
  if (currentTime - lastClickTime < clickRateLimit) {
    console.log("Rate limited");
    return;
  }
  lastClickTime = currentTime;

  bananas++;
  document.getElementById("counter").innerText = bananas;
  gsap.to("#clicker", { scale: 0.8, duration: 0.05, onComplete: resetScale });
  generateBanana();
}

function resetScale() {
  gsap.to("#clicker", { scale: 1, duration: 0.1 });
}

function generateBanana() {
  // Create a new div for the banana emoji
  let banana = document.createElement("div");
  banana.innerText = "🍌";
  banana.style.position = "absolute";
  banana.style.fontSize = "2em";

  let button = document.getElementById("clicker");
  banana.style.left = (button.offsetLeft + button.offsetWidth / 2) + "px";
  banana.style.top = (button.offsetTop + button.offsetHeight / 2) + "px";

  document.body.appendChild(banana);

  // Animate the banana to move in a random direction
  gsap.to(banana, {
    x: Math.random() * 200 - 100,
    y: Math.random() * 200 - 100,
    opacity: 0,
    duration: 2,
    onComplete: function () {
      // Remove the banana when the animation is complete
      document.body.removeChild(banana);
    }
  });
}

document.getElementById("clicker").addEventListener("click", increment);

for (let item in items) {
  document.getElementById(item).addEventListener("click", () => {
    if (bananas >= items[item].cost) {
      bananas -= items[item].cost;
      items[item].count++;
      items[item].cost = Math.floor(items[item].cost * 1.05); // Increase cost by 5%
      updateShopItem(item);
      updateBananaCount();
      generateItem(item);
    }
    else {
      let button = document.getElementById(item);
      button.classList.add('blink-red');
      setTimeout(() => {
        button.classList.remove('blink-red');
      }, 100);
    }
  });
}

function updateBananaCount() {
  document.getElementById("counter").innerText = bananas;
}

function updateShopItem(item) {
  let button = document.getElementById(item);
  document.getElementById(item).innerText = items[item].cost + "🍌";

  let itemName = item.charAt(0).toUpperCase() + item.slice(1);

  let title = button.closest('.item-details').querySelector('h3');
  title.innerText = itemName + " " + items[item].count + "x";
}

function generateItem(item) {
  let button = document.getElementById('clicker');
  let radius = 200;

  // Get count of this item type
  let count = items[item].count;

  let angle = (count / (count + 1)) * 2 * Math.PI;
  let x = radius * Math.cos(angle);
  let y = radius * Math.sin(angle);

  let newItem = document.createElement("span");
  newItem.innerText = items[item].icon;
  newItem.style.fontSize = "3rem";

  document.querySelector(".game").appendChild(newItem);
}

setInterval(() => {
  for (let item in items) {
    bananas += items[item].count * items[item].generates;
  }
  updateBananaCount();
}, 1000);
