import { Label } from "../components/Label"
import { Link, useNavigate } from "react-router-dom"
import { type SigninInput } from "@kartik_shrimali/blog-posting-common"
import { useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const Signin = () => {
    const navigate = useNavigate()
    const [postInputs, setpostInputs] = useState<SigninInput>({
        email: "",
        password: ""
    })

    async function sendRequest() {
        try {
            console.log("Sending inputs:", postInputs);

            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInputs , {
                headers : {
                    "Content-Type" : "application/json"
                }
            })
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            navigate("/blogs")
        } catch (e : any) {
            console.error("Login error:", e);
            alert(e?.response?.data?.message || "Something went wrong. Please try again.");
        }
    }

    return <div className="grid grid-cols-1 lg:grid-cols-2">

        <div className="flex flex-col justify-center items-center min-h-screen p-10">


            <div className="text-5xl font-extrabold text-center mb-2">Create an account</div>

            <div className="flex justify-center text-slate-500">
                Dont have an Account?
                <Link to={"/signup"} className="underline pl-2">Signup</Link>
            </div>

            <div className="flex flex-col gap-6 items-center w-full max-w-xl mt-8">


                <LabelledInput label="Email" placeholder="example@gmail.com" onChange={(e) => {
                    setpostInputs({
                        ...postInputs,
                        email: e.target.value
                    })
                }}></LabelledInput>

                <LabelledInput label="Password" placeholder="12345" type={"password"} onChange={(e) => {
                    setpostInputs({
                        ...postInputs,
                        password: e.target.value
                    })
                }}></LabelledInput>
                <button onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-10/11">Signup</button>


            </div>

        </div>

        <div className="hidden lg:block">
            <Label></Label>

        </div>
    </div>
}

type LabelledInputTypes = {
    label: string,
    placeholder: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>
    type?: string
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputTypes) {
    return (
        <div className="w-full max-w-lg ">
            <label className="block mb-1 text-md font-medium text-gray-800">{label}</label>
            <input
                onChange={onChange}
                type={type || "text"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-3"
                placeholder={placeholder}
                required
            />
        </div>
    );
}

