
import ComboBox from "./comboBox"
import { useState } from "react"
import { useGetAllProductsQuery, useCreateProductMutation } from "@/store/services/products"
import { ServerError } from "../alerts"
import { useDispatch } from "react-redux"
import { setProduct } from "@/store/reducers/currentOrderSlice"
import { InputSkeleton } from "../skeletons"
import toast from 'react-hot-toast';


export default function Products() {
    const dispatch = useDispatch()
    const [selectedProduct, setSelectedProduct] = useState()

    const [createProduct] = useCreateProductMutation()

    const { data: products, isLoading, error } = useGetAllProductsQuery()
    if (isLoading) return <InputSkeleton />
    if (error) return <ServerError error={error} />
    const productsList = products?.map(product => { return { value: product.id, label: product.title } })

    const handleCreateProduct = (value) => {
        createProduct({ title: value.toUpperCase() })
        toast.success('ТМЦ успішно додано')
    }

    const handleSelectProduct = (value) => {
        dispatch(setProduct(value))
        setSelectedProduct(value)
    }

    return (
        <ComboBox
            id="products"
            options={productsList}
            value={selectedProduct}
            onSelectedOption={(e) => handleSelectProduct(e)}
            onCreateOption={(value) => handleCreateProduct(value)}
            isMulti={false}
            placeholder={"..."}
        />
    )
}