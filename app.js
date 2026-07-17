const grid = document.getElementById("productGrid");
const search = document.getElementById("search");

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

updateCart();

function renderProducts(data) {

    grid.innerHTML = "";

    data.forEach((p) => {

        grid.innerHTML += `
        <div class="product">

            <img
                src="${p.image}"
                alt="${p.name}"
                onerror="this.src='https://placehold.co/600x600?text=No+Image'"
            >

            <div class="product-body">

                <h3>${p.name}</h3>

                <div class="price">
                    Rs. ${p.price.toLocaleString()}
                </div>

                <button onclick="addCart(${p.id})">
                    <i class="fa fa-cart-plus"></i>
                    Add To Cart
                </button>

                <a
                    target="_blank"
                    href="https://wa.me/9779840151586?text=${encodeURIComponent(
                      `Hello, I am interested in ${p.name}`
                    )}">
                    <i class="fab fa-whatsapp"></i>
                    WhatsApp
                </a>

            </div>

        </div>
        `;
    });
}

renderProducts(products);

/* SEARCH */

search.addEventListener("input", () => {

    const q = search.value.toLowerCase();

    const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(q)
    );

    renderProducts(filtered);
});

/* CART */

function addCart(id) {

    const product = products.find(
        (p) => p.id === id
    );

    cart.push(product);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCart();
}

function updateCart() {

    document.getElementById(
        "cartCount"
    ).innerText = cart.length;
}