-- 1 creacion de base de datos

CREATE SCHEMA `fullshape_db` ;


-- 2 creación de tabla productStatus

CREATE TABLE `fullshape_db`.`productStatus` (
  `statusId` INT NOT NULL AUTO_INCREMENT,
  `statusName` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`statusId`));


-- 3 creación de tabla ProductCategories

CREATE TABLE `fullshape_db`.`productCategories` (
  `categoryId` INT NOT NULL AUTO_INCREMENT,
  `categoryName` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`categoryId`));


-- 4 creación de tabla ProductColors

CREATE TABLE `fullshape_db`.`productColors` (
  `colorId` INT NOT NULL AUTO_INCREMENT,
  `colorName` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`colorId`));


-- 5 creación de tabla ProductSizes

CREATE TABLE `fullshape_db`.`productSizes` (
  `sizeId` INT NOT NULL AUTO_INCREMENT,
  `sizeName` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`sizeId`));


-- 6 creacion tabla usuarios

CREATE TABLE `fullshape_db`.`users` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `userEmail` VARCHAR(100) NOT NULL,
  `userImage` TEXT,
  `userNames` VARCHAR(50) NOT NULL,
  `userLastNames` VARCHAR(50) NOT NULL,
  `userPassword` TEXT NOT NULL,
  `userPhone` VARCHAR(25) NOT NULL,
  `userReceiveOffersAndNews` TINYINT,
  `userType` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`userId`));


-- 7 creación tabla productos

CREATE TABLE `fullshape_db`.`products` (
  `productId` INT NOT NULL AUTO_INCREMENT,
  `productName` VARCHAR(100) NOT NULL,
  `productDescription` TEXT NOT NULL,
  `productStatusId` INT,
  `productCategoryId` INT,
  `productColorId` INT,
  `productSizeId` INT,
  `productCode` VARCHAR(50),
  `productUnitPrice` DECIMAL(10,2) NOT NULL,
  `productMainImage` TEXT,
  PRIMARY KEY (`productId`),
  INDEX `statusId_idx` (`productStatusId` ASC) ,
  INDEX `categoryId_idx` (`productCategoryId` ASC) ,
  INDEX `colorId_idx` (`productColorId` ASC) ,
  INDEX `sizeId_idx` (`productSizeId` ASC) ,
  CONSTRAINT `statusId`
    FOREIGN KEY (`productStatusId`)
    REFERENCES `fullshape_db`.`productStatus` (`statusId`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION,
  CONSTRAINT `categoryId`
    FOREIGN KEY (`productCategoryId`)
    REFERENCES `fullshape_db`.`productCategories` (`categoryId`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION,
  CONSTRAINT `colorid`
    FOREIGN KEY (`productColorId`)
    REFERENCES `fullshape_db`.`productColors` (`colorid`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION,
  CONSTRAINT `sizeId`
    FOREIGN KEY (`productSizeId`)
    REFERENCES `fullshape_db`.`productSizes` (`sizeId`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION);


-- 8 creación de tabla ShoppingCart

CREATE TABLE `fullshape_db`.`shoppingCart` (
  `shoppingCartId` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `CartNumberOfItems` INT NOT NULL,
  `CartTotalPrice` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`shoppingCartId`),
  INDEX `userId_idx` (`userId` ASC) ,
  CONSTRAINT `userId`
    FOREIGN KEY (`userId`)
    REFERENCES `fullshape_db`.`users` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- 9 creación de tabla ProductCart

CREATE TABLE `fullshape_db`.`productCart` (
  `productCartId` INT NOT NULL AUTO_INCREMENT,
  `productId` INT NOT NULL,
  `shoppingCartId` INT NOT NULL,
  PRIMARY KEY (`productCartId`),
  INDEX `productId_idx` (`productId` ASC) ,
  INDEX `shoppingCartId_idx` (`shoppingCartId` ASC) ,
  CONSTRAINT `productId`
    FOREIGN KEY (`productId`)
    REFERENCES `fullshape_db`.`products` (`productId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `shoppingCartId`
    FOREIGN KEY (`shoppingCartId`)
    REFERENCES `fullshape_db`.`shoppingCart` (`shoppingCartId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);




