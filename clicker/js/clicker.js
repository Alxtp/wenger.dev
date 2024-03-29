let bananas = 0;
let targetBananas = bananas;
let won = false;
let items = {
  0: { name: "Click Force", description: "Generate 1 banana more per click", count: 0, cost: 50, generates: 0, lock: false, icon: "✖️" },
  1: { name: "Monkey", description: "Generates 1 banana per second", count: 0, cost: 150, generates: 1, lock: false, icon: "🐒" },
  2: { name: "Gorilla", description: "Generates 9 banana per second", count: 0, cost: 900, generates: 9, lock: true, icon: "🦍" },
  3: { name: "Orangutan", description: "Generates 63 banana per second", count: 0, cost: 6300, generates: 63, lock: true, icon: "🦧" },
  4: { name: "Sloth", description: "Generates 441 banana per second", count: 0, cost: 44100, generates: 441, lock: true, icon: "🦥" },
  5: { name: "Parrot", description: "Generates 1323 banana per second", count: 0, cost: 132300, generates: 1323, lock: true, icon: "🦜" },
  6: { name: "Flamingo", description: "Generates 3969 banana per second", count: 0, cost: 396900, generates: 3969, lock: true, icon: "🦩" },
  7: { name: "Butterfly", description: "Generates 19845 banana per second", count: 0, cost: 1190700, generates: 19845, lock: true, icon: "🦋" },
};
let keys = Object.keys(items);
let lastClickTime = 0;
let clickRateLimit = 100; // Only allow a click every 100ms
let body = document.querySelector("body");
let clicker = document.getElementById("clicker");
clicker.addEventListener("click", increment);
let counter = document.getElementById("counter");

startGame();

// Increment banana count
function increment() {
  let currentTime = new Date().getTime();

  if (currentTime - lastClickTime < clickRateLimit) {
    console.log("Rate limited");
    return;
  }
  lastClickTime = currentTime;

  bananas += 1 * (items[0].count + 1);
  counter.innerText = bananas;
  gsap.to("#clicker", { scale: 0.8, duration: 0.05, onComplete: resetScale });
  generateBanana();
}

function resetScale() {
  gsap.to("#clicker", { scale: 1, duration: 0.1 });
}

// Update banana count
function updateBananaCount() {
  counter.innerText = bananas;
}

// Auto generate bananas
setInterval(() => {
  targetBananas = bananas;
  if (won === false && bananas >= 1000000000) {
    finishGame();
    won = true;
  }
  for (let item in items) {
    if (items[item].count > 0) {
      targetBananas += items[item].count * items[item].generates;
      generateBanana();
    }
  }
}, 1000);

setInterval(() => {
  if (bananas < targetBananas) {
    let increment = Math.max(1, Math.floor((targetBananas - bananas) / 100));
    bananas += increment;
    updateBananaCount();
  }
}, 10);

// Clicker Animation
function generateBanana() {
  let banana = document.createElement("div");
  banana.innerText = "🍌";
  banana.style.position = "absolute";
  banana.style.fontSize = "3rem";
  banana.style.userSelect = "none";

  let button = document.getElementById("clicker");
  banana.style.left = (button.offsetLeft + button.offsetWidth / 2) + "px";
  banana.style.top = (button.offsetTop + button.offsetHeight / 2) + "px";

  body.appendChild(banana);

  gsap.to(banana, {
    x: Math.random() * 200 - 100,
    y: Math.random() * 200 - 100,
    opacity: 0,
    duration: 2,
    onComplete: function () {
      body.removeChild(banana);
    }
  });
}

// Item Shop
let shop = document.querySelector(".shop");
for (let item in items) {
  let shopItem = document.createElement("div");
  shopItem.className = "shop-item";
  let iconContainer = document.createElement("div");
  iconContainer.className = "icon-container";
  let icon = document.createElement("span");
  let itemDetails = document.createElement("div");
  itemDetails.className = "item-details";
  let title = document.createElement("h3");
  let description = document.createElement("p");
  let cost = document.createElement("button");
  cost.id = item;
  cost.addEventListener("click", () => buyItem(item));

  if (items[item].lock === true) {
    shopItem.classList.add("shop-item-hidden");
  }

  if (items[item].lock === true) {
    icon.textContent = "🔒";
  }
  else {
    icon.textContent = items[item].icon;
    title.textContent = items[item].name
    description.textContent = items[item].description;
    cost.textContent = items[item].cost + "🍌";
  }

  iconContainer.appendChild(icon);
  itemDetails.appendChild(title);
  itemDetails.appendChild(description);
  itemDetails.appendChild(cost);
  shopItem.appendChild(iconContainer);
  shopItem.appendChild(itemDetails);
  shop.appendChild(shopItem);
}

// Unlock item
function unlockItem(item) {
  let button = document.getElementById(item);
  let itemDetails = button.closest('.item-details');
  let shopItem = itemDetails.closest('.shop-item');
  let icon = shopItem.querySelector('.icon-container span');
  let title = shopItem.querySelector('.item-details h3');
  let description = shopItem.querySelector('.item-details p');

  button.textContent = items[item].cost + "🍌";
  shopItem.classList.remove('shop-item-hidden');
  icon.textContent = items[item].icon;
  title.textContent = items[item].name;
  description.textContent = items[item].description;

  items[item].lock = false;
}

// Item Unlock Modal
function unlockItemModal(item) {
  let modal = document.createElement("div");
  modal.className = "modal";
  let modalContent = document.createElement("div");
  modalContent.className = "modal-content";
  let title = document.createElement("h2");
  let icon = document.createElement("span");
  let description = document.createElement("p");
  let button = document.createElement("button");

  button.addEventListener("click", () => {
    body.removeChild(modal);
  });

  button.textContent = "Great!";
  title.textContent = "Congratulations!";
  description.textContent = "You unlocked: " + items[item].name + "!";
  icon.textContent = items[item].icon;

  modalContent.appendChild(title);
  modalContent.appendChild(description);
  modalContent.appendChild(icon);
  modalContent.appendChild(button);
  modal.appendChild(modalContent);
  body.appendChild(modal);

  let tl = gsap.timeline({ repeat: -1, yoyo: true });
  tl.to(icon, { rotation: 20, duration: 0.3, ease: "power1.inOut" })
}

// Buy item
function buyItem(item) {
  if (bananas >= items[item].cost) {
    bananas -= items[item].cost;
    targetBananas -= items[item].cost;
    items[item].count++;
    items[item].cost = Math.floor(items[item].cost * 1.05); // Increase cost by 5%
    updateShopItem(item);
    updateBananaCount();

    let currentIndex = keys.indexOf(item);
    let maxIndex = keys.length;
    let nextItemKey = keys[currentIndex + 1];
    let nextItem = items[nextItemKey];

    if (maxIndex > currentIndex + 1) {
      if (nextItem.lock === true) {
        unlockItem(nextItemKey);
        unlockItemModal(nextItemKey);
      }
    }

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

// Update shop item
function updateShopItem(item) {
  let button = document.getElementById(item);
  document.getElementById(item).innerText = items[item].cost + "🍌";

  let title = button.closest('.item-details').querySelector('h3');
  title.innerText = items[item].name + " " + items[item].count + "x";
}

// Display items
function generateItem(item) {
  let newItem = document.createElement("span");
  newItem.innerText = items[item].icon;
  newItem.style.fontSize = "3rem";
  newItem.style.display = "inline-block";
  newItem.style.userSelect = "none";

  document.querySelector(".items").appendChild(newItem);

  gsap.to(newItem, {
    y: "-15px",
    repeat: -1,
    yoyo: true,
    duration: 0.2,
    ease: "power1.inOut"
  });
}

// Game Start Modal
function startGame() {
  let modal = document.createElement("div");
  modal.className = "modal";
  let modalContent = document.createElement("div");
  modalContent.className = "modal-content";
  let title = document.createElement("h1");
  let icon = document.createElement("span");
  let comment = document.createElement("p");
  let button = document.createElement("button");

  button.addEventListener("click", () => {
    body.removeChild(modal);
  });

  button.textContent = "Let's start!";
  title.textContent = "Welcome!";
  comment.textContent = "Welcome to the Banana Clicker Game! 🍌 Click the banana to earn more bananas. Use your bananas to buy monkeys, gorillas, and other wild animals to generate more bananas for you. The goal is to reach 1'000'000'000 bananas! Good luck!";
  icon.textContent = "🍀";
  modalContent.appendChild(title);
  modalContent.appendChild(comment);
  modalContent.appendChild(icon);
  modalContent.appendChild(button);
  modal.appendChild(modalContent);
  body.appendChild(modal);
}

// Finish Game Modal
function finishGame() {
  let modal = document.createElement("div");
  modal.className = "modal";
  let modalContent = document.createElement("div");
  modalContent.className = "modal-content";
  let title = document.createElement("h1");
  let icon = document.createElement("span");
  let comment = document.createElement("p");
  let button = document.createElement("button");

  button.addEventListener("click", () => {
    body.removeChild(modal);
  });

  button.textContent = "Continue!";
  title.textContent = "Congratulations!";
  comment.textContent = "Wow, 1'000'000'000 bananas? That's bananas! 🍌 You've officially earned the title of 'Supreme Banana Clicker Champion'—a prestigious honor only bestowed upon those brave enough to waste copious amounts of time on a fruitless waste of time. Remember, while you're basking in banana glory, the rest of us are wondering if you've gone completely banana!";
  icon.textContent = "🎉🎉🎉";
  modalContent.appendChild(title);
  modalContent.appendChild(comment);
  modalContent.appendChild(icon);
  modalContent.appendChild(button);
  modal.appendChild(modalContent);
  body.appendChild(modal);
}