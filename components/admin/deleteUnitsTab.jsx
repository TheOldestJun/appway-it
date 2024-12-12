import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import toast from 'react-hot-toast';
import {
  useGetAllUnitsQuery,
  useDeleteUnitMutation,
} from '@/store/services/units';
import { ServerError } from '../alerts';
import { DeleteUnitsSkeleton } from '../skeletons';
import { useState } from 'react';

export default function DeleteUnitsTab() {
  const [id, setId] = useState('');
  const [deleteUnit] = useDeleteUnitMutation();

  const { data: units, isLoading, error } = useGetAllUnitsQuery();
  if (isLoading) return <DeleteUnitsSkeleton />;
  if (error) return <ServerError error={error} />;

  const unitsList = units?.map(unit => (
    <SelectItem key={unit.id} value={unit.id}>
      {unit.title}
    </SelectItem>
  ));

  const handleDelete = async () => {
    try {
      const result = await deleteUnit(id);
      if (result.data?.message) toast.success(result.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto max-w-xl">
      <div className="grid grid-cols-12 gap-5">
        <Select onValueChange={setId}>
          <SelectTrigger className="col-span-12">
            <SelectValue placeholder="Обрати одиницю виміру..." />
          </SelectTrigger>
          <SelectContent>{units && unitsList}</SelectContent>
        </Select>
        <Button className="col-span-12" onClick={handleDelete}>
          Видалити
        </Button>
      </div>
    </div>
  );
}
