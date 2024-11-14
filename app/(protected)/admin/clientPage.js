"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
    CreateUserTab, 
    EditUserTab, 
    DeleteUserTab,
    DeleteUnitsTab
} from "@/components/admin";


import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useRouter } from "next/navigation"


export default function ClientAdmin({roles}) {
    const router = useRouter()
    const user = useSelector((state) => state.auth.user)

    useEffect(() => {
        if (!user) {
            router.replace("/")
        }
    }, [user])

    return (
        <>
            <Tabs defaultValue="users" className="w-full">
                <TabsList className="w-full">
                    <TabsTrigger value="users">Користувачі</TabsTrigger>
                    <TabsTrigger value="materials">ТМЦ</TabsTrigger>
                    <TabsTrigger value="dummy">Щось тут буде...</TabsTrigger>
                </TabsList>
                <TabsContent value="users">
                    <Tabs defaultValue="create" className="w-full">
                        <TabsList className="w-full">
                            <TabsTrigger value="create">Створити нового</TabsTrigger>
                            <TabsTrigger value="edit">Редагувати</TabsTrigger>
                            <TabsTrigger value="delete">Видалити</TabsTrigger>
                        </TabsList>
                        <TabsContent value="create"><CreateUserTab roles={roles} /></TabsContent>
                        <TabsContent value="edit"><EditUserTab roles={roles} /></TabsContent>
                        <TabsContent value="delete"><DeleteUserTab /></TabsContent>
                    </Tabs>
                </TabsContent>
                <TabsContent value="materials">
                    <Tabs defaultValue="deleteUnit" className="w-full">
                        <TabsList className="w-full">
                            <TabsTrigger value="deleteUnit">Видалити одиниці виміру</TabsTrigger>
                            <TabsTrigger value="dummy">Щось тут буде...</TabsTrigger>
                        </TabsList>
                        <TabsContent value="deleteUnit"><DeleteUnitsTab /></TabsContent>
                        <TabsContent value="dummy">Dummy here...</TabsContent>
                    </Tabs>
                </TabsContent>
                <TabsContent value="dummy">Dummy here...</TabsContent>
            </Tabs>
        </>
    )
}