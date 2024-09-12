import { exec } from "child_process";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import NextCors from "nextjs-cors";

export async function GET(request: NextApiRequest, response: NextApiResponse) {
    console.log("Sending REST API GET request to Nest.js service");
	const res = await fetch("http://localhost:3002/api/digsinet", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    console.log(res);

    return NextResponse.json({})
}
