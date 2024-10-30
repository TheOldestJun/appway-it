"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreateTab, EditTab, DeleteTab } from "@/components/admin";


import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useRouter } from "next/navigation"


export default function Admin() {
    const router = useRouter()
    const user = useSelector((state) => state.auth.user)

    useEffect(() => {
        if (!user) {
            router.replace("/")
        }
    }, [user])

    return (
        <div>
            <Tabs defaultValue="users" className="w-full">
                <TabsList className="w-full">
                    <TabsTrigger value="users">Користувачі</TabsTrigger>
                    <TabsTrigger value="dummy">Щось тут буде...</TabsTrigger>
                </TabsList>
                <TabsContent value="users">
                    <Tabs defaultValue="create" className="w-full">
                        <TabsList className="w-full">
                            <TabsTrigger value="create">Створити нового</TabsTrigger>
                            <TabsTrigger value="edit">Редагувати</TabsTrigger>
                            <TabsTrigger value="delete">Видалити</TabsTrigger>
                        </TabsList>
                        <TabsContent value="create"><CreateTab /></TabsContent>
                        <TabsContent value="edit"><EditTab /></TabsContent>
                        <TabsContent value="delete"><DeleteTab /></TabsContent>
                    </Tabs>
                </TabsContent>
                <TabsContent value="dummy">Dummy here...</TabsContent>
            </Tabs>
        </div>
    )
}