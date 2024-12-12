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
import toast from 'react-hot-toast';

import { useSelector, useDispatch } from 'react-redux';
import { removeOrder, clearOrders } from '@/store/reducers/currentOrderSlice';
import { useCreateOrderMutation } from '@/store/services/orders';

export default function NewAppTable() {
  const dispatch = useDispatch();
  const [createOrder] = useCreateOrderMutation();
  const userId = useSelector(state => state.auth.user.id);
  const data = useSelector(state => state.currentOrder);

  const mappedData = data?.orders.map(order => {
    return (
      <TableRow key={order.id}>
        <TableCell>{order.product.label}</TableCell>
        <TableCell>{order.description}</TableCell>
        <TableCell className="text-right">{order.unit.label}</TableCell>
        <TableCell className="text-right">{order.quantity}</TableCell>
        <TableCell className="text-right">
          <Button
            variant="ghost"
            className="text-lg font-extrabold text-red-600"
            onClick={() => {
              dispatch(removeOrder(order.id));
            }}
          >
            X
          </Button>
        </TableCell>
      </TableRow>
    );
  });

  const submitToDB = async () => {
    const mappedData = data?.orders.map(order => ({
      productId: order.product.value,
      description: order.description,
      unitId: order.unit.value,
      quantityCreated: parseFloat(order.quantity),
    }));
    try {
      const payload = await createOrder({
        data: mappedData,
        creatorId: userId,
      }).unwrap();
      if (payload) toast.success('Заявка успішно додана до бази даних!');
    } catch (error) {
      toast.error(error);
    }
    dispatch(clearOrders());
  };

  return (
    <>
      <Table>
        <TableCaption>Поточна заявка</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Назва ТМЦ</TableHead>
            <TableHead>Примітки</TableHead>
            <TableHead className="text-right">Од. вим.</TableHead>
            <TableHead className="text-right">Кількість</TableHead>
            <TableHead className="text-right">Видалити</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{mappedData}</TableBody>
      </Table>
      <Button type="submit" className="w-full" onClick={submitToDB}>
        Зберегти
      </Button>
    </>
  );
}
