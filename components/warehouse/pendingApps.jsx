import {
  useGetNotReceivedQuery,
  useSetReceivedMutation,
} from '@/store/services/orders';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useSelector } from 'react-redux';
import { AllOrdersSkeleton } from '../skeletons';
import { ServerError } from '../alerts';
import { formatDate } from '@/lib/functions';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function PendingApps() {
  const user = useSelector(state => state.auth.user);
  const { data, isLoading, error } = useGetNotReceivedQuery();
  const [setReceived] = useSetReceivedMutation();
  const [quantity, setQuantity] = useState(0);

  if (isLoading) return <AllOrdersSkeleton />;
  if (error) return <ServerError error={error} />;

  const handleReceive = async id => {
    try {
      const payload = await setReceived({
        orderId: id,
        receiverId: user.id,
        quantity,
      });
      if (payload) {
        toast.success('ТМЦ отримано');
        setQuantity(0);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const mappedData = data?.map(order => {
    return (
      <TableRow
        key={order.id}
        className="hover:cursor-pointer hover:bg-gray-100"
      >
        <TableCell>{formatDate(order.createdDate)}</TableCell>
        <TableCell>
          {order.createdBy.firstName} {order.createdBy.lastName}
        </TableCell>
        <TableCell className="">{order.product.title}</TableCell>
        <TableCell className="text-left">{order.description}</TableCell>
        <TableCell className="text-right">{order.unit.title}</TableCell>
        <TableCell className="text-right">{order.quantityOrdered}</TableCell>
        <TableCell className="text-right">{order.quantityReceived}</TableCell>
        <TableCell className="text-right">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                Отримати
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[140px]">
              <Input
                placeholder="Кількість"
                type="number"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
              />
              <Button
                className="mt-2 w-full"
                onClick={() => {
                  handleReceive(order.id);
                }}
              >
                Отримано
              </Button>
            </PopoverContent>
          </Popover>
        </TableCell>
      </TableRow>
    );
  });

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
          <TableHead className="text-right">Отримано</TableHead>
          <TableHead className="text-right">Отримати</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{mappedData}</TableBody>
    </Table>
  );
}
