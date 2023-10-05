import { useAppDispatch, useAppSelector } from '@/store/hook'
import { ChangeEvent, useEffect, useState } from 'react'
import { fetchProduct } from '@/store/slices/productSlice'
import { Box,TextField, Typography } from '@mui/material';
import Products from '@/components/products';
import SearchProducts from '@/components/searchProducts';


export default function Home() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(store => store.products.items);
  const [filterProduct,setFilterProduct] = useState(products);

  useEffect(()=>{
    dispatch(fetchProduct());
  },[]);

  useEffect(()=>{
    setFilterProduct(products);
  },[products])

  return (
  <Box>
    <SearchProducts products={filterProduct} setFilterProduct={setFilterProduct}/>
    <Products products={filterProduct} />
  </Box>
  )
}