import express from 'express';
import fs, { read } from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () => {
    try {
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
};


app.get("/", (req, res) => {
    res.send("Bienvenido a mi API SWAP con Node JS");
});

//endpoint Obtener todos mis articulos 

app.get("/products", (req, res) => {
    const data = readData();
    res.json(data.products);
});
//Obtener articulo especifico
app.get("/products/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const products = data.products.find((products) => products.id === id);
    res.json(products);
});

app.post("/products", (req, res) => {

    const data = readData();
    const body = req.body;
    const newproducts = {
        id: data.products.length + 1,
        ...body,
    };
    data.products.push(newproducts);
    writeData(data);
    res.json(newproducts);
});


app.put("/products/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const productsIndex = data.products.findIndex((products) => products.id === id);
    data.products[productsIndex] = {
        ...data.products[productsIndex],
        ...body,
    };
    writeData(data);
    res.json({ message: "Articulo actualizado correctamente" });
});



app.delete("/products/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);

    const productIndex = data.products.findIndex((p) => p.id === id);

    if (productIndex === -1) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    data.products.splice(productIndex, 1);

    writeData(data);
    res.json({ message: "Producto eliminado correctamente" });
});



app.listen(3000, () => {
    console.log('Swap funcionando por el puerto 3000');
});