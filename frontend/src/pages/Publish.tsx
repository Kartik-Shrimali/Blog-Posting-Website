import { Appbar } from "../components/Appbar"
import {BACKEND_URL} from "../config"
import axios from "axios"
import {useState} from "react"
import {useNavigate} from "react-router-dom"


export const Publish = () => {
    const [title , setTitle] = useState("")
    const [description , setDescription] = useState("")
    const navigate = useNavigate()

    return <div>
        <Appbar />
        <div className="flex justify-center pt-10 ">
            <div className="max-w-screen-lg w-full">
                <input onChange = {(e)=>{
                    setTitle(e.target.value)
                }} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title" />
                <TextEditor onChange = {(e)=>{
                    setDescription(e.target.value)
                }}/>

                <button onClick={async () => {
                    const token = localStorage.getItem("token");
                    const response = await axios.post(`${BACKEND_URL}/api/v1/blog/blog`, {
                        title,
                        content : description
                    } , {
                        headers : {
                            Authorization : `Bearer ${token}`
                        }
                    });
                    navigate(`/blog/${response.data.id}`)
                }} type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 pt-2">
                    Publish post
                </button>
            </div>
        </div>
    </div>

}

function TextEditor({onChange} : {onChange : (e :React.ChangeEvent<HTMLTextAreaElement>)=>void}) {
    return <form>
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 mt-4">
            <div className="  bg-white rounded-b-lg ">
                <label className="sr-only">Publish post</label>
                <textarea onChange = {onChange} id="editor" rows={8} className="block w-full px-2 text-sm text-gray-800 bg-white border-0  " placeholder="Write an article..." required ></textarea>
            </div>
        </div>

    </form>

}  