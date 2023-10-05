import products from '@/pages/api/products';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { Product } from '@prisma/client';
import Link from 'next/link';
import React from 'react'

interface Props{
    products:Product[];
}

const Products =({products}:Props) =>{
  return (
  <Box sx={{display:"flex", justifyContent:"center",flexWrap:"wrap"}}>
    {products.map( product =>(
    <Link style={{textDecoration:"none"}} key={product.id} href={`product-details/${product.id.toString()}`}>
      <Card sx={{ maxWidth: 345,marginRight:5,mb:3 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={product.imageUrl || ""}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        </Card>
        </Link> 
      ))}
    </Box>
  )
}

export default Products;