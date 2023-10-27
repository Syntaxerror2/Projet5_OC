// On récupère le contenu du localStorage
let copyOfLS = JSON.parse(localStorage.getItem("kanap"));
console.log(copyOfLS)
 
// On indique au client si son panier est remplis ou vide
if (copyOfLS == null || copyOfLS.length == 0 ) {
  document.getElementById("cart__title").innerHTML += `Votre panier est vide`;
} else {
  document.getElementById("cart__title").innerHTML += `Votre panier`;
}

// On affiche dynamiquement le contenu du localStorage
function displayCart() {
for (let produit in copyOfLS) {
  let colors = copyOfLS[produit].color;
  let quantity = copyOfLS[produit].quantity;
  let id = copyOfLS[produit]._id;
  
  //On fetch la donnée du prix de l'id correspondante
  fetch(`http://localhost:3000/api/products/${id}`)
  .then((res) => res.json())
  .then((data) => {

  //Affichage dynamique du panier
  document.getElementById("cart__items").innerHTML += `<article class="cart__item" data-id="${id}" data-color="${colors}">
    <div class="cart__item__img">
      <img src="${data.imageUrl}" alt="${data.altTxt}" />
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${data.name}</h2>
        <p>${colors}</p>
        <p>${data.price + " €"}</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" data-id="${id}" data-color="${colors}" name="itemQuantity" min="1" max="100" value="${quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" data-id="${id}" data-color="${colors}">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;

// On permet la modification des quantités en identifiant l'article à son id et sa couleur
 function changeQuantity() {
  let input = document.querySelectorAll(".itemQuantity");
  let items = copyOfLS;
  for (let quantityKanap of input) {
    quantityKanap.addEventListener("change", (event) => {
      let dataId = event.target.getAttribute("data-id");
      let dataColor = event.target.getAttribute("data-color");
      let newQuantity = Number(event.target.value);
      if (newQuantity > 0 && newQuantity <= 100) {
        for (let i = 0; i < items.length; i++) {
          if (dataId === items[i]._id && dataColor === items[i].color) {
            items[i].quantity = newQuantity;
            localStorage.setItem("kanap", JSON.stringify(copyOfLS));
          }
        }
      }
    });
  }
}
changeQuantity()


  // On permet la suppression au click en identifiant l'article à son id et sa couleur
   function deleteItem() {
    let buttons = document.querySelectorAll(".deleteItem");
    let items = copyOfLS;
    for(let del of buttons) {
      del.addEventListener("click", () => {
    let dataId = del.closest(".cart__item").getAttribute("data-id");
    let dataColor = del.closest(".cart__item").getAttribute("data-color"); 
    for(let i = 0; i < items.length; i++) {
    if(items[i]._id === dataId && items[i].color === dataColor) {
        items.splice(i, 1);
      }}
    localStorage.setItem("kanap", JSON.stringify(items));
    /*window.location.reload();*/
    if(items.length == 0) {
      localStorage.removeItem("kanap");
    }});}
    return;
  }
  deleteItem();

// Affichage de la quantité totale
function displayTotalQuantity() {
  const totalQuantity = document.querySelector("#totalQuantity")
  const total = copyOfLS.reduce((total, item) => total + item.quantity, 0)
  totalQuantity.textContent = total
}
displayTotalQuantity();

// Affichage du prix total
function displayTotalPrice() {
  const totalPrice = document.querySelector("#totalPrice")
  const total = copyOfLS.reduce((total, item) => total + item.price * item.quantity, 0)
  totalPrice.textContent = total
}
displayTotalPrice();

})}};


displayCart();

 
       


