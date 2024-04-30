"use client"; // This file will be executed on the client side only
import Link from "next/link"; // Import the Link component
import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import the useRouter hook // This hook is used to navigate between pages
import axios from "axios"; // This is used to make HTTP requests
import toast from "react-hot-toast";

export default function LoginPage() {

    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: ""
    }); // Create a state variable to store the user data

    const [buttonDisabled, setButtonDisabled] = React.useState(false); // Create a state variable to disable the button
    const [loading, setLoading] = React.useState(false); // Create a state variable to show loading spinner

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user); // Make a POST request to the login route
            console.log("Login response: ", response.data);
            toast.success("Login successful");
            router.push("/profile"); // Redirect the user to the profile page


        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message);

        } finally {
            setLoading(false);
        }
    } // Create a function to handle the Login process

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        }
        else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Login"}</h1>
            <hr />
            <label htmlFor="email">email</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus-within:border-blue-500 text-black"
                type="text" 
                id="email" 
                value={user.email} 
                onChange={(e) => setUser({...user, email: e.target.value})} 
                placeholder="Enter your email"
            />
            <label htmlFor="password">password</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus-within:border-blue-500 text-black"
                type="password" 
                id="password" 
                value={user.password} 
                onChange={(e) => setUser({...user, password: e.target.value})} 
                placeholder="Enter your password"
            />
            <button className="p-2 border border-gray-300 rounded-lg mb-4
             bg-green-600 focus:outline-none focus:border-gray-600" 
             onClick={onLogin}>Login</button>
            <Link href="/signup">Signup here</Link>
        </div>
    );
}