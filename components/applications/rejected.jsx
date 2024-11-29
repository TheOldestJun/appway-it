import { useGetRejectedQuery, useDeleteOrderMutation } from "@/store/services/orders"
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
import { FcCancel } from "react-icons/fc";
import { AllOrdersSkeleton } from "../skeletons"
import { ServerError } from "../alerts"

import { formatDate } from "@/lib/functions"

export default function Rejected() {
    const user = useSelector((state) => state.auth.user);
    const { data, isLoading, error } = useGetRejectedQuery(user.id)
    const [deleteOrder] = useDeleteOrderMutation()
    if (isLoading) return <AllOrdersSkeleton />
    if (error) return <ServerError error={error} />

    const handleDelete = async (id) => {
        try {
            const payload = await deleteOrder(id)
            if (payload) toast.success(result.data.message)
        } catch (error) {
            console.log(error);
        }
    }

    const mappedData = data?.map((order) => {
        return (
            <TableRow key={order.id} className="hover:bg-gray-100 hover:cursor-pointer">
                <TableCell>{order.product.title}</TableCell>
                <TableCell>{order.description}</TableCell>
                <TableCell className="text-right">{order.unit.title}</TableCell>
                <TableCell className="text-right">{order.quantityCreated}</TableCell>
                <TableCell className="text-right">{formatDate(order.createdDate)}</TableCell>
                <TableCell className="text-right">{formatDate(order.rejectedDate)}</TableCell>
                <TableCell className="text-right">{order.rejectedReason}</TableCell>
                <TableCell className="text-right">
                    <Button variant="ghost" onClick={() => { handleDelete(order.id) }}><FcCancel /></Button>
                </TableCell>
            </TableRow>
        )
    })

    return (
        <Table>
            <TableCaption>Відхилені заявки</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Назва ТМЦ</TableHead>
                    <TableHead>Примітки</TableHead>
                    <TableHead className="text-right">Од. вим.</TableHead>
                    <TableHead className="text-right">Кількість</TableHead>
                    <TableHead className="text-right">Дата створення</TableHead>
                    <TableHead className="text-right">Дата відхилення</TableHead>
                    <TableHead className="text-right">Причина</TableHead>
                    <TableHead className="text-right">Видалити</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {mappedData}
            </TableBody>
        </Table>
    )
}