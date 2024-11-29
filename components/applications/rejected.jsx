import { useGetRejectedQuery } from "@/store/services/orders"

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

export default function Rejected() {

    const { data, isLoading, error } = useGetRejectedQuery()
    if (isLoading) return <AllOrdersSkeleton />
    if (error) return <ServerError error={error} />

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
                </TableRow>
            </TableHeader>
            <TableBody>
                {/* {mappedData} */}
            </TableBody>
        </Table>
    )
}