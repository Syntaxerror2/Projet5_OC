
//On récupère l'ID propre à l'article dans l'URL
let params = new URL(document.location).searchParams;
let id = params.get("id");
console.log(id);

let color = document.querySelector("#colors");
let goToCart = document.getElementById("addToCart");
let quantity = document.getElementById("quantity");

//on récupère les caractéristiques de l'article grâce au paramètre de son id
function displayProduct() {
    fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        document.querySelector(".item__img").innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
        document.querySelector("#title").innerHTML = data.name;
        document.querySelector("#price").innerHTML = data.price;
        document.querySelector("#description").innerHTML = data.description;
        

// On effectue une boucle pour afficher l'ensemble des couleurs en option
        for(i = 0; i < data.colors.length; i++) {
            color.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`
        }
    })
    

}




function addToCart() {
    goToCart.addEventListener("click", function() {
        if(quantity.value > 0 && quantity.value < 100 && color.value !== null) {
            
            let addedKanap = {
                color : color.value,
                quantity : parseFloat(quantity.value),
                _id: id
            };
            
            let cartArray = [];
            if(localStorage.getItem("kanap") !== null) {
            cartArray = JSON.parse(localStorage.getItem("kanap"));
            
            }
            cartArray.push(addedKanap);
            localStorage.setItem("kanap", JSON.stringify(cartArray));
           
            
    }})
}
addToCart();

goToCart.addEventListener("click", function() {
    window.location.href = "./cart.html";
})



displayProduct();