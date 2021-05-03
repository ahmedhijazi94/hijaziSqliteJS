# HijaziSqlite

A simple framework to use web sqlite

# Instalation

Import the file into your project.
```html
<script type="text/javascript" src="path/to/hijaziSqlite.js"></script>
```

# Usage

### Data Base configuration
Open "HijaziSqlite.js"
```js
var dataBaseName 	= "myDataBase";
var dataBaseVersion 	= "1.0";
var dataBaseDescription = "my description";
var dataBaseSize 	= 2; //GB
```

Thats all! 

# Creating SQL tables
After importing the file "hijaziSqlite.js" into your project create an object with the table fields then call the function createTable(var)
```js
var tables = {
	userTable :{
		fields: {
			name: "TEXT"
		}
	},
	roleTable: {
		fields: {
			userTableid: "INTEGER",
			role: "TEXT"
		}
	},
	tokenTable: {
		fields: {
			userTableid: "INTEGER",
			token: "TEXT"
		}
	},
}

createTable(tables);
```
THAT EASY!
OBS: ID IS CREATED BACKSIDE, NO NEED TO WRITE IT ON THE FIELDS.

For table drop, just call the dropTable() function

```js
 var table = "userTable";
 dropTable(table)
```

# CRUD functions

## Create
In order to insert a row in the table, set the values into an object, then call the function insertDB(tableName, entries)

OBS: the object keys should be the same as the table entries.
```js
var user = {
	name: "Ahmed",
	age: 24,
	email: "ahmedhijazi94@gmail.com"
}

insertDB("userTable", user);
```
You also can get the inserted ID as a callback. Just pass a new param in the insert function, then create a new function with the same name of the param you passed to store the callback data. Like this:

```js
var user = {
	name: "Ahmed",
	age: 24,
	email: "ahmedhijazi94@gmail.com"
}

insertDB("userTable", user, callbackFunction);

function callbackFunction(data){
   var insertedId = data.insertId;
   console.log(insertedId);
}
```
The insertedId var will return the insertedID.

## Read
In order to read the table rows, you have to call the function readDB(). It has 4 params: tableName, conditions, relations, callbackFunction.

NOTE:
	in order to get relations from other the foreign key must be named as 'parentTable+id'. for example: if you want to get the user´s role, then in roleTable the foreign key must be userid (parentTableName+id). Table creation must be like this:
	
```js
var tables = {
	user :{
		fields: {
			name: "TEXT"
		}
	},
	role: {
		fields: {
			userid: "INTEGER",
			role: "TEXT"
		}
	},
	token: {
		fields: {
			userid: "INTEGER",
			token: "TEXT"
		}
	},
}

createTable(tables);
```

THEN YOU CALL

```js
readDB("userTable", "id = 1", {include: ['role', 'token']}, getResults);

function getResults(data){
	console.log(data);
}
```

## Update
To update a row, just set into an object the changes you want, then call the function updateDB(). The function has 3 params: tableName, object, condition. Ex:

```js
var user = {
    name: "Ahmed Hijazi",
    age: 25
}

updateDB('tableName1', user, 'id = 2');
```

## Delete
The delete method is the easiets one. Just call the deleteDB(). It has 2 params: tableName and condition.

OBS: IF CONDITION IS EMPTY, THE FUNCTION WILL DELETE ALL THE ROWS OF THE TABLE

```js
deleteDB('tableName1', "id = 2");
```

## Bonus: Count
You can count the rows of a table by calling the function countDB. It has 3 params: tableName, condition and callbackFunction. Ex:

```js
countDB("tableName1", "age=24", countUsers);

function countUsers(data){
	console.log(data);
}
```

Bom uso ;)

## License
Todos os direitos reservados - Ahmed Hijazi
