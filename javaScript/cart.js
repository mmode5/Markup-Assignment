const cart_icon = document.getElementById("cart");
const product_list = document.getElementsByClassName("products")[0];
const main = document.querySelector("main");
const checkout_btn = document.getElementsByClassName("checkout")[0];
const main_div = document.getElementById("overlay");
const mini_increase = document.getElementById("mini-plus");
const mini_decrease = document.getElementById("mini-minus");
const mini_result = document.getElementById("product_amount");
const product_submit = document.getElementsByClassName("submit-button")[0];
const back_to_home = document.getElementsByClassName("back-to-home")[0];
const thank_you_note = document.getElementsByClassName("thank_you_note")[0];
const amount_in_overall = document.getElementsByClassName("all_quantity")[0];
const price_in_overall = document.getElementsByClassName("total_price")[0];

cart_icon?.addEventListener("click", () => {
  turned_on();
  let product_num = 0;
  let product_price = 0;
  const parsedInfo = JSON.parse(localStorage.getItem("products"));
  parsedInfo?.forEach((info) => {
    product_num += +info.quantity;
    product_price += +info.price.replace(",", "") * +info.quantity;
  });

  price_in_overall.innerHTML = `$ ${product_price.toLocaleString()}`;
  amount_in_overall.innerHTML = `Cart (${product_num})`;
  renderProducts();

  if (localStorage.getItem("products")) {
    const storage = JSON.parse(localStorage.getItem("products"));

    function mini_change(product_name) {
      let mini_container = document.querySelector(`.product-${product_name}`);
      let mini_amount = document.querySelector(`.amount-${product_name}`);
      let mini_price = document
        .querySelector(`.price-${product_name}`)
        ?.innerHTML?.split(" ")[1]
        .replace(",", "");

      document
        .querySelector(`.plus-${product_name}`)
        ?.addEventListener("click", () => {
          mini_amount.innerHTML++;
          product_num++;
          amount_in_overall.innerHTML = `Cart (${product_num})`;
          product_price += +mini_price;
          price_in_overall.innerHTML = `$ ${product_price.toLocaleString()}`;
          storage.forEach((x) => {
            if (x["productName"] === product_name) {
              x["quantity"]++;
              localStorage.setItem("products", JSON.stringify(storage));
            }
          });
        });
      document
        .querySelector(`.minus-${product_name}`)
        ?.addEventListener("click", () => {
          mini_amount.innerHTML--;
          product_num--;
          amount_in_overall.innerHTML = `Cart (${product_num})`;
          if (mini_amount.innerHTML <= 0) {
            mini_container.remove();
          }
          product_price -= +mini_price;
          price_in_overall.innerHTML = `$ ${product_price.toLocaleString()}`;
          storage.forEach((x) => {
            if (x["productName"] === product_name) {
              x["quantity"]--;
              if (mini_amount.innerHTML <= 0) {
                storage.splice(
                  storage.findIndex(
                    (obj) => obj["productName"] === product_name
                  )
                );
              }
              localStorage.setItem("products", JSON.stringify(storage));
            }
          });
        });
    }
  }

  mini_change("YX1");
  mini_change("XX59");
  mini_change("XX99_MK_II");
  mini_change("XX99_MK_I");
  mini_change("ZX7");
  mini_change("ZX9");
});

product_submit?.addEventListener("click", () => {
  submit_turned_on();
  product_list.style.display = "none";
  localStorage.clear();
  products_list.innerHTML = "";
  total_products.innerHTML = "Cart (0)";
  total_pasi.innerHTML = "$ 0";
});

main_div.addEventListener("click", () => {
  turned_off();
  submit_turned_off();
});

[product_list, thank_you_note].forEach((x) => {
  x?.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});

function turned_on() {
  main_div.style.display = "block";
  product_list.style.display = "block";
  main_div.style.cursor = "default";
  document.body.style.overflow = "hidden";
}

function turned_off() {
  main_div.style.display = "none";
  document.body.style.overflow = "visible";
}

function submit_turned_on() {
  main_div.style.display = "block";
  thank_you_note.style.display = "block";
  main_div.style.cursor = "default";
  document.body.style.overflow = "hidden";
}

function submit_turned_off() {
  main_div.style.display = "none";
  if (thank_you_note) thank_you_note.style.display = "none";
  document.body.style.overflow = "visible";
}

function renderProducts() {
  if (localStorage.getItem("products")) {
    const products = JSON.parse(localStorage.getItem("products"));
    const container = document.getElementsByClassName("item-list")[0];
    container.innerHTML = "";
    html = "";
    for (let i = 0; i < products.length; i++) {
      html += `
<div class="product product-${products[i].productName}">
  <div class="product-info">
    <div class="product-img">
    <img height="64px" width="64px" src="./assets/cart/${getPhotoUrl(
      products[i].productName
    )}"  >
    </div>
    <div class="product-name-and-price">
      <div class="product-name">${
        products[i].productName.includes("_")
          ? products[i].productName.replace(/_/g, " ")
          : products[i].productName
      }</div>
      <div class="product-price price-${products[i].productName}">$ ${
        products[i].price
      }</div> 
    </div>
  </div>
  <div class="mini-increase-decrease">
    <button id="mini-minus" class="minus-${products[i].productName}">-</button>
    <p id="product-amount" class="amount-${products[i].productName}">${
        products[i].quantity
      }</p>
    <button id="mini-plus" class="plus-${products[i].productName}">+</button>
  </div>
</div> `;
    }
    container.insertAdjacentHTML("beforeend", html);
  }
}

function getPhotoUrl(productName) {
  const productFirstName = productName.split("_")[0].toLowerCase();

  let productPhoto;
  if (productFirstName === "xx59") {
    productPhoto = `image-${productFirstName}-headphones.jpg`;
  } else if (productFirstName === "xx99") {
    if (productName === "XX99_MK_I") {
      productPhoto = `image-${productFirstName}-mark-one-headphones.jpg`;
    } else {
      productPhoto = `image-${productFirstName}-mark-two-headphones.jpg`;
    }
  } else if (productFirstName === "yx1") {
    productPhoto = `image-${productFirstName}-earphones.jpg`;
  } else if (productFirstName === "zx7" || productFirstName === "zx9") {
    productPhoto = `image-${productFirstName}-speaker.jpg`;
  }

  return productPhoto;
}
