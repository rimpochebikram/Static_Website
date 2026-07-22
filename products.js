const products = [
  {
    id: 1,
    name: "Buddha Statue",
    price: 150000,
    category: "Statue",
    image: "./images/105571678_120865533013577_9208778171644514231_n.jpg",
    description: "Beautiful handmade Buddha statue crafted by skilled Nepalese artisans."
  },
  {
    id: 2,
    name: "Singashan Kuber",
    price: 110000,
    category: "Statue",
    image: "./images/105859551_111979657235498_3989117061123004382_n.jpg",
    description: "Traditional Singashan Kuber statue representing prosperity and wealth."
  },
  {
    id: 4,
    name: "Guru",
    price: 35000,
    category: "Statue",
    image: "./images/178412145_292085455891583_8629124554886026963_n.jpg",
    description: "Finely crafted Guru statue with traditional detailing."
  },
  {
    id: 5,
    name: "Guru",
    price: 120000,
    category: "Statue",
    image: "./images/295065473_735835980914737_7553790886912316297_n.jpg",
    description: "Premium handmade Guru statue with intricate carvings."
  },
  {
    id: 6,
    name: "Ganesh",
    price: 45000,
    category: "Statue",
    image: "./images/482004647_1411977363300592_2482389154394514824_n.jpg",
    description: "Lord Ganesh statue symbolizing wisdom and good fortune."
  },
  {
    id: 7,
    name: "Bajrapani",
    price: 75000,
    category: "Statue",
    image: "./images/product_image-18-bajrapani-(2)-0315.png",
    description: "Beautiful Bajrapani statue handcrafted in Nepal."
  },
  {
    id: 8,
    name: "Namkhel",
    price: 60000,
    category: "Statue",
    image: "./images/product_image-12-namkhel-(2)-0648.png",
    description: "Traditional Namkhel statue made with premium craftsmanship."
  },
  {
    id: 9,
    name: "Buddha",
    price: 20000,
    category: "Statue",
    image: "./images/product_image-_mg_9487-8206.png",
    description: "Elegant Buddha statue perfect for home decoration."
  },
  {
    id: 10,
    name: "Bajrapani",
    price: 40000,
    category: "Statue",
    image: "./images/product_image-img_20210108_172050-8160.png",
    description: "Handcrafted Bajrapani statue with detailed finishing."
  },
  {
    id: 11,
    name: "Guru",
    price: 35000,
    category: "Statue",
    image: "./images/product_image-_mg_9503-7036.png",
    description: "Traditional Guru statue crafted by Nepalese artisans."
  },
  {
    id: 12,
    name: "Ganesh",
    price: 70000,
    category: "Statue",
    image: "./images/product_image-_mg_9443-6049.png",
    description: "Premium Ganesh statue featuring exquisite handmade details."
  },
  {
    id: 13,
    name: "Amitabha Buddha",
    price: 70000,
    category: "Statue",
    image: "./images/fa7a375f-0fc6-478b-ae95-bca8fd8d7369.png",
    description: "34 cm Amitabha Buddha statue made with high-quality materials, perfect for meditation spaces."
  },
  {
    id: 14,
    name: "Bajrapani",
    price: 17000,
    category: "Statue",
    image: "./images/Bajrapani.png",
    description: "22 cm Premium Bajrapani statue featuring exquisite handmade details."
  },
  {
    id: 15,
    name: "Guru Rimpoche",
    price: 30000,
    category: "Statue",
    image: "./images/Guru.png",
    description: "34 cm Premium Guru Rimpoche statue featuring exquisite handmade details."
  },
  {
    id: 16,
    name: "Tara",
    price: 30000,
    category: "Statue",
    image: "./images/Tara.png",
    description: "34 cm Premium Tara statue featuring exquisite handmade details."
  },
  {
    id: 17,
    name: "Manjushree",
    price: 15000,
    category: "Statue",
    image: "./images/Manjushree.png",
    description: "32 cm Premium Manjushree statue featuring exquisite handmade details."
  },
  {
    id: 18,
    name: "Tara",
    price: 15000,
    category: "Statue",
    image: "./images/Tara2.png",
    description: "32 cm Premium Tara statue featuring exquisite handmade details."
  },
  {
    id: 19,
    name: "Guru",
    price: 15000,
    category: "Statue",
    image: "./images/Guru2.png",
    description: "32 cm Premium Guru statue featuring exquisite handmade details."
  },
  {
    id: 20,
    name: "Buddha",
    price: 15000,
    category: "Statue",
    image: "./images/Buddha.png",
    description: "32 cm Premium Buddha statue featuring exquisite handmade details."
  }
];

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

/* Keep the currently open product available to app.js (magnifier / lightbox) */
window.currentProduct = null;

/* ================= RENDER PRODUCTS ================= */

function renderProducts(data){

    grid.innerHTML = "";

    if(!data || data.length === 0){

        grid.innerHTML = `
            <div class="no-results">
                <i class="fa-solid fa-magnifying-glass"></i>
                No products match your search. Try a different keyword.
            </div>
        `;

        return;
    }

    data.forEach((p)=>{

        grid.innerHTML += `

        <div class="product">

            <img
                src="${p.image}"
                alt="${p.name}"
                loading="lazy"
                onclick="openProduct(${p.id})"
                class="product-image"
                onerror="this.onerror=null;this.src='https://placehold.co/600x600?text=No+Image'">

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

    window.currentProduct = product;

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