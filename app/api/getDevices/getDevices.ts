import { NextRequest, NextResponse } from "next/server";

import { computers } from "../computers";

export async function GET(req: NextRequest) {
    const devices = [];

    const laptops = Object.keys(computers["laptops"]);

    for (let i = 0; i < laptops.length; i++) {
        devices.push(laptops[i]);
    };

    const desktops = Object.keys(computers["desktops"]);

    for (let i = 0; i < desktops.length; i++) {
        devices.push(desktops[i]);
    };

    return NextResponse.json(
        {
            "devices": devices
        },
        { status: 200 }
    );
};