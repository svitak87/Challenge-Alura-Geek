import { conectionAPI } from "../../backend/index.js";
const list = document.querySelector("[data-lista]");

const productCard = (id, name, price, image) => {
  const product = document.createElement("li");
  product.className = "product_item";
  product.innerHTML = `
    <div class="card_container">
      <img class="image" src="${image}" alt="${name}">
      <h3 class="name">${name}</h3>
      <p class="price">$${String(price)}</p>
      <button class="delete" id="delete_button_${id}">X</button>
    </div>`;

  // Aquí agregamos el event listener al botón de eliminar
  const deleteButton = product.querySelector(`#delete_button_${id}`);
  deleteButton.addEventListener("click", () => {
    deleteProduct(id);
  });
  return product;
}

const deleteProduct = async (id) => {
  try {
    await conectionAPI.deleteProduct(id);
    // Después de eliminar el producto, deberías eliminar el elemento del DOM
    const productToRemove = document.querySelector(`#delete_button_${id}`).closest("li");
    if (productToRemove) {
      productToRemove.remove();
    }
    console.log(`Producto con id ${id} eliminado`);
  } catch (error) {
    console.error("Error al eliminar el producto", error);
  }
}

const productList = async () => {
  try {
    const apiList = await conectionAPI.fetchAllProducts();
    if (Array.isArray(apiList)) {
      apiList.forEach((product) =>
        list.appendChild(productCard(product.id, product.name, product.price, product.image))
      );
    } else {
      console.log("Los datos no son un arreglo");
    }
  } catch (error) {
    console.log(`El error fue: ${error}`);
  }
};

productList();
