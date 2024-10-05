'use client'

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import PropTypes from 'prop-types';
import { AlertCircle } from 'lucide-react'


const ProductForm = ({ productToEdit, onSave, onClose }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()

  useEffect(() => {
    if (productToEdit) {
      setValue('name', productToEdit.name)
      setValue('description', productToEdit.description)
      setValue('price', productToEdit.price)
    }
  }, [productToEdit, setValue])

  const onSubmit = (data) => {
    onSave({
      ...data,
      price: Number(data.price),
      _id: productToEdit?._id
    }, !!productToEdit)
  }

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
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.name.message }
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
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.description.message }
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
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.price.message }
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

ProductForm.propTypes = {
    productToEdit: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.number
    }),
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
    };

export default ProductForm;