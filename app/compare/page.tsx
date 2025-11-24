"use client";

import { useState } from "react";

import { Select, SelectItem } from "@heroui/select";
import { addToast } from "@heroui/toast";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";

import { getAPI } from "@/helpers/getAPI";

import { CpuTable } from "./components/cpuTable";
import { RamTable } from "./components/ramTable";
import { StorageTable } from "./components/storage";

import { Framework12, Framework13, Framework16, FrameworkDesktop } from "@/types";

import styles from "../../styles/compare.module.css";

export default function Compare() {
    const { device, deviceError, deviceLoading } = getAPI(`/api/getDevices`, ["device", "deviceError", "deviceLoading"]);
    
    const [deviceOne, setDeviceOne] = useState<string>("");
    const [deviceTwo, setDeviceTwo] = useState<string>("");

    const [deviceOneSpecs, setDeviceOneSpecs] = useState<any>({});
    const [deviceTwoSpecs, setDeviceTwoSpecs] = useState<any>({});

    const [deviceOnePackage, setDeviceOnePackage] = useState<string>("");
    const [deviceTwoPackage, setDeviceTwoPackage] = useState<string>("");

    function deviceOneSelect(e: any) {
        const vals: string[] = Object.values(e);
        const thisDevice: string = vals[1];

        setDeviceOne(thisDevice);
        setDeviceOneSpecs({});
        setDeviceOnePackage("");

        if (thisDevice !== "desktop" && thisDevice !== "framework12" && thisDevice !== "framework13" && thisDevice !== "framework16") {
            addToast({
                "color": "danger",
                "title": "Something went wrong selecting device"
            });

            return;
        };

        fetch(`/api/getDeviceSpecs?device=${thisDevice}`)
        .then(res => res.json())
        .then(json => {
            setDeviceOneSpecs(json["specs"]);
        });
    };

    function deviceTwoSelect(e: any) {
        const vals: string[] = Object.values(e);
        const thisDevice: string = vals[1];

        setDeviceTwo(thisDevice);
        setDeviceTwoSpecs({});
        setDeviceTwoPackage("");

        if (thisDevice !== "desktop" && thisDevice !== "framework12" && thisDevice !== "framework13" && thisDevice !== "framework16") {
            addToast({
                "color": "danger",
                "title": "Something went wrong selecting device"
            });

            return;
        };

        fetch(`/api/getDeviceSpecs?device=${thisDevice}`)
        .then(res => res.json())
        .then(json => {
            setDeviceTwoSpecs(json["specs"]);
        });
    };

    function deviceOnePackageUpdate(e: any) {
        const vals: string[] = Object.values(e);
        const thisPackage: string = vals[1];

        setDeviceOnePackage(thisPackage);
    };

    function deviceTwoPackageUpdate(e: any) {
        const vals: string[] = Object.values(e);
        const thisPackage: string = vals[1];

        setDeviceTwoPackage(thisPackage);
    };

    if (deviceError) {
        return (
            <>
                <h1>Something went wrong</h1>

                <p>Couldnt get device info</p>
            </>
        )
    };

    if (deviceLoading) {
        return (
            <>
                <p>Loading</p>
            </>
        );
    };

    const deviceOptions = device["devices"];

    return (
        <>
            <h1>On this page you can compare the full specs of diffrent Framework computers</h1>

            <div className={`${styles.grid}`}>
                <div className={`${styles.col1}`}>
                    <Select label="Select a device" onSelectionChange={(e) => deviceOneSelect(e)}>
                        {deviceOptions.map((device: string) => (
                            <SelectItem key={device}>{device}</SelectItem>
                        ))}
                    </Select>

                    <br />
                    <br />

                    {(() => {
                        if (deviceOne == "") {
                            return (<></>);
                        } else {
                            if (JSON.stringify(deviceOneSpecs) == JSON.stringify({})) {
                                return <></>
                            };

                            if (deviceOne == "framework12") {
                                const fw12: Framework12 = deviceOneSpecs;
                                const cpuOptions: string[] = Object.keys(fw12["cpu"]);

                                if (!cpuOptions) {
                                    return <></>
                                }

                                const cpuTable = CpuTable((deviceOnePackage !== "i3-1315U" && deviceOnePackage !== "i5-1334U") ? null : fw12.cpu[deviceOnePackage])
                                const ramTable = RamTable(fw12.ram);
                                const storageTable = StorageTable(fw12.storage);

                                return (
                                    <>
                                        <Select label="Select a CPU" onSelectionChange={deviceOnePackageUpdate}>
                                            {cpuOptions.map((cpuName: string) => (
                                                <SelectItem key={cpuName}>{cpuName}</SelectItem>
                                            ))}
                                        </Select>

                                        <br />
                                        <br />

                                        <Table isStriped>
                                            <TableHeader>
                                                <TableColumn>Spec</TableColumn>
                                                <TableColumn>Value</TableColumn>
                                            </TableHeader>
                                            <TableBody>
                                                {cpuTable}
                                                {ramTable}
                                                {storageTable}

                                                <TableRow>
                                                    <TableCell>Battery</TableCell>
                                                    <TableCell>{fw12.power}Wh</TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell>Expansion slots</TableCell>
                                                    <TableCell>{fw12.expansionSlots}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </>
                                )
                            } else if (deviceOne == "framework13") {
                                const fw13: Framework13 = deviceOneSpecs;
                                const newIntel: string[] = Object.keys(fw13["new builds"]["cpu"]["intel"]);
                                const newAmd: string[] = Object.keys(fw13["new builds"]["cpu"]["amd"]);
                                const cpuOptions: string[] = newIntel.concat(newAmd.concat(Object.keys(fw13["old builds"]["amd"])));

                                if (!cpuOptions) {
                                    return <></>;
                                };

                                let cpuTable;

                                // Old package
                                if (deviceOnePackage.includes("AMD Ryzen")) {
                                        cpuTable = CpuTable(
                                        (deviceOnePackage !== "AMD Ryzen™ 5 7640U" && deviceOnePackage !== "AMD Ryzen™ 5 7640U (2.8k Display)")
                                        ? null : fw13["old builds"].amd[deviceOnePackage]
                                    );
                                } else if (deviceOnePackage.includes("Ryzen")) {
                                    // New AMD
                                    cpuTable = CpuTable(
                                        (deviceOnePackage !== "Ryzen™ AI 5 340" && deviceOnePackage !== "Ryzen™ AI 7 350" && deviceOnePackage !== "Ryzen™ AI 9 HX 370" )
                                        ? null : fw13["new builds"].cpu.amd[deviceOnePackage]
                                    );
                                } else {
                                    // New Intel
                                    cpuTable = CpuTable(
                                        (deviceOnePackage !== "Ultra 5 125H" && deviceOnePackage !== "Ultra 7 155H" && deviceOnePackage !== "Ultra 7 165H") 
                                        ? null : fw13["new builds"].cpu.intel[deviceOnePackage]
                                    );
                                };

                                const ramTable = RamTable(fw13.ram);
                                const storageTable = StorageTable(fw13.storage);

                                return (
                                    <>
                                        <Select label="Select a CPU" onSelectionChange={deviceOnePackageUpdate}>
                                            {cpuOptions.map((cpuName: string) => (
                                                <SelectItem key={cpuName}>{cpuName}</SelectItem>
                                            ))}
                                        </Select>

                                        <br />
                                        <br />

                                        <Table isStriped>
                                            <TableHeader>
                                                <TableColumn>Spec</TableColumn>
                                                <TableColumn>Value</TableColumn>
                                            </TableHeader>
                                            <TableBody>
                                                {cpuTable}
                                                {ramTable}
                                                {storageTable}

                                                <TableRow>
                                                    <TableCell>Power in</TableCell>
                                                    <TableCell>{fw13.power}W</TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell>Expansion slots</TableCell>
                                                    <TableCell>{fw13.expansionSlots}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </>
                                )
                            } else if (deviceOne == "framework16") {
                                const fw16: Framework16 = deviceOneSpecs;
                                const cpuOptions: string[] = Object.keys(fw16["cpu"]);

                                if (!cpuOptions) {
                                    return <></>;
                                };

                                const cpuTable = CpuTable(
                                    (deviceOnePackage !== "Ryzen™ 7 7840HS" && deviceOnePackage !== "Ryzen™ 9 7940HS" && deviceOnePackage !== "Ryzen™ AI 7 350" && deviceOnePackage !== "Ryzen™ AI 9 HX 370") 
                                    ? null : fw16.cpu[deviceOnePackage]
                                );
                                const ramTable = RamTable(fw16.ram);
                                const storageTable = StorageTable(fw16.storage);

                                return (
                                    <>
                                        <Select label="Select a CPU" onSelectionChange={deviceOnePackageUpdate}>
                                            {cpuOptions.map((cpuName: string) => (
                                                <SelectItem key={cpuName}>{cpuName}</SelectItem>
                                            ))}
                                        </Select>

                                        <br />
                                        <br />

                                        <Table isStriped>
                                            <TableHeader>
                                                <TableColumn>Spec</TableColumn>
                                                <TableColumn>Value</TableColumn>
                                            </TableHeader>
                                            <TableBody>
                                                {cpuTable}
                                                {ramTable}
                                                {storageTable}

                                                <TableRow>
                                                    <TableCell>Min power in (supported)</TableCell>
                                                    <TableCell>{fw16.minPower}W</TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell>Recomended power in (supported)</TableCell>
                                                    <TableCell>{fw16.recomendedPower}W</TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell>Max power in (supported)</TableCell>
                                                    <TableCell>{fw16.maxPower}W</TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell>Expansion slots</TableCell>
                                                    <TableCell>{fw16.expansionSlots}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </>
                                )
                            } else if (deviceOne == "desktop") {
                                const desktop: FrameworkDesktop = deviceOneSpecs;
                                const cpuOptions: string[] = Object.keys(desktop["builds"]);

                                if (!cpuOptions) {
                                    return <></>
                                }

                                const cpuTable = CpuTable(
                                    (deviceOnePackage !== "Max 385 - 32GB" && deviceOnePackage !== "Max+ 395 - 64GB" && deviceOnePackage !== "Max+ 395 - 128GB") 
                                    ? null : desktop.builds[deviceOnePackage]
                                );
                                const storageTable = StorageTable(desktop.storage);

                                return (
                                    <>
                                        <Select label="Select a CPU" onSelectionChange={deviceOnePackageUpdate}>
                                            {cpuOptions.map((cpuName: string) => (
                                                <SelectItem key={cpuName}>{cpuName}</SelectItem>
                                            ))}
                                        </Select>

                                        <br />
                                        <br />

                                        <Table isStriped>
                                            <TableHeader>
                                                <TableColumn>Spec</TableColumn>
                                                <TableColumn>Value</TableColumn>
                                            </TableHeader>
                                            <TableBody>
                                                {cpuTable}
                                                {storageTable}

                                                <TableRow>
                                                    <TableCell>Expansion slots</TableCell>
                                                    <TableCell>{desktop.expansionSlots}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </>
                                )
                            };

                            return (
                                <></>
                            );
                        };
                    })()}
                </div>

                <div className={`${styles.col2}`}>
                    <Select label="Select a device" onSelectionChange={(e) => deviceTwoSelect(e)}>
                        {deviceOptions.map((device: string) => (
                            <SelectItem key={device}>{device}</SelectItem>
                        ))}
                    </Select>

                    <br />
                    <br />

                    {(() => {
                        if (deviceTwo == "") {
                            return (<></>);
                        } else {
                            if (JSON.stringify(deviceTwoSpecs) == JSON.stringify({})) {
                                return <></>
                            };

                            if (deviceTwo == "framework12") {
                                const fw12: Framework12 = deviceTwoSpecs;
                                const cpuOptions: string[] = Object.keys(fw12["cpu"]);

                                if (!cpuOptions) {
                                    return <></>
                                }

                                const cpuTable = CpuTable((deviceTwoPackage !== "i3-1315U" && deviceTwoPackage !== "i5-1334U") ? null : fw12.cpu[deviceTwoPackage])
                                const ramTable = RamTable(fw12.ram);
                                const storageTable = StorageTable(fw12.storage);

                                return (
                                    <>
                                        <Select label="Select a CPU" onSelectionChange={deviceTwoPackageUpdate}>
                                            {cpuOptions.map((cpuName: string) => (
                                                <SelectItem key={cpuName}>{cpuName}</SelectItem>
                                            ))}
                                        </Select>

                                        <br />
                                        <br />

                                        <Table isStriped>
                                            <TableHeader>
                                                <TableColumn>Spec</TableColumn>
                                                <TableColumn>Value</TableColumn>
                                            </TableHeader>
                                            <TableBody>
                                                {cpuTable}
                                                {ramTable}
                                                {storageTable}

                                                <TableRow>
                                                    <TableCell>Battery</TableCell>
                                                    <TableCell>{fw12.power}Wh</TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell>Expansion slots</TableCell>
                                                    <TableCell>{fw12.expansionSlots}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </>
                                )
                            } else if (deviceTwo == "framework13") {
                                const fw13: Framework13 = deviceTwoSpecs;
                                const newIntel: string[] = Object.keys(fw13["new builds"]["cpu"]["intel"]);
                                const newAmd: string[] = Object.keys(fw13["new builds"]["cpu"]["amd"]);
                                const cpuOptions: string[] = newIntel.concat(newAmd.concat(Object.keys(fw13["old builds"]["amd"])));

                                if (!cpuOptions) {
                                    return <></>;
                                };

                                let cpuTable;

                                // Old package
                                if (deviceTwoPackage.includes("AMD Ryzen")) {
                                        cpuTable = CpuTable(
                                        (deviceTwoPackage !== "AMD Ryzen™ 5 7640U" && deviceTwoPackage !== "AMD Ryzen™ 5 7640U (2.8k Display)")
                                        ? null : fw13["old builds"].amd[deviceTwoPackage]
                                    );
                                } else if (deviceTwoPackage.includes("Ryzen")) {
                                    // New AMD
                                    cpuTable = CpuTable(
                                        (deviceTwoPackage !== "Ryzen™ AI 5 340" && deviceTwoPackage !== "Ryzen™ AI 7 350" && deviceTwoPackage !== "Ryzen™ AI 9 HX 370" )
                                        ? null : fw13["new builds"].cpu.amd[deviceTwoPackage]
                                    );
                                } else {
                                    // New Intel
                                    cpuTable = CpuTable(
                                        (deviceTwoPackage !== "Ultra 5 125H" && deviceTwoPackage !== "Ultra 7 155H" && deviceTwoPackage !== "Ultra 7 165H") 
                                        ? null : fw13["new builds"].cpu.intel[deviceTwoPackage]
                                    );
                                };

                                const ramTable = RamTable(fw13.ram);
                                const storageTable = StorageTable(fw13.storage);

                                return (
                                    <>
                                        <Select label="Select a CPU" onSelectionChange={deviceTwoPackageUpdate}>
                                            {cpuOptions.map((cpuName: string) => (
                                                <SelectItem key={cpuName}>{cpuName}</SelectItem>
                                            ))}
                                        </Select>

                                        <br />
                                        <br />

                                        <Table isStriped>
                                            <TableHeader>
                                                <TableColumn>Spec</TableColumn>
                                                <TableColumn>Value</TableColumn>
                                            </TableHeader>
                                            <TableBody>
                                                {cpuTable}
                                                {ramTable}
                                                {storageTable}

                                                <TableRow>
                                                    <TableCell>Power in</TableCell>
                                                    <TableCell>{fw13.power}W</TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell>Expansion slots</TableCell>
                                                    <TableCell>{fw13.expansionSlots}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </>
                                )
                            } else if (deviceTwo == "framework16") {
                                const fw16: Framework16 = deviceTwoSpecs;
                                const cpuOptions: string[] = Object.keys(fw16["cpu"]);

                                if (!cpuOptions) {
                                    return <></>;
                                };

                                const cpuTable = CpuTable(
                                    (deviceTwoPackage !== "Ryzen™ 7 7840HS" && deviceTwoPackage !== "Ryzen™ 9 7940HS" && deviceTwoPackage !== "Ryzen™ AI 7 350" && deviceTwoPackage !== "Ryzen™ AI 9 HX 370") 
                                    ? null : fw16.cpu[deviceTwoPackage]
                                );
                                const ramTable = RamTable(fw16.ram);
                                const storageTable = StorageTable(fw16.storage);

                                return (
                                    <>
                                        <Select label="Select a CPU" onSelectionChange={deviceTwoPackageUpdate}>
                                            {cpuOptions.map((cpuName: string) => (
                                                <SelectItem key={cpuName}>{cpuName}</SelectItem>
                                            ))}
                                        </Select>

                                        <br />
                                        <br />

                                        <Table isStriped>
                                            <TableHeader>
                                                <TableColumn>Spec</TableColumn>
                                                <TableColumn>Value</TableColumn>
                                            </TableHeader>
                                            <TableBody>
                                                {cpuTable}
                                                {ramTable}
                                                {storageTable}

                                                <TableRow>
                                                    <TableCell>Min power in (supported)</TableCell>
                                                    <TableCell>{fw16.minPower}W</TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell>Recomended power in (supported)</TableCell>
                                                    <TableCell>{fw16.recomendedPower}W</TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell>Max power in (supported)</TableCell>
                                                    <TableCell>{fw16.maxPower}W</TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell>Expansion slots</TableCell>
                                                    <TableCell>{fw16.expansionSlots}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </>
                                )
                            } else if (deviceTwo == "desktop") {
                                const desktop: FrameworkDesktop = deviceTwoSpecs;
                                const cpuOptions: string[] = Object.keys(desktop["builds"]);

                                if (!cpuOptions) {
                                    return <></>
                                }

                                const cpuTable = CpuTable(
                                    (deviceTwoPackage !== "Max 385 - 32GB" && deviceTwoPackage !== "Max+ 395 - 64GB" && deviceTwoPackage !== "Max+ 395 - 128GB") 
                                    ? null : desktop.builds[deviceTwoPackage]
                                );
                                const storageTable = StorageTable(desktop.storage);

                                return (
                                    <>
                                        <Select label="Select a CPU" onSelectionChange={deviceTwoPackageUpdate}>
                                            {cpuOptions.map((cpuName: string) => (
                                                <SelectItem key={cpuName}>{cpuName}</SelectItem>
                                            ))}
                                        </Select>

                                        <br />
                                        <br />

                                        <Table isStriped>
                                            <TableHeader>
                                                <TableColumn>Spec</TableColumn>
                                                <TableColumn>Value</TableColumn>
                                            </TableHeader>
                                            <TableBody>
                                                {cpuTable}
                                                {storageTable}

                                                <TableRow>
                                                    <TableCell>Expansion slots</TableCell>
                                                    <TableCell>{desktop.expansionSlots}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </>
                                )
                            };

                            return (
                                <></>
                            );
                        };
                    })()}
                </div>
            </div>
        </>
    );
};