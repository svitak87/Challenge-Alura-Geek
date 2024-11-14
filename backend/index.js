export const fetchAllProducts = async () => {
  try {
    const response = await fetch("http://localhost:3000/products");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

const createProduct = async (name, price, image) => {
  try {
    // Obtener todos los productos
    const productsResponse = await fetch("http://localhost:3000/products");
    const products = await productsResponse.json();

    const id = products.length + 1

    // Crear el nuevo producto con id incrementado
    const createdProduct = await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        name: name,
        price: price,
        image: image,
      }),
    });

    const parsedProductConections = await createdProduct.json();
    return parsedProductConections;
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (id) => {
  try {
    const deletedProduct = await fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    });
    if (!deletedProduct.ok) {
      throw new Error("Error al eliminar el producto");
    }
    console.log("Producto eliminado exitosamente", deletedProduct);
  } catch (error) {
    console.log(error);
  }
};


export const conectionAPI = { fetchAllProducts, createProduct, deleteProduct };
