import { conectionAPI } from "../../backend/index.js";

const form = document.querySelector("[data-form]");
const popUp = document.getElementById("popup_container");
const closePopup = document.getElementById("close");

const createProducts = async (event) => {
  event.preventDefault();
  try {
    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    const success = await conectionAPI.createProduct(name, price, image);
    console.log(success)

    if (success) {
      // Mostrar el popup después de 3 segundos
      setTimeout(() => {
        popUp.style.display = "block";
      }, 3000);
    } else {
      popUp.style.display = "none";
    }
  } catch (error) {
    console.log(error);
  }
};

// Cierra el popup cuando el botón de cerrar es clicado
closePopup.addEventListener("click", () => {
  popUp.style.display = "none";
});


form.addEventListener("submit", (event) => createProducts(event));
