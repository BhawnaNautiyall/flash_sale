document
.getElementById("uploadBtn")
.addEventListener("click", async (e) => {

    e.preventDefault();

    const name =
    document.getElementById("name").value;

    const description =
    document.getElementById("description").value;

    const originalPrice =
    document.getElementById("originalPrice").value;

    const flashSalePrice =
    document.getElementById("flashSalePrice").value;

    const stock =
    document.getElementById("stock").value;

    const imageFile =
    document.getElementById("image").files[0];

    alert("IMAGE FOUND");

    const formData =
    new FormData();

    formData.append("image", imageFile);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("originalPrice", originalPrice);
    formData.append("flashSalePrice", flashSalePrice);
    formData.append("stock", stock);

    alert("SENDING");

    const response =
    await fetch(
        "http://localhost:5000/api/upload",
        {
            method: "POST",
            body: formData
        }
    );

    const data =
    await response.json();

    alert("SUCCESS");
});