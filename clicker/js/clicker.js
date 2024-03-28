let bananas = 99999999;

let items = {
  0: { name: "Click Force", description: "Generate 1 banana more per click", count: 0, cost: 50, generates: 0, lock: false, icon: "✖️" },
  1: { name: "Monkey", description: "Generates 1 banana per second", count: 0, cost: 150, generates: 1, lock: false, icon: "🐒" },
  2: { name: "Gorilla", description: "Generates 8 banana per second", count: 0, cost: 900, generates: 9, lock: true, icon: "🦍" },
  3: { name: "Orangutan", description: "Generates 34 banana per second", count: 0, cost: 6300, generates: 63, lock: true, icon: "🦧" },
  4: { name: "Sloth", description: "Generates 492 banana per second", count: 0, cost: 44100, generates: 441, lock: true, icon: "🦥" },
  5: { name: "Parrot", description: "Generates 1356 banana per second", count: 0, cost: 132300, generates: 1323, lock: true, icon: "🦜" },
  6: { name: "Flamingo", description: "Generates 1356 banana per second", count: 0, cost: 396900, generates: 3969, lock: true, icon: "🦩" },
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

  bananas += 1 * (items[0].count + 1);
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
let won = false;

setInterval(() => {
  targetBananas = bananas;
  if (won === false && bananas >= 100000000) {
    finishGame();
    won = true;
  }
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
  let banana = document.createElement("div");
  banana.innerText = "🍌";
  banana.style.position = "absolute";
  banana.style.fontSize = "2em";

  let button = document.getElementById("clicker");
  banana.style.left = (button.offsetLeft + button.offsetWidth / 2) + "px";
  banana.style.top = (button.offsetTop + button.offsetHeight / 2) + "px";

  document.body.appendChild(banana);

  gsap.to(banana, {
    x: Math.random() * 200 - 100,
    y: Math.random() * 200 - 100,
    opacity: 0,
    duration: 2,
    onComplete: function () {
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

// Item Modal
let body = document.querySelector("body");
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

let keys = Object.keys(items);

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

// Finish Modal
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
  comment.textContent = "Wow, 100'000'000 bananas? That's bananas! 🍌 You've officially earned the title of 'Supreme Banana Clicker Champion'—a prestigious honor only bestowed upon those brave enough to waste copious amounts of time on a fruitless waste of time. Remember, while you're basking in banana glory, the rest of us are wondering if you've gone completely banana!";
  icon.textContent = "🎉🎉🎉";
  modalContent.appendChild(title);
  modalContent.appendChild(comment);
  modalContent.appendChild(icon);
  modalContent.appendChild(button);
  modal.appendChild(modalContent);
  body.appendChild(modal);
}
