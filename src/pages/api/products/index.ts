// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const mehtod = req.method;
  if (mehtod === "GET") {
    const products = await prisma.product.findMany();
    return res.status(200).json(products);
  } else if (mehtod === "POST") {
    return res.send("Method by post");
  }
  return res.status(405).json("Invalid request method");
}
