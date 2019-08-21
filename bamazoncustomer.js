var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Rajesh@82",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  showItems();
 
  
});
function showItems(){
  var query = "SELECT * FROM products";
  connection.query(query, function(err, res) {
  if (err) throw err;
 for (var i = 0; i < res.length; i++) {
 console.log("ID:"+ res[i].item_id + " || ITEM: " + res[i].product_name + " ||PRICE : $" + res[i].price  );
 }
 promptQuestions();
  });
  
}

function promptQuestions(){
  inquirer
  .prompt([
   { name: "question1",
    type: "input",
    message: "What is the ID of the item you would like to buy?"},
    {
      name: "question2",
      type: "input",
      message: "How many Units of the item you would like to buy?"
    }
    ])
    .then(function(answer) {
      var chosenItem = answer.question1;
      var chosenQuantity = answer.question2;
      var total;
      var remainingStock;
    console.log(chosenItem);
    console.log(chosenQuantity);

    // I am not able to compare using greater than and less than in here
    var query = "SELECT stock_quantity FROM products WHERE ?";

    connection.query(query, { item_id: chosenItem }, function( res) {
      
     if (chosenQuantity > res){

      console.log("INSUFFICIENT QUANTITY");
     }
     
     else if (chosenQuantity < res){
     
      console.log("ORDER PLACED SUCCESSFULLY");

      remainingStock= res - chosenQuantity;
      console.log("TOTAL PRICE IS :" + total);

     } 
     
     
      });


    // here the multiplication is giving the nan value  
    var query2 = "SELECT price FROM products WHERE ?";
    

    connection.query(query2,{item_id: chosenItem},function(err,res){

      if (err) throw error

      else 
      total = chosenQuantity*res
      

    });
     // bcoz of the above not able to update the stock quantity
    var query3 = "UPDATE products SET ? ";

    connection.query(query3,{stock_quantity: remainingStock});
    
 
     
    });

  }
     
      
    

    

  
