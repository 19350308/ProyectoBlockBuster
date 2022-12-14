-- MySQL dump 10.13  Distrib 8.0.31, for Linux (x86_64)
--
-- Host: localhost    Database: BlockBuster
-- ------------------------------------------------------
-- Server version	8.0.31-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Clientes`
--

DROP TABLE IF EXISTS `Clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Clientes` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Correo` varchar(255) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Apellidos` varchar(255) NOT NULL,
  `Edad` int NOT NULL,
  `Genero` char(1) NOT NULL,
  `Contrasena` varchar(255) NOT NULL,
  `Fecha_Nacimiento` date DEFAULT NULL,
  `Activo` char(1) NOT NULL,
  `Creado` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Modificado` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Clientes`
--

LOCK TABLES `Clientes` WRITE;
/*!40000 ALTER TABLE `Clientes` DISABLE KEYS */;
INSERT INTO `Clientes` VALUES (1,'Luis@gmail.com','Luis Eduarda','Miranda Mora',23,'F','12345','2001-12-15','S','2022-12-01 07:36:21','2022-12-14 10:30:09'),(2,'Sibaja@gmail.com','Fernando de Jesus','Sibaja Valdes',20,'M','1234','2001-01-01','S','2022-12-05 15:40:04','2022-12-14 09:00:43'),(6,'Salome@gmail.com','Salome de la Rosa','Flores Mora',25,'F','1234','1997-12-11','S','2022-12-14 10:26:15','2022-12-14 10:26:15'),(8,'Toñito@gmail.com','Guadalupe ','MFernandez lOPEZ',22,'M','$2a$10$hxp4sygtHSAQ2.np4z1NAOw4lQYKYx93aSK3NTlOMWx9UwQfgjXsm','1997-12-11','S','2022-12-14 16:32:54','2022-12-14 16:32:54');
/*!40000 ALTER TABLE `Clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Peliculas`
--

DROP TABLE IF EXISTS `Peliculas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Peliculas` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(255) NOT NULL,
  `Genero` varchar(255) NOT NULL,
  `Fecha_E` date DEFAULT NULL,
  `Autor` varchar(255) NOT NULL,
  `Disponible` char(1) NOT NULL,
  `Idioma` varchar(255) NOT NULL,
  `Estreno` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Modificado` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Peliculas`
--

LOCK TABLES `Peliculas` WRITE;
/*!40000 ALTER TABLE `Peliculas` DISABLE KEYS */;
INSERT INTO `Peliculas` VALUES (1,'Titanic','Romance/Drama','1998-01-01','James Cameron','N','Español/Ingles','2022-12-01 08:36:33','2022-12-02 21:01:00'),(2,'SpiderMan 3','Heroes/Accion/Drama','2007-05-04','Sam Raimi','N','Español/Ingles/Frances','2022-12-01 20:46:38','2022-12-02 20:37:35'),(3,'La Sirenita','Romance-Comedia','1989-11-12','Roger Allers','N','Español-Frances','2022-12-05 23:45:24','2022-12-14 16:31:15'),(4,'Wolwerine','Accion/Aventura','2010-11-12','Leo Messi','S','Español/Ingles/Frances','2022-12-14 10:27:30','2022-12-14 10:27:30');
/*!40000 ALTER TABLE `Peliculas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Prestamos`
--

DROP TABLE IF EXISTS `Prestamos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Prestamos` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `CorreoP` varchar(255) NOT NULL,
  `NombreP` varchar(255) NOT NULL,
  `ApellidosP` varchar(255) NOT NULL,
  `Pelicula` varchar(255) NOT NULL,
  `Precio` varchar(4) NOT NULL,
  `Pagado` char(1) NOT NULL,
  `Creado` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Dia_Entrega` date DEFAULT NULL,
  `Modificado` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Prestamos`
--

LOCK TABLES `Prestamos` WRITE;
/*!40000 ALTER TABLE `Prestamos` DISABLE KEYS */;
INSERT INTO `Prestamos` VALUES (3,'Sibaja@gmail.com','Fernando de Jesus','Sibaja Romeo','Titanic','$200','N','2022-12-14 10:03:49','2022-01-10','2022-12-14 10:03:49'),(5,'Salome@gmail.com','Salome de la Rosa','Flores Galindo','Wolwerine','$150','N','2022-12-14 10:29:37','2022-01-10','2022-12-14 10:29:37');
/*!40000 ALTER TABLE `Prestamos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-14 10:49:43
