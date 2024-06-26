import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log(token);

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})

        if (!user){
            return NextResponse.json({error: "Invalid or expired token"}, {status: 400});
        }
        console.log(user);

        user.isVerified = true; // set the user as verified
        user.verifyToken = undefined; // remove the verify token
        user.verifyTokenExpiry = undefined; // remove the verify token expiry
        await user.save(); // save the user

        return NextResponse.json({
            message: "User verified successfully", success: true
        });
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}