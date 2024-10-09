import React from 'react'
import { Bar } from 'react-chartjs-2'
// eslint-disable-next-line react/prop-types
const ProductChart = ({ products }) => {
  const data = {
    labels: products.map(product => product.name),
    datasets: [
      {
        label: 'Quantidade em Estoque',
        data: products.map(product => product.quantity),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Distribuição de Produtos por Quantidade',
      },
    },
  }

  return <Bar data={data} options={options} />
}

export default ProductChart