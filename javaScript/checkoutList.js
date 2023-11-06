const storageItems = JSON.parse(localStorage.getItem("products"));
const showArea = document.getElementsByClassName("product-list")[0];
const miniShowArea = document.getElementsByClassName("listed")[0];
const someP = document.getElementsByClassName("someP")[0];
const grandTotal = document.getElementsByClassName("grandTotal")[0];
const total_p = document.getElementsByClassName("price-TOTAL")[0];
const vat_p = document.getElementsByClassName("price-VAT")[0];
const grand_p = document.getElementsByClassName("price-GRAND")[0];
const shipping_p = document.getElementsByClassName("price-SHIPPING")[0];

let product_type_num = 0;
let products_num = 0;
let products_price = 0;

if (localStorage.getItem("products")) {
  storageItems?.forEach((info) => {
    product_type_num++;
    products_num += +info.quantity;
    products_price += +info.price.replace(",", "") * +info.quantity;
  });
  total_p.innerHTML = `$ ${products_price.toLocaleString()}`;
  vat_p.innerHTML = `$ ${Math.round(products_price * 0.2).toLocaleString()}`;
  grand_p.innerHTML = `$ ${(products_price + 50).toLocaleString()}`;
  shipping_p.innerHTML = "$ 50";

  showArea.innerHTML = "";
  miniShowArea.innerHTML = "";
  for (let i = 0; i < storageItems.length; i++) {
    showArea.innerHTML += `
<div class="product product-${storageItems[i].productName}">
<div class="product-info">
  <div class="product-img">
  <img height="64px" width="64px" src="./assets/cart/${getPhotoUrl(
    storageItems[i].productName
  )}"  >
  </div>
  <div class="product-name-and-price">
    <div class="product-name">${
      storageItems[i].productName.includes("_")
        ? storageItems[i].productName.replace(/_/g, " ")
        : storageItems[i].productName
    }</div>
    <div class="product-price price-${storageItems[i].productName}">$ ${
      storageItems[i].price
    }</div> 
  </div>
</div>
<div class="selected-amount">
<p>x${storageItems[i].quantity}</p>
</div>
</div> `;
  }
  miniShowArea.innerHTML = `
  <div class="product product-${storageItems[0].productName}">
  <div class="product-info">
    <div class="product-img">
    <img height="64px" width="64px" src="/assets/cart/${getPhotoUrl(
      storageItems[0].productName
    )}"  >
    </div>
    <div class="product-name-and-price">
      <div class="product-name">${
        storageItems[0].productName.includes("_")
          ? storageItems[0].productName.replace(/_/g, " ")
          : storageItems[0].productName
      }</div>
      <div class="product-price price-${storageItems[0].productName}">$ ${
    storageItems[0].price
  }</div> 
    </div>
  </div>
  <div class="selected-amount">
  <p>x${storageItems[0].quantity}</p>
  </div>
  </div>
  `;
  someP.innerHTML = `and ${product_type_num - 1} other item(s)`;
  grandTotal.innerHTML = `$ ${products_price.toLocaleString()}`;
}

const submiting = document.getElementsByClassName("submit-button")[0];
const choiceDiv1 = document.getElementsByClassName("choice")[0];
const choiceDiv2 = document.getElementsByClassName("choice")[1];
submiting.addEventListener("click", () => {
  [total_p, vat_p, grand_p, shipping_p].forEach((x) => {
    x.innerHTML = "$ 0";
  });
  showArea.innerHTML = "";
  submiting.disabled = true;
  submiting.style.cursor = "default";
  const forma = document.getElementsByClassName("form")[0];
  const inputsField = Array.from(forma.querySelectorAll("input"));
  inputsField.forEach((x) => {
    console.log(x);
    x.readOnly = true;
    [choiceDiv1, choiceDiv2].forEach((x) => {
      x.style.pointerEvents = "none";
    });
  });
});
