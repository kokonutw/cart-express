import paypal from "../config/paypal.js";
import { confirmarEstadoVenta } from "../models/VentasModel.js";

export const createPayment = (req, res) => {
  //Items es un array [{name: 'product01'}]
  const { total, items } = req.body;

  const mappedItems = items.map((item) => ({
    name: item.descripcion,
    sku: `SKU-${item.id_producto}`,
    price: item.precio_venta.toString(),
    currency: "USD",
    quantity: item.cantidad,
  }));

  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:5173/pago/success",
      cancel_url: "http://cancel.url",
    },
    transactions: [
      {
        item_list: {
          items: mappedItems,
        },
        amount: {
          currency: "USD",
          total: total,
        },
        description: "Pasarela de pago paypal.",
      },
    ],
  };

  paypal.payment.create(create_payment_json, async function (error, payment) {
    if (error) {
      return res
        .status(500)
        .json({ error: error.message ?? "Error en el pago" });
    } else {
      console.log("Create Payment Response");
      console.log(payment);

      const redirectUrl = payment.links.find(link=>link.rel==="approval_url").href

      res.status(200).json({ redirectUrl });
    }
  });
};

//Creamos un execute para almanecenar la venta en la bd
export const executePayment = (req, res, next) => {
  const { idVenta } = req.params;
  const { paymentId, PayerID, total } = req.query;
  const execute_payment_json = {
    payer_id: PayerID,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: total,
        },
      },
    ],
  };

  //Ejecutamos paypal
  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    async function (error, payment) {
      if (error) {
        return res
          .status(500)
          .json({ error: error.message ?? "Error en el pago" });
      } else {
        //Si todo sale bien, se confirma la venta y se almacena en la bd
        try {
          await confirmarEstadoVenta("confirmado", idVenta);
          console.log("Todo salio bien");
          console.log(payment);
          res.status(200).json({ payment });
        } catch (error) {
          next(error);
        }
      }
    }
  );
};
