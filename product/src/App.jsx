import { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import { Button, Card, Modal, Spinner } from 'flowbite-react';
import { PlusIcon } from 'lucide-react';
import { NotificationProvider, useNotification } from './contexts/NotificationContext';
import { AnimatePresence } from 'framer-motion';

const AppContent = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productToEdit, setProductToEdit] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const { addNotification } = useNotification();
    const [loading, setLoading] = useState(true);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3001/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
            addNotification("Erro ao carregar produtos", "error");
        } finally {
            setLoading(false);
        }
    }, [addNotification]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleProductSelect = useCallback((product) => {
        setSelectedProduct(product);
    }, []);

    const handleProductEdit = useCallback((product) => {
        setProductToEdit(product);
        setIsFormOpen(true);
    }, []);

    const handleProductDelete = useCallback(async (productId) => {
        try {
            await axios.delete(`http://localhost:3001/api/products/${productId}`);
            fetchProducts();
            addNotification("Produto excluído com sucesso", "success");
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
            addNotification("Erro ao excluir produto", "error");
        }
    }, [fetchProducts, addNotification]);

    const handleProductSave = useCallback(async (productData, isEditing) => {
        try {
            if (isEditing) {
                await axios.put(`http://localhost:3001/api/products/${productData._id}`, productData);
                addNotification("Produto atualizado com sucesso", "success");
            } else {
                await axios.post('http://localhost:3001/api/products', productData);
                addNotification("Produto adicionado com sucesso", "success");
            }
            fetchProducts();
            setIsFormOpen(false);
            setProductToEdit(null);
        } catch (error) {
            console.error("Erro ao salvar produto:", error);
            addNotification("Erro ao salvar produto", "error");
        }
    }, [fetchProducts, addNotification]);

    const memoizedProductList = useMemo(() => (
        <ProductList 
            products={products} 
            onProductSelect={handleProductSelect}
            onProductEdit={handleProductEdit}
            onProductDelete={handleProductDelete}
        />
    ), [products, handleProductSelect, handleProductEdit, handleProductDelete]);

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <Card className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-4xl font-bold text-gray-800">Gerenciamento de Produtos</h1>
                        <Button onClick={() => setIsFormOpen(true)} color="success">
                            <PlusIcon className="mr-2 h-4 w-4" /> Adicionar Produto
                        </Button>
                    </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                        <Card>
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Lista de Produtos</h2>
                            {loading ? (
                                <div className="flex justify-center items-center h-64">
                                    <Spinner size="xl" />
                                </div>
                            ) : memoizedProductList}
                        </Card>
                    </div>
                    <div>
                        <Card>
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Detalhes do Produto</h2>
                            {selectedProduct ? (
                                <ProductDetail product={selectedProduct} />
                            ) : (
                                <p className="text-gray-500">Selecione um produto para ver os detalhes.</p>
                            )}
                        </Card>
                    </div>
                </div>
            </div>

            <Modal show={isFormOpen} onClose={() => setIsFormOpen(false)}>
                <Modal.Header>
                    {productToEdit ? 'Editar Produto' : 'Adicionar Novo Produto'}
                </Modal.Header>
                <Modal.Body>
                    <ProductForm 
                        productToEdit={productToEdit}
                        onSave={handleProductSave}
                        onClose={() => setIsFormOpen(false)}
                    />
                </Modal.Body>
            </Modal>

            <AnimatePresence>
                {notifications.map((notification) => (
                    <Notification
                        key={notification.id}
                        id={notification.id}
                        message={notification.message}
                        type={notification.type}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

const App = () => (
    <NotificationProvider>
        <AppContent />
    </NotificationProvider>
);

export default App;