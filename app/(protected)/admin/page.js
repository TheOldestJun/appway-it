"use client";

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
        <div>Admin</div>
    )
}