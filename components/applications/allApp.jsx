import { useGetAllOrdersByUserIdQuery } from "@/store/services/orders"
import { useSelector } from "react-redux"

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
import toast from "react-hot-toast"



export default function AllApplications() {
    const userId = useSelector((state) => state.auth.user.id);
    const { data: orders, isLoading, error } = useGetAllOrdersByUserIdQuery(userId)

    /*     const mappedData = orders?.map((order) => {
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
        }) */

    return (
        <>
            <Table>
                <TableCaption>Усі ваші заявки</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>№ п/п</TableHead>
                        <TableHead>Назва ТМЦ</TableHead>
                        <TableHead>Примітки</TableHead>
                        <TableHead className="text-right">Од. вим.</TableHead>
                        <TableHead className="text-right">Кількість</TableHead>
                        <TableHead className="text-right">Стан</TableHead>
                        <TableHead className="text-right">Закрити</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* {mappedData} */}
                </TableBody>
            </Table>
        </>
    )
}