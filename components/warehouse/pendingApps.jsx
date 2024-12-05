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

export default function PendingApps() {
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
                    <TableHead className="text-right">Отримати</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {/* {mappedData} */}
            </TableBody>
        </Table>
    )
}