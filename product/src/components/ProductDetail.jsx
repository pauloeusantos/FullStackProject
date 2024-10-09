import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

// eslint-disable-next-line react/prop-types
const ProductDetail = ({ product }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-bold text-green-600">
          Preço: R$ {product.price.toFixed(2)}
        </p>
        <p className="text-lg font-bold text-blue-600">
          Quantidade: {product.quantity}
        </p>
        <p className="text-lg font-bold text-blue-600">
          Categoria: {product.category}
        </p>
      </CardContent>
    </Card>
  )
}

export default ProductDetail;