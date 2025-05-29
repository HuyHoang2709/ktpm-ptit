-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: ktpm
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `buoihoc`
--

DROP TABLE IF EXISTS `buoihoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buoihoc` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mota` varchar(255) NOT NULL,
  `ten` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buoihoc`
--

LOCK TABLES `buoihoc` WRITE;
/*!40000 ALTER TABLE `buoihoc` DISABLE KEYS */;
INSERT INTO `buoihoc` VALUES (1,'7h30-9h30','Sáng 1'),(2,'9h30-11h30','Sáng 2'),(3,'13h30-15h30','Chiều 1'),(4,'15h30-17h30','Chiều 2'),(5,'18h-20h','Tối');
/*!40000 ALTER TABLE `buoihoc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chuongtrinhhoc`
--

DROP TABLE IF EXISTS `chuongtrinhhoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chuongtrinhhoc` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mota` varchar(255) DEFAULT NULL,
  `ten` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chuongtrinhhoc`
--

LOCK TABLES `chuongtrinhhoc` WRITE;
/*!40000 ALTER TABLE `chuongtrinhhoc` DISABLE KEYS */;
INSERT INTO `chuongtrinhhoc` VALUES (1,'(International English Language Testing System) Chương trình luyện thi IELTS Academic 4 kỹ năng trình độ 6.5+','IELTS 6.5+'),(2,'(Test of English for International Communication) Chương trình luyện thi TOEIC 2 kỹ năng trình độ 730','TOEIC 730+'),(3,'Ôn thi tiếng Anh cho thi THPT và thi đại học','THPT');
/*!40000 ALTER TABLE `chuongtrinhhoc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coso`
--

DROP TABLE IF EXISTS `coso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coso` (
  `id` int NOT NULL AUTO_INCREMENT,
  `diachi` varchar(255) NOT NULL,
  `ten` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coso`
--

LOCK TABLES `coso` WRITE;
/*!40000 ALTER TABLE `coso` DISABLE KEYS */;
INSERT INTO `coso` VALUES (1,'Hà Đông','Cơ sở 1'),(2,'Cầu Giấy','Cơ sở 2');
/*!40000 ALTER TABLE `coso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dangkyday`
--

DROP TABLE IF EXISTS `dangkyday`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dangkyday` (
  `id` int NOT NULL AUTO_INCREMENT,
  `giaovienid` int DEFAULT NULL,
  `lophocid` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKj2sp4ftkxfwp7gi37xwyp6263` (`giaovienid`),
  KEY `FKrx482sp572reeuxauavb9c12f` (`lophocid`),
  CONSTRAINT `FKj2sp4ftkxfwp7gi37xwyp6263` FOREIGN KEY (`giaovienid`) REFERENCES `giaovien` (`id`),
  CONSTRAINT `FKrx482sp572reeuxauavb9c12f` FOREIGN KEY (`lophocid`) REFERENCES `lophoc` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dangkyday`
--

LOCK TABLES `dangkyday` WRITE;
/*!40000 ALTER TABLE `dangkyday` DISABLE KEYS */;
INSERT INTO `dangkyday` VALUES (1,1,1),(2,1,2),(3,2,1),(4,5,1);
/*!40000 ALTER TABLE `dangkyday` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `giaovien`
--

DROP TABLE IF EXISTS `giaovien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `giaovien` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `hoten` varchar(255) NOT NULL,
  `ngaysinh` date NOT NULL,
  `sdt` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `chuyenmon` varchar(255) DEFAULT NULL,
  `trinhdo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `giaovien`
--

LOCK TABLES `giaovien` WRITE;
/*!40000 ALTER TABLE `giaovien` DISABLE KEYS */;
INSERT INTO `giaovien` VALUES (1,'bhhoang@example.com','Bùi Huy Hoàng','2003-09-27','0941175966','teacher001','gv001','IELTS','Đại học'),(2,'nva@gmail.com','Nguyễn Văn A','2000-05-27','0123456888','teacher002','gv002','TOEIC','Đại học'),(5,'nvb@gmail.com','Nguyễn Văn B','2025-05-01','0123456789','teacher003','gv003','IELTS','Đại học'),(6,'nvc@gmail.com','Nguyễn Văn C','2025-04-01','0987654321','teacher004','gv004','IELTS, TOEIC','Đại học');
/*!40000 ALTER TABLE `giaovien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lichday`
--

DROP TABLE IF EXISTS `lichday`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lichday` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ngay` date NOT NULL,
  `buoihocid` int DEFAULT NULL,
  `dangkydayid` int DEFAULT NULL,
  `phonghocid` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1t4canxyl2jj7i508k5lxrs5n` (`buoihocid`),
  KEY `FK4lgavm3ixcpusmqrjkdvuh3xv` (`dangkydayid`),
  KEY `FKgw92gybttbqdtn2fvqll7xkc8` (`phonghocid`),
  CONSTRAINT `FK1t4canxyl2jj7i508k5lxrs5n` FOREIGN KEY (`buoihocid`) REFERENCES `buoihoc` (`id`),
  CONSTRAINT `FK4lgavm3ixcpusmqrjkdvuh3xv` FOREIGN KEY (`dangkydayid`) REFERENCES `dangkyday` (`id`),
  CONSTRAINT `FKgw92gybttbqdtn2fvqll7xkc8` FOREIGN KEY (`phonghocid`) REFERENCES `phonghoc` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lichday`
--

LOCK TABLES `lichday` WRITE;
/*!40000 ALTER TABLE `lichday` DISABLE KEYS */;
INSERT INTO `lichday` VALUES (1,'2025-05-28',1,1,1),(2,'2025-05-29',1,1,1),(3,'2025-05-29',2,2,2);
/*!40000 ALTER TABLE `lichday` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lophoc`
--

DROP TABLE IF EXISTS `lophoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lophoc` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hocphi` double NOT NULL,
  `mota` varchar(255) DEFAULT NULL,
  `solop` int NOT NULL,
  `ten` varchar(255) NOT NULL,
  `chuongtrinhhocid` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKa5kyjkmxjvy5pmrg3whqmyl3p` (`chuongtrinhhocid`),
  CONSTRAINT `FKa5kyjkmxjvy5pmrg3whqmyl3p` FOREIGN KEY (`chuongtrinhhocid`) REFERENCES `chuongtrinhhoc` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lophoc`
--

LOCK TABLES `lophoc` WRITE;
/*!40000 ALTER TABLE `lophoc` DISABLE KEYS */;
INSERT INTO `lophoc` VALUES (1,1000000,'Nghe IELTS trình độ 6.5+',3,'Nghe 6.5+',1),(2,1000000,'Nói IELTS trình độ 6.5+',3,'Nói 6.5+',1),(3,1000000,'Đọc IELTS trình độ 6.5+',3,'Đọc 6.5+',1),(4,1000000,'Viết IELTS trình độ 6.5+',3,'Viết 6.5+',1),(5,500000,'Nghe TOEIC trình độ 730+',5,'Nghe 730+',2),(6,500000,'Nghe TOEIC trình độ 730+',5,'Đọc 730+',2),(7,300000,'Ôn cấp tốc cho thi THPT',4,'THPT nhanh gọn',3);
/*!40000 ALTER TABLE `lophoc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nvquanly`
--

DROP TABLE IF EXISTS `nvquanly`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nvquanly` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `hoten` varchar(255) NOT NULL,
  `ngaysinh` date NOT NULL,
  `sdt` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nvquanly`
--

LOCK TABLES `nvquanly` WRITE;
/*!40000 ALTER TABLE `nvquanly` DISABLE KEYS */;
INSERT INTO `nvquanly` VALUES (1,'admin@example.com','Quản trị viên','2001-01-01','0123456789','adminpass','admin');
/*!40000 ALTER TABLE `nvquanly` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phonghoc`
--

DROP TABLE IF EXISTS `phonghoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phonghoc` (
  `id` int NOT NULL AUTO_INCREMENT,
  `succhua` int NOT NULL,
  `ten` varchar(255) NOT NULL,
  `cosoid` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8wj9cubfqlqb64b0l30hfki5v` (`cosoid`),
  CONSTRAINT `FK8wj9cubfqlqb64b0l30hfki5v` FOREIGN KEY (`cosoid`) REFERENCES `coso` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phonghoc`
--

LOCK TABLES `phonghoc` WRITE;
/*!40000 ALTER TABLE `phonghoc` DISABLE KEYS */;
INSERT INTO `phonghoc` VALUES (1,35,'101-HĐ',1),(2,35,'102-HĐ',1),(3,35,'103-HĐ',1),(4,35,'201-HĐ',1),(5,35,'202-HĐ',1),(6,35,'203-HĐ',1),(7,35,'301-HĐ',1),(8,35,'302-HĐ',1),(9,35,'303-HĐ',1),(10,40,'101-CG',2),(11,40,'102-CG',2),(12,40,'103-CG',2),(13,40,'201-CG',2),(14,40,'202-CG',2),(15,40,'203-CG',2),(16,40,'301-CG',2),(17,40,'302-CG',2),(18,40,'303-CG',2);
/*!40000 ALTER TABLE `phonghoc` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-29 23:33:07
