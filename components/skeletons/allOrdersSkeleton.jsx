import { Skeleton } from '@/components/ui/skeleton';

export default function AllOrdersSkeleton() {
  return (
    <div className="mx-auto max-w-full">
      <div className="grid grid-cols-12 gap-4">
        <Skeleton className="col-span-12 mt-2 flex h-8 w-full rounded-md" />
        <Skeleton className="col-span-12 flex h-10 w-full rounded-md" />
        <Skeleton className="col-span-12 flex h-10 w-full rounded-md" />
        <Skeleton className="col-span-12 flex h-10 w-full rounded-md" />
        <Skeleton className="col-span-12 flex h-10 w-full rounded-md" />
        <Skeleton className="col-span-12 flex h-10 w-full rounded-md" />
        <Skeleton className="col-span-12 flex h-10 w-full rounded-md" />
        <Skeleton className="col-span-12 flex h-8 w-full rounded-md" />
      </div>
    </div>
  );
}
