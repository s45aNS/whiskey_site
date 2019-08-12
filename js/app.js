if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

// variables
let searchInput = document.getElementById("search--input");
let searchBtn = document.getElementById("search--btn");


//main function
function ready(){

    let removeCartItemButtons = document.getElementsByClassName("cart__item--btn");
    for (let i = 0; i < removeCartItemButtons.length; i++){
    let button = removeCartItemButtons[i];
    button.addEventListener('click', removeCartItem)
    };

    let quantityInputs = document.getElementsByClassName('cart__item--quantity');
    for (i = 0; i < quantityInputs.length; i++){
        let input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    };

    let addToCartButtons = document.getElementsByClassName('shop__btn')
    for (let i = 0; i < addToCartButtons.length; i++){
        let button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
     }

    let buyButton = document.getElementsByClassName('cart__btn')[0].addEventListener('click', purchaseCompleted);

    let cartBtn = document.getElementById('cartBtn').addEventListener('click', cartBtnToogle);

};

//functions
function removeCartItem(event){
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateCartTotal();
}

function quantityChanged(event){
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateCartTotal();
}

function addToCartClicked(event) {
    let button = event.target;
    let cartItem = button.parentElement;
    let title = cartItem.getElementsByClassName('shop__item--heading')[0].innerText;
    let price = cartItem.getElementsByClassName('shop--price')[0].innerText;
    addItemToCart(title, price);
    updateCartTotal();
}

function addItemToCart(title, price){
    let cartItem = document.createElement('article');
    cartItem.classList.add('cart__item');
    let cart = document.getElementsByClassName('cart')[0];
    let cartItemNames = cart.getElementsByClassName('cart__item--title');
    for (let i = 0; i < cartItemNames.length; i++){
        if (cartItemNames[i].innerText == title){
            alert('This item is alredy in the cart!');
            return;
        };
    };
    let cartItemContents = `
    <span class="cart__item--title">${title}</span>
    <input class="cart__item--quantity" type="number" value="1">
    <span class="cart__item--price">${price}</span>
    <button class="cart__item--btn">x</button>
    `;
    cartItem.innerHTML = cartItemContents;
    cart.append(cartItem);

    cartItem.getElementsByClassName('cart__item--btn')[0].addEventListener('click', removeCartItem);
    cartItem.getElementsByClassName('cart__item--quantity')[0].addEventListener('change', quantityChanged);
}

function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart')[0];
    let cartItems = document.getElementsByClassName('cart__item');
    let total = 0;

    for (let i = 0; i < cartItems.length; i++){
        let cartItem = cartItems[i];
        let cartPrice = cartItem.getElementsByClassName('cart__item--price')[0];
        let quantityElement = cartItem.getElementsByClassName('cart__item--quantity')[0];
        let price = parseFloat(cartPrice.innerText.replace('€', ''));
        let quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart__total')[0].innerText = total + '€';
}

function purchaseCompleted(){
    alert('Thank you for your purchase!');
    let cart = document.getElementsByClassName('cart')[0];
    while(cart.lastChild.id !== 'cart__header'){
        cart.removeChild(cart.lastChild);
    };
    let cartTotal = document.getElementsByClassName('cart__total')[0].innerText = '0€';
}

function cartBtnToogle() {
    let menu = document.getElementsByClassName('cart')[0];
    let totalBtn = document.getElementsByClassName('cart-total-buy')[0];
    if (menu.style.display === "none" && totalBtn.style.display === "none") {
      menu.style.display = "block";
      totalBtn.style.display = "block"
    } else {
      menu.style.display = "none";
      totalBtn.style.display = "none"
    }
  } 

function searchProducts() {
    let searchBox = document.getElementById("search--input");
    let searchValue = searchBox.value.toUpperCase();
    let articles = document.querySelectorAll("article.shop__item");

    for (let i = 0; i < articles.length; i++){
        let heading = articles[i].getElementsByTagName('h3')[0];
        if(heading.innerHTML.toUpperCase().indexOf(searchValue) > -1){
            articles[i].style.display = '';
        } else {
            articles[i].style.display = 'none';
        }
        searchBox.value = '';
    }
};

searchBtn.addEventListener('click', searchProducts);




