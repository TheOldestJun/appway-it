import { useState } from "react"
import toast from 'react-hot-toast';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import UserSkeleton from "./userSkeleton";

import { useGetAllUsersQuery, useEditUserMutation } from '@/store/services/users'

export default function EditTab({ roles }) {
    const [id, setId] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [roleId, setRoleId] = useState('')


    const [editUser] = useEditUserMutation()
    const { data: users, isLoading, error } = useGetAllUsersQuery()
    if (isLoading) return (
        <UserSkeleton />
    )
    if (error) return (
        <div className="fixed top-[20%]">
            <div className="text-5xl font-caveat text-gray-400">{`Ошибка на сервере: ${error.message}`}</div>
        </div>
    )

    const usersList = users.map(user => <SelectItem key={user.id} value={user.id}>{user.email}</SelectItem>)

    const rolesList = roles.map(role => <SelectItem key={role.id} value={role.code}>{role.title}</SelectItem>)

    const handleEmailChange = (id) => {
        const currentUser = users.find(user => user.id === id)
        setId(currentUser.id)
        setEmail(currentUser.email)
        setPassword(currentUser.password)
        setFirstName(currentUser.firstName)
        setLastName(currentUser.lastName)
        setRoleId(currentUser.roleId)
    }
    const handleSubmit = async () => {
        try {
            const result = await editUser({ id, email, password, firstName, lastName, roleId })
            if (result.data?.message) toast.success(result.data.message)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="mx-auto max-w-xl">
            <div className="grid grid-cols-12 gap-5">
                <Select onValueChange={handleEmailChange}>
                    <SelectTrigger className="col-span-6">
                        <SelectValue placeholder="Обрати пошту..." />
                    </SelectTrigger>
                    <SelectContent>
                        {users && usersList}
                    </SelectContent>
                </Select>
                <Input
                    id="password"
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="col-span-6"
                />
                <Input
                    id="firstName"
                    type="text"
                    placeholder="Ім'я"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="col-span-6"
                />
                <Input
                    id="lastName"
                    type="text"
                    placeholder="Прізвище"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="col-span-6"
                />
                <Select onValueChange={setRoleId}>
                    <SelectTrigger className="col-span-12">
                        <SelectValue placeholder="Обрати роль..." value={roleId} />
                    </SelectTrigger>
                    <SelectContent>
                        {roles && rolesList}
                    </SelectContent>
                </Select>
                <Button className="col-span-12" onClick={handleSubmit}>Редагувати</Button>
            </div>
        </div>
    )
}