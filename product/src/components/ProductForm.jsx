'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

// eslint-disable-next-line react/prop-types
const ProductForm = ({ productToEdit, onClose, onSave, onUpdate }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      if (productToEdit) {
        await onUpdate(data); 
      } else {
        await onSave(data); 
      }
      reset();
      onClose();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-primary">
        {productToEdit ? 'Editar Produto' : 'Adicionar Novo Produto'}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-primary">Nome do Produto</Label>
          <Input
            id="name"
            placeholder="Digite o nome do produto"
            className="bg-transparent border-primary text-primary placeholder-primary/50"
            {...register('name', { required: 'Nome é obrigatório' })}
          />
          {errors.name && (
            <p className="text-destructive text-sm flex items-center mt-1">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="description" className="text-primary">Descrição</Label>
          <Textarea
            id="description"
            placeholder="Descreva o produto"
            className="bg-transparent border-primary text-primary placeholder-primary/50"
            {...register('description', { required: 'Descrição é obrigatória' })}
          />
          {errors.description && (
            <p className="text-destructive text-sm flex items-center mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="price" className="text-primary">Preço</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            placeholder="0.00"
            className="bg-transparent border-primary text-primary placeholder-primary/50"
            {...register('price', { 
              required: 'Preço é obrigatório', 
              min: { value: 0, message: 'O preço deve ser maior que zero' }
            })}
          />
          {errors.price && (
            <p className="text-destructive text-sm flex items-center mt-1">
              {errors.price.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="quantity" className="text-primary">Quantidade</Label>
          <Input
            id="quantity"
            type="number"
            placeholder="Quantidade"
            className="bg-transparent border-primary text-primary placeholder-primary/50"
            {...register('quantity', { 
              required: 'Quantidade é obrigatória', 
              min: { value: 0, message: 'A quantidade deve ser maior que zero' }
            })}
          />
          {errors.quantity && (
            <p className="text-destructive text-sm flex items-center mt-1">
              {errors.quantity.message}
            </p>
          )}
        </div>
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onClose} className="border-primary text-primary hover:bg-primary/10">
            Cancelar
          </Button>
          <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
            {productToEdit ? 'Atualizar' : 'Adicionar'} Produto
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ProductForm;