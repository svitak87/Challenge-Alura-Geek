import { conectionAPI } from "../../backend/index.js";
const deleteButton = document.getElementById("delete_button")
console.log(deleteButton)

const deleteProduct = async (id) => {
    try {
        const deleted = await conectionAPI.deleteProduct(id)
    } catch (error) {
        
    }
}

deleteButton.addEventListener("click", (id) => deleteProduct(id));