export const getYearWiseBestAndWorstProdCropData = (data) => {
    let newData = {}; // this stores yearwise data for all crop in the form of key-values where key is year itself

    for (let i = 0; i < data.length; i++) {
        if (newData[data[i]["Year"]]) newData[data[i]["Year"]].data.push(data[i]); // pushing all the data in a list that share the same year
        else newData[data[i]["Year"]] = { data: [data[i]] };
    }

    let allCrops = Object.keys(newData);

    for (let i = 0; i < allCrops.length; i++) {   // iterating through each year
        let dataSet = newData[allCrops[i]].data;  // here we get the list(array) of the year-seperate data
        dataSet.sort((a, b) => (a["Crop Production (UOM:t(Tonnes))"] - b["Crop Production (UOM:t(Tonnes))"])); // sorting data accroding to crop production value
        let topProdCrops = []; // this will store all crops with max production value
        let bottomProdCrops = []; // this will store all crops with min production value
        for (let j = 0; j < dataSet.length; j++) {
            if (dataSet[0]["Crop Production (UOM:t(Tonnes))"] == dataSet[j]["Crop Production (UOM:t(Tonnes))"]) bottomProdCrops.push(dataSet[j]["Crop Name"]); // filling all the lowest production crop
            else break;
        }
        for (let j = dataSet.length - 1; j >= 0; j--) {
            if (dataSet[dataSet.length - 1]["Crop Production (UOM:t(Tonnes))"] == dataSet[j]["Crop Production (UOM:t(Tonnes))"]) topProdCrops.push(dataSet[j]["Crop Name"]); // filling all the highest production crop
            else break;
        }
        newData[allCrops[i]].topProdCrops = topProdCrops;
        newData[allCrops[i]].bottomProdCrops = bottomProdCrops;
    }
    return newData; // returns calculated data
}

export const getCropWiseYieldData = (data) => {
    let newData = {}; // this stores the crop wise data for all the years in the form of key-values where key is crop itself
    for (let i = 0; i < data.length; i++) {
        if (newData[data[i]["Crop Name"]]) newData[data[i]["Crop Name"]].data.push(data[i]);  // pushing all the data in a list that share the same crop
        else newData[data[i]["Crop Name"]] = { data: [data[i]] };
    }
    let allCrops = Object.keys(newData);
    for (let i = 0; i < allCrops.length; i++) { // iterating through each crop
        let dataSet = newData[allCrops[i]].data;
        let totalArea = 0;
        let totalYield = 0;
        for (let j = 0; j < dataSet.length; j++) {
            totalArea += dataSet[i]["Area Under Cultivation (UOM:Ha(Hectares))"];
            totalYield += dataSet[i]["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"];
        }
        // getting average value with the formula of->  (sum of all values)/ (total number of values) 
        newData[allCrops[i]].averageArea = (totalArea / dataSet.length).toFixed(3);
        newData[allCrops[i]].averageYield = (totalYield / dataSet.length).toFixed(3);
    }
    return newData; // returns calculated data
}