import React, { useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { 
    useReactTable, 
    getCoreRowModel, 
    getSortedRowModel, 
    getFilteredRowModel,
    flexRender
} from '@tanstack/react-table';
import { Button, Modal, Pagination } from 'flowbite-react';
import { ArrowUpDown, Eye, Edit, Trash2 } from 'lucide-react';

const ActionCell = ({ row, onProductSelect, onProductEdit, onProductDelete }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = useCallback(() => {
        onProductDelete(row.original._id);
        setShowDeleteModal(false);
    }, [onProductDelete, row.original._id]);

    return (
        <div className="flex space-x-2">
            <Button size="sm" color="info" onClick={() => onProductSelect(row.original)}>
                <Eye className="h-4 w-4" />
            </Button>
            <Button size="sm" color="warning" onClick={() => onProductEdit(row.original)}>
                <Edit className="h-4 w-4" />
            </Button>
            <Button size="sm" color="failure" onClick={() => setShowDeleteModal(true)}>
                <Trash2 className="h-4 w-4" />
            </Button>
            <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
                <Modal.Header>Confirmar exclusão</Modal.Header>
                <Modal.Body>
                    <p>Tem certeza que deseja excluir este produto?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="failure" onClick={handleDelete}>
                        Excluir
                    </Button>
                    <Button color="gray" onClick={() => setShowDeleteModal(false)}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

ActionCell.propTypes = {
    row: PropTypes.object.isRequired,
    onProductSelect: PropTypes.func.isRequired,
    onProductEdit: PropTypes.func.isRequired,
    onProductDelete: PropTypes.func.isRequired
};

const ProductList = ({ products, onProductSelect, onProductEdit, onProductDelete }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const columns = useMemo(
        () => [
            {
                id: 'name',
                header: 'Nome',
                accessorKey: 'name',
            },
            {
                id: 'description',
                header: 'Descrição',
                accessorKey: 'description',
            },
            {
                id: 'price',
                header: 'Preço',
                accessorKey: 'price',
                cell: ({ getValue }) => `R$ ${getValue().toFixed(2)}`,
            },
            {
                id: 'actions',
                header: 'Ações',
                cell: ({ row }) => (
                    <ActionCell
                        row={row}
                        onProductSelect={onProductSelect}
                        onProductEdit={onProductEdit}
                        onProductDelete={onProductDelete}
                    />
                ),
            },
        ],
        [onProductSelect, onProductEdit, onProductDelete]
    );

    const table = useReactTable({
        data: products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <div>
            <input
                value={table.getState().globalFilter ?? ''}
                onChange={e => table.setGlobalFilter(e.target.value)}
                placeholder="Pesquisar produtos..."
                className="p-2 mb-4 border rounded w-full"
            />
            <table className="w-full">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className="p-2 text-left">
                                    <div className="flex items-center">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="hover:bg-gray-100">
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="p-2">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(products.length / itemsPerPage)}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};

ProductList.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    })).isRequired,
    onProductSelect: PropTypes.func.isRequired,
    onProductEdit: PropTypes.func.isRequired,
    onProductDelete: PropTypes.func.isRequired
};

export default ProductList;