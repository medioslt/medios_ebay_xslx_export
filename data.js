chrome.storage.sync.get({
    file_name: "",
    save_by_date: false
  }, function(items) {
var wb = XLSX.utils.book_new();
wb.Props = {
                Title: "eBay orders",
                Subject: "eBay orders",
                Author: "Medios.lt",
                CreatedDate: new Date()
        };
wb.SheetNames.push("Orders");	
var orders = [];	
for(var i = 1;i <= 30/*Number.MAX_SAFE_INTEGER*/;i++)
{
	var buyer = $(document).xpath("//*[@id="MyEbay"]/table["+i+"]/tbody/tr/td/table[2]/tbody/tr[2]/td/table/tbody/tr/td/table/tbody/tr/td").html();
	
	if(buyer == undefined)
		break;
	buyer = buyer.replace(/&nbsp;/gi,"").replace("<b>","").replace("</b>","").replace("\r\n","").replace(/\n/gi,"").replace("\r","").replace(/\t/gi,"").split("<br>");
	var orderNumber = $(document).xpath("//*[@id="MyEbay"]/table["+i+"]/tbody/tr/td/table[3]/tbody/tr[4]/td[5]").html();
	
	
	orderNumber = orderNumber.replace(/&nbsp;/gi,"").replace(/\n/gi,"").replace(/\t/gi,"");
	

	var totalQuantity = [];
	var orderData = {};
	
	
	orderData.orderNumber = orderNumber;
	orderData.buyerLine1 = buyer[0];
	orderData.buyerLine2 = buyer[1];
	orderData.buyerLine3 = buyer[2];
	orderData.buyerLine4 = buyer[3];
	orderData.buyerLine5 = buyer[4];
	orderData.buyerLine6 = buyer.length > 5 ? buyer[5] : "";
	orderData.productName = {};
	orderData.productPack = {};
	
	for(var j = 8;j <= 8000;j += 3)
	{
	 var quantity = $(document).xpath("//*[@id="MyEbay"]/table["+i+"]/tbody/tr/td/table[3]/tbody/tr["+j+"]/td[2]").html();
	 if(quantity == undefined)
		 break;	
	quantity = quantity.replace(/&nbsp;/gi,"").replace(/\n/gi,"");
	if(isNaN(quantity) == false)
		totalQuantity.push(quantity);
	 var productNumber = $(document).xpath("//*[@id="MyEbay"]/table["+i+"]/tbody/tr/td/table[3]/tbody/tr["+j+"]/td[4]").html();
	 if(productNumber == undefined)
		 break;
	 productNumber = productNumber.replace(/&nbsp;/gi,"").replace(/\n/gi,"");
	 
	 var productName = $(document).xpath("//*[@id="MyEbay"]/table["+i+"]/tbody/tr/td/table[3]/tbody/tr["+j+"]/td[6]/text()").text();
	 if(productName != undefined)
	 {
		 productName = productName.replace(/\n/gi,"").replace(/\t/gi,"");
	if(orderData.productName[parseInt(productNumber,10)])
	orderData.productName[parseInt(productNumber,10)].push([productName,parseInt(quantity,10)]);	
	else
	{
		orderData.productName[parseInt(productNumber,10)] = [];
		orderData.productName[parseInt(productNumber,10)].push([productName,parseInt(quantity,10)]);
	}
	 }
	
	var packName = $(document).xpath("//*[@id="MyEbay"]/table["+i+"]/tbody/tr/td/table[3]/tbody/tr["+j+"]/td[6]/div").html();
	
	if(packName != undefined)
	{
		packName = packName.replace(/\n/gi,"").replace(/\t/gi,"");
		packName = packName.replace(/&nbsp;/gi,"").replace(/\n/gi,"");
		if(orderData.productPack[parseInt(productNumber,10)])
		orderData.productPack[parseInt(productNumber,10)].push([packName,parseInt(quantity,10)]);
		else
		{
			orderData.productPack[parseInt(productNumber,10)] = [];
			orderData.productPack[parseInt(productNumber,10)].push([packName,parseInt(quantity,10)]);
		}
	}
	
	}
	var totalQtys = 0;
	if(totalQuantity)
	for(var z = 0;z < totalQuantity.length;z++)
	{
			totalQtys += parseInt(totalQuantity[z],10);
			
	}
	var totalCost = $(document).xpath("//*[@id="MyEbay"]/table["+i+"]/tbody/tr/td/table[3]/tbody/tr["+(17+(totalQuantity.length-1)*3)+"]/td[2]/b").html();
	if(totalCost != undefined)
	{
		totalCost = totalCost.replace(/&nbsp;/gi,"").replace(/\n/gi,"").replace(/\t/gi,"");
		var nTotal = "";
		for(var bx = 0;bx < totalCost.length;bx++)
		{
			if(isNaN(totalCost[bx]) == false || totalCost[bx] == "." || totalCost == ",")
				nTotal += totalCost[bx];
		}
		totalCost = nTotal;
	}
	orderData.totalQuantity = totalQtys;
	orderData.totalCost = totalCost;
	
	orderData.productsInfo = "";
	for(var key in orderData.productName)
	{
		if(orderData.productPack[key])
		{
			orderData.productsInfo += orderData.productName[key][0][0]+"\n";
			for(var zy = 0;zy < orderData.productPack[key].length;zy++)
			orderData.productsInfo += "["+orderData.productPack[key][zy][1]+"] " + orderData.productPack[key][zy][0]+"       ";
			
			
		}
		else
		{
			for(var zx = 0;zx < orderData.productName[key].length;zx++)
			orderData.productsInfo += "["+orderData.productName[key][zx][1]+"] " + orderData.productName[key][zx][0]+"\n";
		}
	}
	console.log(JSON.stringify(orderData));
	orders.push([orderData.orderNumber,orderData.buyerLine1,orderData.buyerLine2,orderData.buyerLine3,orderData.buyerLine4,orderData.buyerLine5,orderData.buyerLine6,orderData.totalQuantity,orderData.productsInfo,orderData.totalCost]);
	
	
	
	
	}
	var ws = XLSX.utils.aoa_to_sheet(orders);
	wb.Sheets["Orders"] = ws;
	if(items.save_by_date == false)
	XLSX.writeFile(wb,items.file_name+".xlsx");
	else
	{
		var current_datetime = new Date();
		var formatted_date =  current_datetime.getFullYear() + (current_datetime.getMonth() + 1) + current_datetime.getDate();

	XLSX.writeFile(wb,formatted_date+".xlsx");	
	}
});