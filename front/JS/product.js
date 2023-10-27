//On récupère l'ID propre à l'article dans l'URL
let params = new URL(document.location).searchParams;
let id = params.get("id");
console.log(id);

let color = document.getElementById("colors");
let addToCart = document.getElementById("addToCart");
let quantity = document.getElementById("quantity");
let quantityValue = document.querySelector("#quantity").value;


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
            let dataColor = []
            color.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`
            dataColor = data.colors[i];
            console.log(dataColor);
          }


        function goToCart() {
                if(quantity.value > 0 && quantity.value < 100 && color.value !== null) {
                    let addedKanap = {
                        color : color.value,
                        quantity : Number(quantity.value),
                        price : parseFloat(data.price),
                        _id: id
                    };         
                    let cartArray = [];
                    if(localStorage.getItem("kanap") !== null) {
                    cartArray = JSON.parse(localStorage.getItem("kanap"));
                    
                    }
                    cartArray.push(addedKanap);
                    localStorage.setItem("kanap", JSON.stringify(cartArray));
                    window.location.href = "./cart.html";
                } 
                
                else {
                alert("Merci de remplir les champs correspondants");
            }
        }
        
        

        function addToCart() {
            let addToCart = document.getElementById("addToCart");
            addToCart.addEventListener("click", function() {
            goToCart()
             })
        }
        addToCart();
})}
    
displayProduct();

