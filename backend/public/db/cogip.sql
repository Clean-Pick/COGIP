-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 29 jan. 2025 à 11:29
-- Version du serveur : 11.5.2-MariaDB
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS = @@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION = @@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `cogip`
--

-- --------------------------------------------------------

--
-- Structure de la table `companies`
--

DROP TABLE IF EXISTS `companies`;
CREATE TABLE IF NOT EXISTS `companies`
(
    `id`         int(11)     NOT NULL AUTO_INCREMENT,
    `name`       varchar(50) NOT NULL,
    `type_id`    int(11)     NOT NULL,
    `country`    varchar(50) NOT NULL,
    `tva`        varchar(50) NOT NULL,
    `created_at` datetime    NOT NULL DEFAULT current_timestamp(),
    `updated_at` datetime    NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`),
    KEY `type_id` (`type_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
CREATE TABLE IF NOT EXISTS `contacts`
(
    `id`         int(11)     NOT NULL AUTO_INCREMENT,
    `name`       varchar(50) NOT NULL,
    `company_id` int(11)     NOT NULL,
    `email`      varchar(50) NOT NULL,
    `phone`      varchar(50) NOT NULL,
    `created_at` datetime    NOT NULL DEFAULT current_timestamp(),
    `updated_at` datetime    NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`),
    KEY `company_id` (`company_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
CREATE TABLE IF NOT EXISTS `invoices`
(
    `id`         int(11)     NOT NULL AUTO_INCREMENT,
    `ref`        varchar(50) NOT NULL,
    `company_id` int(11)     NOT NULL,
    `created_at` datetime    NOT NULL DEFAULT current_timestamp(),
    `updated_at` datetime    NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`),
    KEY `company_id` (`company_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
CREATE TABLE IF NOT EXISTS `permissions`
(
    `id`         int(11)     NOT NULL AUTO_INCREMENT,
    `name`       varchar(50) NOT NULL,
    `created_at` datetime    NOT NULL DEFAULT current_timestamp(),
    `updated_at` datetime    NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles`
(
    `id`         int(11)     NOT NULL AUTO_INCREMENT,
    `name`       varchar(50) NOT NULL,
    `created_at` datetime    NOT NULL DEFAULT current_timestamp(),
    `updated_at` datetime    NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `roles_permission`
--

DROP TABLE IF EXISTS `roles_permission`;
CREATE TABLE IF NOT EXISTS `roles_permission`
(
    `id`            int(11) NOT NULL AUTO_INCREMENT,
    `permission_id` int(11) NOT NULL,
    `role_id`       int(11) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `permission_id` (`permission_id`),
    KEY `role_id` (`role_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `types`
--

DROP TABLE IF EXISTS `types`;
CREATE TABLE IF NOT EXISTS `types`
(
    `id`         int(11)     NOT NULL AUTO_INCREMENT,
    `name`       varchar(50) NOT NULL,
    `created_at` datetime    NOT NULL DEFAULT current_timestamp(),
    `updated_at` datetime    NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users`
(
    `id`         int(11)     NOT NULL AUTO_INCREMENT,
    `first_name` varchar(50) NOT NULL,
    `role_id`    int(11)     NOT NULL,
    `last_name`  varchar(50) NOT NULL,
    `email`      varchar(50) NOT NULL,
    `password`   varchar(50) NOT NULL,
    `created_at` datetime    NOT NULL DEFAULT current_timestamp(),
    `updated_at` datetime    NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`),
    KEY `role_id` (`role_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `companies`
--
ALTER TABLE `companies`
    ADD CONSTRAINT `companies_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `types` (`id`);

--
-- Contraintes pour la table `contacts`
--
ALTER TABLE `contacts`
    ADD CONSTRAINT `contacts_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`);

--
-- Contraintes pour la table `invoices`
--
ALTER TABLE `invoices`
    ADD CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`);

--
-- Contraintes pour la table `roles_permission`
--
ALTER TABLE `roles_permission`
    ADD CONSTRAINT `roles_permission_ibfk_1` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`),
    ADD CONSTRAINT `roles_permission_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
    ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;
-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 29 jan. 2025 à 11:29
-- Version du serveur : 11.5.2-MariaDB
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS = @@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION = @@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `cogip`
--

-- --------------------------------------------------------

--
-- Structure de la table `companies`
--

DROP TABLE IF EXISTS `companies`;
CREATE TABLE IF NOT EXISTS `companies`
(
    `id`         int(11)     NOT NULL AUTO_INCREMENT,
    `name`       varchar(50) NOT NULL,
    `type_id`    int(11)     NOT NULL,
    `country`    varchar(50) NOT NULL,
    `tva`        varchar(50) NOT NULL,
    `created_at` datetime    NOT NULL DEFAULT current_timestamp(),
    `updated_at` datetime    NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`),
    KEY `type_id` (`type_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
CREATE TABLE IF NOT EXISTS `contacts`
(
    `id`         int(11)     NOT NULL AUTO_INCREMENT,
    `name`       varchar(50) NOT NULL,
    `company_id` int(11)     NOT NULL,
    `email`      varchar(50) NOT NULL,
    `phone`      varchar(50) NOT NULL,
    `created_at` datetime    NOT NULL DEFAULT current_timestamp(),
    `updated_at` datetime    NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`),
    KEY `company_id` (`company_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
CREATE TABLE IF NOT EXISTS `invoices`
(
    `id`         int(11)     NOT NULL AUTO_INCREMENT,
    `ref`        varchar(50) NOT NULL,
    `price`      float       NOT NULL DEFAULT 0,
    `company_id` int(11)     NOT NULL,
    `created_at` datetime    NOT NULL DEFAULT current_timestamp(),
    `updated_at` datetime    NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`),
    KEY `company_id` (`company_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
CREATE TABLE IF NOT EXISTS `permissions`
(
    `id`         int(11)     NOT NULL AUTO_INCREMENT,
    `name`       varchar(50) NOT NULL,
    `created_at` datetime    NOT NULL DEFAULT current_timestamp(),
    `updated_at` datetime    NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles`
(
    `id`         int(11)     NOT NULL AUTO_INCREMENT,
    `name`       varchar(50) NOT NULL,
    `created_at` datetime    NOT NULL DEFAULT current_timestamp(),
    `updated_at` datetime    NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `roles_permission`
--

DROP TABLE IF EXISTS `roles_permission`;
CREATE TABLE IF NOT EXISTS `roles_permission`
(
    `id`            int(11) NOT NULL AUTO_INCREMENT,
    `permission_id` int(11) NOT NULL,
    `role_id`       int(11) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `permission_id` (`permission_id`),
    KEY `role_id` (`role_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `types`
--

DROP TABLE IF EXISTS `types`;
CREATE TABLE IF NOT EXISTS `types`
(
    `id`         int(11)     NOT NULL AUTO_INCREMENT,
    `name`       varchar(50) NOT NULL,
    `created_at` datetime    NOT NULL DEFAULT current_timestamp(),
    `updated_at` datetime    NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users`
(
    `id`         int(11)     NOT NULL AUTO_INCREMENT,
    `first_name` varchar(50) NOT NULL,
    `role_id`    int(11)     NOT NULL,
    `last_name`  varchar(50) NOT NULL,
    `email`      varchar(50) NOT NULL,
    `password`   varchar(50) NOT NULL,
    `created_at` datetime    NOT NULL DEFAULT current_timestamp(),
    `updated_at` datetime    NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`),
    KEY `role_id` (`role_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `companies`
--
ALTER TABLE `companies`
    ADD CONSTRAINT `companies_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `types` (`id`)
        ON DELETE CASCADE ON UPDATE CASCADE;
--
-- Contraintes pour la table `contacts`
--
ALTER TABLE `contacts`
    ADD CONSTRAINT `contacts_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`)
        ON DELETE CASCADE ON UPDATE CASCADE;
--
-- Contraintes pour la table `invoices`
--
ALTER TABLE `invoices`
    ADD CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`)
        ON DELETE CASCADE ON UPDATE CASCADE;
--
-- Contraintes pour la table `roles_permission`
--
ALTER TABLE `roles_permission`
    ADD CONSTRAINT `roles_permission_ibfk_1` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`),
    ADD CONSTRAINT `roles_permission_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
    ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;
