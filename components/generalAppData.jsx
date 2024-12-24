import { AllOrdersSkeleton } from './skeletons';
import { ServerError } from './alerts';

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useGetAllOrdersQuery } from '@/store/services/orders';
import { mapGeneralData } from '@/lib/functions';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function GeneralAppData() {
  const { data, isLoading, error } = useGetAllOrdersQuery();
  if (isLoading) return <AllOrdersSkeleton />;
  if (error) return <ServerError error={error} />;

  const mappedData = mapGeneralData(data);

  return (
    <Table>
      <TableCaption>Інформація по поточним заявкам</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Замовник" />
              </SelectTrigger>
            </Select>
          </TableHead>
          <TableHead>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Назва ТМЦ" />
              </SelectTrigger>
            </Select>
          </TableHead>
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
