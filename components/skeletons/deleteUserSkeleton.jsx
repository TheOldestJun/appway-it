import { Skeleton } from '@/components/ui/skeleton';

export default function DeleteUserSkeleton() {
  return (
    <div className="mx-auto max-w-xl">
      <div className="grid grid-cols-12 gap-5">
        <Skeleton className="col-span-12 flex h-9 w-full rounded-md" />
        <Skeleton className="col-span-12 flex h-9 w-full rounded-md" />
      </div>
    </div>
  );
}
