import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function EmailSelect() {
    return (
        <>
            <Select onValueChange={setRoleId}>
                <SelectTrigger className="col-span-6">
                    <SelectValue placeholder="Обрати email..." />
                </SelectTrigger>
                <SelectContent>

                </SelectContent>
            </Select>
        </>
    )
}