'use client'

import React, { useMemo, useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Eye, Edit, Trash2 } from 'lucide-react'
import PropTypes from 'prop-types';

const ActionCell = ({ row, onProductSelect, onProductEdit, onProductDelete }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  return (
    <>
      <div className="flex space-x-2">
        <Button size="sm" variant="outline" onClick={() => onProductSelect(row.original)}>
          <Eye className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={() => onProductEdit(row.original)}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={() => setShowDeleteDialog(true)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este produto?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => onProductDelete(row.original._id)}>
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

ActionCell.propTypes = {
  row: PropTypes.object.isRequired,
  onProductSelect: PropTypes.func.isRequired, // Adicionando validação para onProductSelect
  onProductEdit: PropTypes.func.isRequired,
  onProductDelete: PropTypes.func.isRequired,
};

const ProductList = ({ products, onProductSelect, onProductEdit, onProductDelete }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Nome',
      },
      {
        accessorKey: 'description',
        header: 'Descrição',
      },
      {
        accessorKey: 'price',
        header: 'Preço',
        cell: ({ getValue }) => `R$ ${(getValue()).toFixed(2)}`,
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
  )

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div>
      <Input
        value={(table.getColumn('name')?.getFilterValue() ?? '')}
        onChange={(event) =>
          table.getColumn('name')?.setFilterValue(event.target.value)
        }
        placeholder="Pesquisar produtos..."
        className="max-w-sm mb-4"
      />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Nenhum resultado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number
  })).isRequired,
  onProductSelect: PropTypes.func.isRequired,
  onProductEdit: PropTypes.func.isRequired,
  onProductDelete: PropTypes.func.isRequired
};

export default ProductList;