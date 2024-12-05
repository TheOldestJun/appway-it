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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "../ui/input"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { useGetNotOrderedQuery, useSetOrderedMutation } from "@/store/services/orders"
import { AllOrdersSkeleton } from "../skeletons"
import { ServerError } from "../alerts"
import { iconOrderStatus, formatDate, getOrderStatus } from "@/lib/functions"

import { useState } from "react"
import { useSelector } from "react-redux"
import toast from "react-hot-toast"


export default function NewApps() {
    const user = useSelector((state) => state.auth.user)
    const [quantity, setQuantity] = useState(0)
    const [setOrdered] = useSetOrderedMutation()

    const { data, isLoading, error } = useGetNotOrderedQuery()

    if (isLoading) return <AllOrdersSkeleton />
    if (error) return <ServerError error={error} />

    const handleOrder = async (id) => {
        try {
            const payload = await setOrdered({
                orderId: id,
                executorId: user.id,
                quantity
            })
            if (payload) {
                toast.success("Заявку успішно замовлено")
                setQuantity(0)
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const mappedData = data.map((order) => {
        return (
            <TableRow key={order.id} className="hover:bg-gray-100 hover:cursor-pointer">
                <TableCell>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                {iconOrderStatus(order.status)}
                            </TooltipTrigger>
                            <TooltipContent>
                                {getOrderStatus(order.status)}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </TableCell>
                <TableCell>{order.createdBy.firstName} {order.createdBy.lastName}</TableCell>
                <TableCell>{formatDate(order.createdDate)}</TableCell>
                <TableCell>{order.product.title}</TableCell>
                <TableCell>{order.description}</TableCell>
                <TableCell className="text-right">{order.unit.title}</TableCell>
                <TableCell className="text-right">{order.quantityCreated}</TableCell>
                <TableCell className="text-right">
                    {
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" size="sm">Замовити</Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[130px]">
                                <Input
                                    placeholder="Кількість"
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)} />
                                <Button
                                    className="mt-2"
                                    onClick={() => {
                                        handleOrder(order.id)
                                    }
                                    }
                                >
                                    Замовити
                                </Button>
                            </PopoverContent>
                        </Popover>
                    }
                </TableCell>
            </TableRow>
        )
    })

    return (
        <Table>
            <TableCaption>Нові та поточні заявки</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Статус</TableHead>
                    <TableHead>Заявник</TableHead>
                    <TableHead>Дата</TableHead>
                    <TableHead>Назва ТМЦ</TableHead>
                    <TableHead>Примітки</TableHead>
                    <TableHead className="text-right">Од. вим.</TableHead>
                    <TableHead className="text-right">Заявлено</TableHead>
                    <TableHead className="text-right">Замовити</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {mappedData}
            </TableBody>
        </Table>
    )
}