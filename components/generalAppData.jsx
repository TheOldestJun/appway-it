import { AllOrdersSkeleton } from './skeletons';
import { ServerError } from './alerts';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

import { useGetAllOrdersQuery } from '@/store/services/orders';
import { iconOrderStatus, getOrderStatus, formatDate } from '@/lib/functions';

export default function GeneralAppData() {
  const { data, isLoading, error } = useGetAllOrdersQuery();
  if (isLoading) return <AllOrdersSkeleton />;
  if (error) return <ServerError error={error} />;

  const mappedData = data.map(order => {
    return (
      <HoverCard key={order.id}>
        <TableRow className="hover:cursor-pointer hover:bg-gray-100">
          <TableCell>{`${order.createdBy.firstName} ${order.createdBy.lastName}`}</TableCell>
          <HoverCardTrigger asChild>
            <TableCell TableCell className="font-medium">
              {order.product.title}
            </TableCell>
          </HoverCardTrigger>
          <TableCell>{order.description}</TableCell>
          <TableCell className="text-right">{order.unit.title}</TableCell>
          <TableCell className="text-right">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {`${order.quantityCreated} / ${order.quantityOrdered == null ? 0 : order.quantityOrdered} / ${order.quantityReceived == null ? 0 : order.quantityReceived}`}
                </TooltipTrigger>
                <TooltipContent>
                  {`Заявлено / Замовлено / Отримано`}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </TableCell>
          <TableCell className="text-right">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  {iconOrderStatus(order.status)}
                </TooltipTrigger>
                <TooltipContent>{getOrderStatus(order.status)}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </TableCell>
        </TableRow>
        <HoverCardContent className="w-[500px]">
          <p className="text-center text-sm text-slate-900">
            Детальна інформація
          </p>
          <hr />
          <p className="text-sm text-slate-500">
            Дата заявки: {formatDate(order.createdDate)}
          </p>
          {order.approvedDate && (
            <p className="text-sm text-slate-500">
              Погоджено:{' '}
              {`${order.approvedBy.firstName} ${order.approvedBy.lastName}`}{' '}
              {formatDate(order.approvedDate)}
            </p>
          )}
          {order.orderedDate && (
            <p className="text-sm text-slate-500">
              Замовлено:{' '}
              {`${order.quantityOrdered} ${order.unit.title}. ${order.orderedBy.firstName} ${order.orderedBy.lastName}`}{' '}
              {formatDate(order.orderedDate)}
            </p>
          )}
          {order.receivedDate && (
            <p className="text-sm text-slate-500">
              На складі:{' '}
              {`${order.quantityReceived} ${order.unit.title}. ${order.receivedBy.firstName} ${order.receivedBy.lastName}`}{' '}
              {formatDate(order.receivedDate)}
            </p>
          )}
          {order.closedDate && (
            <p className="text-sm text-slate-500">
              Закрито: {formatDate(order.closedDate)}
            </p>
          )}
        </HoverCardContent>
      </HoverCard>
    );
  });

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
          <TableHead className="text-right">Статус</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{mappedData}</TableBody>
    </Table>
  );
}
