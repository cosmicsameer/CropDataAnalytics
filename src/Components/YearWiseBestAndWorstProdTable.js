import { useEffect, useState } from 'react';
import { Table } from '@mantine/core';
import { getYearWiseBestAndWorstProdCropData } from '../Utility/AnalyticsModule';
export default function YearWiseBestAndWorstProdTable({ data }) {

    const [cropData, setCropData] = useState({});

    useEffect(() => {
        setCropData(getYearWiseBestAndWorstProdCropData(data)); // gets table display data from analytic function 
    }, [])

    const headings = [
        "Year",
        "Crop with Maximum Production in that Year",
        "Crop with Minimum Production in that Year",
    ]

    const rows = Object.keys(cropData)?.map((element, ind) => (
        <Table.Tr key={ind}>
            <Table.Td style={styles.padding10}>{element}</Table.Td>
            <Table.Td style={styles.padding10}>{ // since the crop which can have max production can be more than one, i.e the max production crops can have same values, we print them all   
                cropData[element].topProdCrops.map((data, index) => ((data + (index === cropData[element].topProdCrops.length - 1 ? "" : ",  "))))
            }</Table.Td>
            <Table.Td style={styles.padding10}>{ // since the crop which can have minimum production can be more than one, i.e the minimum production crops can have same values, we print them all
                cropData[element].bottomProdCrops.map((data, index) => ((data + (index === cropData[element].bottomProdCrops.length - 1 ? "" : ",  "))))
            }</Table.Td>
        </Table.Tr>
    ));

    return (
        <div style={styles.margin40}>
            <div style={styles.tableHeading}>{"Table:  Year Wise Best And Worst Production Crops"}</div>
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