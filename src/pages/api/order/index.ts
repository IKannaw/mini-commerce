// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import CartSlice, { CartItem } from "@/types/cart";
import { prisma } from "@/utils/db";
import { OrderStatus, Product } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const cartItems = req.body as CartItem[];
    const cartItemsId = cartItems.map((item) => item.id);
    const products = await prisma.product.findMany({
      where: { id: { in: cartItemsId } },
    });
    let subTotalPrice = 0;

    const getTotalPrice = (item: CartItem) => {
      const product = products.find(
        (product) => product.id === item.id
      ) as Product;
      return product?.price * item.quantity;
    };

    cartItems.forEach((item) => {
      const price = getTotalPrice(item);
      subTotalPrice += price;
    });
    const order = await prisma.order.create({
      data: { status: OrderStatus.ORDERED, totalPrice: subTotalPrice },
    });
    const orderId = order.id;
    cartItems.forEach(async (item) => {
      await prisma.orderLine.create({
        data: { orderId, productId: item.id, quantity: item.quantity },
      });
    });
    return res.status(200).json({ orderId, status: OrderStatus.ORDERED });
  }
  return res.status(200).json({ name: "John Doe" });
}
