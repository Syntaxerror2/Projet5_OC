let test1 = localStorage.kanap;
console.log(test1);

// Ce qui m'a débloqué : la ligne de code suivante puis la boucle, qui m'a permis de récupérer l'ID pour fetch.
let copyOfLS = JSON.parse(localStorage.getItem("kanap"));
console.log(copyOfLS);

function displayCart() {
for (let produit in copyOfLS) {
  let colors = copyOfLS[produit].color;
  let quantity = copyOfLS[produit].quantity;
  let quantityInCart = copyOfLS.length -1;
  let id = copyOfLS[produit]._id;
  console.log(id);
  fetch(`http://localhost:3000/api/products/${id}`)
  .then((res) => res.json())
    .then((data) => {
    console.log(data);
  /* à modifier */
    let price = data.price *= quantity;
    document.getElementById("totalQuantity").innerHTML = quantityInCart;
    document.getElementById("totalPrice").innerHTML = price;
   /* à modifier */
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
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;

})



  
}};


// Faire le total : nombre d'article x son prix x articles au total.
// Reste à offrir la possibilité de delete des articles (clear une partie du localstorage)
// Récupérer et vérifier les données utilisateur
// Rajouter les catch/errors
// Faire des messages d'alerte
 






    




displayCart();
