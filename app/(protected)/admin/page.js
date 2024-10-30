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
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="dummy">Dummy for future</TabsTrigger>
                </TabsList>
                <TabsContent value="users">
                    <Tabs defaultValue="create" className="w-full">
                        <TabsList className="w-full">
                            <TabsTrigger value="create">Create</TabsTrigger>
                            <TabsTrigger value="edit">Edit</TabsTrigger>
                            <TabsTrigger value="delete">Delete</TabsTrigger>
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