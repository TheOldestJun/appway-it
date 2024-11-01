import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"

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
    { value: 1, label: 'шт' },
    { value: 2, label: 'кг' },
]

export default function NewApplication() {
    const [selectedProduct, setSelectedProduct] = useState()
    const [notes, setNotes] = useState('')
    const [selectedUnits, setSelectedUnits] = useState()
    const [quantity, setQuantity] = useState(1)
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
            <div className="text-xl font-bold">Введіть дані для заявки</div>
            <Separator className="my-2" />
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-4">
                    <Label htmlFor="products" className="text-sm">ТМЦ</Label>
                    <ComboBox
                        id="products"
                        options={products}
                        value={selectedProduct}
                        onSelectedOption={setSelectedProduct}
                        onCreateOption={(value) => handleCreateProduct(value)}
                        isMulti={false}
                        placeholder={"..."}
                    />
                </div>
                <div className="col-span-4">
                    <Label htmlFor="notes" className="text-sm">Примітки, опис, тощо</Label>
                    <Input
                        id="notes"
                        type="text"
                        placeholder="..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
                <div className="col-span-2">
                    <Label htmlFor="units" className="text-sm">Одиниці виміру</Label>
                    <ComboBox
                        id="units"
                        options={units}
                        value={selectedUnits}
                        onSelectedOption={setSelectedUnits}
                        onCreateOption={(value) => handleCreateUnits(value)}
                        isMulti={false}
                        placeholder={"..."}
                    />
                </div>
                <div className="col-span-2">
                    <Label htmlFor="quantity" className="text-sm">Кількість</Label>
                    <Input
                        id="quantity"
                        type="number"
                        min="1"
                        placeholder="Кількість"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>
                <Button type="submit" className="col-span-12">Добавити</Button>
                <div className="col-span-12">
                    <NewAppTable />
                </div>
                <Button type="submit" className="col-span-12">Зберегти</Button>
            </div>
        </div>

    )
}