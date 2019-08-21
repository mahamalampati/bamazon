# bamazon

* This app basically takes the order from the customer and places the order if there is sufficient stock in the inventory.

* If there is not sufficient stock in the inventory it displays that the item is      out of stock.

* I have done the following steps to create the app

* I have created a MySQL Database called bamazon_db.

* I made a Table inside of that database called products.

* The products table includes each of the following columns:

item_id (unique id for each product)

product_name (Name of product)

department_name

price (cost to customer)

stock_quantity (how much of the product is available in stores)

* This database contains 10 different products.

* Also I created a Node application called bamazoncustomer.js. Running this           application will first display all of the items available for sale. Include the     ids, names, and prices of products for sale.

* The app will then prompt customers with two messages.

* The first message would ask them the ID of the product they would like to buy.

* The second message wouls ask how many units of the product they would like to buy.

* Once the customer has placed the order, the app will check if the store has         enough of the product to meet the customer's request.

* If not, the app logs a phrase like SORRY WE ARE OUT OF STOCK!, and then prevents    the order from going through.

* However, if the store does have enough of the product, it fulfills the customer's   order.

* This means the SQL database updates to reflect the remaining quantity.
  
* Once the update goes through, it shows the customer the total cost of their         purchase.
