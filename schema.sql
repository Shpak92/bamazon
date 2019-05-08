DROP database IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

Create TABLE products
(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department VARCHAR(45) NULL,
  price decimal(10,2),
  remaining_in_stock INTEGER,
  PRIMARY KEY (id),
);