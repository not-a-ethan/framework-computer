import { TableRow, TableCell } from "@heroui/table"

import { CPU } from "@/types"

export function CpuTable(cpu: CPU|null) {
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