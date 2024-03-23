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
        },

        //EJERCICIO 2: SE PIDEN NUEVOS STAGES Y QUE SE GUARDEN UNA NUEVA COLECCION
        //Usaremos métodos sort, group...
        {
            $sort: {
                total: -1
                //significa que el orden es descendente, si el numero fuera 1 los ordena de manera ascendente
            }
        },
        //vamos a agrupar y generar un reporte
        {
            $group: {
                _id: 1,
                orders: {
                    $push: "$$ROOT",
                    //PUSH INDICA QUE SE GUARDAN LOS RESULTAOS EN UN ARRAY, Y ROOT HACE REF AL DOC ACTUAL
                }
            }
        },
        {
            $project: {
                _id: 0,
                orders: "$orders",
                //le decimos que el campo order es igual a los resultados que guardamos en el paso anterior con el mismo nombre
            }
        },
        //ultimo paso super importante, HACEMOS UN MERGE DE LOS RESULTADOS EN UNA NUEVA COLECCION
        {
            $merge: {
                into: "reports"
            }
        }
    ]);
    
    console.log(respuesta);
}

main();