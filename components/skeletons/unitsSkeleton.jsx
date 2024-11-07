import { Skeleton } from "../ui/skeleton";
import { Label } from "../ui/label";

export default function UnitsSkeleton() {
    return (
        <>
            <Label htmlFor="units" className="text-sm">Одиниці виміру</Label>
            <Skeleton
                className="col-span-2 flex h-9 w-full rounded-md"
            />
        </>
    )
}