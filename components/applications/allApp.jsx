import { useGetAllOrdersByUserIdQuery } from "@/store/services/orders"
import { useSelector } from "react-redux"

import { getOrderStatus, formatDate } from "@/lib/functions"

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
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

import toast from "react-hot-toast"



export default function AllApplications() {
    const user = useSelector((state) => state.auth.user);
    const { data: orders, isLoading, error } = useGetAllOrdersByUserIdQuery(user?.id)


    const mappedData = orders?.map((order, index) => {
        return (
            <HoverCard key={order.id}>
                <HoverCardTrigger asChild>
                    <TableRow>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{order.product.title}</TableCell>
                        <TableCell>{order.description}</TableCell>
                        <TableCell className="text-right">{order.unit.title}</TableCell>
                        <TableCell className="text-right">{order.quantityCreated}</TableCell>
                        <TableCell className="text-right">{getOrderStatus(order.status)}</TableCell>
                        <TableCell className="text-right">
                            <Button
                                variant="ghost"
                                className="text-lg text-red-600 font-extrabold"
                                onClick={() => { toast.error("Функціонал в розробці") }} >
                                X
                            </Button>
                        </TableCell>
                    </TableRow>
                </HoverCardTrigger>
                <HoverCardContent className="w-[500px]">
                    <p className="text-sm text-slate-900 text-center">Детальна інформація</p>
                    <hr />
                    <p className="text-sm text-slate-500">Дата заявки: {formatDate(order.createdDate)}</p>
                    {order.approvedDate &&
                        <p className="text-sm text-slate-500">
                            Погоджено: {`${order.approvedBy.firstName} ${order.approvedBy.lastName}`} {formatDate(order.approvedDate)}
                        </p>}
                    {order.orderedDate &&
                        <p className="text-sm text-slate-500">
                            Замовлено: {`${order.quantityOrdered} ${order.unit.title}. ${order.orderedBy.firstName} ${order.orderedBy.lastName}`} {formatDate(order.orderedDate)}
                        </p>}

                </HoverCardContent>
            </HoverCard>
        )
    })

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
                    {mappedData}
                </TableBody>
            </Table>
        </>
    )
}