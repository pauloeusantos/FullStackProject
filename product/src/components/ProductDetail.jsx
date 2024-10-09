import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

// eslint-disable-next-line react/prop-types
const ProductDetail = ({ product }) => {
  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Preço: {product.price}</p>
      <p>Quantidade: {product.quantity}</p>
      <p>Categoria: {product.category}</p> {/* Exibindo a categoria */}
    </div>
  )
}

export default ProductDetail;