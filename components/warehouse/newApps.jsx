import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '../ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '../ui/input';
import { useState } from 'react';
import toast from 'react-hot-toast';

import {
    useGetNotOrderedQuery,
    useSetReceivedMutation,
    useSetInStockMutation
} from '@/store/services/orders';

import { AllOrdersSkeleton } from '../skeletons';
import { ServerError } from '../alerts';
import { formatDate } from '@/lib/functions';
import { useSelector } from 'react-redux';


export default function NewApps() {
    const user = useSelector(state => state.auth.user);
    const [quantity, setQuantity] = useState(0);
    const { data, isLoading, isError } = useGetNotOrderedQuery();
    const [setReceived] = useSetReceivedMutation();
    const [setInStock] = useSetInStockMutation();

    if (isLoading) return <AllOrdersSkeleton />;
    if (isError) return <ServerError error={isError} />;

    const handleInStock = async (id) => {
        try {
            const payload = await setInStock({
                orderId: id,
                receiverId: user.id,
                quantity,
            });
            if (payload) {
                toast.success('Заявку оновлено');
                setQuantity(0);
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const mappedData = data?.map(order => {
        return (
            <TableRow
                key={order.id}
                className="hover:cursor-pointer hover:bg-gray-100"
            >
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
                                <Button variant="outline" size="sm">
                                    У наявності
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[130px]">
                                <Input
                                    placeholder="Кількість"
                                    type="number"
                                    max={order.quantityCreated}
                                    value={quantity}
                                    onChange={e => setQuantity(e.target.value)}
                                />
                                <Button
                                    className="mt-2 w-full"
                                    onClick={() => {
                                        handleInStock(order.id);
                                    }}
                                >
                                    Так
                                </Button>
                            </PopoverContent>
                        </Popover>
                    }
                </TableCell>
            </TableRow>
        );
    })

    return (
        <Table>
            <TableCaption>Нові заявки</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Заявник</TableHead>
                    <TableHead>Дата</TableHead>
                    <TableHead>Назва ТМЦ</TableHead>
                    <TableHead>Примітки</TableHead>
                    <TableHead className="text-right">Од. вим.</TableHead>
                    <TableHead className="text-right">Заявлено</TableHead>
                    <TableHead className="text-right">У наявності</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {mappedData}
            </TableBody>
        </Table>
    );
}