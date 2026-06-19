const container =
document.getElementById("productContainer");

async function loadProducts() {

    try {

        const response =
        await fetch(
            "http://localhost:5000/api/products"
        );

        const products =
        await response.json();

        renderProducts(products);

    } catch(error) {

        console.log(error);

    }
}

function buyProduct(productId){

    console.log(
        "Buy clicked. Product ID:",
        productId
    );

    if(!productId){

        alert(
            "Product ID is undefined"
        );

        return;
    }

    window.location.href =
        `checkout.html?id=${productId}`;
}

function renderProducts(products) {

    container.innerHTML = "";

    products.forEach(product => {

        console.log(
            "Product Loaded:",
            product
        );

    const card =
    document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <img
                src="${product.imageUrl}"
                alt="${product.name}"
            >

            <div class="product-content">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ${product.description}
                </p>

                <p>
                    Original:
                    ₹${product.originalPrice}
                </p>

                <p>
                    Flash Sale:
                    ₹${product.flashSalePrice}
                </p>

                <p>
                    Stock:
                    ${product.stock}
                </p>

                <button
                    class="buy-btn"
                    onclick="buyProduct('${product.id}')"
                >
                    Buy Now
                </button>

            </div>
        `;

        container.appendChild(card);

    });
}

loadProducts();