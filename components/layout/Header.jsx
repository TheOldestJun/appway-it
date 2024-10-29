import Image from "next/image"
import { getGreeting } from "@/lib/functions";
import { Button } from "../ui/button";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/reducers/authSlice";

export default function Header() {
    const dispatch = useDispatch();
    const greeting = getGreeting();
    const user = useSelector((state) => state.auth.user);
    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(logout());
    }
    return (
        <header className="flex justify-between items-center px-4 py-2 bg-secondary text-secondary-foreground shadow-md sticky top-0">
            <div>
                <Image src='/img/icons/appway.png'
                    width={100}
                    height={20}
                    alt='logo'
                    style={{ width: '100px', height: "20px" }} />
            </div>
            {user && (
                <div>
                    <div className="flex flex-row gap-2 align-middle">
                        <Button variant="ghost" className="text-lg text-sky-600">{`${greeting}, ${user.firstName} ${user.lastName}`}</Button>
                        <Button variant="ghost" className="text-lg">Допомога</Button>
                        <Button onClick={handleLogout} variant="ghost" className="text-lg text-red-600" >Вийти</Button>
                    </div>
                </div>
            )}



        </header >
    )
}