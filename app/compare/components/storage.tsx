import { TableRow, TableCell } from "@heroui/table";

import { Storage } from "@/types";

export function StorageTable(storage: Storage) {
    return (
        <>
            <TableRow>
                <TableCell>Number of slots</TableCell>
                <TableCell>{storage.slots}</TableCell>
            </TableRow>

            <TableRow>
                <TableCell>Sizes</TableCell>
                <TableCell>{storage.sizes.join(", ")}</TableCell>
            </TableRow>
        </>
    );
};