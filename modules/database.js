var db = openDatabase('fooDB', '1.0', 'fooDB', 2 * 1024); 
db.transaction(function (tx) { 
 tx.executeSql('CREATE TABLE IF NOT EXISTS foo (id unique, text)');  
 tx.executeSql('INSERT INTO foo (id, text) VALUES (2, "hahahahsdas")'); 
});