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
  // function which prompts the user for what action they should take
function userInput() {
  inquirer
    .prompt({
      name: "itemPurchase",
      type: "list",
      message: "Which Item are you interested in purchasing?",
      choices: ["1", "2", "3","4","5","6","7","8","9","10"]
    },
    {
      name: "quanityPurchased",
      type: "input",
      message: "How many items do you want to purchase?",
      validate: function(input){
        if(isNaN(input) = false){
          return true;
        }
        else{
          return false;
        }
        
      }
    }).then(function(answer) {
      // based on their answer, which item are they looking to purchase
      if (answer.itemPurchase === "1") {
        purchaseItem();
      }
      else if(answer.itemPurchase === "2") {
        purchaseItem();
      } 
      else if(answer.itemPurchase === "3") {
        purchaseItem();
      } 
      else if(answer.itemPurchase === "4") {
        purchaseItem();
      } 
      else if(answer.itemPurchase === "5") {
        purchaseItem();
      } 
      else if(answer.itemPurchase === "6") {
        purchaseItem();
      } 
      else if(answer.itemPurchase === "7") {
        purchaseItem();
      } 
      else if(answer.itemPurchase === "8") {
        purchaseItem();
      } 
      else if(answer.itemPurchase === "9") {
        purchaseItem();
      } 
      else if(answer.itemPurchase === "10") {
        purchaseItem();
      } 
      else{
        connection.end();
      }
    });
}
function purchaseItem(){
  //Pass through the ID and Quananity Purchased 
}
    

