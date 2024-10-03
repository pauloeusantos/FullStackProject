import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Button, Label, TextInput, Textarea } from 'flowbite-react';
import { useNotification } from '../contexts/NotificationContext';

const ProductForm = ({ productToEdit, onSave, onClose }) => {
    const { addNotification } = useNotification();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        if (productToEdit) {
            setValue('name', productToEdit.name);
            setValue('description', productToEdit.description);
            setValue('price', productToEdit.price);
        }
    }, [productToEdit, setValue]);

    const onSubmit = (data) => {
        onSave({
            ...data,
            price: Number(data.price),
            _id: productToEdit?._id
        }, !!productToEdit);
        addNotification(productToEdit ? 'Produto atualizado com sucesso' : 'Produto adicionado com sucesso', 'success');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <Label htmlFor="name" className="text-gray-700 font-medium">Nome do Produto</Label>
                <TextInput
                    id="name"
                    {...register('name', { required: 'Nome é obrigatório' })}
                    className="mt-1"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div>
                <Label htmlFor="description" className="text-gray-700 font-medium">Descrição</Label>
                <Textarea
                    id="description"
                    {...register('description', { required: 'Descrição é obrigatória' })}
                    className="mt-1"
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>
            <div>
                <Label htmlFor="price" className="text-gray-700 font-medium">Preço</Label>
                <TextInput
                    id="price"
                    type="number"
                    step="0.01"
                    {...register('price', { required: 'Preço é obrigatório', min: 0 })}
                    className="mt-1"
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
            </div>
            <div className="flex justify-end space-x-2">
                <Button type="submit" color="success">
                    {productToEdit ? 'Atualizar' : 'Adicionar'} Produto
                </Button>
                <Button type="button" color="light" onClick={onClose}>
                    Cancelar
                </Button>
            </div>
        </form>
    );
};

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