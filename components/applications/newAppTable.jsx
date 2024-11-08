import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { useSelector } from "react-redux"



export default function NewAppTable() {

    const data = useSelector((state) => state.currentOrder);

    const mappedData = data?.orders.map((order) => {
        return (
            <TableRow key={order.id}>
                <TableCell>{order.product.label}</TableCell>
                <TableCell>{order.description}</TableCell>
                <TableCell className="text-right">{order.unit.label}</TableCell>
                <TableCell className="text-right">{order.quantity}</TableCell>
            </TableRow>
        )
    })

    return (
        <div>
            <Table>
                <TableCaption>Поточна заявка</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Назва ТМЦ</TableHead>
                        <TableHead>Примітки</TableHead>
                        <TableHead className="text-right">Од. вим.</TableHead>
                        <TableHead className="text-right">Кількість</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mappedData}
                </TableBody>
            </Table>
        </div>
    )
}