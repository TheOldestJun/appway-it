import { Button } from "../ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import toast from 'react-hot-toast';

import { useState } from "react";

import { DeleteUserSkeleton } from "../skeletons";

import { useGetAllUsersQuery, useDeleteUserMutation } from '@/store/services/users'


export default function DeleteTab() {
    const [id, setId] = useState('')
    const [deleteUser] = useDeleteUserMutation()
    const { data: users, isLoading, error } = useGetAllUsersQuery()
    if (isLoading) return (
        <DeleteUserSkeleton />
    )
    if (error) return (
        <div className="fixed top-[20%]">
            <div className="text-5xl font-caveat text-gray-400">{`Ошибка на сервере: ${error.message}`}</div>
        </div>
    )
    const usersList = users?.map(user => <SelectItem key={user.id} value={user.id}>{user.email}</SelectItem>)

    const handleDelete = async () => {
        try {
            const result = await deleteUser(id)
            if (result.data?.message) toast.success(result.data.message)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="mx-auto max-w-xl">
            <div className="grid grid-cols-12 gap-5">
                <Select onValueChange={setId}>
                    <SelectTrigger className="col-span-12">
                        <SelectValue placeholder="Обрати пошту..." />
                    </SelectTrigger>
                    <SelectContent>
                        {users && usersList}
                    </SelectContent>
                </Select>
                <Button className="col-span-12" onClick={handleDelete}>Видалити</Button>
            </div>
        </div>
    )
}