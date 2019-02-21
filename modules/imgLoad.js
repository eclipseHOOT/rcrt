//Element.getBoundingClientRect()
//top: 元素上边框距离视窗顶部的距离
//bottom: 元素下边框距离视窗顶部的距离
//left: 元素左边框距离视窗左侧的距离
//right: 元素右边框距离视窗左侧的距离
//HTMLElement.offsetTop 为只读属性，它返回当前元素相对于其 offsetParent 元素的顶部的距离。
var viewHeight =document.documentElement.clientHeight//获取可视区高度
console.log(viewHeight);
function lazyload(){
	var eles=document.querySelectorAll('img[data-original][lazyload]');

//完整写法Array.prototype
//[].forEach.call()是一种快速的方法访问forEach，并将空数组的this变换成想要遍历的list。
	[].forEach.call(eles,function(item,index){
		var rect
		if(item.dataset.original==="")//item.dataset.original是H5的新data-XXXAPI接口
		return
	    rect=item.getBoundingClientRect()// 用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置
	    console.log(rect);
		if(rect.bottom>=0 && rect.top < viewHeight){
		    !function(){
			    //var img=new Image()跟创建一个方法没什么区别，比如var b = new Function();比如var dom = document.createElement('div');
				var img=new Image()
				img.src=item.dataset.original
				img.onload=function(){
				    item.src=img.src
				}
				item.removeAttribute("data-original");//移除属性，下次不再遍历
				item.removeAttribute("lazyload");
		   }()
		}
	})
}
//刚开始还没滚动屏幕时，要先触发一次函数，初始化首页的页面图片
lazyload();
document.addEventListener("scroll",lazyload);
