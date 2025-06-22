import { Appbar } from "./Appbar"
import { type Blog } from "../hooks/index"
import { Avatar } from "./Blog_Card"

export const FullBlog = ({ blog }: { blog: Blog }) => {
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-20 max-w-screen-xl">
                <div className="col-span-8">
                    <div className="text-6xl font-extrabold ">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Posted On 22 June 2025
                    </div>
                    <div className="text-xl font-normal pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className=" col-span-4 ">
                    <div className = "text-slate-600 text-lg">

                    Author
                    </div>
                    <div className="flex">
                        <div className = "flex flex-col justify-center pr-4">
                            <Avatar size={"big"} name={blog.author.name || "Anonymous"} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold ">
                                {blog.author.name || "Anonymous"}</div>
                            <div className="pt-2 text-slate-500">
                                random catch phase about the author's ability to grab the user's attention
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
}