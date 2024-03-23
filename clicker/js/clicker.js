let bananas = 1000;

let items = {
  click: { name: "Click Force", description: "Generate 1 banana more per click", count: 0, cost: 50, generates: 0, icon: "✖️" },
  monkey: { name: "Monkey", description: "Generates 1 banana per second", count: 0, cost: 100, generates: 1, icon: "🐒" },
  gorilla: { name: "Gorilla", description: "Generates 5 banana per second", count: 0, cost: 870, generates: 5, icon: "🦍" },
  orangutan: { name: "Orangutan", description: "Generates 10 banana per second", count: 0, cost: 6800, generates: 10, icon: "🦧" },
  sloth: { name: "Sloth", description: "Generates 100 banana per second", count: 0, cost: 94000, generates: 100, icon: "🦥" },
};

let lastClickTime = 0;
let clickRateLimit = 100; //only allow a click every 100ms

document.getElementById("clicker").addEventListener("click", increment);

// Increment banana count
function increment() {

  let currentTime = new Date().getTime();
  if (currentTime - lastClickTime < clickRateLimit) {
    console.log("Rate limited");
    return;
  }
  lastClickTime = currentTime;

  bananas += 1 * (items.click.count + 1);
  document.getElementById("counter").innerText = bananas;
  gsap.to("#clicker", { scale: 0.8, duration: 0.05, onComplete: resetScale });
  generateBanana();
}

function resetScale() {
  gsap.to("#clicker", { scale: 1, duration: 0.1 });
}

// Update banana count
function updateBananaCount() {
  document.getElementById("counter").innerText = bananas;
}

let targetBananas = bananas;

setInterval(() => {
  for (let item in items) {
    if (items[item].count > 0) {
      targetBananas += items[item].count * items[item].generates;
    }
  }
}, 1000);

setInterval(() => {
  if (bananas < targetBananas) {
    bananas++;
    updateBananaCount();
    generateBanana();
  }
}, 10);

// Animation
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

// Shop
let shop = document.querySelector(".shop");
for (let item in items) {
  let shopItem = document.createElement("div");
  shopItem.className = "shop-item";

  let iconContainer = document.createElement("div");
  iconContainer.className = "icon-container";

  let icon = document.createElement("span");
  icon.textContent = items[item].icon;
  iconContainer.appendChild(icon);


  let itemDetails = document.createElement("div");
  itemDetails.className = "item-details";

  let title = document.createElement("h3");
  title.textContent = items[item].name
  itemDetails.appendChild(title);

  let description = document.createElement("p");
  description.textContent = items[item].description;
  itemDetails.appendChild(description);

  let cost = document.createElement("button");
  cost.id = item;
  cost.addEventListener("click", () => buyItem(item));
  cost.textContent = items[item].cost + "🍌";
  itemDetails.appendChild(cost);

  shopItem.appendChild(iconContainer);
  shopItem.appendChild(itemDetails);
  shop.appendChild(shopItem);
}

function buyItem(item) {
  if (bananas >= items[item].cost) {
    bananas -= items[item].cost;
    targetBananas -= items[item].cost;
    items[item].count++;
    items[item].cost = Math.floor(items[item].cost * 1.05); // Increase cost by 5%
    updateShopItem(item);
    updateBananaCount();

    if (items[item].generates > 0) {
      generateItem(item);
    }
  }
  else {
    let button = document.getElementById(item);
    button.classList.add('blink-red');
    setTimeout(() => {
      button.classList.remove('blink-red');
    }, 100);
  }
}

function updateShopItem(item) {
  let button = document.getElementById(item);
  document.getElementById(item).innerText = items[item].cost + "🍌";

  let title = button.closest('.item-details').querySelector('h3');
  title.innerText = items[item].name + " " + items[item].count + "x";
}

// Display items
function generateItem(item) {
  let button = document.getElementById('clicker');
  let count = items[item].count;

  let newItem = document.createElement("span");
  newItem.innerText = items[item].icon;
  newItem.style.fontSize = "3rem";
  newItem.style.display = "inline-block";

  document.querySelector(".items").appendChild(newItem);

  gsap.to(newItem, {
    y: "-15px",
    repeat: -1,
    yoyo: true,
    duration: 0.2,
    ease: "power1.inOut"
  });
}
