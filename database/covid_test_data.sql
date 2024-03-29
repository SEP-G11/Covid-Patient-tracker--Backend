-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 12, 2021 at 01:07 PM
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

--
-- Dumping data for table `allocation`
--

INSERT INTO `allocation` (`id`, `patient_id`, `bed_no`, `is_occupied`) VALUES
('1', '009987525V', 1, 1),
('10', '059297390X', 10, 1),
('11', '078655125V', 11, 1),
('12', '111897875V', 12, 1),
('13', '117733791V', 13, 1),
('14', '129560268X', 14, 1),
('15', '139395201V', 15, 1),
('16', '173225931V', 16, 1),
('17', '206240953X', 17, 1),
('18', '208969701X', 18, 1),
('19', '211195228V', 19, 1),
('2', '674849922X', 2, 1),
('20', '211837365X', 20, 1),
('21', '674849922X', 2, 1),
('22', '078655125V', 3, 1),
('23', '009987525V', 1, 1),
('3', '078655125V', 11, 0),
('4', '011169845X', 4, 1),
('5', '011557052V', 5, 1),
('6', '018684518V', 6, 1),
('7', '022413099X', 7, 1),
('8', '023655619V', 8, 1),
('9', '032315425V', 9, 1),
('947111118749490176000001632996540000A', '94711111874949017600000', 22, 0),
('947676767685546016000001633015440000A', '94767676768554601600000', 24, 1),
('947812313446996672000001633085160000A', '94781231344699667200000', 23, 1);

--
-- Dumping data for table `bed`
--

INSERT INTO `bed` (`id`, `bed_no`, `ward`) VALUES
(1, 1, 1),
(11, 1, 2),
(21, 1, 3),
(31, 1, 4),
(41, 1, 5),
(46, 1, 6),
(2, 2, 1),
(12, 2, 2),
(22, 2, 3),
(32, 2, 4),
(42, 2, 5),
(47, 2, 6),
(3, 3, 1),
(13, 3, 2),
(23, 3, 3),
(33, 3, 4),
(43, 3, 5),
(48, 3, 6),
(4, 4, 1),
(14, 4, 2),
(24, 4, 3),
(34, 4, 4),
(44, 4, 5),
(49, 4, 6),
(5, 5, 1),
(15, 5, 2),
(25, 5, 3),
(35, 5, 4),
(45, 5, 5),
(50, 5, 6),
(6, 6, 1),
(16, 6, 2),
(26, 6, 3),
(36, 6, 4),
(7, 7, 1),
(17, 7, 2),
(27, 7, 3),
(37, 7, 4),
(8, 8, 1),
(18, 8, 2),
(28, 8, 3),
(38, 8, 4),
(9, 9, 1),
(19, 9, 2),
(29, 9, 3),
(39, 9, 4),
(10, 10, 1),
(20, 10, 2),
(30, 10, 3),
(40, 10, 4);

--
-- Dumping data for table `facility`
--

INSERT INTO `facility` (`facility_id`, `name`, `address`, `contact_no`) VALUES
(1, 'New York City National Hospital', '6 Rockefeller Street', '0332606423'),
(2, 'Trablice National Hospital', '8013 Hagan Drive', '0651142957'),
(3, 'Gelang National Hospital', '66331 Mccormick Plaza', '0118327349'),
(4, 'Ararat National Hospital', '03 Talisman Crossing', '0339209186'),
(5, 'Fengcun National Hospital', '3 Mitchell Drive', '0115360058'),
(6, 'Paarl National Hospital', '2 Hanover Point', '0338103414'),
(7, 'Gaoliang National Hospital', '286 Glacier Hill Lane', '0337855451'),
(8, 'Bangad National Hospital', '90 Waubesa Circle', '0339002131'),
(9, 'Zhonghuopu National Hospital', '7 Gulseth Pass', '0339902951'),
(10, 'Navoiy National Hospital', '917 Kings Lane', '0114329210'),
(11, 'Virden National Hospital', '53 Mandrake Junction', '0332782712'),
(12, 'Cibungur National Hospital', '6 Darwin Parkway', '0115031243'),
(13, 'Ukhta National Hospital', '11 Pine View Place', '0336113319'),
(14, 'Ban Lam Luk Ka National Hospital', '9 Ryan Way', '0339485934'),
(15, 'Columbus National Hospital', '24 Old Gate Street', '0337466008'),
(16, 'Useldange National Hospital', '6860 Twin Pines Parkway', '0118747068'),
(17, 'Kaédi National Hospital', '02395 Thackeray Way', '0333750812'),
(18, 'Brunflo National Hospital', '39312 Fordem Circle', '0339496492'),
(19, 'Amorim National Hospital', '9543 Jay Parkway', '0330064796'),
(20, 'Cumanacoa National Hospital', '86 Claremont Alley', '0450204527'),
(21, 'Payxambabazar National Hospital', '35 Buena Vista Court', '0333582411'),
(22, 'Hai Riêng National Hospital', '340 Dapin Place', '0339615312'),
(23, 'Praimarada National Hospital', '70008 Lyons Center', '0338281577'),
(24, 'Duoxiang National Hospital', '07925 Northland Plaza', '0335824412'),
(25, 'Étampes National Hospital', '0 Michigan Alley', '0551234921'),
(26, 'Chhātak National Hospital', '35 Thierer Crossing', '0335684427'),
(27, 'Fresno National Hospital', '66580 Sage Terrace', '0110708045'),
(28, 'Palma De Mallorca National Hospital', '795 Village Green Drive', '0410458228'),
(29, 'Mýto National Hospital', '349 Blaine Terrace', '0337893750'),
(30, 'Yangirabot National Hospital', '7592 Killdeer Way', '0656083553'),
(31, 'Majāz al Bāb National Hospital', '7 Canary Crossing', '0337866890'),
(32, 'Alvito de São Pedro National Hospital', '1 Warbler Lane', '0418451176'),
(33, 'Koina National Hospital', '0 Fairview Parkway', '0331197846'),
(34, 'Anyar National Hospital', '4 South Hill', '0330521152'),
(35, 'Baocun National Hospital', '5028 Sherman Place', '0335690312'),
(36, 'Buchou National Hospital', '9 Carioca Parkway', '0115413924'),
(37, 'Calçada National Hospital', '85 Steensland Junction', '0652321698'),
(38, 'Wilwerwiltz National Hospital', '21 Brown Terrace', '0330909567'),
(39, 'Raoyang National Hospital', '01 Jenna Court', '0331521843'),
(40, 'Plumbon National Hospital', '747 Kings Drive', '0337575107'),
(41, 'Constance National Hospital', '948 Buell Alley', '0419489325'),
(42, 'Mamonovo National Hospital', '09793 Forest Dale Hill', '0416924863'),
(43, 'Jiasi National Hospital', '76583 Loeprich Junction', '0337836960'),
(44, 'Mene de Mauroa National Hospital', '0 Sachs Place', '0413536699'),
(45, 'Lyubinskiy National Hospital', '57 Kedzie Alley', '0418077061'),
(46, 'Pirca National Hospital', '133 Huxley Center', '0336772322'),
(47, 'Quebo National Hospital', '20 Cody Hill', '0418307240'),
(48, 'Dashiren National Hospital', '415 Pennsylvania Alley', '0335683795'),
(49, 'Rudky National Hospital', '4359 Scofield Court', '0330489274'),
(50, 'Des Moines National Hospital', '8180 Division Parkway', '0330449288'),
(51, 'Stockholm National Hospital', '6 Monterey Crossing', '0415970555'),
(52, 'Kolpny National Hospital', '144 Quincy Court', '0334677218'),
(53, 'Taiping National Hospital', '0814 Hagan Street', '0115782645'),
(54, 'Sansanné-Mango National Hospital', '55 Esker Plaza', '0339945392'),
(55, 'Lashkar Gāh National Hospital', '63 Fieldstone Alley', '0415853334'),
(56, 'Nankai National Hospital', '07838 Lunder Place', '0279490606'),
(57, 'Qiaodi National Hospital', '5248 Clove Circle', '0411872787'),
(58, 'Lazi National Hospital', '2108 Elgar Road', '0332238754'),
(59, 'Police nad Metují National Hospital', '99254 Esker Drive', '0417376608'),
(60, 'Yuanba National Hospital', '19 Blaine Circle', '0338155733'),
(61, 'Rehoboth National Hospital', '501 Mallory Terrace', '0411686227'),
(62, 'Köln National Hospital', '3841 Larry Point', '0332166666'),
(63, 'Maubin National Hospital', '2985 Schiller Pass', '0415666597'),
(64, 'Baro National Hospital', '64289 Sullivan Center', '0118034991'),
(65, 'Tambakromo National Hospital', '1 Kropf Way', '0333204545'),
(66, 'Bembèrèkè National Hospital', '6180 Homewood Park', '0330225130'),
(67, 'Bellavista National Hospital', '5 Ruskin Center', '0452898279'),
(68, 'Ufimskiy National Hospital', '1 Namekagon Parkway', '0331941871'),
(69, 'Algueirão National Hospital', '59 Quincy Trail', '0119295295'),
(70, 'Mengjia National Hospital', '95398 Stone Corner Center', '0111389666'),
(71, 'Bech National Hospital', '237 Dakota Terrace', '0651536373'),
(72, 'Guarenas National Hospital', '82123 Bay Hill', '0338308077'),
(73, 'Bābol National Hospital', '35415 Kim Crossing', '0650520426'),
(74, 'Salamrejo National Hospital', '721 Lukken Drive', '0110020320'),
(75, 'Al Khawkhah National Hospital', '7 Jenna Circle', '0332862150'),
(76, 'Zhongzhou National Hospital', '930 Sullivan Place', '0338299677'),
(77, 'Atlanta National Hospital', '02006 Hoepker Street', '0114321241'),
(78, 'Hlybokaye National Hospital', '023 Birchwood Park', '0272484440'),
(79, 'Zaandam National Hospital', '6080 Macpherson Parkway', '0118812984'),
(80, 'Sukpak National Hospital', '273 Spohn Court', '0112171822'),
(81, 'Federal National Hospital', '45 Sauthoff Lane', '0331393635'),
(82, 'Kīevka National Hospital', '95285 Kings Plaza', '0338452358'),
(83, 'Minle National Hospital', '5187 Utah Place', '0337564834'),
(84, 'As Sawdā National Hospital', '34084 Lindbergh Parkway', '0334705071'),
(85, 'Obršani National Hospital', '6 Warbler Center', '0336537852'),
(86, 'Al Jīzah National Hospital', '516 Milwaukee Junction', '0338816318'),
(87, 'Phoenix National Hospital', '645 Mayfield Street', '0333825904'),
(88, 'Krzeszów National Hospital', '57 Dottie Court', '0113002351'),
(89, 'Nurlat National Hospital', '032 Lunder Circle', '0330552032'),
(90, 'Darband National Hospital', '6 Gulseth Park', '0654919870'),
(91, 'Baş Göynük National Hospital', '268 Muir Hill', '0115560562'),
(92, 'Al Bāriqīyah National Hospital', '29099 Grim Avenue', '0334373703'),
(93, 'Changping National Hospital', '26 Chive Way', '0331351175'),
(94, 'Fortios National Hospital', '6631 John Wall Avenue', '0410942865'),
(95, 'Dorupare National Hospital', '2 Welch Alley', '0336603068'),
(96, 'Ziniaré National Hospital', '3 Valley Edge Way', '0654042040'),
(97, 'Duran National Hospital', '99964 Bunting Trail', '0413255515'),
(98, 'Ust’-Kachka National Hospital', '954 Anzinger Terrace', '0331788325'),
(99, 'Lianran National Hospital', '4 New Castle Point', '0413660380'),
(100, 'Sangallaya National Hospital', '185 Barnett Trail', '0338126272');

--
-- Dumping data for table `facility_staff`
--

INSERT INTO `facility_staff` (`user_id`, `facility_id`) VALUES
('903000001', 1),
('903000002', 2),
('986005000', 4),
('903110000', 8),
('985099000', 10),
('985003900', 4),
('903030303', 4),
('986000670', 3),
('985989800V', 9),
('874351879X', 6),
('674351879V', 40),
('874351179X', 17),
('775000091X', 26),
('685001000X', 25);

--
-- Dumping data for table `medical_report`
--

INSERT INTO `medical_report` (`report_id`, `patient_id`, `symptoms`, `admitted_at`, `admitted_facility`, `discharged_at`, `discharged_facility`, `description`, `status`) VALUES
('00000001', '009987525V', 'Cough and Headache', '2021-09-05 15:17:43', 1, '2021-09-09 21:28:12', 1, '', 'Recovered'),
('148701361', '674849922X', 'Asymptotic', '2021-09-17 11:20:15', 2, NULL, NULL, '', 'Active'),
('27654321', '269051204V', 'Fever and Headache', '2021-09-05 14:10:51', 1, '2021-09-17 14:10:51', 1, '', 'Recovered'),
('286740672', '819572017V', 'Fever', '2021-01-09 03:34:47', 1, '2021-09-04 17:18:01', 2, '', 'Recovered'),
('369814018', '237854928X', 'Cough', '2021-06-03 08:06:26', 1, NULL, NULL, '', 'Active'),
('443802122', '948156298X', 'Sneezing and Headache', '2021-09-01 18:18:04', 2, '2021-09-05 14:39:19', 2, '', 'Dead'),
('530309323', '011169845X', 'Cough and Fever', '2021-09-05 17:59:49', 3, NULL, NULL, '', 'Active'),
('541884370', '986735927V', 'Cough', '2020-09-11 08:04:18', 3, '2021-09-17 17:18:15', 1, '', 'Recovered'),
('585232448', '718609729V', 'Headache', '2020-12-25 13:42:23', 1, '2020-12-29 13:42:23', 3, '', 'Recovered'),
('730339663', '819572017V', 'Sneezing', '2021-02-02 15:07:21', 1, '2021-09-05 13:42:23', 2, '', 'Recovered'),
('788053032', '032315425V', 'Headache', '2021-09-01 20:17:01', 3, NULL, NULL, '', 'Active'),
('831510403', '986735927V', 'Asymptotic', '2021-07-30 02:35:26', 4, '2021-09-05 13:42:23', 2, '', 'Recovered'),
('865937809', '237854928X', 'Cough', '2021-03-25 01:15:10', 5, '2021-09-17 14:39:35', 6, '', 'Dead'),
('874686916', '674849922X', 'Fever', '2021-03-23 18:16:31', 6, '2021-03-24 13:42:23', 7, '', 'Recovered'),
('882067798', '725513042V', 'Cough', '2021-04-03 19:54:10', 7, '2021-09-17 13:42:23', 5, '', 'Recovered'),
('947111118749490176000001632996540000R', '94711111874949017600000', '', '2021-09-30 15:39:00', 8, '2021-10-01 17:12:00', 8, '', 'Recovered'),
('947676767685546016000001633015440000R', '94767676768554601600000', '', '2021-09-30 20:54:00', 8, NULL, NULL, 'Asthma', 'Active'),
('947812313446996672000001633085160000R', '94781231344699667200000', '', '2021-10-01 16:16:00', 8, NULL, NULL, '', 'Active');

--
-- Dumping data for table `password_reset`
--

INSERT INTO `password_reset` (`id`, `email`, `token`, `is_used`) VALUES
(1, 'cvaas@ymail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImN2YWFzQHltYWlsLmNvbSIsImlhdCI6MTYzMjIyODY5MSwiZXhwIjoxNjMyMjI5ODkxfQ.o6IETTiNWpJe8pMpGSD-o-5OZ5oSQLfdKIYhCCSIZ2g', 0),
(14, 'emailclienttest69@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoZXNzY3ViZWNoZXNzY29tQGdtYWlsLmNvbSIsImlhdCI6MTYzMjMxNTMzMSwiZXhwIjoxNjMyMzE2NTMxfQ.tazlTWnhnKpbJuZP5W8Y-6uyLY1eiUIF5ZVC5C5sl6o', 1),
(15, 'emailclienttest69@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoZXNzY3ViZWNoZXNzY29tQGdtYWlsLmNvbSIsImlhdCI6MTYzMjMxNzI4OSwiZXhwIjoxNjMyMzE4NDg5fQ.GlGgxc_2j25eT9cXkY3Crd-RgcMyY-f5m4T28c75b4o', 1),
(16, 'emailclienttest69@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoZXNzY3ViZWNoZXNzY29tQGdtYWlsLmNvbSIsImlhdCI6MTYzMjMxNzcxMiwiZXhwIjoxNjMyMzE4OTEyfQ.tUT_Njh9gSjGIQdl1oXoAdVQ12QxPMgYlcrknxZ4XNc', 1),
(17, 'emailclienttest69@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoZXNzY3ViZWNoZXNzY29tQGdtYWlsLmNvbSIsImlhdCI6MTYzMjM5MzU2MiwiZXhwIjoxNjMyMzk0NzYyfQ.JbPytwHIQKzgpQZa6ED7WfjVSPowUbPYqDDVKvNrGws', 0),
(18, 'emailclienttest69@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoZXNzY3ViZWNoZXNzY29tQGdtYWlsLmNvbSIsImlhdCI6MTYzMzAwNjI2OSwiZXhwIjoxNjMzMDA3NDY5fQ.x5lOwREQVz56B9FVhY4AUt67tv7m4eocyTP-bHs1NPU', 1),
(19, 'emailclienttest69@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsY2xpZW50dGVzdDY5QGdtYWlsLmNvbSIsImlhdCI6MTYzMzA4NzM3MSwiZXhwIjoxNjMzMDg4NTcxfQ.14MsXxehxYax23wSYigJND_1kkNVbZAw90jp69OZ2ao', 1);

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`patient_id`, `name`, `bday`, `address`, `district`, `blood_type`, `age`, `contact_no`, `gender`, `is_Vaccinated`, `Type_vaccine`, `Num_vaccine`) VALUES
('009987525V', 'Kimmi Dekeyser', NULL, '169 Bashford Circle', 'Colombo', 'O-', 15, '0785002507', NULL, 0, NULL, 0),
('011169845X', 'Marlow Blockley', NULL, '76441 Columbus Alley', 'Colombo', 'O-', 19, '0781595378', NULL, 0, NULL, 0),
('011557052V', 'Aguste Cankett', NULL, '9 Green Ridge Lane', 'Colombo', 'AB-', 84, '0767587424', NULL, 0, NULL, 0),
('018684518V', 'Uta Scawton', NULL, '6 Ridge Oak Park', 'Gampaha', 'AB+', 83, '0786747275', NULL, 0, NULL, 0),
('022413099X', 'Jesselyn Noni', NULL, '44 Amoth Center', 'Gampaha', 'A-', 72, '0780771301', NULL, 1, NULL, 0),
('023655619V', 'Camella Woodyatt', NULL, '096 Holy Cross Lane', 'Gampaha', 'A-', 58, '0767963443', NULL, 0, NULL, 0),
('032315425V', 'Rorie Grabb', NULL, '3806 Dahle Trail', 'Kandy', 'O+', 78, '0755358255', NULL, 1, NULL, 0),
('059297390X', 'Bert Powlesland', NULL, '3794 Sycamore Pass', 'Kandy', 'O+', 30, '0762396185', NULL, 1, NULL, 0),
('078655125V', 'Emily Grinyov', NULL, '97898 Novick Court', 'Kandy', 'O+', 82, '0751054057', NULL, 0, NULL, 0),
('111897875V', 'Minna Knight', NULL, '05776 Stuart Plaza', 'Kalutara', 'AB-', 13, '0783951159', NULL, 0, NULL, 0),
('117733791V', 'Edward Martensen', NULL, '8 Erie Plaza', 'Kalutara', 'O+', 74, '0751277492', NULL, 1, NULL, 0),
('129560268X', 'Gerrilee Hakes', NULL, '0 Linden Junction', 'Kalutara', 'O+', 13, '0758963596', NULL, 0, NULL, 0),
('139395201V', 'Zsa zsa Dinsmore', NULL, '9914 Emmet Trail', 'Galle', 'A-', 51, '0765735076', NULL, 1, NULL, 0),
('173225931V', 'Talbot Askaw', NULL, '03 Declaration Parkway', 'Galle', 'A+', 43, '0769889581', NULL, 0, NULL, 0),
('206240953X', 'Caressa Weagener', NULL, '0 Green Terrace', 'Matara', 'O-', 75, '0769037950', NULL, 1, NULL, 0),
('208969701X', 'Angelika Jeannin', NULL, '7 Cambridge Crossing', 'Galle', 'A-', 10, '0784995463', NULL, 0, NULL, 0),
('211195228V', 'Marsiella Pembery', NULL, '85972 Walton Court', 'Matara', 'O+', 51, '0784298535', NULL, 1, NULL, 0),
('211837365X', 'Celestyn Fishpoole', NULL, '55020 Meadow Vale Junction', 'Matara', 'O-', 39, '0727539150', NULL, 1, NULL, 0),
('214604804X', 'Pancho Rickeard', NULL, '2193 Carey Center', 'Hambantota', 'B-', 21, '0728013048', NULL, 1, NULL, 0),
('224650919V', 'Sadye MacWhan', NULL, '7174 Sachs Road', 'Hambantota', 'B+', 49, '0781708650', NULL, 0, NULL, 0),
('224849687V', 'Ryann Basindale', NULL, '39 Columbus Drive', 'Hambantota', 'AB-', 48, '0782355078', NULL, 1, NULL, 0),
('234354828V', 'Cullen Breslane', NULL, '9 Fieldstone Parkway', 'Matale', 'AB+', 29, '0728247971', NULL, 1, NULL, 0),
('237854928X', 'Sabina Hekkert', NULL, '3023 8th Point', 'Matale', 'AB+', 51, '0783215839', NULL, 0, NULL, 0),
('240892633V', 'Brew Crowcher', NULL, '9924 Upham Crossing', 'Matale', 'A-', 30, '0764796748', NULL, 0, NULL, 0),
('269051204V', 'Hilarius Perell', NULL, '12282 2nd Lane', 'NuwaraEliya', 'A-', 56, '0709413770', NULL, 0, NULL, 0),
('272944246V', 'Gus Buxcy', NULL, '732 Roxbury Place', 'NuwaraEliya', 'O-', 35, '0767786196', NULL, 1, NULL, 0),
('275984016V', 'Marlyn Cuffley', NULL, '2795 Hansons Way', 'NuwaraEliya', 'O+', 45, '0787156404', NULL, 1, NULL, 0),
('278901015V', 'Tiphani Garratt', NULL, '7 Brentwood Way', 'Kegalle', 'O+', 50, '0760269265', NULL, 1, NULL, 0),
('282595281X', 'Ambrosius Eads', NULL, '26309 Prentice Court', 'Kegalle', 'A-', 60, '0767866700', NULL, 1, NULL, 0),
('283027297V', 'Gale McEntagart', NULL, '55 La Follette Pass', 'Kegalle', 'O-', 51, '0789269894', NULL, 1, NULL, 0),
('290084850X', 'Selby Jaggar', NULL, '1 Sommers Center', 'Ratnapura', 'B+', 56, '0718784232', NULL, 1, NULL, 0),
('291758116V', 'Heinrick Poe', NULL, '810 Carberry Way', 'Ratnapura', 'A+', 16, '0788655360', NULL, 1, NULL, 0),
('300180403X', 'Felicio Stidworthy', NULL, '2 Tennyson Drive', 'Ratnapura', 'B-', 60, '0780148305', NULL, 1, NULL, 0),
('300819639X', 'Kellsie Goves', NULL, '993 Shoshone Drive', 'Kurunegala', 'O-', 30, '0769991139', NULL, 1, NULL, 0),
('313585522X', 'Rhona Lummus', NULL, '6218 Caliangt Center', 'Kurunegala', 'A+', 7, '0761329354', NULL, 1, NULL, 0),
('320796919V', 'Noam Freed', NULL, '1836 Petterle Way', 'Kurunegala', 'O-', 35, '0782489670', NULL, 1, NULL, 0),
('321595092X', 'Octavia Klimkin', NULL, '661 Center Trail', 'Puttalam', 'A+', 89, '0783320789', NULL, 1, NULL, 0),
('325714283V', 'Chiarra Whymark', NULL, '4 Evergreen Place', 'Puttalam', 'O+', 82, '0760934115', NULL, 1, NULL, 0),
('344645956V', 'Ada Howe', NULL, '5347 Raven Parkway', 'Puttalam', 'O-', 39, '0785910732', NULL, 1, NULL, 0),
('345286813V', 'Zulema Hacon', NULL, '119 Jackson Trail', 'Polonnaruwa', 'O+', 73, '0756067549', NULL, 1, NULL, 0),
('347685825V', 'Tedi Mallabone', NULL, '6644 Fallview Plaza', 'Polonnaruwa', 'O+', 50, '0780722872', NULL, 1, NULL, 0),
('366346792X', 'Anett Rapsey', NULL, '51249 Sunfield Trail', 'Polonnaruwa', 'AB-', 72, '0768707547', NULL, 1, NULL, 0),
('389231984V', 'Launce Patriche', NULL, '06 Hermina Park', 'Anuradhapura	', 'O+', 36, '0775342114', NULL, 1, NULL, 0),
('398434626X', 'Bran Iacapucci', NULL, '55497 Debra Alley', 'Anuradhapura	', 'A-', 16, '0751086942', NULL, 1, NULL, 0),
('418781265V', 'Ted Hatch', NULL, '8 Stuart Parkway', 'Anuradhapura	', 'O+', 53, '0786042502', NULL, 1, NULL, 0),
('433591507X', 'Humfrey Harlock', NULL, '0739 Spohn Pass', 'Ampara', 'AB+', 72, '0786319993', NULL, 1, NULL, 0),
('434256607X', 'Leila Stellin', NULL, '55120 Sunfield Place', 'Ampara', 'O+', 62, '0789439162', NULL, 1, NULL, 0),
('440940435X', 'Robin Giraudoux', NULL, '5532 Butternut Center', 'Ampara', 'AB-', 57, '0767745827', NULL, 1, NULL, 0),
('453105769V', 'Lorenza Placide', NULL, '2 Park Meadow Lane', 'Batticaloa', 'O+', 17, '0760174364', NULL, 1, NULL, 0),
('453554765X', 'Currey Peinton', NULL, '919 Coleman Parkway', 'Batticaloa', 'A-', 80, '0768068127', NULL, 1, NULL, 0),
('463511888V', 'Lorettalorna Petrol', NULL, '63 Schlimgen Alley', 'Batticaloa', 'O+', 65, '0787779706', NULL, 1, NULL, 0),
('471197707V', 'Atlante Bickerstasse', NULL, '91309 Boyd Trail', 'Monaragala', 'O-', 68, '0783877196', NULL, 1, NULL, 0),
('491034116V', 'Blythe Lea', NULL, '8 Hooker Lane', 'Monaragala', 'AB-', 79, '0785798512', NULL, 1, NULL, 0),
('517531587V', 'Joey Berston', NULL, '044 Jackson Plaza', 'Monaragala', 'O-', 31, '0768259789', NULL, 1, NULL, 0),
('519036026X', 'Aprilette Remon', NULL, '78107 Sachs Park', 'Badulla', 'AB+', 12, '0768992461', NULL, 1, NULL, 0),
('537512857V', 'Brena Ruddy', NULL, '454 Portage Avenue', 'Badulla', 'B-', 49, '0787677849', NULL, 1, NULL, 0),
('561838411X', 'Caty Lampart', NULL, '47083 John Wall Point', 'Badulla', 'B+', 21, '0783852992', NULL, 1, NULL, 0),
('562325414X', 'Gabi Mugg', NULL, '7 Westridge Point', 'Jaffna', 'O+', 67, '0782446187', NULL, 1, NULL, 0),
('562529567V', 'Nicole Byre', NULL, '22942 Knutson Terrace', 'Jaffna', 'O+', 43, '0716705182', NULL, 1, NULL, 0),
('573322295X', 'Joshuah Vurley', NULL, '9177 Atwood Court', 'Jaffna', 'O+', 50, '0767581290', NULL, 1, NULL, 0),
('588339237V', 'Trever Vittori', NULL, '78344 Logan Place', 'Mannar', 'O-', 82, '0753637657', NULL, 1, NULL, 0),
('596497346X', 'Gerladina Squeers', NULL, '28 Autumn Leaf Terrace', 'Mannar', 'O+', 67, '0785601039', NULL, 1, NULL, 0),
('600385515X', 'Nikki Spreadbury', NULL, '2112 Thierer Alley', 'Mannar', 'O+', 57, '0752403517', NULL, 1, NULL, 0),
('616703616X', 'Charmane Glowach', NULL, '61878 Anderson Avenue', 'Vavuniya', 'O+', 34, '0761442297', NULL, 1, NULL, 0),
('622387967V', 'Meagan Mazella', NULL, '169 Kipling Trail', 'Vavuniya', 'AB-', 52, '0766579273', NULL, 1, NULL, 0),
('652971956V', 'Faun Frood', NULL, '50 Buena Vista Junction', 'Vavuniya', 'AB+', 47, '0784200036', NULL, 1, NULL, 0),
('661125809X', 'Fiann Renish', NULL, '4943 Northwestern Crossing', 'Mullaitivu', 'O+', 43, '0751109045', NULL, 1, NULL, 0),
('674849922X', 'Reagen McIlwaine', NULL, '09402 Mockingbird Park', 'Mullaitivu', 'O-', 25, '0783523930', NULL, 1, NULL, 0),
('687261109V', 'Langston Matzl', NULL, '03 Truax Pass', 'Mullaitivu', 'B-', 68, '0786726306', NULL, 1, NULL, 0),
('698100485V', 'Ashlie Scudder', NULL, '365 Gerald Parkway', 'Trincomalee', 'O-', 28, '0724294443', NULL, 1, NULL, 0),
('699517600X', 'Cart Osgar', NULL, '0396 Menomonie Junction', 'Trincomalee', 'B+', 38, '0780854530', NULL, 1, NULL, 0),
('718609729V', 'Vanessa Sharphurst', NULL, '63 Lakeland Terrace', 'Trincomalee', 'O-', 19, '0765123360', NULL, 1, NULL, 0),
('719532605V', 'Scarlett Shotboult', NULL, '598 Westridge Point', 'Colombo', 'O+', 15, '0702982834', NULL, 1, NULL, 0),
('725513042V', 'Thorvald Hubach', NULL, '6091 Truax Hill', 'Colombo', 'A+', 51, '0725004026', NULL, 1, NULL, 0),
('730325092V', 'Bastian Haccleton', NULL, '3 Dunning Crossing', 'Colombo', 'B+', 75, '0784970839', NULL, 1, NULL, 0),
('742208808V', 'Marion Franzoli', NULL, '0 Carpenter Center', 'Gampaha', 'O-', 14, '0784226573', NULL, 1, NULL, 0),
('754177356V', 'Tootsie Rosborough', NULL, '5 Susan Place', 'Gampaha', 'O-', 68, '0786683069', NULL, 1, NULL, 0),
('766960386X', 'Marigold Mocher', NULL, '20190 Main Junction', 'Gampaha', 'A+', 85, '0788734472', NULL, 1, NULL, 0),
('771143100X', 'Constantina Yepiskopov', NULL, '51007 Tony Circle', 'Kandy', 'B-', 67, '0763742656', NULL, 1, NULL, 0),
('794699363V', 'Agata Stranio', NULL, '9703 Anderson Center', 'Kandy', 'AB+', 58, '0785768149', NULL, 1, NULL, 0),
('817562678X', 'Chalmers Hazlegrove', NULL, '272 Golf Course Drive', 'Kandy', 'O-', 56, '0761224401', NULL, 1, NULL, 0),
('819572017V', 'Henrie Spinola', NULL, '7 Eagan Circle', 'Galle', 'O+', 77, '0710136086', NULL, 1, NULL, 0),
('824467812V', 'Moira Rawson', NULL, '36552 Cardinal Court', 'Galle', 'O+', 57, '0763969917', NULL, 1, NULL, 0),
('830824523X', 'Bunny Hanselman', NULL, '3 Kim Way', 'Galle', 'A-', 43, '0722804090', NULL, 1, NULL, 0),
('832730498X', 'Debbie Huerta', NULL, '59123 Veith Parkway', 'Colombo', 'AB+', 85, '0768658510', NULL, 1, NULL, 0),
('833680949V', 'Kakalina Alan', NULL, '221 Del Sol Parkway', 'Colombo', 'B-', 44, '0775241356', NULL, 1, NULL, 0),
('844979873V', 'Rosene Sander', NULL, '9 Shasta Crossing', 'Colombo', 'A+', 55, '0786376722', NULL, 1, NULL, 0),
('883482983X', 'Sisely Fipp', NULL, '41403 Sugar Court', 'Gampaha', 'O-', 53, '0786845529', NULL, 1, NULL, 0),
('891585711V', 'Hazel Ixer', NULL, '69 Holy Cross Center', 'Gampaha', 'O+', 54, '0784115428', NULL, 1, NULL, 0),
('894701332X', 'Isaiah Pien', NULL, '3 Delladonna Terrace', 'Gampaha', 'B+', 58, '0771608826', NULL, 1, NULL, 0),
('895608482X', 'Dotty Dolton', NULL, '79 Badeau Park', 'Kandy', 'O-', 52, '0714235104', NULL, 1, NULL, 0),
('922249289V', 'Ruby Auger', NULL, '16 Algoma Park', 'Kandy', 'A+', 11, '0762242173', NULL, 1, NULL, 0),
('930146530V', 'Heidie Richardes', NULL, '06179 Sullivan Street', 'Kandy', 'A+', 18, '0727216170', NULL, 1, NULL, 0),
('943726230V', 'Hetty Gerkens', NULL, '97992 Rutledge Alley', 'Kurunegala', 'O+', 32, '0762727724', NULL, 1, NULL, 0),
('94711111874949017600000', 'David Silva', '2000-01-28', '', 'Colombo', '', 21, '+94711111874', '', 0, NULL, 0),
('94767676768554601600000', 'Brian Lara', '1987-07-30', '', 'Ampara', '', 34, '+94767676768', '', 0, NULL, 0),
('94781231344699667200000', 'Andrew Flintoff', '1992-03-04', '', 'Kegalle', '', 29, '+94781231344', '', 0, NULL, 0),
('947878011X', 'Alwyn Newbery', NULL, '4 Huxley Trail', 'Kurunegala', 'AB+', 29, '0708257734', NULL, 1, NULL, 0),
('948156298X', 'Linnell Wilce', NULL, '02 Carberry Place', 'Kurunegala', 'O-', 68, '0764871750', NULL, 1, NULL, 0),
('951651607V', 'Nedda Pattisson', NULL, '24 Victoria Center', 'Colombo', 'AB-', 68, '0718696682', NULL, 1, NULL, 0),
('975582202X', 'Mireielle Venner', NULL, '27115 Northland Pass', 'Colombo', 'A-', 34, '0789267052', NULL, 1, NULL, 0),
('986735927V', 'Gertruda Hairon', NULL, '9282 Elmside Alley', 'Colombo', 'AB-', 60, '0752931493', NULL, 1, NULL, 0),
('994982204X', 'Dewey Di Batista', NULL, '98667 Jana Parkway', 'Gampaha', 'A-', 28, '0777066167', NULL, 1, NULL, 0);

--
-- Dumping data for table `test`
--

INSERT INTO `test` (`test_id`, `report_id`, `date`, `test_type`, `result`) VALUES
('1933571', '00000001', '2021-08-31 15:31:38', 'PCR', 1),
('1933572', '148701361', '2021-08-31 15:31:38', 'PCR', 1),
('1933577', '530309323', '2021-08-26 15:35:12', 'RAT', 0),
('1933578', '530309323', '2021-04-27 15:35:12', 'RAT', 1),
('1933587', '530309323', '2021-04-01 15:36:38', 'PCR', 1),
('947111118749490176000001632996540000T', '947111118749490176000001632996540000R', '2021-09-30 15:39:00', 'RAT', 1),
('947676767685546016000001633015440000T', '947676767685546016000001633015440000R', '2021-09-30 20:54:00', 'RAT', 1),
('947812313446996672000001633085160000T', '947812313446996672000001633085160000R', '2021-10-01 16:16:00', 'RAT', 1),
('947812313446996672000001633088700000T', '947812313446996672000001633085160000R', '2021-10-01 17:15:00', 'PCR', 1);

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `name`, `email`, `password`, `contact_no`, `user_type`, `is_deleted`) VALUES
('1', 'Max Muller', 'sdsds@dfd.cde', 'scdfdccscdvddvdd', '94112345678', 'MOH', 0),
('2', 'Raj Mans', 'fffffffs@dgfg.com', 'dsfdfddfdfd', '94771233214', 'HA', 0),
('3', 'Saman Silva', 'saman@ssam.com', 'abc123', '09845373', 'DOC', 0),
('4', 'Mahindra Nimal Perera', 'mohperera@moh.lk', '$2a$12$kNUBYGMYStKYw8rUgTRQlupC/Ejbpi9VwoXMSoA0PJn8o/k8V/Y5G', '94771255339', 'MOH', 0),
('585000000V', 'Saruman White', 'saruman@moh.lk', '$2a$12$KgsLLl.LtEN009LB7v07.e98udwRAgwEZB4kYwJpf15jrfEN0ou.2', '94783657493', 'MOH', 0),
('674351879V', 'Bilbo Baggins', 'bbaggins@pdn.lk', '$2a$12$vxY72MgRM39J2/nFtPVrR.fJXrXJtY58UAPLPQ15CobtQqnaT9LGy', '94778463958', 'DOC', 0),
('685001000X', 'Lord Elrond', 'elrond@council.com', '$2a$12$XSP3CTfNXcCcg.yEfQE84ecIbdm.IazaskPka5HuBXgMIxwddSPcO', '94770987654', 'DOC', 0),
('775000091X', 'Meriadoc Brandibuck', 'merryb@ymail.com', '$2a$12$LaLE1kFPK3OXFwRxpZsgV.lnhJEjkeYKHzuqIsD8PLf.qZSNXr3Gm', '94774548252', 'DOC', 0),
('785000000X', 'Frodo Baggins', 'fbaggins@moh.lk', '$2a$12$eUWgzACxGkJcn.N/55QmUeAJVJhdECFiDXiZOWDa6f96E1tVgPulK', '94761245673', 'MOH', 0),
('835000000V', 'Samwise Gamgee', 'samg@moh.lk', '$2a$12$EcLJus/zzu7OW0.8aC2iS.OqSVAcHmmRASu8TXzNWHZe/CNQLc30u', '94786475929', 'MOH', 0),
('874351179X', 'Peregrine Took', 'ptook@xyz.lk', '$2a$12$uvAXuECiBbspETAB2raEeOWvkqb/ORz8JFU7dtzOx21MpPOnordrG', '94786999393', 'HA', 0),
('874351879X', 'Gandalf Grey', 'ggrey@lotr.com', '$2a$12$gys7wFJsE.hfmfKxfGuEaOJnOuAtmleRnD6D4SeLsPBxQ17Hrk30S', '94765357805', 'HA', 0),
('903000000', 'Maximilian SchwarzMuller', 'test@test.com', '$2a$12$4/sDaQ1cRKS5YinAaRboGufz1Qu6IQ4fjaKpa8Rag7YJDLRC0Ne6m', '94777374840', 'HA', 0),
('903000001', 'Chaminda Vaas', 'cvaas@ymail.com', '$2a$12$86d/0koae7nYqEnbQyXcxOPvrw5HIm0QmKzQiEvmD7.oOzY7VvgNG', '94771237876', 'DOC', 0),
('903000002', 'Russel Arnold', 'rarnold@ymail.com', '$2a$12$86d/0koae7nYqEnbQyXcxOPvrw5HIm0QmKzQiEvmD7.oOzY7VvgNG', '94771234176', 'HA', 0),
('903000006', 'John Doe', 'john@example.com', '$2a$12$6fp4GPUb0awh9aE9Sog09.KP3wLCCqweJMW/KUOOU55oxGG.Edwtu', '94777374839', 'MOH', 0),
('903030303', 'Dale Steyn', 'dsteyn@pdn.lk', '$2a$12$fKNuOK8mQP30oOa.Se5iH.MAIUTPuXdiWBQl9Et.DrXgilvvhEf.m', '94763535353', 'HA', 0),
('903110000', 'Kusal Mendis', 'kmendis@moh.lk', '$2a$12$4ctgWsgLkQsYX8Y.QuS2/uXmWBDS1jLD1t/I0bEKcKZUeAd2NoRAC', '94712729729', 'DOC', 0),
('985003900', 'Greame Smith', 'gsmith@cmb.lk', '$2a$12$jRm546njzti4.LR.AQwn4O0f/h89IvOaLbr/ZohCHDQ41TMm6Bepq', '94776363737', 'DOC', 0),
('985090909X', 'Agent Smith', 'agentsmith@abc.lk', '$2a$12$vdx3WPwWrx5.OYFtmw4AdeLdwQrmTSOB6dfnWb4n1G9to7xc3RTO6', '94786575864', 'MOH', 0),
('985099000', 'Shaun Tait', 'shauntait@abc.com', '$2a$12$DQabVqY8ELp1OtktLevQuuBQiFx.Y/ctX2Ls2R6xLvhsiK5876IGO', '94779974839', 'HA', 0),
('985989800V', 'Keanu Reeves', 'keanur@cmb.lk', '$2a$12$Ud7pnOKd21wOlcR/q91.QOytU.28Nxn/1K5EuvX.N8rZzMCFBVqbG', '94769767978', 'DOC', 0),
('985991000', 'Mathew Hayden', 'mhayden@moh.com', '$2a$12$4NQ/oK5Il.5mlTNMGcfX.e7NNFExliOtx1SyeX3xZgYmLVF5Qa9Su', '94713393393', 'MOH', 0),
('986000670', 'Nimal Silva', 'nimalsilva@gmail.com', '$2a$12$xPA4Te60bp5K5kpDhHh1AO2E2Q5q2xqrWGXzKdrDf5YMYlXhWels.', '94764544644', 'DOC', 0),
('986005000', 'John Doe', 'emailclienttest69@gmail.com', '$2a$12$s5YxV8VIkCGZ90Tnrp0n5ewMSM1eg3FZvAOo7536mi/xi1FHx2UXu', '94777374839', 'HA', 0),
('986009000', 'John Doe', 'joh00n@example.com', '$2a$12$OpUdqlnjzhVFsaqgYuhjru.hu5SnU.F.aQwIrt7wCO/YoW0uJS6Iy', '94777374839', 'MOH', 0);

--
-- Dumping data for table `ward`
--

INSERT INTO `ward` (`id`, `ward_no`, `capacity`, `facility_id`, `ward_type`) VALUES
(1, '1', 10, 4, 'Covid'),
(2, '2', 10, 4, 'Normal'),
(3, '1', 10, 8, 'Covid'),
(4, '2', 10, 8, 'Normal'),
(5, '1', 5, 12, 'Covid'),
(6, '2', 5, 12, 'Normal');

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
