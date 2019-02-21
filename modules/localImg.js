	var gsFiles = JSON.parse(localStorage.getItem("tran")) || {};
	var a = document.getElementById("acc");
	gsFilesDate = gsFiles.date;
	date = new Date();
	todaysDate = (date.getMonth() + 1).toString() + date.getDate().toString();
// 检查数据，如果不存在或者数据过期，则创建一个本地存储
if(typeof gsFilesDate === "undefined" || gsFilesDate < todaysDate) {
	// 图片加载完成后执行


	a.addEventListener("load", function() {
		var imgCanvas = document.createElement("canvas");
		imgContext = imgCanvas.getContext("2d");
		// 确保canvas尺寸和图片一致
		imgCanvas.width = a.width;
		imgCanvas.height = a.height;
		// 在canvas中绘制图片
		imgContext.drawImage(a, 0, 0, a.width, a.height);
		// 将图片保存为Data URI
		gsFiles.a = imgCanvas.toDataURL("bj.png");
		gsFiles.date = todaysDate;
		// 将JSON保存到本地存储中
		try {
			localStorage.setItem("gsFiles", JSON.stringify(gsFiles));
		} catch(e) {
			console.log("Storage failed: " + e);
		}
	}, false);
	// 设置图片
	a.setAttribute("src", "bj.png");
} else {
	// Use image from localStorage
	a.setAttribute("src", gsFiles.a);
}