import mongoose from "mongoose";
import OrderModel from "./models/order.js";
import "dotenv/config";

const main = async () => {
    await mongoose
    .connect(
      `mongodb+srv://Ferbadev:${process.env.PASSWORD}@cluster0.qaz6nck.mongodb.net/Pizza?retryWrites=true&w=majority&appName=Cluster0`
    )
    .then(() => console.log("Conectado a Mongo DB"))
    .catch((error) => console.log("Conexión a Mongo DB falló", error)); 


// EJERCICIO 1: ENCONTRAR PIZAS VENDIDAS POR SABOR EN TAMAÑO FAMILIAR

    const respuesta = await OrderModel.aggregate([
        {
            $match: {
                tam: "familiar"
            }
        },
        {
            $group: {
                _id: "$nombre",
                total: {
                    $sum: "$cantidad"
                }
            }
        }
    ]);
    
    console.log(respuesta);
}

main();