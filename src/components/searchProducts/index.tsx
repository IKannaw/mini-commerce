import { Box, TextField, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Product } from "@prisma/client";
import { useAppSelector } from "@/store/hook";
import Link from "next/link";

interface Props {
  products: Product[];
  setFilterProduct: Dispatch<SetStateAction<Product[]>>;
}

const SearchProducts = ({ products, setFilterProduct }: Props) => {
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputValue = event.target.value.toLowerCase();
    const searchProduct = products.filter((product) =>
      product.title.toLocaleLowerCase().includes(inputValue)
    );
    setFilterProduct(searchProduct);
  };

  const cartProducts = useAppSelector((store) => store.carts.items);

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <TextField
        onChange={handleChange}
        placeholder="search products..."
        sx={{ width: 600, my: 4 }}
      />
      <Link href="/order">
        <ShoppingCartIcon sx={{ fontSize: 50, ml: 3, color: "purple" }} />
      </Link>
      {cartProducts.length > 0 && (
        <Typography sx={{ mb: 3 }}>{cartProducts.length}</Typography>
      )}
    </Box>
  );
};

export default SearchProducts;
