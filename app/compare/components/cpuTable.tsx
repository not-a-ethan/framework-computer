import { TableRow, TableCell } from "@heroui/table"

import { CPU, Fw13Package, FwDesktopPackage } from "@/types"

function isFw13Package(obj: any): obj is Fw13Package {
    console.log(obj);
    return obj && ("battery" in obj && "webcamGen" in obj && "displayInfo" in obj);
};

function isFwDesktopPackage(obj: any): obj is FwDesktopPackage {
    return obj && ("cpu" in obj && "ram" in obj && "graphics" in obj);
};

export function CpuTable(cpu: CPU|Fw13Package|FwDesktopPackage|null) {
    if (isFw13Package(cpu)) {
        return (
            <>
                <TableRow>
                    <TableCell>CPU Clock Speed</TableCell>

                    <TableCell>{cpu != null ? `${cpu.clockSpeed} GHz` : "-"}</TableCell>
                </TableRow>

                <TableRow>
                    <TableCell>CPU Cores</TableCell>

                    <TableCell>{cpu != null ? cpu.cores : "-"}</TableCell>
                </TableRow>

                <TableRow>
                    <TableCell>CPU Threads</TableCell>

                    <TableCell>{cpu != null ? cpu.threads : "-"}</TableCell>
                </TableRow>

                <TableRow>
                    <TableCell>Battery</TableCell>

                    <TableCell>{cpu != null ? `${cpu.battery} Wh` : "-"}</TableCell>
                </TableRow>

                <TableRow>
                    <TableCell>Web Cam Generation</TableCell>

                    <TableCell>{cpu != null ? `Gen ${cpu.webcamGen}` : "-"}</TableCell>
                </TableRow>

                <TableRow>
                    <TableCell>Display Info</TableCell>

                    <TableCell>{cpu != null ? cpu.displayInfo : "-"}</TableCell>
                </TableRow>
            </>
        )
    };

    if (isFwDesktopPackage(cpu)) {
        return (
            <>
                <TableRow>
                    <TableCell>CPU Clock Speed</TableCell>

                    <TableCell>{cpu != null ? `${cpu.cpu.clockSpeed} GHz` : "-"}</TableCell>
                </TableRow>

                <TableRow>
                    <TableCell>CPU Cores</TableCell>

                    <TableCell>{cpu != null ? cpu.cpu.cores : "-"}</TableCell>
                </TableRow>

                <TableRow>
                    <TableCell>CPU Threads</TableCell>

                    <TableCell>{cpu != null ? cpu.cpu.threads : "-"}</TableCell>
                </TableRow>

                <TableRow>
                    <TableCell>Amount of Ram</TableCell>

                    <TableCell>{cpu != null ? cpu.ram.amount : "-"}</TableCell>
                </TableRow>

                <TableRow>
                    <TableCell>Ram Type</TableCell>

                    <TableCell>{cpu != null ? cpu.ram.type : "-"}</TableCell>
                </TableRow>

                <TableRow>
                    <TableCell>Graphic Clock Speed</TableCell>

                    <TableCell>{cpu != null ? cpu.graphics.clockspeed : "-"}</TableCell>
                </TableRow>

                <TableRow>
                    <TableCell>Graphics Cores</TableCell>

                    <TableCell>{cpu != null ? cpu.graphics.cores : "-"}</TableCell>
                </TableRow>
            </>
        );
    };

    return (
        <>
            <TableRow>
                <TableCell>CPU Clock Speed</TableCell>

                <TableCell>{cpu != null ? `${cpu.clockSpeed} GHz` : "-"}</TableCell>
            </TableRow>

            <TableRow>
                <TableCell>CPU Cores</TableCell>

                <TableCell>{cpu != null ? cpu.cores : "-"}</TableCell>
            </TableRow>

            <TableRow>
                <TableCell>CPU Threads</TableCell>

                <TableCell>{cpu != null ? cpu.threads : "-"}</TableCell>
            </TableRow>
        </>
    );
};