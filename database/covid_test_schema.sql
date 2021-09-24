-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 22, 2021 at 03:39 PM
-- Server version: 10.4.11-MariaDB-log
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `covid_test`
--
-- DROP DATABASE covid_test;
CREATE DATABASE covid_test;
USE covid_test;
-- --------------------------------------------------------

--
-- Table structure for table `allocation`
--

CREATE TABLE `allocation` (
  `id` int(11) NOT NULL,
  `patient_id` varchar(12) NOT NULL,
  `bed_no` int(11) NOT NULL,
  `is_occupied` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bed`
--

CREATE TABLE `bed` (
  `id` int(11) NOT NULL,
  `bed_no` int(11) NOT NULL,
  `ward` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Stand-in structure for view `district_status`
-- (See below for the actual view)
--
CREATE TABLE `district_status` (
`district` varchar(50)
,`districtCount` bigint(21)
,`todayCount` decimal(22,0)
,`status` enum('Active','Dead','Recovered')
);

-- --------------------------------------------------------

--
-- Table structure for table `facility`
--

CREATE TABLE `facility` (
  `facility_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `contact_no` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Stand-in structure for view `facility_bed`
-- (See below for the actual view)
--
CREATE TABLE `facility_bed` (
`BedID` int(11)
,`WardID` int(11)
,`FacilityId` int(11)
,`FacilityName` varchar(255)
,`WardType` enum('Covid','Normal')
,`IsOccupied` tinyint(1)
,`Capacity` int(11)
,`Contactnumber` varchar(12)
);

-- --------------------------------------------------------

--
-- Table structure for table `facility_staff`
--

CREATE TABLE `facility_staff` (
  `user_id` varchar(12) NOT NULL,
  `facility_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `medical_report`
--

CREATE TABLE `medical_report` (
  `report_id` varchar(10) NOT NULL,
  `patient_id` varchar(12) NOT NULL,
  `symptoms` varchar(255) NOT NULL,
  `admitted_at` datetime NOT NULL,
  `admitted_facility` int(11) NOT NULL,
  `discharged_at` datetime DEFAULT NULL,
  `discharged_facility` int(11) DEFAULT NULL,
  `description` text NOT NULL,
  `status` enum('Active','Dead','Recovered') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset`
--

CREATE TABLE `password_reset` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `token` text NOT NULL,
  `is_used` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `patient_id` varchar(12) NOT NULL,
  `name` varchar(150) NOT NULL,
  `address` varchar(255) NOT NULL,
  `district` varchar(50) NOT NULL,
  `blood_type` enum('A+','O+','B+','AB+','A-','O-','B-','AB-') NOT NULL,
  `age` int(11) NOT NULL,
  `contact_no` varchar(12) NOT NULL,
  `gender` enum('Male','Female') DEFAULT NULL,
  `is_Vaccinated` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `test`
--

CREATE TABLE `test` (
  `test_id` varchar(10) NOT NULL,
  `report_id` varchar(10) NOT NULL,
  `date` datetime NOT NULL,
  `test_type` enum('PCR','RAT') NOT NULL,
  `result` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `transfer`
--

CREATE TABLE `transfer` (
  `patient_id` varchar(12) NOT NULL,
  `date` datetime NOT NULL,
  `origin_bed_id` int(11) NOT NULL,
  `destination_bed_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` varchar(12) NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` char(60) NOT NULL,
  `contact_no` varchar(12) NOT NULL,
  `user_type` enum('MOH','DOC','HA') NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ward`
--

CREATE TABLE `ward` (
  `id` int(11) NOT NULL,
  `ward_no` varchar(10) NOT NULL,
  `capacity` int(11) NOT NULL,
  `facility_id` int(11) NOT NULL,
  `ward_type` enum('Covid','Normal') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure for view `district_status`
--
DROP TABLE IF EXISTS `district_status`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `district_status`  AS  select `patient`.`district` AS `district`,count('district') AS `districtCount`,sum(case when (cast(`medicalreport`.`admitted_at` as date) = cast(current_timestamp() as date) and `medicalreport`.`status` = 'Active') then 1 when (cast(`medicalreport`.`discharged_at` as date) = cast(current_timestamp() as date) and `medicalreport`.`status` = 'Recovered') then 1 when (cast(`medicalreport`.`discharged_at` as date) = cast(current_timestamp() as date) and `medicalreport`.`status` = 'Dead') then 1 else 0 end) AS `todayCount`,`medicalreport`.`status` AS `status` from (`medical_report` `medicalreport` left join `patient` on(`medicalreport`.`patient_id` = `patient`.`patient_id`)) group by `patient`.`district`,`medicalreport`.`status` ;

-- --------------------------------------------------------

--
-- Structure for view `facility_bed`
--
DROP TABLE IF EXISTS `facility_bed`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `facility_bed`  AS  (select `bed`.`id` AS `BedID`,`ward`.`id` AS `WardID`,`facility`.`facility_id` AS `FacilityId`,`facility`.`name` AS `FacilityName`,`ward`.`ward_type` AS `WardType`,`allocation`.`is_occupied` AS `IsOccupied`,`ward`.`capacity` AS `Capacity`,`facility`.`contact_no` AS `Contactnumber` from (((`ward` left join `bed` on(`ward`.`id` = `bed`.`ward`)) left join `allocation` on(`allocation`.`bed_no` = `bed`.`id`)) left join `facility` on(`facility`.`facility_id` = `ward`.`facility_id`))) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `allocation`
--
ALTER TABLE `allocation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_AllocPatient` (`patient_id`),
  ADD KEY `FK_AllocBed` (`bed_no`);

--
-- Indexes for table `bed`
--
ALTER TABLE `bed`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `U_BedWard` (`bed_no`,`ward`),
  ADD KEY `FK_BedWard` (`ward`);

--
-- Indexes for table `facility`
--
ALTER TABLE `facility`
  ADD PRIMARY KEY (`facility_id`);

--
-- Indexes for table `facility_staff`
--
ALTER TABLE `facility_staff`
  ADD KEY `FK_FS_Facility` (`facility_id`),
  ADD KEY `FK_FS_User` (`user_id`);

--
-- Indexes for table `medical_report`
--
ALTER TABLE `medical_report`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `FK_ReportPatient` (`patient_id`),
  ADD KEY `FK_ReportAdmitFac` (`admitted_facility`),
  ADD KEY `FK_ReportDiscFac` (`discharged_facility`);

--
-- Indexes for table `password_reset`
--
ALTER TABLE `password_reset`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_PWResetEmail` (`email`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`patient_id`);

--
-- Indexes for table `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`test_id`),
  ADD KEY `FK_TestReport` (`report_id`);

--
-- Indexes for table `transfer`
--
ALTER TABLE `transfer`
  ADD KEY `FK_TransferPatient` (`patient_id`),
  ADD KEY `FK_TransferDestBed` (`destination_bed_id`),
  ADD KEY `FK_TransferOriginBed` (`origin_bed_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `ward`
--
ALTER TABLE `ward`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `U_WardAndFacility` (`ward_no`,`facility_id`),
  ADD KEY `FK_WardFacility` (`facility_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bed`
--
ALTER TABLE `bed`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `facility`
--
ALTER TABLE `facility`
  MODIFY `facility_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `password_reset`
--
ALTER TABLE `password_reset`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ward`
--
ALTER TABLE `ward`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `allocation`
--
ALTER TABLE `allocation`
  ADD CONSTRAINT `FK_AllocBed` FOREIGN KEY (`bed_no`) REFERENCES `bed` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_AllocPatient` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`) ON UPDATE CASCADE;

--
-- Constraints for table `bed`
--
ALTER TABLE `bed`
  ADD CONSTRAINT `FK_BedWard` FOREIGN KEY (`ward`) REFERENCES `ward` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `facility_staff`
--
ALTER TABLE `facility_staff`
  ADD CONSTRAINT `FK_FS_Facility` FOREIGN KEY (`facility_id`) REFERENCES `facility` (`facility_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_FS_User` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE;

--
-- Constraints for table `medical_report`
--
ALTER TABLE `medical_report`
  ADD CONSTRAINT `FK_ReportAdmitFac` FOREIGN KEY (`admitted_facility`) REFERENCES `facility` (`facility_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_ReportDiscFac` FOREIGN KEY (`discharged_facility`) REFERENCES `facility` (`facility_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_ReportPatient` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`) ON UPDATE CASCADE;

--
-- Constraints for table `password_reset`
--
ALTER TABLE `password_reset`
  ADD CONSTRAINT `FK_PWResetEmail` FOREIGN KEY (`email`) REFERENCES `user` (`email`) ON UPDATE CASCADE;

--
-- Constraints for table `test`
--
ALTER TABLE `test`
  ADD CONSTRAINT `FK_TestReport` FOREIGN KEY (`report_id`) REFERENCES `medical_report` (`report_id`) ON UPDATE CASCADE;

--
-- Constraints for table `transfer`
--
ALTER TABLE `transfer`
  ADD CONSTRAINT `FK_TransferDestBed` FOREIGN KEY (`destination_bed_id`) REFERENCES `bed` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_TransferOriginBed` FOREIGN KEY (`origin_bed_id`) REFERENCES `bed` (`id`),
  ADD CONSTRAINT `FK_TransferPatient` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`) ON UPDATE CASCADE;

--
-- Constraints for table `ward`
--
ALTER TABLE `ward`
  ADD CONSTRAINT `FK_WardFacility` FOREIGN KEY (`facility_id`) REFERENCES `facility` (`facility_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
