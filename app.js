const grid = document.getElementById("productGrid");
const search = document.getElementById("search");

/* Modal Elements */

const modal = document.getElementById("productModal");
const modalImage = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalPrice = document.getElementById("modalPrice");
const modalDescription =
    document.getElementById("modalDescription");

const modalWhatsapp =
    document.getElementById("modalWhatsapp");

/* ================= RENDER PRODUCTS ================= */

function renderProducts(data){

    grid.innerHTML = "";

    data.forEach((p)=>{

        grid.innerHTML += `

        <div class="product">

            <img
                src="${p.image}"
                alt="${p.name}"
                onclick="openProduct(${p.id})"
                class="product-image"
                onerror="this.src='https://placehold.co/600x600?text=No+Image'">

            <div class="product-body">

                <h3
                    class="product-link"
                    onclick="openProduct(${p.id})">

                    ${p.name}

                </h3>

                <div class="price">
                    Rs. ${p.price.toLocaleString()}
                </div>

                <p class="short-description">

                    ${
                        p.description
                        ?
                        p.description.substring(0,90) + "..."
                        :
                        "Authentic handmade Nepalese handicraft."
                    }

                </p>

                <button
                    class="details-btn"
                    onclick="openProduct(${p.id})">

                    <i class="fa-solid fa-eye"></i>
                    View Details

                </button>

                <a
                    class="whatsapp-link"
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

/* Initial Render */

renderProducts(products);

/* ================= SEARCH ================= */

search.addEventListener("input", ()=>{

    const q = search.value.toLowerCase();

    const filtered = products.filter(p =>

        p.name.toLowerCase().includes(q) ||

        p.category.toLowerCase().includes(q)

    );

    renderProducts(filtered);

});

/* ================= OPEN POPUP ================= */

function openProduct(id){

    const product =
        products.find(p => p.id === id);

    if(!product) return;

    modalImage.src =
        product.image;

    modalImage.alt =
        product.name;

    modalName.innerText =
        product.name;

    modalPrice.innerText =
        "Rs. " +
        product.price.toLocaleString();

    modalDescription.innerText =
        product.description ||
        "Authentic handmade Nepalese handicraft.";

    if(modalWhatsapp){

        modalWhatsapp.href =
            `https://wa.me/9779840151586?text=${encodeURIComponent(
                `Hello, I am interested in ${product.name}`
            )}`;
    }

    modal.classList.add("active");

    document.body.style.overflow = "hidden";
}

/* ================= CLOSE MODAL ================= */

function closeModal(){

    modal.classList.remove("active");

    document.body.style.overflow = "";
}

const closeBtn =
    document.querySelector(".close");

if(closeBtn){

    closeBtn.addEventListener("click", closeModal);
}

/* Click outside */

window.addEventListener("click",(e)=>{

    if(e.target === modal){

        closeModal();

    }

});

/* ESC key close */

document.addEventListener("keydown",(e)=>{

    if(e.key === "Escape"){

        closeModal();

    }

});