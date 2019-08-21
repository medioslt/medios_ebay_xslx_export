# Medios eBay XLSX export

Exports invoice slip data into excel file.

The following data is exported:
* Order number
* Name
* Address line 1
* Address line 2
* County
* Post Code
* Country
* Invoice slip products
* Total quantity
* Total price

Dependencies
- jQuery
- jQuery.xpath
- Sheetjs

How to run
1. Download the chrome plugin as zip file and extract it to the folder of your choice
1. Turn on developer mode for chrome extensions
2. Choose Load Unpacked in chrome extensions tab
3. Select the folder where you extracted the plugin
4. Press Details in the plugin
5. Choose options and write the name of your excel file or check the Save by Date if you want to save in YYYYMMDD.xlsx format
6. Save your options
7. Change plugin permissions to only run on click
8. Open the Print invoice page on eBay
9. Click the plugin icon
10. It will take a while (~20 seconds / invoice slip) to get all the data from the invoice
11. After the code finishes running the plugin will automatically save the excel file into the chrome's Downloads location

How to improve/modify
* The main plugin file is medios_getinvoicedata.js and you should modify it to improve performance or do other changes
