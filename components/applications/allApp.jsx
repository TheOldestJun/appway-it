import { useGetAllOrdersByUserIdQuery } from "@/store/services/orders"
import { useSelector } from "react-redux"

import { getOrderStatus } from "@/lib/functions"

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
    const userId = useSelector((state) => state.auth.user.id);
    if (userId) {
        var { data: orders, isLoading, error } = useGetAllOrdersByUserIdQuery(userId)
    }


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
                <HoverCardContent className="w-[300px]">
                    <p className="text-sm text-muted-foreground">Order information</p>
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