import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"



export default function NewAppTable({ data }) {
    return (
        <div>
            <Table>
                <TableCaption>Поточна заявка</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Назва ТМЦ</TableHead>
                        <TableHead>Примітки</TableHead>
                        <TableHead className="text-right">Од. вим.</TableHead>
                        <TableHead className="text-right">Кількість</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">Болт 22*90</TableCell>
                        <TableCell>DIN933</TableCell>
                        <TableCell className="text-right">шт</TableCell>
                        <TableCell className="text-right">250</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}