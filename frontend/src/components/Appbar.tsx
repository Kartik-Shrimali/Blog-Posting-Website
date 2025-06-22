import { Avatar } from "./Blog_Card"
import { Link } from "react-router-dom"
export const Appbar = () => {
    return <div className="border-b flex justify-between px-10 py-4">
        <Link to={'/blogs'}>
            <div className="flex flex-col justify-center cursor-pointer">
                Medium
            </div>
        </Link>
        <div>
            <Avatar size="big" name="Kartik"></Avatar>
        </div>
    </div>
}