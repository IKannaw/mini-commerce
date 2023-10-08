// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import CartSlice, { CartItem, OrderStatus } from "@/types/cart";
import { prisma } from "@/utils/db";
import { Product } from "@prisma/client";
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
    const order = await prisma.order.create({data:{status:"ORDERED",totalPrice:subTotalPrice}});
     cartItems.forEach(async(item) =>{
        await  prisma.orderLine.create({data:{orderId:order.id,productId:item.id,quantity:item.quantity}});
     })
  }
  res.status(200).json({ name: "John Doe" });
}
