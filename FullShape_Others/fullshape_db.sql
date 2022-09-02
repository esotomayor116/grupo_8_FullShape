-- MySQL dump 10.13  Distrib 8.0.29, for macos12 (x86_64)
--
-- Host: localhost    Database: fullshape_db
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `productCart`
--

DROP TABLE IF EXISTS `productCart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productCart` (
  `productCartId` int NOT NULL AUTO_INCREMENT,
  `productId` int NOT NULL,
  `shoppingCartId` int NOT NULL,
  PRIMARY KEY (`productCartId`),
  KEY `productId_idx` (`productId`),
  KEY `shoppingCartId_idx` (`shoppingCartId`),
  CONSTRAINT `productId` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`),
  CONSTRAINT `shoppingCartId` FOREIGN KEY (`shoppingCartId`) REFERENCES `shoppingCart` (`shoppingCartId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productCart`
--

LOCK TABLES `productCart` WRITE;
/*!40000 ALTER TABLE `productCart` DISABLE KEYS */;
/*!40000 ALTER TABLE `productCart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productCategories`
--

DROP TABLE IF EXISTS `productCategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productCategories` (
  `categoryId` int NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(50) NOT NULL,
  PRIMARY KEY (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productCategories`
--

LOCK TABLES `productCategories` WRITE;
/*!40000 ALTER TABLE `productCategories` DISABLE KEYS */;
INSERT INTO `productCategories` VALUES (1,'Gimnasio'),(2,'Fútbol'),(3,'Kinesiología'),(4,'Suplementos'),(5,'Boxeo');
/*!40000 ALTER TABLE `productCategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productColors`
--

DROP TABLE IF EXISTS `productColors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productColors` (
  `colorId` int NOT NULL AUTO_INCREMENT,
  `colorName` varchar(50) NOT NULL,
  PRIMARY KEY (`colorId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productColors`
--

LOCK TABLES `productColors` WRITE;
/*!40000 ALTER TABLE `productColors` DISABLE KEYS */;
INSERT INTO `productColors` VALUES (1,'Azul'),(2,'Verde'),(3,'Celeste'),(4,'Negro'),(5,'Blanco'),(6,'Rojo'),(7,'Amarillo');
/*!40000 ALTER TABLE `productColors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `productId` int NOT NULL AUTO_INCREMENT,
  `productName` varchar(100) NOT NULL,
  `productDescription` text NOT NULL,
  `productStatusId` int DEFAULT NULL,
  `productCategoryId` int DEFAULT NULL,
  `productColorId` int DEFAULT NULL,
  `productSizeId` int DEFAULT NULL,
  `productCode` varchar(50) DEFAULT NULL,
  `productUnitPrice` decimal(10,2) NOT NULL,
  `productMainImage` text,
  PRIMARY KEY (`productId`),
  KEY `statusId_idx` (`productStatusId`),
  KEY `categoryId_idx` (`productCategoryId`),
  KEY `colorId_idx` (`productColorId`),
  KEY `sizeId_idx` (`productSizeId`),
  CONSTRAINT `categoryId` FOREIGN KEY (`productCategoryId`) REFERENCES `productCategories` (`categoryId`) ON DELETE SET NULL,
  CONSTRAINT `colorid` FOREIGN KEY (`productColorId`) REFERENCES `productColors` (`colorId`) ON DELETE SET NULL,
  CONSTRAINT `sizeId` FOREIGN KEY (`productSizeId`) REFERENCES `productSizes` (`sizeId`) ON DELETE SET NULL,
  CONSTRAINT `statusId` FOREIGN KEY (`productStatusId`) REFERENCES `productStatus` (`statusId`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'SmartWatch','ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices',1,1,1,NULL,'5-201314-255000',4582.52,'PRODUCT-Smartwatch.jpg'),(2,'Pesas de 30kg','ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui',1,1,2,NULL,'5-201314-257324',3105.88,'PRODUCT-Pesas30kg.png'),(3,'Conjunto Deportivo','eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia',2,1,3,1,'5-201314-259648',3546.96,'PRODUCT-ConjuntoDeportivo.png'),(4,'Pelota de futbol','metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam',1,2,2,NULL,'5-201314-261972',3342.67,'PRODUCT-Pelotafutbol.png'),(5,'Maquina de gym','orci luctus et ultrices posuere cubilia curae nulla dapibus dolor',2,1,4,NULL,'5-201314-264296',3936.33,'PRODUCT-Maquinagym.png'),(6,'Kit de gimnasio en casa','ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas',2,1,4,NULL,'5-201314-266620',2644.91,'PRODUCT-Kit-de-gimnasio-en-casa.png'),(7,'Pelota Esferodinamia Reforzada 65','sit amet consectetuer adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci',2,3,5,NULL,'5-201314-268944',2098.91,'PRODUCT-Pelota-Esferodinamia-Reforzada-65.png'),(8,'Disco Propiocepcion Equilibrio Balance','venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse',1,3,6,NULL,'5-201314-271268',4542.00,'PRODUCT-Disco-Propiocepcion-Equilibrio-Balance.png'),(9,'Pelotas Estimulacion Dep Rehabilitacion Inflables','massa donec dapibus duis at velit eu est congue elementum in hac habitasse',2,3,7,3,'5-201314-273592',1272.20,'PRODUCT-Pelotas-Estimulacion-Dep-Rehabilitacion-Inflables.png'),(10,'Tabla Equilibrio Propiocepcion Balance Board Kinesiologia','vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu',1,3,3,NULL,'5-201314-275916',1426.22,'PRODUCT-Tabla-Equilibrio-Propiocepcion-Balance-Board-Kinesiologia.png'),(11,'Canilleras de fútbol','turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque',2,2,4,3,'5-201314-278240',4334.99,'PRODUCT-Canilleras-de-fútbol.png'),(12,'Whey proteina concentrada','aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel',1,4,NULL,NULL,'5-201314-280564',2944.86,'PRODUCT-Whey-proteina-concentrada.png'),(13,'Barra protéica','amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie',1,4,NULL,NULL,'5-201314-282888',3172.55,'PRODUCT-Barra-protéica.png'),(14,'Vaso Shaker Antigrumos','convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem',2,4,NULL,NULL,'5-201314-285212',1601.44,'PRODUCT-Vaso-Shaker-Antigrumos.png'),(15,'Creatina Monohidrato Star Nutrition Micronizada','pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus',1,4,NULL,NULL,'5-201314-287536',1861.69,'PRODUCT-Creatina-Monohidrato-Star-Nutrition-Micronizada.png'),(16,'Combo Crecimiento Muscular Proteina+Creatina','non pretium quis lectus suspendisse potenti in eleifend quam a odio in',2,4,NULL,NULL,'5-201314-289860',2290.33,'PRODUCT-Combo-Crecimiento-Muscular-Proteina+Creatina.png'),(17,'Protector bucal para boxeo','risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices',1,5,7,2,'5-201314-292184',948.46,'PRODUCT-Protector-bucal-para-boxeo.png'),(18,'Bolsa de Boxeo','eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac',1,5,4,5,'5-201314-294508',4662.77,'PRODUCT-Bolsa-de-Boxeo.png'),(19,'Guantes de Boxeo 14 onz','consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla',2,5,6,3,'5-201314-296832',1964.17,'PRODUCT-Guantes-de-Boxeo-14-onz.png'),(20,'Pesa Rusa Kettlebell 10 Kg','nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat in',2,5,6,NULL,'5-201314-299156',2389.62,'PRODUCT-Pesa-Rusa-Kettlebell-10-Kg.png'),(21,'Pelota2','Pelota de Futbol',1,2,NULL,NULL,'76519278',10000.00,'productMainImage-1658199926352.jpg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productSizes`
--

DROP TABLE IF EXISTS `productSizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productSizes` (
  `sizeId` int NOT NULL AUTO_INCREMENT,
  `sizeName` varchar(50) NOT NULL,
  PRIMARY KEY (`sizeId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productSizes`
--

LOCK TABLES `productSizes` WRITE;
/*!40000 ALTER TABLE `productSizes` DISABLE KEYS */;
INSERT INTO `productSizes` VALUES (1,'XS'),(2,'S'),(3,'M'),(4,'L'),(5,'XL'),(6,'XXL');
/*!40000 ALTER TABLE `productSizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productStatus`
--

DROP TABLE IF EXISTS `productStatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productStatus` (
  `statusId` int NOT NULL AUTO_INCREMENT,
  `statusName` varchar(50) NOT NULL,
  PRIMARY KEY (`statusId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productStatus`
--

LOCK TABLES `productStatus` WRITE;
/*!40000 ALTER TABLE `productStatus` DISABLE KEYS */;
INSERT INTO `productStatus` VALUES (1,'Nuevo'),(2,'Usado');
/*!40000 ALTER TABLE `productStatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shoppingCart`
--

DROP TABLE IF EXISTS `shoppingCart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shoppingCart` (
  `shoppingCartId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `CartNumberOfItems` int NOT NULL,
  `CartTotalPrice` decimal(10,2) NOT NULL,
  PRIMARY KEY (`shoppingCartId`),
  KEY `userId_idx` (`userId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shoppingCart`
--

LOCK TABLES `shoppingCart` WRITE;
/*!40000 ALTER TABLE `shoppingCart` DISABLE KEYS */;
/*!40000 ALTER TABLE `shoppingCart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `userEmail` varchar(100) NOT NULL,
  `userImage` text,
  `userNames` varchar(50) NOT NULL,
  `userLastNames` varchar(50) NOT NULL,
  `userPassword` text NOT NULL,
  `userPhone` varchar(25) NOT NULL,
  `userReceiveOffersAndNews` tinyint DEFAULT NULL,
  `userType` varchar(50) NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ojordon0@ask.com','User_Avatar.jpeg','Orran','Jordon','QXYKOW4wh','926-731-6305',0,'Vendedor'),(2,'vdewey1@ifeng.com','User_Avatar.jpeg','Viviana','Dewey','Y5ouonwz','885-534-9099',0,'Comprador'),(3,'mkilbee2@delicious.com','userImage-1658553182833.jpeg','Meredith','Kilbee','cN1Rw7R6ciQ','129-970-4119',0,'Vendedor'),(4,'wdidball3@seesaa.net','userImage-1658553182835.jpeg','Wye','Didball','xTkslxe4yVp','505-797-3605',0,'Vendedor'),(5,'mcheater4@independent.co.uk','User_Avatar.jpeg','Moyna','Cheater','A9hhsz9','502-315-5267',1,'Vendedor'),(6,'jberkowitz5@berkeley.edu','User_Avatar.jpeg','Jules','Berkowitz','qEWdiHX','420-950-0806',1,'Vendedor'),(7,'rlush6@springer.com','User_Avatar.jpeg','Raphael','Lush','73iZbyP','164-698-7351',1,'Vendedor'),(8,'krentoll7@examiner.com','userImage-1658553182839.jpeg','Karia','Rentoll','cofaF7Ul','180-548-2380',0,'Comprador'),(9,'fspeller8@gov.uk','User_Avatar.jpeg','Frederic','Speller','zhvo3gqq5Yx','657-378-9889',0,'Comprador'),(10,'rdeppe9@weather.com','userImage-1658553182841.jpeg','Reggie','Deppe','LEcfRfVFs5F','456-175-1137',0,'Comprador'),(11,'wjordisona@google.it','User_Avatar.jpeg','Weber','Jordison','Si7HFa','271-155-8184',1,'Comprador'),(12,'jgulbergb@goo.gl','User_Avatar.jpeg','Janelle','Gulberg','FFTQjLScoR','413-411-4617',0,'Comprador'),(13,'aashbeyc@twitter.com','User_Avatar.jpeg','Ainsley','Ashbey','F6HFWKkHCJHe','267-897-5612',0,'Comprador'),(14,'hvossingd@amazon.co.jp','userImage-1658553182845.jpeg','Hastings','Vossing','k4ewVOwdkmHt','702-441-9962',0,'Vendedor'),(15,'fhatjee@altervista.org','User_Avatar.jpeg','Ferrell','Hatje','f0HKjDBv','330-797-8139',1,'Comprador'),(16,'prableyf@slashdot.org','userImage-1658553182847.jpeg','Penrod','Rabley','mfKQvkWAHoQ','271-813-6756',0,'Comprador'),(17,'ibewsheag@purevolume.com','User_Avatar.jpeg','Ian','Bewshea','IDqXoj3xggkE','991-950-6448',1,'Vendedor'),(18,'calelsandrovichh@ox.ac.uk','User_Avatar.jpeg','Celle','Alelsandrovich','cAhse0Kstmw','768-899-7692',1,'Comprador'),(19,'fridholei@globo.com','User_Avatar.jpeg','Florentia','Ridhole','PcR2425HGfDD','480-332-5684',0,'Comprador'),(20,'pocriganj@accuweather.com','User_Avatar.jpeg','Patience','O\'Crigan','d1VoPdb1','981-196-2613',0,'Vendedor'),(21,'esotomayor116@gmail.com','userImage-1658554822655.png','Edgardo','Sotomayor','78686728','09709709790',1,'Vendedor'),(22,'esotomayor116@gmail.com','userImage-1658555642017.png','Manuel','Belgrano','$2a$10$cJsLMUanbqO6THIuUUMjBu8hWHqa3P20v8EcBa6LX8SLjGvamjudW','981373047',0,'Vendedor'),(23,'auza@hotmail.com','userImage-1658674212808.jpg','Sebas','Auza','$2a$10$RO23lVDZCEedxvLsYlj9Fu0zC3u3lSPIW5JPYj/59efQcVPZgSsa6','1234567890',1,'Comprador');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-01 23:40:44
