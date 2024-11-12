import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import toast from 'react-hot-toast';

import NewAppTable from "./newAppTable"
import Units from "./units"
import Products from "./products"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { addOrder, clearLine } from "@/store/reducers/currentOrderSlice"


export default function NewApplication() {
    const dispatch = useDispatch()
    const [description, setDescription] = useState('')
    const [quantity, setQuantity] = useState(1.0)

    const handleSubmitLine = () => {
        dispatch(addOrder({ description, quantity }))
        setDescription('')
        setQuantity(1.0)
        dispatch(clearLine())
    }

    return (
        <div>
            <div className="text-xl font-bold">Введіть дані для заявки</div>
            <Separator className="my-2" />
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-4">
                    <Label htmlFor="products" className="text-sm">ТМЦ</Label>
                    <Products />
                </div>
                <div className="col-span-4">
                    <Label htmlFor="notes" className="text-sm">Примітки, опис, тощо</Label>
                    <Input
                        id="notes"
                        type="text"
                        placeholder="..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="col-span-2">
                    <Label htmlFor="units" className="text-sm">Одиниці виміру</Label>
                    <Units id="units" />
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
                <Button
                    type="submit"
                    className="col-span-12"
                    onClick={handleSubmitLine}>Добавити</Button>
                <div className="col-span-12">
                    <NewAppTable />
                </div>
            </div>
        </div>

    )
}