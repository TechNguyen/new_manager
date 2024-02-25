import excelToJson from "convert-excel-to-json"
class Common {
    importExceltoMongo(filePath, sheetName = "Sheet1") {
        const excelData = excelToJson({
            sourceFile: filePath,
            sheets: [{
                name: sheetName,
                header: {
                    rows: 1
                },
                columnToKey: {
                    A: 'productName'
                }
            }]
        })
        return excelData;
    }

    responStatus(message,data,status) {
        return {
            msg: message,
            data: data,
            status: status
        }
    }

}


export default Common