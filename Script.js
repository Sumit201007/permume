// Product List - 10 Perfumes
const perfumes = [
  { name: "Rose Whisper", desc: "Floral and sweet", price: 50 },
  { name: "Ocean Breeze", desc: "Fresh and clean", price: 45 },
  { name: "Vanilla Nights", desc: "Warm and cozy", price: 60 },
  { name: "Citrus Bloom", desc: "Fruity and energetic", price: 55 },
  { name: "Midnight Musk", desc: "Dark and mysterious", price: 70 },
  { name: "Amber Flame", desc: "Bold and spicy", price: 65 },
  { name: "Lavender Kiss", desc: "Soothing and floral", price: 52 },
  { name: "Jasmine Mist", desc: "Light and romantic", price: 58 },
  { name: "Sandalwood Soul", desc: "Earthy and grounded", price: 62 },
  { name: "White Orchid", desc: "Elegant and delicate", price: 57 }
];

let cart = [];

function showSignup() {
  document.getElementById("login-section").classList.add("hidden");
  document.getElementById("signup-section").classList.remove("hidden");
}

function showLogin() {
  document.getElementById("signup-section").classList.add("hidden");
  document.getElementById("login-section").classList.remove("hidden");
}

function signup() {
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;

  if (!username || !password) return alert("Fill in both fields");

  if (localStorage.getItem(username)) return alert("User already exists!");

  localStorage.setItem(username, password);
  alert("Signup successful! Now login.");
  showLogin();
}

function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  if (localStorage.getItem(username) === password) {
    localStorage.setItem("loggedInUser", username);
    loadHome();
  } else {
    alert("Invalid credentials");
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  location.reload();
}

function loadHome() {
  const user = localStorage.getItem("loggedInUser");
  if (user) {
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("signup-section").classList.add("hidden");
    document.getElementById("home-section").classList.remove("hidden");
    document.getElementById("user-display").innerText = user;
    renderProducts();
    updateCartUI();
  }
}

function renderProducts() {
  const list = document.getElementById("product-list");
  list.innerHTML = "";
  perfumes.forEach((perfume, index) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <h3>${perfume.name}</h3>
      <p>${perfume.desc}</p>
      <p>$${perfume.price}</p>
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;
    list.appendChild(div);
  });
}

function addToCart(index) {
  cart.push(perfumes[index]);
  updateCartUI();
}

function updateCartUI() {
  const cartList = document.getElementById("cart-list");
  const totalPriceEl = document.getElementById("total-price");
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, idx) => {
    total += item.price;
    const li = document.createElement("li");
    li.innerText = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });

  totalPriceEl.innerText = `Total: $${total}`;
}

function placeOrder() {
  if (cart.length === 0) {
    document.getElementById("order-status").innerText = "Cart is empty!";
    return;
  }
  document.getElementById("order-status").innerText =
    "✅ Order placed successfully!";
  cart = [];
  updateCartUI();
}

window.onload = loadHome;
