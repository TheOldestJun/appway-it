"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppStatus, ToApprove } from "@/components/directors";

import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Directors() {
    const router = useRouter()
    const user = useSelector((state) => state.auth.user)
    useEffect(() => {
        if (!user) {
            router.replace("/")
        }
    }, [user])
    return (
        <>
            <Tabs defaultValue="newApplications" className="w-full">
                <TabsList className="w-full">
                    <TabsTrigger value="newApplications">Заявки на погодження</TabsTrigger>
                    <TabsTrigger value="allApplications">Статус виконання заявок</TabsTrigger>
                </TabsList>
                <TabsContent value="newApplications">
                    <div className="my-10 mx-20"><ToApprove /></div>
                </TabsContent>
                <TabsContent value="allApplications">
                    <div className="my-10 mx-20"><AppStatus /></div>
                </TabsContent>
            </Tabs>
        </>
    )
}