//Installed the necessary npm packages
var mysql = require ('mysql');
var inquirer = require ('inquirer');
var Table = require('cli-table2');

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
    //Starting message board to Start the Store
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
    }
    )
};
//Asking the user if they want to continue shopping variable
let continueShopping = function(){
  inquirer
    .prompt({
      name: "continue",
      type: "list",
      message: "Would you like to continue Shopping",
      choices: ["Yes","NO"]
    }).then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.continue === "Yes") {
        userInput();
      }
      else{
        console.log("Thank you for shopping! Come Back!")
        connection.end();
      }
    });
 
}
// function which prompts the user for what action they should take
let userInput = function () {
  //Asking what Item to be purchased
  inquirer
    .prompt({
      name: "itemPurchase",
      type: "input",
      message: "Please enter a ID?",
    }).then(function(answer1){
      //Creating a variable for what item is chosen
      let idChoice = answer1.itemPurchase;
      //pulling the ID from MySQL
      connection.query("SELECT * FROM products WHERE id=?", idChoice, function(
        err,
        res
      ) {
        //If an ID doesn't exist
        if (err) throw err;
        if (res.length === 0) {
          console.log(
            "Enter an valid ID"
          );
          //Restart the Store
          userInput();
      //How many Items does the user want to purchase
        } else{
      inquirer.prompt({
      //Creating a question to ask the user on how many Items they want purchased 
      name: "quanityPurchased",
      type: "input",
      message: "How many items do you want to purchase?",
        }).then(function(answer2){
         //Creating a quantity variable
          let quantity = answer2.quanityPurchased;
         
          //Accepting the user if there is enough in stock
          if (quantity < res[0].remaining_in_stock) {
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  remaining_in_stock: res[0].remaining_in_stock - quantity
                },
                {
                  id: idChoice
                },
              ],
              function(error){
                if (error) throw err;
                console.log("You have succesfully purchased your Item!");
                console.log("You have purchased ID # " +idChoice);
                console.log("With a quanity of: " +quantity);

                continueShopping(); 
              }
            );
          }
          else {
            console.log("We dont have enough in stock!");
            console.log("Try Again!");
            userInput();
          }
          });
      }
     })
    });
  };
    