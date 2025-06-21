import { Link } from "react-router-dom"

interface BlogCardProps {
    authorname: string,
    title: string,
    content: string,
    PublishedDate: string
    id : string
}

export const Blog_Cards = ({
    authorname,
    title,
    content,
    PublishedDate,
    id
}: BlogCardProps) => {
    return <Link to = {`/blog/${id}`}>
        <div className="border-b border-slate-400 pb-4 p-4 w-screen max-w-screen-md cursor-pointer">

            <div className="flex">
                <div className="">
                    <Avatar size="small" name={authorname} />
                </div>
                <div className="font-thin pl-2 text-sm flex justify-center flex-col">{authorname}</div>
                <div className="font-thin text-slate-600 text-sm pl-2 flex justify-center flex-col">
                    {PublishedDate}
                </div>
            </div>
            <div className="text-xl font-bold pt-3">
                {title}
            </div>
            <div className="text-md font-normal pt-2">
                {content.slice(0, 100) + "..."}
            </div>
            <div className="text-sm text-slate-500 pt-2">
                {`${Math.ceil(content.length / 100)} minutes(s) read`}
            </div>
        </div>
    </Link>
}

export function Avatar({ name, size = "small" }: { name: string, size: "small" | "big" }) {

    return <div className={`relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
        <span className={`${size === "small" ? "text-xs" : "text-md"} font-medium text-sm text-gray-600 dark:text-gray-300`}>{name[0].toUpperCase()}</span>
    </div>

}