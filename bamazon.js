//Installed the necessary npm packages
var mysql = require ('mysql');
var inquirer = require ('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "ohiostate1",
    database: "bamazon"
  });
 
  // connect to the mysql server and sql database
connection.connect(function(err) {
    if (err){
        console.log(err);

        return;
    }
    console.log("connected as ID: " + connection.threadId);   
    console.log("=============================");
    console.log("Welcome to Bamazon!");
    console.log("Online shopping for all of your electronic needs!")
    console.log("Here is what we currently offer!");
    console.log("=============================");
   getProducts(); 
   userInput();
   
});
//Retriving data from MYSQL

  function getProducts() {
    connection.query("SELECT * FROM products", function(err, results, fields)
    {
        if (err){
            console.log(err);
            return;
        }
        console.log(results)
        connection.end();
    }
    
    )
    
};



  
