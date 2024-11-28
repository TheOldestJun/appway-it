import { useGetNotApprovedQuery } from "@/store/services/orders"
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
import { FcApproval, FcCancel } from "react-icons/fc";
import { AllOrdersSkeleton } from "../skeletons"
import { ServerError } from "../alerts"
import { getOrderStatus, formatDate } from "@/lib/functions"

export default function ToApprove() {
    const user = useSelector((state) => state.auth.user);
    const { data, isLoading, error } = useGetNotApprovedQuery()
    if (isLoading) return <AllOrdersSkeleton />
    if (error) return <ServerError error={error} />

    const mappedData = data?.map((order) => {
        return (
            <TableRow key={order.id} className="hover:bg-gray-100 hover:cursor-pointer" onClick={() => { }}>
                <TableCell>{formatDate(order.createdDate)}</TableCell>
                <TableCell>{order.product.title}</TableCell>
                <TableCell>{order.description}</TableCell>
                <TableCell className="text-right">{order.unit.title}</TableCell>
                <TableCell className="text-right">{order.quantityCreated}</TableCell>
                <TableCell className="text-right"><Button variant="ghost" onClick={() => { }}><FcApproval /></Button></TableCell>
                <TableCell className="text-right"><Button variant="ghost" onClick={() => { }}><FcCancel /></Button></TableCell>
            </TableRow>
        )
    })

    return (
        <Table>
            <TableCaption>Заявки до узгодження</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Дата</TableHead>
                    <TableHead>Назва ТМЦ</TableHead>
                    <TableHead>Примітки</TableHead>
                    <TableHead className="text-right">Од. вим.</TableHead>
                    <TableHead className="text-right">Кількість</TableHead>
                    <TableHead className="text-right">Схвалити</TableHead>
                    <TableHead className="text-right">Відхилити</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {mappedData}
            </TableBody>
        </Table>
    )
}