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
  let quantityInCart = copyOfLS.length * quantity;
  
  //On fetch la donnée du prix de l'id correspondante
  fetch(`http://localhost:3000/api/products/${id}`)
  .then((res) => res.json())
  .then((data) => {
  let price = data.price;

  // à modifier
  document.getElementById("totalPrice").innerHTML = price * quantityInCart;
  document.getElementById("totalQuantity").innerHTML = quantityInCart;
  //à modifier 
    
  //Affichage dynamique du panier
  document.getElementById("cart__items").innerHTML += `<article class="cart__item" data-id="${id}" data-color="${colors}">
    <div class="cart__item__img">
      <img src="${data.imageUrl}" alt="${data.altTxt}" />
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${data.name}</h2>
        <p>${colors}</p>
        <p>${price + " €"}</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" data-id="${id}" data-color=${colors}" name="itemQuantity" min="1" max="100" value="${quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" data-id="${id}" data-color="${colors}">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;

  // On permet au client de modifier les quantités de canapé dynamiquement
function changeQuantity() {
  let input = document.querySelectorAll(".itemQuantity")
  for(let i = 0; i < input.length; i++) {
    input[i].addEventListener("change", (event) => {
      event.preventDefault();

  // On selectionne l'élément à modifier via son ID et sa couleur
      let quantityModif = copyOfLS[i].quantity;
      let qttmodifValue = input[i].valueAsNumber;
      const resultFind = copyOfLS.find((element) => element.qttmodifValue !== quantityModif);

      resultFind.quantity = qttmodifValue;
      copyOfLS[i].quantity = resultFind.quantity;

      localStorage.setItem("kanap", JSON.stringify(copyOfLS));
      location.reload();
    })}}
    changeQuantity();
   
  //On permet la suppression au click en identifiant l'article à son id et sa couleur
  
 
  function deleteItem() {
    let buttons = document.querySelectorAll(".deleteItem");
    for(del of buttons) {
      del.addEventListener("click", () => {
    let dataId = del.closest(".cart__item").getAttribute("data-id");
    console.log(dataId);
    let dataColor = del.closest(".cart__item").getAttribute("data-color");
    console.log(dataColor);
    for(let i = 0; i < copyOfLS.lengthy; i++) {
      
    
    if(copyOfLS[i]._id == dataId && copyOfLS[i].color == dataColor) {
        copyOfLS.splice(i, 1);
      }
    }
    localStorage.setItem("kanap", JSON.stringify(copyOfLS));
    if(copyOfLS.length == 0) {
      localStorage.removeItem("kanap");
    }
      });
    }
    return;
  }
  deleteItem();
  



  /*
function deleteItem(id, color) {
  let buttons = document.querySelectorAll(".deleteItem");
  let items = copyOfLS;
  for (let button of buttons){
      console.log(button);
      button.addEventListener("click", () => {
  for(i = 0; i < items.length; i++) {
    let dataId = button.closest(".cart__item").getAttribute("data-id");
    console.log(dataId);
    let dataColor = button.closest(".cart__item").getAttribute("data-color");
    console.log(dataColor);
   if(id == items[i][2] && color == items[i][0]) {
    items.splice(i, 1);
    localStorage.setItem("kanap", JSON.stringify(items));
    window.location.reload();
   }}})}}
  deleteItem(); */
  

})}};


displayCart();

