import { AllOrdersSkeleton } from "./skeletons"
import { ServerError } from "./alerts"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


import { useGetAllOrdersQuery } from "@/store/services/orders"
import { iconOrderStatus, getOrderStatus } from "@/lib/functions"

export default function GeneralAppData() {

    const { data, isLoading, isError } = useGetAllOrdersQuery();
    if (isLoading) return <AllOrdersSkeleton />
    if (isError) return <ServerError error={isError} />

    const mappedData = data.map((order) => {
        return (
            <TableRow key={order.id}>
                <TableCell>{`${order.createdBy.firstName} ${order.createdBy.lastName}`}</TableCell>
                <TableCell className="font-medium">{order.product.title}</TableCell>
                <TableCell>{order.description}</TableCell>
                <TableCell className="text-right">{order.unit.title}</TableCell>
                <TableCell className="text-right">{order.quantityCreated}</TableCell>
                <TableCell className="flex float-end">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost">
                                    {iconOrderStatus(order.status)}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                {getOrderStatus(order.status)}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>


                </TableCell>
            </TableRow>
        )
    })

    return (
        <Table>
            <TableCaption>Інформація по поточним заявкам</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Заявник</TableHead>
                    <TableHead>Назва ТМЦ</TableHead>
                    <TableHead>Примітки</TableHead>
                    <TableHead className="text-right">Од. вим.</TableHead>
                    <TableHead className="text-right">Кількість</TableHead>
                    <TableHead className="text-right">Стан</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {mappedData}
            </TableBody>
        </Table>
    )
}