const products = [
{
id:1,
name:"Laptop",
price:50000,
rating:4.8,
image:"laptop image.jpg"
},
{
id:2,
name:"Headphones",
price:2000,
rating:4.6,
image:"headphone imd.jpg"
},
{
id:3,
name:"Smart Watch",
price:3500,
rating:4.7,
image:"smart watch.jpg"
},
{
id:4,
name:"Mobile",
price:25000,
rating:4.9,
image:"phone img.jpg"
},
{
id:5,
name:"Keyboard",
price:1500,
rating:4.5,
image:"keyboard img.jpg"
},
{
id:6,
name:"Mouse",
price:700,
rating:4.4,
image:"mouse img.jpg"
}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productsDiv = document.getElementById("products");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const total = document.getElementById("total");
const search = document.getElementById("search");

function displayProducts(items){

productsDiv.innerHTML="";

items.forEach(product=>{

productsDiv.innerHTML += `
<div class="card">

<span class="badge">20% OFF</span>

<img src="${product.image}" alt="${product.name}">

<h3>${product.name}</h3>

<p class="rating">⭐ ${product.rating}</p>

<p class="price">₹${product.price}</p>

<button class="wishlist">
❤️ Wishlist
</button>

<button onclick="addToCart(${product.id})">
🛒 Add To Cart
</button>

</div>
`;

});

}

function addToCart(id){

const item = products.find(
product => product.id === id
);

cart.push(item);

saveCart();

renderCart();

showToast("✅ Product Added To Cart");

}

function renderCart(){

cartItems.innerHTML="";

let sum = 0;

cart.forEach((item,index)=>{

sum += item.price;

cartItems.innerHTML += `
<div class="cart-item">

<span>
${item.name}
<br>
₹${item.price}
</span>

<button
class="remove"
onclick="removeItem(${index})">
X
</button>

</div>
`;

});

cartCount.innerText = cart.length;

total.innerText = sum;

}

function removeItem(index){

cart.splice(index,1);

saveCart();

renderCart();

showToast("❌ Product Removed");

}

function saveCart(){

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

}

function showToast(message){

const toast =
document.getElementById("toast");

toast.innerText = message;

toast.style.display = "block";

setTimeout(()=>{

toast.style.display = "none";

},2000);

}

search.addEventListener("input",()=>{

const value =
search.value.toLowerCase();

const filtered =
products.filter(product =>
product.name
.toLowerCase()
.includes(value)
);

displayProducts(filtered);

});

document
.getElementById("themeBtn")
.addEventListener("click",()=>{

document.body
.classList.toggle("dark");

});

displayProducts(products);

renderCart();