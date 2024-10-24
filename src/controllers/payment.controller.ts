import type { Context } from "hono";
import Chapa from "npm:chapa";
import { TransactionModel } from "../models/transaction.model.ts";

export const pay = async (c: Context) => {
  try {
    const chapa = new Chapa(Deno.env.get("CHAPA_TEST_KEY")!);

    const { userId, productId, ...customerInfo } = await c.req.json();

    const res = await chapa.initialize(customerInfo, { autoRef: true });

    const transactionData = {
      buyerId: userId,
      productId: productId,
      txRef: res.tx_ref,
      status: "pending",
      amount: customerInfo.amount,
    };

    const transaction = new TransactionModel(transactionData);
    transaction.save();

    return c.json(res);
  } catch (error) {
    console.log(error);
    return c.json({ error: "An unknown error occurred" });
  }
};

export const verifyTransaction = async (c: Context) => {
  try {
    const chapa = new Chapa(Deno.env.get("CHAPA_TEST_KEY")!);

    const txId = c.req.param("txId");

    const transaction = await TransactionModel.findById(txId);
    if (!transaction) {
      return c.json({ error: "Transaction not found" }, 404);
    }

    if (transaction.status == "accepted") {
      return c.json({ message: "Transaction verified" }, 200);
    }

    const tx_ref = transaction.txRef;
    const res = await chapa.verify(tx_ref);

    if (res.data.status == "success") {
      transaction.txRef == "accepted";
      transaction.save();
      return c.json({ message: "Transaction verified" }, 200);
    }

    return c.json({
      message: "Transaction not verified please comple your payment",
    }, 200);
  } catch (error) {
    return c.json({ error: "An unknown error occurred" });
  }
};
