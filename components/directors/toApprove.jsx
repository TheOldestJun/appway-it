import { useGetNotApprovedQuery, useSetApprovedMutation, useSetRejectedMutation } from "@/store/services/orders"
import { useSelector } from "react-redux"
import { useState } from "react"

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

import toast from "react-hot-toast"
import { FcApproval, FcCancel } from "react-icons/fc";
import { AllOrdersSkeleton } from "../skeletons"
import { ServerError } from "../alerts"
import { getOrderStatus, formatDate } from "@/lib/functions"

export default function ToApprove() {
    const user = useSelector((state) => state.auth.user);
    const [reason, setReason] = useState('')
    const { data, isLoading, error } = useGetNotApprovedQuery()
    const [setApproved] = useSetApprovedMutation()
    const [setRejected] = useSetRejectedMutation()

    if (isLoading) return <AllOrdersSkeleton />
    if (error) return <ServerError error={error} />

    const handleApprove = async (id) => {
        try {
            const payload = await setApproved({
                id,
                approverId: user.id
            })
            if (payload) {
                toast.success("Заявку успішно схвалено")
                setReason('')
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const handleReject = async (id) => {
        try {
            const payload = await setRejected({
                id,
                rejectedById: user.id,
                rejectedReason: reason
            }).unwrap()
            console.log(payload);
            if (payload) {
                toast.success("Заявку успішно відхилено")
                setReason('')
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const mappedData = data?.map((order) => {
        return (
            <TableRow key={order.id} className="hover:bg-gray-100 hover:cursor-pointer" onClick={() => { }}>
                <TableCell>{formatDate(order.createdDate)}</TableCell>
                <TableCell>{order.product.title}</TableCell>
                <TableCell>{order.description}</TableCell>
                <TableCell className="text-right">{order.unit.title}</TableCell>
                <TableCell className="text-right">{order.quantityCreated}</TableCell>
                <TableCell className="text-right"><Button variant="ghost" onClick={() => { handleApprove(order.id) }}><FcApproval /></Button></TableCell>
                <TableCell className="text-right">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" onClick={() => { }}><FcCancel /></Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px]">
                            <p className="text-sm">Вкажіть причину</p>
                            <Input value={reason} onChange={(e) => { setReason(e.target.value) }} />
                            <Button variant="destructive" className="mt-2 w-full" onClick={() => { handleReject(order.id) }}>Відхилити</Button>
                        </PopoverContent>
                    </Popover>
                </TableCell>
            </TableRow>
        )
    })

    return (
        <Table>
            <TableCaption>Заявки на погодження</TableCaption>
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