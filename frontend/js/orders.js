const container =
document.getElementById(
    "ordersContainer"
);

const token =
localStorage.getItem(
    "token"
);

async function loadOrders(){

    const response =
    await fetch(
        "http://localhost:5000/api/orders/my",
        {
            headers:{
                Authorization:
                `Bearer ${token}`
            }
        }
    );

    const orders =
    await response.json();

    container.innerHTML="";

    orders.forEach(order=>{

        const card =
        document.createElement("div");

        card.innerHTML = `

            <h3>
                ${order.productName}
            </h3>

            <p>
                Order ID:
                ${order.orderId}
            </p>

            <p>
                Status:
                ${order.status}
            </p>

            <hr>
        `;

        container.appendChild(card);

    });

}

loadOrders();