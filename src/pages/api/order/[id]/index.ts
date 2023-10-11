import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "DELETE") {
    const query = req.query;
    const orderId = Number(query.id as String);
    if (!orderId) return res.status(400).send("Bad request");
    const isOrderId = await prisma.order.findFirst({
      where: { id: orderId },
    });
    if (!isOrderId) return res.status(400).send("Bad request");
    await prisma.orderLine.deleteMany({
      where: { orderId },
    });
    await prisma.order.delete({ where: { id: orderId } });
    return res.status(200).json("Deleted Successfully");
  }
  res.status(405).json("Invalid Method");
}
