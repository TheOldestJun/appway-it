import { Button } from "../ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export default function DeleteTab() {

    const handleEmailChange = (id) => { }

    return (
        <div className="mx-auto max-w-xl">
            <div className="grid grid-cols-12 gap-5">
                <Select onValueChange={handleEmailChange}>
                    <SelectTrigger className="col-span-12">
                        <SelectValue placeholder="Обрати пошту..." />
                    </SelectTrigger>
                    <SelectContent>
                        {/* {users && usersList} */}
                    </SelectContent>
                </Select>
                <Button className="col-span-12">Видалити</Button>
            </div>
        </div>
    )
}