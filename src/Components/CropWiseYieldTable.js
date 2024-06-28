import { useEffect, useState } from 'react';
import { Table, colorsTuple } from '@mantine/core';
import { getCropWiseYieldData } from '../Utility/AnalyticsModule';
export default function CropWiseYieldTable({ data }) {
    const [cropData, setCropData] = useState({});

    useEffect(() => {
        setCropData(getCropWiseYieldData(data)); // gets table display data from analytic function 
    }, [])
    const headings = [
        "Crop",
        "Average Yield of the Crop between 1950-2020 (UOM:Kg/Ha(KilogramperHectare))",
        "Average Cultivation Area of the Crop between 1950-2020 (UOM:Ha(Hectares))"
    ]
    const rows = Object.keys(cropData)?.map((element, ind) => (
        <Table.Tr key={ind}>
            <Table.Td style={styles.padding10}>{element}</Table.Td>
            <Table.Td style={styles.padding10}>{cropData[element].averageYield}</Table.Td>
            <Table.Td style={styles.padding10}>{cropData[element].averageArea}</Table.Td>
        </Table.Tr>
    ));
    return (
        <div style={styles.margin40}>
            <div style={styles.tableHeading}>{"Table:  Average Yield For Each Crop"} </div>
            <Table
                striped={true}
                border={2}
                withTableBorder
                width={"70%"}
                align='center'
            >
                <Table.Thead>
                    <Table.Tr>
                        {headings.map((heading) => (<Table.Th style={styles.padding10}>{heading}</Table.Th>))}
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </div>
    );
}


const styles = {
    tableHeading: {
        marginTop: 100,
        marginRight: 120,
        marginBottom: 30,
        color: "red",
        fontSize: 20,
    },
    margin40: { margin: 40 },
    padding10: { padding: 10 },
}