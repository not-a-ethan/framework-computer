import { TableRow, TableCell } from "@heroui/table";

import { Storage } from "@/types";

export function StorageTable(storage: Storage) {
    return (
        <>
            <TableRow>
                <TableCell>Number of M.2 NVME slots</TableCell>
                <TableCell>{storage.slots}</TableCell>
            </TableRow>

            <TableRow>
                <TableCell>M.2 sizes</TableCell>
                <TableCell>{storage.sizes.join(", ")}</TableCell>
            </TableRow>
        </>
    );
};