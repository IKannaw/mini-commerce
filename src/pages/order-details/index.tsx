import { useAppDispatch } from "@/store/hook";
import { cancleOrder } from "@/store/slices/cartSlice";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

function OrderDetails() {
  const router = useRouter();
  const orderId = router.query.orderId;
  const status = router.query.status as String;

  const dispatch = useAppDispatch();

  const onSuccess = () => {};

  const onError = () => {};

  const handleCancleOrder = () => {
    dispatch(cancleOrder({ orderId, onSuccess, onError }));
    setTimeout(() => router.push("/"), 2000);
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box>
        <Typography>{router.query.orderId}</Typography>
        <Typography>{router.query.status}</Typography>
        <Button variant="contained" onClick={handleCancleOrder}>
          Cancle Order
        </Button>
      </Box>
    </Box>
  );
}

export default OrderDetails;
