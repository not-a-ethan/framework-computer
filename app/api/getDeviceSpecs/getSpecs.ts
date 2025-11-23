import { NextRequest, NextResponse } from "next/server";

import { GET as getDevices } from "../getDevices/getDevices";
import { computers } from "../computers";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const device: string|null = searchParams.get("device");

    if (device == null) {
        return NextResponse.json(
            {
                "error": "You did not include a device"
            },
            { status: 400 }
        );
    };

    const deviceOptions: string[] = (await (await getDevices(req)).json())["devices"];

    if (!deviceOptions.includes(device)) {
        return NextResponse.json(
            {
                "error": "You did not include a valid device"
            },
            { status: 400 }
        );
    };

    if (device !== "desktop") {
        return NextResponse.json(
            {
                "specs": computers["laptops"][`${device}`]
            },
            { status: 200 }
        );
    };

    return NextResponse.json(
        {
            "specs": computers["desktops"]["desktop"]
        },
        { status: 200 }
    );
};