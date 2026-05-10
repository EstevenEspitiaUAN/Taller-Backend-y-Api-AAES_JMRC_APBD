import express, { Request, Response } from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

interface Product {
    id: number;
    name: string;
    description?: string;
    price?: number;
    status?: string;
    contact?: string;
}

interface Data {
    products: Product[];
}

// Leer datos
const readData = (): Data => {
    try {
        const data = fs.readFileSync("./db.json", "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);

        return {
            products: [],
        };
    }
};

// Escribir datos
const writeData = (data: Data): void => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data, null, 2));
    } catch (error) {
        console.log(error);
    }
};

// Ruta principal
app.get("/", (req: Request, res: Response) => {
    res.send("Bienvenido a mi API SWAP con Node TS");
});

// Obtener todos los productos
app.get("/products", (req: Request, res: Response) => {
    const data = readData();

    res.json(data.products);
});

// Obtener producto por ID
app.get("/products/:id", (req: Request, res: Response) => {
    const data = readData();

    const id = parseInt(req.params.id as string);

    const product = data.products.find(
        (product: Product) => product.id === id
    );

    if (!product) {
        return res.status(404).json({
            error: "Producto no encontrado",
        });
    }

    res.json(product);
});

// Crear producto
app.post("/products", (req: Request, res: Response) => {
    const data = readData();

    const body = req.body as Omit<Product, "id">;

    if (!body.name) {
        return res.status(400).json({
            error: "El nombre es obligatorio",
        });
    }

    const newProduct: Product = {
        id: data.products.length + 1,
        ...body,
    };

    data.products.push(newProduct);

    writeData(data);

    res.status(201).json(newProduct);
});

// Actualizar producto
app.put("/products/:id", (req: Request, res: Response) => {
    const data = readData();

    const body = req.body;

   const id = parseInt(req.params.id as string);

    const productIndex = data.products.findIndex(
        (product: Product) => product.id === id
    );

    if (productIndex === -1) {
        return res.status(404).json({
            error: "Producto no encontrado",
        });
    }

    data.products[productIndex] = {
        ...data.products[productIndex],
        ...body,
    };

    writeData(data);

    res.json({
        message: "Articulo actualizado correctamente",
    });
});

// Eliminar producto
app.delete("/products/:id", (req: Request, res: Response) => {
    const data = readData();

    const id = parseInt(req.params.id as string);

    const productIndex = data.products.findIndex(
        (product: Product) => product.id === id
    );

    if (productIndex === -1) {
        return res.status(404).json({
            error: "Producto no encontrado",
        });
    }

    data.products.splice(productIndex, 1);

    writeData(data);

    res.json({
        message: "Producto eliminado correctamente",
    });
});

// Puerto
app.listen(3000, () => {
    console.log("SWAP funcionando por el puerto 3000");
});