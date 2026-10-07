const validUser = {
  email: "customer@example.com",
  password: "Quality123",
};

const validPromo = "SAVE20";

let cart = [];
let discountRate = 0;

const loginForm = document.querySelector("#login-form");
const loginPanel = document.querySelector("#login-panel");
const storePanel = document.querySelector("#store-panel");
const loginMessage = document.querySelector("#login-message");
const sessionStatus = document.querySelector("#session-status");
const cartCount = document.querySelector("#cart-count");
const subtotal = document.querySelector("#subtotal");
const discount = document.querySelector("#discount");
const total = document.querySelector("#total");
const promoCode = document.querySelector("#promo-code");
const promoMessage = document.querySelector("#promo-message");
const checkoutMessage = document.querySelector("#checkout-message");

function money(value) {
  return `$${value.toFixed(2)}`;
}

function cartSubtotal() {
  return cart.reduce((sum, item) => sum + item.price, 0);
}

function renderCart() {
  const currentSubtotal = cartSubtotal();
  const discountAmount = currentSubtotal * discountRate;
  const currentTotal = currentSubtotal - discountAmount;

  cartCount.textContent = String(cart.length);
  subtotal.textContent = money(currentSubtotal);
  discount.textContent = money(discountAmount);
  total.textContent = money(currentTotal);
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const form = new FormData(loginForm);
  const email = String(form.get("email") ?? "");
  const password = String(form.get("password") ?? "");

  if (email === validUser.email && password === validUser.password) {
    loginMessage.textContent = "";
    sessionStatus.textContent = `Signed in as ${email}`;
    loginPanel.hidden = true;
    storePanel.hidden = false;
    return;
  }

  loginMessage.textContent = "Email or password is incorrect.";
});

document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    cart.push({
      name: button.dataset.product,
      price: Number(button.dataset.price),
    });

    checkoutMessage.textContent = "";
    renderCart();
  });
});


document.querySelector("#apply-promo").addEventListener("click", () => {
  const value = promoCode.value.trim().toUpperCase();

  if (cart.length === 0) {
    discountRate = 0;
    promoMessage.textContent = "Add an item before applying a promotional code.";
    renderCart();
    return;
  }

  if (value === validPromo) {
    discountRate = 0.2;
    promoMessage.textContent = "Promotional code applied. You saved 20 percent.";
    renderCart();
    return;
  }

  discountRate = 0;
  promoMessage.textContent = "Promotional code is invalid.";
  renderCart();
});

document.querySelector("#checkout").addEventListener("click", () => {
  if (cart.length === 0) {
    checkoutMessage.textContent = "Your cart is empty.";
    return;
  }

  const chargedTotal = cartSubtotal() * (1 - discountRate);

  cart = [];
  discountRate = 0;
  promoCode.value = "";
  promoMessage.textContent = "";
  renderCart();
  checkoutMessage.textContent = `Order placed. Total charged: ${money(chargedTotal)}.`;
});