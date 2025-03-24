-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 24 Mar 2025, 16:37:37
-- Sunucu sürümü: 10.4.32-MariaDB
-- PHP Sürümü: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `event_app`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `event`
--

CREATE TABLE `event` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `location` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `event`
--

INSERT INTO `event` (`id`, `name`, `description`, `date`, `time`, `location`, `category`, `user_id`, `img`) VALUES
(20, 'Halısaha Maçı', 'Güzel bir maç istiyorsanız bekleriz...', '2025-01-30', '22:00:00', 'Seka Halısaha', 'Spor', '1', 'image1733083442679.jpg'),
(21, 'Kapadokya Turu', '3 gece 4 gün Eşşiz Kapadokya Turu... ', '2025-03-27', '20:00:00', 'Nevşehir kapadokya', 'Seyahat', '1', 'image1733083668571.jpg'),
(22, 'Gitar Kursu', 'Harika ekibimizle gitar öğrenme fırsatı...', '2024-12-30', '20:00:00', 'Komek seka', 'Müzik', '1', 'image1733083831897.jpg'),
(23, 'Bir Hamlet Baba', 'Kavuk sahibi Şevket Çoruh ile harika bir tiyatro deneyimi...', '2025-03-21', '20:30:00', 'Derince tiyatro', 'Tiyatro', '1', 'image1733084574452.jpg'),
(24, 'Joker Filmi', 'Joker yeniden bizlerle...', '2024-12-30', '20:00:00', 'İzmit Symbol AVM Cinemarine', 'Sinema', '1', 'image1733084811545.jpg'),
(25, 'Balkan Turu', '7 Gün Boyunca harika bir dneyim...', '2024-12-30', '20:00:00', 'mostar', 'Seyahat', '1', 'image1733085059722.jpg');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `recipient_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `participant`
--

CREATE TABLE `participant` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `participant`
--

INSERT INTO `participant` (`id`, `user_id`, `event_id`) VALUES
(7, 1, 7),
(32, 1, 15),
(33, 1, 14);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `point`
--

CREATE TABLE `point` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `points` int(11) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `point`
--

INSERT INTO `point` (`id`, `user_id`, `points`, `date`) VALUES
(10, 1, 10, '2024-11-28 00:00:00'),
(23, 1, 10, '2024-11-30 00:00:00'),
(24, 1, 10, '2024-11-30 00:00:00'),
(25, 1, 10, '2024-11-30 00:00:00'),
(26, 1, 10, '2024-11-30 00:00:00'),
(27, 1, 10, '2024-11-30 00:00:00'),
(28, 1, 10, '2024-11-30 00:00:00'),
(29, 1, 10, '2024-11-30 00:00:00'),
(30, 1, 10, '2024-11-30 00:00:00'),
(31, 1, 10, '2024-11-30 00:00:00'),
(32, 1, 10, '2024-11-30 00:00:00'),
(33, 1, 10, '2024-11-30 00:00:00'),
(34, 1, 10, '2024-11-30 00:00:00'),
(35, 1, 10, '2024-12-01 00:00:00'),
(36, 1, 10, '2024-12-01 00:00:00'),
(37, 1, 10, '2024-12-01 00:00:00'),
(38, 1, 10, '2024-12-01 00:00:00'),
(39, 1, 10, '2024-12-01 00:00:00'),
(40, 1, 10, '2024-12-01 00:00:00'),
(41, 1, 10, '2024-12-01 00:00:00'),
(65, 1, 15, '2024-12-01 00:00:00'),
(66, 1, 15, '2024-12-01 00:00:00'),
(67, 1, 15, '2024-12-01 00:00:00'),
(68, 1, 15, '2024-12-01 00:00:00'),
(69, 1, 15, '2024-12-01 00:00:00'),
(70, 1, 15, '2024-12-01 00:00:00');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(20) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `interest` varchar(255) DEFAULT NULL,
  `name_surname` varchar(255) NOT NULL,
  `birth` datetime NOT NULL,
  `gender` varchar(20) NOT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `email`, `location`, `interest`, `name_surname`, `birth`, `gender`, `phone_number`, `img`) VALUES
(1, 'ysf', 'ysf', 'test@gmail.com', 'Kocaeli', '', 'Yusuf Karakurt', '2024-01-01 00:00:00', 'Erkek', '', 'image1733084279031.png');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `participant`
--
ALTER TABLE `participant`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `point`
--
ALTER TABLE `point`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `event`
--
ALTER TABLE `event`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Tablo için AUTO_INCREMENT değeri `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `participant`
--
ALTER TABLE `participant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- Tablo için AUTO_INCREMENT değeri `point`
--
ALTER TABLE `point`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- Tablo için AUTO_INCREMENT değeri `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
