import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const orderSchema = new mongoose.Schema({
        nombre: String,
        tam: String,
        precio: Number,
        cantidad: Number
});

orderSchema.plugin(mongoosePaginate);//se le aplica este cambio para ver el resultado en paginas

const OrderModel = mongoose.model("orders", orderSchema);

export default OrderModel;
