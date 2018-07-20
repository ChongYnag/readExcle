var xlsx = require("node-xlsx");
var fs = require('fs');
var list = xlsx.parse("h5List.xlsx");
var lists = list[0].data;
let privceName ="";
let cityName ="";
let privceList = [];
let cityList = [];
let cityListObj = {};
let jsons = [];
for (var i = 0;i<lists.length;i++) {
	privceName = lists[i][0];
	if(privceList.indexOf(privceName) == -1){
		privceList.push(privceName);
	}
}
for (var a = 0;a<privceList.length;a++) {
	var obj = {};
	for (var b = 0;b<lists.length;b++) {
		if(privceList[a] == lists[b][0]){
			cityName = lists[b][1];
			if(cityList.indexOf(cityName) == -1){
				cityList.push(cityName);
			}
		}
	}
	cityListObj = areaLiat(cityList,lists);
	obj.name = privceList[a];
	obj.cityList = cityListObj;
	jsons.push(obj);
	//数组清空哈哈
	cityList = [];
}
//console.log(privceList);
//console.log(cityList);
console.log(jsons);
//var listsss = JSON.stringify(jsons);
writeFile("cc.json",JSON.stringify(jsons));
//writeFile("cityObj.json",JSON.parse(obj));

function writeFile(fileName, data) {
	fs.writeFile(fileName, data, 'utf-8', complete);
	
	function complete(err) {
		if(!err) {
			console.log("文件生成成功");
		}
	}
}

function areaLiat(cityList,lists){
	let list = [];
	for (var d = 0; d < cityList.length; d++) {
		let areaList = [];
		let object = {};
		for (var e = 0; e < lists.length; e++) {
			if(cityList[d] == lists[e][1]){
				let objArea = {};
				objArea.name = lists[e][2];
				objArea.addres = lists[e][3];
				objArea.tel = lists[e][4];
				areaList.push(objArea);
//				console.log(objArea);
			}
		}
		object.name = cityList[d];
		object.areaList = areaList;
		
		list.push(object);
	}
//	console.log(list);
	return list
}
