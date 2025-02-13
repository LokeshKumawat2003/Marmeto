function toggleMenu() {
  const nav = document.getElementById("mainNav");
  nav.classList.toggle("active");
}
document.addEventListener("DOMContentLoaded", function () {
  fetch(
    "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889"
  )
    .then((response) => response.json())
    .then((data) => {
      apiData(data.items);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});
function apiData(data) {
  let cartItemsContainer = document.getElementById("cart-items");

  data.forEach((el, i) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("cart-item");

    let subtotal = el.discounted_price * 1;

    newDiv.innerHTML = `
        <div class="product-info">
          <img src="${el.image}" alt="${el.title}" class="product-img" />
          <span>${el.title}</span>
        </div>
        <div class="price">Rs. ${el.original_price}</div>
        <div class="quantity">
          <input
            type="number"
            value="1"
            min="1"
            class="quantity-input"
            onchange="updateSubtotal(this, ${el.discounted_price}, ${i})"
          />
        </div>
        <div class="action">
          <div class="subtotal" id="subtotal-${i}">Rs. ${subtotal}</div>
          <i class="fa-solid fa-trash" onclick="removeItem(this, ${i})"></i>
        </div>
      `;

    cartItemsContainer.appendChild(newDiv);
  });
}

function updateSubtotal(input, price, index) {
  let quantity = parseInt(input.value);
  let subtotal = price * quantity;

  let subtotalElement = document.getElementById(`subtotal-${index}`);
  subtotalElement.innerHTML = `Rs. ${subtotal}`;

  updateTotal();
}

function removeItem(icon, index) {
  let cartItemsContainer = document.getElementById("cart-items");
  let itemToRemove = icon.closest(".cart-item");

  cartItemsContainer.removeChild(itemToRemove);

  updateTotal();
}

function updateTotal() {
  let subtotalElements = document.querySelectorAll(".subtotal");
  let total = 0;

  subtotalElements.forEach((subtotalElement) => {
    let subtotal = parseFloat(subtotalElement.innerHTML.replace("Rs. ", ""));
    total += subtotal;
  });

  document.getElementById("cart-total").innerHTML = `Rs. ${total.toFixed(2)}`;
}
