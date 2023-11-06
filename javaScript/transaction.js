const increase = document.getElementById("plus");
const decrease = document.getElementById("minus");
const result = document.getElementById("amount");

increase.addEventListener("click", () => {
  +result.innerHTML++;
});
decrease.addEventListener("click", () => {
  if (+result.innerHTML >= 2) {
    +result.innerHTML--;
  }
});

const cart_continue = document.getElementById("cart-add");

cart_continue.addEventListener("click", (e) => {
  const productName = e.target.className;
  const quantity = result.innerHTML;
  const pricing = document.getElementsByClassName("pricing")[0];
  const price = pricing.childNodes[1].innerHTML.split(" ")[1];

  if (localStorage.getItem("products")) {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const speciFicProduct = products.find(
      (product) => product.productName === productName
    );

    if (speciFicProduct) {
      speciFicProduct.quantity = quantity;
      localStorage.setItem("products", JSON.stringify(products));
    } else {
      products.push({ productName, quantity, price });
      localStorage.setItem("products", JSON.stringify(products));
    }
  } else {
    localStorage.setItem(
      "products",
      JSON.stringify([{ productName, quantity, price }])
    );
  }
});
