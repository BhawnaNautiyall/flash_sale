console.log(
    "Current URL:",
    window.location.href
);

console.log(
    "Query String:",
    window.location.search
);

const params =
new URLSearchParams(
    window.location.search
);

const productId =
params.get("id");

console.log(
    "Product ID from URL:",
    productId
);

let currentProduct = null;

async function loadProduct(){

    console.log(
        "Fetching product:",
        productId
    );

    const response =
    await fetch(
        `http://localhost:5000/api/products/${productId}`
    );

    const product =
    await response.json();

    console.log(
        "Fetched Product:",
        product
    );

    currentProduct = product;

    document.getElementById(
        "productDetails"
    ).innerHTML = `

        <img
            src="${product.imageUrl}"
            width="250"
        >

        <h2>${product.name}</h2>

        <p>
            ₹${product.flashSalePrice}
        </p>

        <p>
            Stock: ${product.stock}
        </p>
    `;
}

loadProduct();

document
.getElementById("orderForm")
.addEventListener(
"submit",
async (e) => {

    e.preventDefault();

    if (!currentProduct) {

        alert(
            "Product not loaded."
        );

        return;
    }

    const submitBtn =
    document.querySelector(
        "#orderForm button"
    );

    submitBtn.disabled = true;

    submitBtn.innerText =
    "Placing Order...";

    const address =
    document.getElementById(
        "address"
    ).value;

    const phoneNumber =
    document.getElementById(
        "phone"
    ).value;

    try {

        const token =
        localStorage.getItem(
            "token"
        );

        const response =
        await fetch(
            "http://localhost:5000/api/orders",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                    "application/json",

                    "Authorization":
                    `Bearer ${token}`
                },

                body: JSON.stringify({

                    productId,

                    address,

                    phoneNumber

                })
            }
        );

        const data =
        await response.json();

        if (response.ok) {

            alert(
                "Order placed successfully!"
            );

            window.location.href =
            "products.html";

        } else {

            submitBtn.disabled = false;

            submitBtn.innerText =
            "Place COD Order";

            alert(
                data.message
            );
        }

    } catch (error) {

        console.log(
            "Order Error:",
            error
        );

        submitBtn.disabled = false;

        submitBtn.innerText =
        "Place COD Order";

        alert(
            "Failed to place order."
        );
    }
});