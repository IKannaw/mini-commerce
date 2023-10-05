import { useAppDispatch, useAppSelector } from "@/store/hook";
import { addToCart } from "@/store/slices/cartSlice";
import { prisma } from "@/utils/db";
import { Margin } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

export default function ProductDetail() {
  const products = useAppSelector((store) => store.products.items);
  const router = useRouter();
  const id = router.query.id;
  const product = products.find((product) => product.id === Number(id));
  const disptach = useAppDispatch();

  return (
    <Box
      key={product?.id}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto",
      }}
    >
      <Box>
        <img src={product?.imageUrl || ""} alt="" width={300} />
      </Box>
      <Box sx={{ ml: 3 }}>
        <Typography sx={{ mb: 4 }} variant="h3">
          {product?.title}
        </Typography>
        <Typography sx={{ mb: 4 }} variant="h5">
          {product?.description}
        </Typography>
        <Typography variant="h6">{product?.price}</Typography>
        <Box sx={{display:'flex',justifyContent:"flex-end",mr:5,mt:5}}>
          <Button onClick={()=>{ disptach(addToCart(product)) }} variant="contained">Add To Cart</Button>
        </Box>
      </Box>
    </Box>
  );
}
