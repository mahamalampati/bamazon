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
      var chosenItem = parseInt(answer.question1); 
      var chosenQuantity = parseInt(answer.question2);
      var total;
      var remainingStock;
    console.log(chosenItem);
    console.log(chosenQuantity);

    
    var query = "SELECT price, stock_quantity FROM products WHERE ?";;

    connection.query(query, { item_id: chosenItem }, function( err, res) {
        
      if (chosenQuantity > res[0].stock_quantity){

        console.log("SORRY WE ARE OUT OF STOCK"); 
        return showItems();
      }

        console.log("ORDER PLACED SUCCESSFULLY");
        remainingStock = res[0].stock_quantity - chosenQuantity;
        total = chosenQuantity*res[0].price
        console.log("TOTAL PRICE IS :" + total);
      
      var query3 = "UPDATE products SET ? WHERE ? ";
      var placeholdersData = [
        { stock_quantity: remainingStock },
        { item_id: chosenItem },
      ]
      connection.query(query3, placeholdersData, function(err) {
           if (err) {
                console.log(err.message);
                process.exit(1);
           }
   
           
           return showItems();
   
        
       }); 
    });
    });
  }
