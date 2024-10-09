import React, { useState, useEffect, useCallback } from 'react'
import  ProductForm  from './components/ProductForm'
import  ProductList  from './components/ProductList'
import  ProductDetail  from './components/ProductDetail'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Toaster } from "@/components/ui/toaster"
import { Loader2, Plus } from 'lucide-react'
import api from './service'
import ProductChart from './components/ProductChart'

const App = () => {
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [productToEdit, setProductToEdit] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('')

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const response = await api.get('/products')
      setProducts(response.data)
    } catch (error) {
      console.error("Erro ao buscar produtos:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleProductSelect = useCallback((product) => {
    setSelectedProduct(product)
  }, [])

  const handleProductEdit = useCallback((product) => {
    setProductToEdit(product)
    setIsFormOpen(true)
  }, [])

  const handleProductDelete = useCallback(async (productId) => {
    try {
      await api.delete(`/products/${productId}`)
      fetchProducts()
      
    } catch (error) {
        console.error("Erro ao excluir produto:", error);
    }
  }, [fetchProducts])

  const handleProductSave = useCallback(async (productData) => {
    try {
      if (productToEdit) {
        await api.put(`/products/${productData._id}`, productData);
      } else {
        await api.post('/products', productData);
      }
      fetchProducts();
      setIsFormOpen(false); 
      setProductToEdit(null);
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }
  }, [fetchProducts, productToEdit]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value)
  }

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-4xl font-bold">Gerenciamento de Produtos</CardTitle>
              <Button onClick={() => setIsFormOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Adicionar Produto
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <select onChange={handleCategoryChange} value={selectedCategory}>
              <option value="">Todas as Categorias</option>
              <option value="categoria1">Categoria 1</option>
              <option value="categoria2">Categoria 2</option>
            </select>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Lista de Produtos</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : (
                  <ProductList 
                    products={filteredProducts} 
                    onProductSelect={handleProductSelect}
                    onProductEdit={handleProductEdit}
                    onProductDelete={handleProductDelete}
                  />
                )}
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Detalhes do Produto</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedProduct ? (
                  <ProductDetail product={selectedProduct} />
                ) : (
                  <p className="text-muted-foreground">Selecione um produto para ver os detalhes.</p>
                )}
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Gráfico de Produtos</CardTitle>
              </CardHeader>
              <CardContent>
                <ProductChart products={filteredProducts} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen} className="bg-transparent">
        <DialogContent className="bg-white bg-opacity-80">
          <ProductForm 
            productToEdit={productToEdit}
            onSave={handleProductSave}
            onClose={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  )
}

export default App;