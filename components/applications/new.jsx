import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

import ComboBox from "./comboBox"
import NewAppTable from "./newAppTable"

import { useState } from "react"


let products = [
    { value: 1, label: 'Болт 22*90' },
    { value: 2, label: 'Гайка М22' },
    { value: 3, label: 'Гайка М24' },
    { value: 4, label: 'Гайка М26' },
    { value: 5, label: 'Гайка М28' },
    { value: 6, label: 'Гайка М32' },
    { value: 7, label: 'Гайка М36' },
    { value: 8, label: 'Гайка М40' },
    { value: 9, label: 'Гайка М42' },
]

let units = [
    { value: 1, label: 'шт.' },
    { value: 2, label: 'кг.' },
]

export default function NewApplication() {
    const [selectedProduct, setSelectedProduct] = useState()
    const [notes, setNotes] = useState('')
    const [selectedUnits, setSelectedUnits] = useState()
    const [quantity, setQuantity] = useState()
    const handleCreateProduct = (value) => {
        products.push({ value: products.length + 1, label: value })
        console.log(products)
    }
    const handleCreateUnits = (value) => {
        units.push({ value: units.length + 1, label: value })
        console.log(units)
    }
    return (
        <div>
            <Label htmlFor="products" className="text-sm font-bold">Введіть дані для заявки</Label>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-4">
                    <ComboBox
                        id="products"
                        options={products}
                        value={selectedProduct}
                        onSelectedOption={setSelectedProduct}
                        onCreateOption={(value) => handleCreateProduct(value)}
                        isMulti={false}
                        placeholder={"Оберіть ТМЦ"}
                    />
                </div>
                <div className="col-span-4">
                    <Input
                        type="text"
                        placeholder="Примітки"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
                <div className="col-span-2">
                    <ComboBox
                        id="units"
                        options={units}
                        value={selectedUnits}
                        onSelectedOption={setSelectedUnits}
                        onCreateOption={(value) => handleCreateUnits(value)}
                        isMulti={false}
                        placeholder={"Од. вим."}
                    />
                </div>
                <div className="col-span-2">
                    <Input
                        type="number"
                        placeholder="Кількість"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>
                <div className="col-span-12">
                    <NewAppTable />
                </div>
                <Button type="submit" className="col-span-12">Зберегти</Button>
            </div>
        </div>

    )
}