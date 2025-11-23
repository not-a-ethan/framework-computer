"use client";

import { useState } from "react";

import { Select, SelectItem } from "@heroui/select";
import { addToast } from "@heroui/toast";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";

import { getAPI } from "@/helpers/getAPI";

import { CpuTable } from "./components/cpuTable";
import { RamTable } from "./components/ramTable";
import { StorageTable } from "./components/storage";

import { Framework12 } from "@/types";

import styles from "../../styles/compare.module.css";

export default function Compare() {
    const { device, deviceError, deviceLoading } = getAPI(`/api/getDevices`, ["device", "deviceError", "deviceLoading"]);
    
    const [deviceOne, setDeviceOne] = useState("");
    const [deviceTwo, setDeviceTwo] = useState("");

    const [deviceOneSpecs, setDeviceOneSpecs] = useState({});
    const [deviceTwoSpecs, setDeviceTwoSpecs] = useState({});

    const [deviceOnePackage, setDeviceOnePackage] = useState("");
    const [deviceTwoPackage, setDeviceTwoPackage] = useState("");

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
                            } else if (deviceOne == "13") {
                                
                            };
                            /*
                                Continue with all other Framework products
                            */
                        };

                        return (
                            <div>
                                <p>eitnhg</p>
                            </div>
                        )
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
                            } else if (deviceOne == "13") {
                                
                            };
                            /*
                                Continue with all other Framework products
                            */
                        };

                        return (
                            <div>
                                <p>eitnhg</p>
                            </div>
                        )
                    })()}
                </div>
            </div>
        </>
    );
};