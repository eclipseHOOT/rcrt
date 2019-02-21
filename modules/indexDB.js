function openDB(name, callback) {
            //建立打开indexdb  indexedDB.open
            var request = window.indexedDB.open(name)
            request.onerror = function(e) {
                console.log('on indexedDB error')
            }
            request.onsuccess = function(e) {
                    myDB.db = e.target.result
                    callback && callback()
                }
                //from no database to first version,first version to second version...
            request.onupgradeneeded = function() {
                console.log('created')
                var store = request.result.createObjectStore('books', {
                    keyPath: 'isbn'
                })
                console.log(store)
                var titleIndex = store.createIndex('by_title', 'title', {
                    unique: true
                })
                var authorIndex = store.createIndex('by_author', 'author')

                store.put({
                    title: 'quarry memories',
                    author: 'fred',
                    isbn: 123456
                })
                store.put({
                    title: 'dafd memories',
                    author: 'frdfaded',
                    isbn: 12345
                })
                store.put({
                    title: 'dafd medafdadmories',
                    author: 'frdfdsafdafded',
                    isbn: 12345434
                })
            }
}

var myDB = {
    name: 'tesDB',
    version: '2.0.1',
    db: null
}

function addData(db, storeName) {

}

openDB(myDB.name, function() {
    // myDB.db = e.target.result
    // window.indexedDB.deleteDatabase(myDB.name)
});

//删除indexedDB