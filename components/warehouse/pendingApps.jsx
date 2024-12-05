import { useGetNotReceivedQuery, useSetReceivedMutation } from "@/store/services/orders"
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
import { AllOrdersSkeleton } from "../skeletons"
import { ServerError } from "../alerts"
import { formatDate } from "@/lib/functions"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"

export default function PendingApps() {
    const user = useSelector((state) => state.auth.user)
    const { data, isLoading, error } = useGetNotReceivedQuery()
    const [setReceived] = useSetReceivedMutation()

    if (isLoading) return <AllOrdersSkeleton />
    if (error) return <ServerError error={error} />

    const mappedData = data?.map((order) => {
        return (
            <TableRow key={order.id} className="hover:bg-gray-100 hover:cursor-pointer">
                <TableCell>{formatDate(order.createdDate)}</TableCell>
                <TableCell>{order.createdBy.firstName} {order.createdBy.lastName}</TableCell>
                <TableCell className="">{order.product.title}</TableCell>
                <TableCell className="text-right">{order.description}</TableCell>
                <TableCell className="text-right">{order.unit.title}</TableCell>
                <TableCell className="text-right">{order.quantityOrdered}</TableCell>
                <TableCell className="text-right">{order.quantityCreated - order.quantityOrdered}</TableCell>
                <TableCell className="text-right">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm">Отримати</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                        </PopoverContent>
                    </Popover>
                </TableCell>
            </TableRow>
        )
    })

    return (
        <Table>
            <TableCaption>Очікується поставка</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Дата заявки</TableHead>
                    <TableHead>Заявник</TableHead>
                    <TableHead>Назва ТМЦ</TableHead>
                    <TableHead>Примітки</TableHead>
                    <TableHead className="text-right">Од. вим.</TableHead>
                    <TableHead className="text-right">Замовлено</TableHead>
                    <TableHead className="text-right">Залишок</TableHead>
                    <TableHead className="text-right">Отримати</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {mappedData}
            </TableBody>
        </Table>
    )
}