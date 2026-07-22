/* ================= MOBILE NAV TOGGLE ================= */

const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

if (navToggle && mainNav) {

    navToggle.addEventListener("click", () => {

        const isOpen = mainNav.classList.toggle("active");

        navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");

        navToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    /* Close menu after tapping a link */
    mainNav.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("active");
            navToggle.setAttribute("aria-expanded", "false");
            navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });
}

/* ================= IMAGE MAGNIFIER ================= */

const modalImageWrap = document.getElementById("modalImageWrap");
const modalImage = document.getElementById("modalImage");
const magnifyBtn = document.getElementById("magnifyBtn");
const lens = document.getElementById("lens");

const lightbox = document.getElementById("imageLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxStage = document.getElementById("lightboxStage");

const ZOOM_FACTOR = 2.2;

/* ---- Desktop hover lens on the modal image ---- */

if (modalImageWrap && modalImage && lens) {

    modalImageWrap.addEventListener("mouseenter", () => {

        if (!modalImage.src) return;

        lens.classList.add("show");

        lens.style.backgroundImage = `url("${modalImage.src}")`;
    });

    modalImageWrap.addEventListener("mousemove", (e) => {

        const rect = modalImageWrap.getBoundingClientRect();

        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        const lensSize = lens.offsetWidth;

        /* Keep the lens centered on the cursor but inside the image bounds */
        x = Math.max(lensSize / 2, Math.min(x, rect.width - lensSize / 2));
        y = Math.max(lensSize / 2, Math.min(y, rect.height - lensSize / 2));

        lens.style.left = `${x - lensSize / 2}px`;
        lens.style.top = `${y - lensSize / 2}px`;

        const bgWidth = rect.width * ZOOM_FACTOR;
        const bgHeight = rect.height * ZOOM_FACTOR;

        const bgX = -(x * ZOOM_FACTOR - lensSize / 2);
        const bgY = -(y * ZOOM_FACTOR - lensSize / 2);

        lens.style.backgroundSize = `${bgWidth}px ${bgHeight}px`;
        lens.style.backgroundPosition = `${bgX}px ${bgY}px`;
    });

    modalImageWrap.addEventListener("mouseleave", () => {

        lens.classList.remove("show");
    });

    modalImageWrap.addEventListener("click", () => {

        openLightbox();
    });
}

if (magnifyBtn) {

    magnifyBtn.addEventListener("click", (e) => {

        e.stopPropagation();
        openLightbox();
    });
}

/* ---- Fullscreen zoom / pan lightbox ---- */

let isZoomed = false;
let isDragging = false;
let startX = 0, startY = 0, currentX = 0, currentY = 0;

function openLightbox() {

    if (!modalImage.src) return;

    lightboxImage.src = modalImage.src;
    lightboxImage.alt = modalImage.alt;

    resetZoom();

    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {

    lightbox.classList.remove("active");

    /* Only restore scroll if the product modal isn't also open */
    const productModal = document.getElementById("productModal");

    if (!productModal || !productModal.classList.contains("active")) {
        document.body.style.overflow = "";
    }

    resetZoom();
}

function resetZoom() {

    isZoomed = false;
    currentX = 0;
    currentY = 0;

    lightboxImage.style.transform = "translate(0px, 0px) scale(1)";
    lightboxImage.classList.remove("zoomed", "dragging");
}

function applyTransform() {

    const scale = isZoomed ? ZOOM_FACTOR : 1;

    lightboxImage.style.transform =
        `translate(${currentX}px, ${currentY}px) scale(${scale})`;
}

if (lightboxImage) {

    /* Click / tap toggles zoom in on the point clicked */
    lightboxImage.addEventListener("click", (e) => {

        if (isDragging) return;

        if (!isZoomed) {

            isZoomed = true;
            lightboxImage.classList.add("zoomed");
            applyTransform();

        } else {

            resetZoom();
        }
    });

    /* Desktop drag-to-pan while zoomed */
    lightboxImage.addEventListener("mousedown", (e) => {

        if (!isZoomed) return;

        isDragging = true;
        lightboxImage.classList.add("dragging");

        startX = e.clientX - currentX;
        startY = e.clientY - currentY;
    });

    window.addEventListener("mousemove", (e) => {

        if (!isDragging) return;

        currentX = e.clientX - startX;
        currentY = e.clientY - startY;

        applyTransform();
    });

    window.addEventListener("mouseup", () => {

        if (isDragging) {

            isDragging = false;
            lightboxImage.classList.remove("dragging");
        }
    });

    /* Touch drag-to-pan while zoomed */
    lightboxImage.addEventListener("touchstart", (e) => {

        if (!isZoomed || e.touches.length !== 1) return;

        isDragging = true;

        startX = e.touches[0].clientX - currentX;
        startY = e.touches[0].clientY - currentY;

    }, { passive: true });

    lightboxImage.addEventListener("touchmove", (e) => {

        if (!isDragging || e.touches.length !== 1) return;

        currentX = e.touches[0].clientX - startX;
        currentY = e.touches[0].clientY - startY;

        applyTransform();

    }, { passive: true });

    lightboxImage.addEventListener("touchend", () => {

        isDragging = false;
    });
}

if (lightboxClose) {

    lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {

    lightbox.addEventListener("click", (e) => {

        if (e.target === lightbox || e.target === lightboxStage) {

            closeLightbox();
        }
    });
}

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape" && lightbox && lightbox.classList.contains("active")) {

        closeLightbox();
    }
});