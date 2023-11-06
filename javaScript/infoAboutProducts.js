const remove = document.getElementById("remove-all");
const products_list = document.getElementsByClassName("item-list")[0];
const total_products = document.getElementsByClassName("all_quantity")[0];
const total_pasi = document.getElementsByClassName("total_price")[0];

remove?.addEventListener("click", () => {
  localStorage.clear();
  products_list.innerHTML = "";
  total_products.innerHTML = "Cart (0)";
  total_pasi.innerHTML = "$ 0";
});
