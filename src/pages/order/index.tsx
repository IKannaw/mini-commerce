import { useAppDispatch, useAppSelector } from "@/store/hook";
import { Box, Button, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import React from "react";
import {
  addToCart,
  createOrder,
  reset,
  updateQuantity,
} from "@/store/slices/cartSlice";
import { useRouter } from "next/router";

export default function index() {
  const cartProducts = useAppSelector((store) => store.carts.items);
  const dispatch = useAppDispatch();
  let subtotal = 0;
  const router = useRouter();

  const increaseQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const decreaseQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const getSubTotal = () => {
    cartProducts.forEach((product) => {
      subtotal += product.quantity * product.price;
    });
    return subtotal;
  };

  const onSuccess = (data: any) => {
    router.push(`/order-details?orderId=${data.orderId}&status=${data.status}`);
    dispatch(reset());
  };

  const onError = (data: any) => {};

  const handleCreateOrder = async () => {
    dispatch(createOrder({ payload: cartProducts, onSuccess, onError }));
  };

  return (
    <Box sx={{ maxWidth: 1000, Height: 800, margin: "0 auto", p: 3 }}>
      <Box></Box>
      {cartProducts.length > 0 ? (
        <Box>
          {cartProducts.map((product) => (
            <Box
              sx={{ display: "flex", justifyContent: "space-between", my: 4 }}
            >
              <Box sx={{ display: "flex" }}>
                <img
                  width={100}
                  height={120}
                  src={product.imageUrl || ""}
                  alt=""
                />
                <Box
                  sx={{
                    ml: 3,
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                    width: 200,
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }} variant="h5">
                    Title
                  </Typography>
                  <Typography sx={{ ml: 1 }}>{product.title}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography>Price:{product.price}MMK</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <RemoveCircleIcon
                  sx={{ fontSize: 35, color: "red" }}
                  onClick={() =>
                    decreaseQuantity(product.id, product.quantity - 1)
                  }
                />
                <Typography sx={{ mx: 2 }}>{product.quantity}</Typography>
                <AddCircleIcon
                  sx={{ fontSize: 35, color: "green" }}
                  onClick={() =>
                    increaseQuantity(product.id, product.quantity + 1)
                  }
                />
              </Box>
              <Box
                sx={{
                  ml: 3,
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  width: 200,
                }}
              >
                <Typography sx={{ fontWeight: "bold" }} variant="h5">
                  Total
                </Typography>
                <Typography sx={{ ml: 1 }}>
                  {product.price * product.quantity}
                </Typography>
              </Box>
            </Box>
          ))}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography>Subtotal</Typography>
            <Typography>{getSubTotal()}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={handleCreateOrder}>
              Confirm Order
            </Button>
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography>Empty Products..</Typography>
        </Box>
      )}
    </Box>
  );
}
