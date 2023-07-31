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
    let price = data.map(quantity) *= data.map(price);
    document.getElementById("totalQuantity").innerHTML = quantityInCart;
    document.getElementById("totalPrice").innerHTML = data.reduce(price);

    
   
   /* à modifier */
    document.getElementById("cart__items").innerHTML += `<article class="cart__item" data-id="${id}" data-color="${colors}">
    <div class="cart__item__img">
      <img src="${data.imageUrl}" alt="${data.altTxt}" />
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${data.name}</h2>
        <p>${colors}</p>
        <p>${total + " €"}</p>
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

function removeItem() {
  let kanapDelete = document.querySelectorAll(".deleteItem");
  // just une variable pour stocker mon bouton
  kanapDelete.forEach((kanape) => {
  // la méthode forEach permet d'éxécute une fonction une fois par élément du tableau
    kanape.addEventListener("click", function(e) {
      let basketValue = copyOfLS;
      console.log(basketValue);
      //Là je ne suis pas sûr que le basketvalue soit ma copie du LS
      const deleteID = e.target.closest("article").getAttribute("data-id");
      const deleteColor = e.targent.closest("article").getAttribute("data-color");
      const searchDeleteKanap = basketValue.find(element) = element.id == deleteID && element.colors == deleteColor;
      // The find() method returns the first element in the provided array that satisfies the provided testing function.
     
      //S'inspirer de sa méthode (forEach, target.closest et .find
      //pour récuper les id) et couleurs
      // Regarder demain la vidéo en entier
    }
   
  )});
  
}

removeItem();
// D'abord : supprimer un seul élément du localStorage


// Faire le total : nombre d'article x son prix x articles au total.
// Reste à offrir la possibilité de delete des articles (clear une partie du localstorage)
// Récupérer et vérifier les données utilisateur
// Rajouter les catch/errors
// Faire des messages d'alerte
//La méthode removeItem() de l'interface Storage , lorsque vous lui passez une clé en argument, va supprimer la ressource avec le nom de clé correspondant du storage.
 






    




displayCart();
