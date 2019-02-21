var CACHE_NAME = "new_cache";
   var urlsToCache = [
    'tranMarket.html',
    'css/common.css',
    'img/tranIcon1.png',
    'img/tranIcon2.png',
    'img/tranIcon3.png',
    'img/tranIcon4.png'
   ];
//这里的self代表ServiceWorkerGlobalScope
self.addEventListener('install', function(event) {
//这里的waitUtil会在安装成功之前执行一些预装的操作，但是只建议做一些轻量级和非常重要资源的缓存，减少安装失败的概率。安装成功
//后ServiceWorker状态会从installing变为installed 
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('Opendhe : ',cache);
            return cache.addAll(urlsToCache);
        }).catch(err=>{
        	console.log(err);
        })
    )
});


self.addEventListener('activate', function (event) {
    var cacheName = 'a_cache_name';
    event.waitUntil(
        caches.open(cacheName)
            .then(function (cache) {
                // 进行老缓存的清除...(略过..)
            })
            .then(function () {
                // 完成缓存删除之后就可以通知浏览器主线程啦
                // 当然这里也可以判断如果缓存内本来就没内容
                // 就代表是首次安装，就不要发 message了 (这个逻辑略过...)
                return self.clients.matchAll()
                    .then(function (clients) {
                        if (clients && clients.length) {
                            clients.forEach(function (client) {
                                // 给每个已经打开的标签都 postMessage
                                client.postMessage('sw.update');
                            })
                        }
                    })
            })
    );
})