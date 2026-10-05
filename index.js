const [, , method, resource, title, price, category] = process.argv;


// ========================================
// VALIDACIÓN INICIAL
// ========================================

if (!method || !resource) {
    console.log("Debes ingresar un método y un recurso.");
    process.exit();
}


const [resourceName, productId] = resource.split("/");


// ========================================
// OBTENER TODOS LOS PRODUCTOS
// ========================================

const getProducts = async () => {

    try {

        const response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);

    } catch (error) {

        console.log("Error al obtener los productos:", error.message);

    }
};


// ========================================
// OBTENER UN PRODUCTO POR ID
// ========================================

const getProductById = async (id) => {

    try {

        const response = await fetch(`https://fakestoreapi.com/products/${id}`);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);

    } catch (error) {

        console.log("Error al obtener el producto:", error.message);

    }
};


// ========================================
// CREAR UN PRODUCTO
// ========================================

const createProduct = async (title, price, category) => {

    const newProduct = {
        title,
        price: Number(price),
        category
    };

    try {

        const response = await fetch("https://fakestoreapi.com/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);

    } catch (error) {

        console.log("Error al crear el producto:", error.message);

    }
};


// ========================================
// ELIMINAR UN PRODUCTO
// ========================================

const deleteProduct = async (id) => {

    try {

        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);

    } catch (error) {

        console.log("Error al eliminar el producto:", error.message);

    }
};


// ========================================
// INTERPRETAR LOS COMANDOS
// ========================================



if (method === "GET" && resourceName === "products") {

    if (productId) {

        getProductById(productId);

    } else {

        getProducts();

    }

}


// POST 

else if (method === "POST" && resourceName === "products") {

    if (!title || !price || !category) {

        console.log("Faltan datos para crear el producto.");

    } else if (isNaN(Number(price))) {

        console.log("El precio debe ser un número.");

    } else {

        createProduct(title, price, category);

    }

}


// DELETE 
else if (method === "DELETE" && resourceName === "products") {

    if (!productId) {

        console.log("Es necesario especificar el id del producto a borrar.");
    } else {

        deleteProduct(productId);

    }

}


// COMANDO NO RECONOCIDO

else {

    console.log("Comando no reconocido.");


}