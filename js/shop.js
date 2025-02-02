
// Nivel 1
// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [];

const requestURL = '../json/products.json';
const request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function () {
    products = request.response;
}
//var products = [
//     {
//         id: 1,
//         name: 'cooking oil',
//         price: 10.5,
//         type: 'grocery',
//         offer: {
//             number: 3,
//             percent: 20
//         }
//     },
//     {
//         id: 2,
//         name: 'Pasta',
//         price: 6.25,
//         type: 'grocery'
//     },
//     {
//         id: 3,
//         name: 'Instant cupcake mixture',
//         price: 5,
//         type: 'grocery',
//         offer: {
//             number: 10,
//             percent: 30
//         }
//     },
//     {
//         id: 4,
//         name: 'All-in-one',
//         price: 260,
//         type: 'beauty'
//     },
//     {
//         id: 5,
//         name: 'Zero Make-up Kit',
//         price: 20.5,
//         type: 'beauty'
//     },
//     {
//         id: 6,
//         name: 'Lip Tints',
//         price: 12.75,
//         type: 'beauty'
//     },
//     {
//         id: 7,
//         name: 'Lawn Dress',
//         price: 15,
//         type: 'clothes'
//     },
//     {
//         id: 8,
//         name: 'Lawn-Chiffon Combo',
//         price: 19.99,
//         type: 'clothes'
//     },
//     {
//         id: 9,
//         name: 'Toddler Frock',
//         price: 9.99,
//         type: 'clothes'
//     }
// ]
// Array with products (objects) added directly with push(). Products in this array are repeated.
var cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];
var total;
var accItems = 0;
// Exercise 1
function buy(id) {
    // 1. Loop for to the array products to get the item to add to cart
    addToCart(id);
    // let item;
    // for (let i = 0; i < products.length; i++) {
    //     if (products[i].id === id) {
    //         item = products[i];
    //     }
    // }
    // // 2. Add found product to the cartList array
    // cartList.push(item);
    // generateCart();
    // document.getElementById('count_product').innerHTML = ++accItems;
}

// Exercise 2
function cleanCart() {
    total = 0;
    accItems = 0;
    cartList = [];
    cart = [];
    document.getElementById("total_price").innerHTML = "0.00";
    document.getElementById("cart_list").innerHTML = "";
    document.getElementById("count_product").innerHTML = 0;
}

// Exercise 3
function calculateTotal() {
    // Calculate total price of the cart using the "cartList" array
    total = 0;
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].subtotalWithDiscout;
    }
    return total;
}

// Exercise 4
// function generateCart() {
//     // Using the "cartlist" array that contains all the items in the shopping cart, 
//     // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.

//     for (let i = 0; i < cartList.length; i++) {
//         if (!cart.includes(cartList[i])) {
//             cartList[i].quantity = 1;
//             cartList[i].subtotal = cartList[i].quantity * cartList[i].price;
//             cartList[i].subtotalWithDiscout = cartList[i].quantity * cartList[i].price;
//             cart.push(cartList[i]);
//         } else {
//             cartList[i].quantity += 1;
//             cartList[i].subtotal = cartList[i].quantity * cartList[i].price;
//             cartList[i].subtotalWithDiscout = cartList[i].quantity * cartList[i].price;
//         }
//     }
//     applyPromotionsCart();
//     cartList = [];
// }

// Exercise 5
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === 1 && cart[i].quantity >= 4) {
            cart[i].subtotalWithDiscout = cart[i].quantity * 10;
        } else if (cart[i].id === 1 && cart[i].quantity < 4) {
            cart[i].subtotalWithDiscout = cart[i].subtotal;
        }

        if (cart[i].id === 3 && cart[i].quantity >= 10) {
            cart[i].subtotalWithDiscout = (cart[i].subtotal) * 2 / 3;
        } else if (cart[i].id === 3 && cart[i].quantity < 10) {
            cart[i].subtotalWithDiscout = cart[i].subtotal;
        }

        if (cart[i].id == 2 || cart[i].id > 3) {
            cart[i].subtotalWithDiscout = cart[i].subtotal;
        }

    }
}

// Exercise 6
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom
    const tableTag = document.getElementById('cart_list');
    tableTag.innerHTML = '';

    for (let i = 0; i < cart.length; i++) {
        const table = document.createElement('tr');

        const itemName = document.createElement('th');
        itemName.textContent = cart[i].name;

        const itemPrice = document.createElement('td');
        itemPrice.textContent = "$" + cart[i].price;

        const itemQuantity = document.createElement('td');
        itemQuantity.textContent = cart[i].quantity;

        const subtotal = document.createElement('td');
        subtotal.textContent = "$" + (cart[i].subtotal).toFixed(2);

        const removeItemBtn = document.createElement('td');
        removeItemBtn.innerHTML = '<button class="btn btn-outline-secondary" onclick="removeFromCart(' + cart[i].id + ')"><i class="fa fa-minus-circle"></button>';

        const addItemBtn = document.createElement('td');
        addItemBtn.innerHTML = '<button class="btn btn-outline-primary" onclick="addItemToModal(' + cart[i].id + ')"><i class="fa fa-plus-circle"></button>';

        const subtotalWithDiscout = document.createElement('td');
        subtotalWithDiscout.textContent = "$" + (cart[i].subtotalWithDiscout).toFixed(2);

        tableTag.appendChild(table);
        table.appendChild(itemName);
        table.appendChild(itemPrice);
        table.appendChild(itemQuantity);
        table.appendChild(subtotal);
        table.appendChild(subtotalWithDiscout);
        table.appendChild(addItemBtn);
        table.appendChild(removeItemBtn);

    }
}

// Nivel 2 

// Exercise 8
function addToCart(id) {
    // Refactor previous code in order to simplify it 
    // 1. Loop for to the array products to get the item to add to cart
    let item;
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            item = products[i];
        }
    }
    cartList.push(item);
    document.getElementById('count_product').innerHTML = ++accItems;
    // 2. Add found product to the cart array or update its quantity in case it has been added previously.
    for (let i = 0; i < cartList.length; i++) {
        if (!cart.includes(cartList[i])) {
            cartList[i].quantity = 1;
            cartList[i].subtotal = cartList[i].quantity * cartList[i].price;
            cartList[i].subtotalWithDiscout = cartList[i].quantity * cartList[i].price;
            cart.push(cartList[i]);
        } else {
            cartList[i].quantity += 1;
            cartList[i].subtotal = cartList[i].quantity * cartList[i].price;
            cartList[i].subtotalWithDiscout = cartList[i].quantity * cartList[i].price;
        }
    }
    applyPromotionsCart();
    cartList = [];
}

// Exercise 9
function removeFromCart(id) {
    var index;
    var item;
    const itemDisplay = document.getElementById('count_product');
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
            index = i;
            item = cart[i];
        }
    }
    if (item.quantity == 1) {
        cart.splice(index, 1);
        itemDisplay.innerHTML = --accItems;

    } else {

        item.quantity -= 1;
        item.subtotal -= item.price;
        itemDisplay.innerHTML = --accItems;
        applyPromotionsCart();
    }
    open_modal();
}

function addItemToModal(id) {
    buy(id);
    open_modal();
}

function open_modal() {
    document.getElementById("total_price").innerHTML = calculateTotal().toFixed(2);
    printCart();
}

