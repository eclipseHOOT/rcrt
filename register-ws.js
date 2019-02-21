//if(navigator.serviceWorker){
//	navigator.serviceWorker.register('sw.js').then(registration =>{
//	    console.log('congrats. scope is: ',registration.scope);
//	}).catch(error =>{
//	    console.log('sorry',error);
//	});
//}
if (navigator.serviceWorker) {
    navigator.serviceWorker.getRegistrations().then(function (regs) {
        for (var reg of regs) {
            if (reg.scope === 'http://localhost:3000') {
                reg.unregister();
            }
        }
        // 注销掉污染 Service Worker 之后再重新注册自己作用域的 Service Worker
        navigator.serviceWorker.register('/sw.js?v=0.01', {scope: '/'}).then(function (reg) {
            // ...
        });
    });
}

if (navigator.serviceWorker) {
    navigator.serviceWorker.addEventListener('message', function (e) {
        if (e.data === 'sw.update') {
        	console.log(1);
            // 如果代码走到了在这里，就知道了，Service Worker 已经更新完成了
            // 可以做点什么事情让用户体验更好
        }
    });
}