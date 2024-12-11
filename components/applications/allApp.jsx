import { useGetAllOrdersByUserIdQuery, useSetDeletedMutation, useSetClosedMutation } from "@/store/services/orders"
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import toast from "react-hot-toast"
import { FcApproval, FcCancel } from "react-icons/fc";
import { AllOrdersSkeleton } from "../skeletons"
import { ServerError } from "../alerts"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faBan } from "@fortawesome/free-solid-svg-icons";




export default function AllApplications() {
    const user = useSelector((state) => state.auth.user);
    const { data: orders, isLoading, error } = useGetAllOrdersByUserIdQuery(user?.id)
    const [setDeleted] = useSetDeletedMutation()
    const [setClosed] = useSetClosedMutation()

    if (isLoading) return <AllOrdersSkeleton />
    if (error) return <ServerError error={error} />

    const handleDelete = async (id) => {
        try {
            const payload = await setDeleted(id)
            if (payload) toast.success("Заявку успішно видалено")
        } catch (error) {
            toast.error(error);
        }
    }

    const handleClose = async (id) => {
        try {
            const payload = await setClosed(id)
            if (payload) toast.success("Заявку успішно закрито")
        } catch (error) {
            toast.error(error);
        }
    }

    const mappedData = orders?.map((order, index) => {
        return (
            <HoverCard key={order.id}>
                <HoverCardTrigger asChild>
                    <TableRow className="hover:bg-gray-100 hover:cursor-pointer">
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{order.product.title}</TableCell>
                        <TableCell>{order.description}</TableCell>
                        <TableCell className="text-right">{order.unit.title}</TableCell>
                        <TableCell className="text-right">{order.quantityCreated}</TableCell>
                        <TableCell className="text-right">{getOrderStatus(order.status)}</TableCell>
                        <TableCell className="text-right">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        disabled={order.closedDate !== null}
                                        className="text-green-600">
                                        <FontAwesomeIcon icon={faCircleCheck} />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[120px]">
                                    <p className="text-sm">Ви впевнені?</p>
                                    <Button variant="destructive" className="mt-2 w-full" onClick={() => { handleClose(order.id) }}>Так</Button>
                                </PopoverContent>
                            </Popover>
                        </TableCell>
                        <TableCell className="text-right">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        disabled={order.closedDate === null}
                                        className="text-red-600">
                                        <FontAwesomeIcon icon={faBan} />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[120px]">
                                    <p className="text-sm">Ви впевнені?</p>
                                    <Button variant="destructive" className="mt-2 w-full" onClick={() => { handleDelete(order.id) }}>Так</Button>
                                </PopoverContent>
                            </Popover>
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
                    {order.receivedDate &&
                        <p className="text-sm text-slate-500">
                            Прийнято на склад: {`${order.quantityReceived} ${order.unit.title}. ${order.receivedBy.firstName} ${order.receivedBy.lastName}`} {formatDate(order.receivedDate)}
                        </p>}
                    {order.closedDate &&
                        <p className="text-sm text-slate-500">
                            Закрито: {formatDate(order.closedDate)}
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
                        <TableHead className="text-right">Видалити</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mappedData}
                </TableBody>
            </Table>
        </>
    )
}