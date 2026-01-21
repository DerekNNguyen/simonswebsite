const productList = document.getElementById("productList");
const productSelect = document.getElementById("productSelect");
const bookingForm = document.getElementById("bookingForm");
const bookingStatus = document.getElementById("bookingStatus");

fetch("/api/products")
  .then(res => res.json())
  .then(products => {
    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <strong>$${product.price}</strong>
      `;
      productList.appendChild(card);

      const option = document.createElement("option");
      option.value = product.id;
      option.textContent = `${product.name} - $${product.price}`;
      productSelect.appendChild(option);
    });
  });

bookingForm.addEventListener("submit", e => {
  e.preventDefault();

  const booking = {
    productId: productSelect.value,
    date: document.getElementById("date").value,
    quantity: document.getElementById("quantity").value
  };

  fetch("/api/book", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking)
  })
  .then(res => res.json())
  .then(() => {
    bookingStatus.textContent = "✅ Booking successful!";
    bookingForm.reset();
  });
});