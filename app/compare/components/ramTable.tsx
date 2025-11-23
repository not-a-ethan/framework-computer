import { TableRow, TableCell } from "@heroui/table";

import { Ram } from "@/types";

export function RamTable(ram: Ram) {
    return (
        <>
            <TableRow>
                <TableCell>SODIMM Slots</TableCell>
                <TableCell>{ram.slots}</TableCell>
            </TableRow>

            <TableRow>
                <TableCell>Max amount of ram (supported)</TableCell>
                <TableCell>{ram.maxTotal}GB</TableCell>
            </TableRow>

            <TableRow>
                <TableCell>Max amount per slot (supported)</TableCell>
                <TableCell>{ram.maxPerSlot}GB</TableCell>
            </TableRow>
        </>
    );
};