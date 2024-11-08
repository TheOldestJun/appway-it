import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button"

import { useSelector, useDispatch } from "react-redux"
import { removeOrder, clearOrders } from "@/store/reducers/currentOrderSlice"




export default function NewAppTable() {
    const dispatch = useDispatch();

    const data = useSelector((state) => state.currentOrder);
    console.log(data)

    const mappedData = data?.orders.map((order) => {
        return (
            <TableRow key={order.id}>
                <TableCell>{order.product.label}</TableCell>
                <TableCell>{order.description}</TableCell>
                <TableCell className="text-right">{order.unit.label}</TableCell>
                <TableCell className="text-right">{order.quantity}</TableCell>
                <TableCell className="text-right">
                    <Button
                        variant="ghost"
                        className="text-lg text-red-600 font-extrabold"
                        onClick={() => { dispatch(removeOrder(order.id)) }} >
                        X
                    </Button>
                </TableCell>
            </TableRow>
        )
    })

    const submitToDB = () => {
        alert("Заявка успішно збережена")
        // save to DB logic here
        dispatch(clearOrders())
    }

    return (
        <>
            <Table>
                <TableCaption>Поточна заявка</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Назва ТМЦ</TableHead>
                        <TableHead>Примітки</TableHead>
                        <TableHead className="text-right">Од. вим.</TableHead>
                        <TableHead className="text-right">Кількість</TableHead>
                        <TableHead className="text-right">Видалити</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mappedData}
                </TableBody>
            </Table>
            <Button type="submit" className="w-full" onClick={submitToDB}>Зберегти</Button>
        </>
    )
}