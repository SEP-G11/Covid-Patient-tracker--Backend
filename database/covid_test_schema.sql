-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 04, 2021 at 05:39 PM
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
-- Table structure for table `medical_report`
--

CREATE TABLE `medical_report` (
  `report_id` varchar(10) NOT NULL,
  `patient_id` varchar(12) NOT NULL,
  `symptoms` varchar(255) NOT NULL,
  `admitted_at` datetime NOT NULL,
  `discharged_at` datetime DEFAULT NULL,
  `description` text NOT NULL,
  `status` enum('Active','Dead','Recovered') NOT NULL
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
  `contact_no` varchar(12) NOT NULL
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
  `origin` int(11) NOT NULL,
  `destination` int(11) NOT NULL
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

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `district_status`  AS  select `patient`.`district` AS `district`,count('district') AS `districtCount`,`medicalreport`.`status` AS `status` from (`medical_report` `medicalreport` left join `patient` on(`medicalreport`.`patient_id` = `patient`.`patient_id`)) group by `patient`.`district`,`medicalreport`.`status` ;

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
-- Indexes for table `medical_report`
--
ALTER TABLE `medical_report`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `FK_ReportPatient` (`patient_id`);

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
  ADD KEY `FK_TransferOrigin` (`origin`),
  ADD KEY `FK_TransferDest` (`destination`);

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
-- Constraints for table `medical_report`
--
ALTER TABLE `medical_report`
  ADD CONSTRAINT `FK_ReportPatient` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`) ON UPDATE CASCADE;

--
-- Constraints for table `test`
--
ALTER TABLE `test`
  ADD CONSTRAINT `FK_TestReport` FOREIGN KEY (`report_id`) REFERENCES `medical_report` (`report_id`) ON UPDATE CASCADE;

--
-- Constraints for table `transfer`
--
ALTER TABLE `transfer`
  ADD CONSTRAINT `FK_TransferDest` FOREIGN KEY (`destination`) REFERENCES `facility` (`facility_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_TransferOrigin` FOREIGN KEY (`origin`) REFERENCES `facility` (`facility_id`) ON UPDATE CASCADE,
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
