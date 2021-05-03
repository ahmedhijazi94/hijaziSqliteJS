
    //code by Ahmed Hijazi - ahmedhijazi94@gmail.com
    //-------------------------------------------------------------------------------//
    //										DATABASE
    //-------------------------------------------------------------------------------//
    var dataBaseName = "Workup";
    var dataBaseVersion = "1.0";
    var dataBaseDescription = "workup db";
    var dataBaseSize = 5; //GB
    //---------------------------------------------------------------//
    var db = openDatabase(dataBaseName, dataBaseVersion, dataBaseDescription, dataBaseSize * 1024 * 1024);
    //-------------------------------------------------------------------------------//
    //										/DATABASE
    //-------------------------------------------------------------------------------//





    //-------------------------------------------------------------------------------//
    //										CREATE TABLE
    //-------------------------------------------------------------------------------//
    function createTable(tables) {
      //---------------------------------------------------------------//
      function executeSql(sql) {
        db.transaction(function (tx) {
          tx.executeSql(sql, [], function (tx, results) {
            //console.log(results)
          });
        });
      }

      for (var table in tables) {
        var fields = Object.keys(tables[table].fields);
        var values = Object.values(tables[table].fields);
        var entries = "";
        for (var field in fields) {
          entries = entries + "" + fields[field] + " " + values[field] + ", ";
        }
        entries = entries.slice(0, -2);
        var sql = "CREATE TABLE IF NOT EXISTS " + table + " (id INTEGER PRIMARY KEY, " + entries + ", createdAt TEXT, updatedAt TEXT)";
        executeSql(sql);
      };
    }
    //-------------------------------------------------------------------------------//
    //										/CREATE TABLE
    //-------------------------------------------------------------------------------//




    //-------------------------------------------------------------------------------//
    //										DROP TABLE
    //-------------------------------------------------------------------------------//
    function dropTable(table) {
      //---------------------------------------------------------------//
      var sql = "DROP TABLE " + table
      //---------------------------------------------------------------//
      db.transaction(function (tx) {
        tx.executeSql("" + sql + "", [], function (tx, results) {
          //callback
          //console.log(results);
        });
      });
    }
    //-------------------------------------------------------------------------------//
    //										/DROP TABLE
    //-------------------------------------------------------------------------------//





    //-------------------------------------------------------------------------------//
    //										CREATE
    //-------------------------------------------------------------------------------//
    function insertDB(table, entries, callbackFunction) {
      var now = new Date().toLocaleString();
      //---------------------------------------------------------------//
      var qtdFields = Object.keys(entries).length;
      var values = "";
      var fields = "";
      for (i = 0; i < qtdFields; i++) {
        fields = fields + Object.keys(entries)[i] + ", ";
        values = values + "'" + Object.values(entries)[i] + "', ";
      }
      fields = fields.slice(0, -2);
      values = values.slice(0, -2);
      var sql = "INSERT INTO " + table + " (" + fields + ", createdAt, updatedAt) VALUES (" + values + ", '" + now + "', '" + now + "')";
      //---------------------------------------------------------------//
      db.transaction(function (tx) {
        tx.executeSql("" + sql + "", [], function (tx, results) {
          //callback
          if (callbackFunction) {
            callbackFunction(results);
          } else {
            console.log(results);
          }
        });
      });
    }
    //-------------------------------------------------------------------------------//
    //										/CREATE
    //-------------------------------------------------------------------------------//



    //-------------------------------------------------------------------------------//
    //										READ
    //-------------------------------------------------------------------------------//
    function readDB(table, condition, relations, callbackFunction) {
      //---------------------------------------------------------------//
      var sql;
      var relationSql = '';
      var relations = relations.include;

      //get relations tables
      for (relation in relations) {
        var relation = relations[relation];
        relationSql += " INNER JOIN " + relation + " ON " + table + ".id = " + relation + "." + table + "id"
      }

      if (condition && relations) {
        sql = "SELECT * FROM " + table + " " + relationSql + " WHERE " + table + "." + condition;
      } else if (relations) {
        sql = "SELECT * FROM " + table + " " + relationSql + "";
      } else if (condition) {
        sql = "SELECT * FROM " + table + " WHERE " + condition;
      } else {
        sql = "SELECT * FROM " + table;
      }

      //---------------------------------------------------------------//
      db.transaction(function (tx) {
        tx.executeSql("" + sql + "", [], function (tx, results) {
          //callback
          var rows = results.rows;
          callbackFunction(rows);
        });
      });
    }
    //-------------------------------------------------------------------------------//
    //										/READ
    //-------------------------------------------------------------------------------//




    //-------------------------------------------------------------------------------//
    //										UPDATE
    //-------------------------------------------------------------------------------//
    function updateDB(table, entries, condition) {
      var now = new Date().toLocaleString();
      //---------------------------------------------------------------//
      var qtdFields = Object.keys(entries).length;
      var fields = "";
      for (i = 0; i < qtdFields; i++) {
        fields = fields + Object.keys(entries)[i] + " = '" + Object.values(entries)[i] + "', ";
      }
      fields = fields.slice(0, -2);
      var sql;
      if (condition) {
        var sql = "UPDATE " + table + " SET " + fields + ",updatedAt = '" + now + "' WHERE " + condition;
      } else {
        console.log('condition pendente.');
        sql = false;
      }
      //---------------------------------------------------------------//
      if (sql) {
        db.transaction(function (tx) {
          tx.executeSql("" + sql + "", [], function (tx, results) {
            //callback
            console.log(results);
          });
        });
      }
    }
    //-------------------------------------------------------------------------------//
    //										/UPDATE
    //-------------------------------------------------------------------------------//




    //-------------------------------------------------------------------------------//
    //										DELETE
    //-------------------------------------------------------------------------------//
    function deleteDB(table, condition) {
      //---------------------------------------------------------------//
      var sql;
      if (condition) {
        sql = "DELETE FROM " + table + " WHERE " + condition;
      } else {
        sql = sql = "DELETE FROM " + table
      }
      //---------------------------------------------------------------//
      db.transaction(function (tx) {
        tx.executeSql("" + sql + "", [], function (tx, results) {
          //callback
          console.log(results);
        });
      });
    }
    //-------------------------------------------------------------------------------//
    //										/DELETE
    //-------------------------------------------------------------------------------//




    //-------------------------------------------------------------------------------//
    //										COUNT
    //-------------------------------------------------------------------------------//
    function countDB(table, condition, callbackFunction) {
      function returnCount(data) {
        return data;
      }
      //---------------------------------------------------------------//
      var sql;
      if (condition) {
        sql = "SELECT COUNT(*) FROM " + table + " WHERE " + condition;
      } else {
        sql = "SELECT COUNT(*) FROM " + table;
      }
      //---------------------------------------------------------------//
      db.transaction(function (tx) {
        tx.executeSql("" + sql + "", [], function (tx, results) {
          //callback
          var count = results.rows[0]['COUNT(*)'];
          callbackFunction(count);
        });
      });
    }
    //-------------------------------------------------------------------------------//
    //										/COUNT
    //-------------------------------------------------------------------------------//
