-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- ホスト: 127.0.0.1
-- 生成日時: 
-- サーバのバージョン： 10.4.8-MariaDB
-- PHP のバージョン: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- データベース: `quiz`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- テーブルのデータのダンプ `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_11_04_082538_add_score_to_users', 2),
(6, '2019_11_05_132907_drop_columns_users_table', 4),
(8, '2019_11_05_153300_add_columns_to_tests_table', 6),
(9, '2014_10_12_000000_create_users_table', 7),
(10, '2014_10_12_100000_create_password_resets_table', 7),
(11, '2019_11_04_092346_create_questions_table', 7),
(12, '2019_11_05_134245_create_tests_table', 7),
(13, '2019_11_05_160027_create_tests_table', 8),
(14, '2019_11_07_150855_create_tests_table', 9);

-- --------------------------------------------------------

--
-- テーブルの構造 `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `questions`
--

CREATE TABLE `questions` (
  `QnId` bigint(20) UNSIGNED NOT NULL,
  `Qn` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ImageName` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Option1` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Option2` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Option3` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Option4` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Answer` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- テーブルのデータのダンプ `questions`
--

INSERT INTO `questions` (`QnId`, `Qn`, `ImageName`, `Option1`, `Option2`, `Option3`, `Option4`, `Answer`) VALUES
(1, '今度の家は、近くに公園や川があって（　　　　　）がいい。', NULL, '場面', '結構', '環境', '自然', 3),
(2, '一人ずつ（　　　　　）歌ってもらいましょう。', NULL, '番号に', '順番に', '順調に', '調子に', 2),
(3, '病気の母が泣いて止めたけれど、（　　　　　　）留学したい気持ちは変わらなかった。', NULL, 'それとも', 'それで', 'それなら', 'それでも', 4),
(4, 'めずらしい魚が（　　　　　　）されました。', NULL, '発明', '発見', '発行', '発想', 2),
(5, '来月のコンサートの（　　　　　）には、好きな曲があまり入っていない。', NULL, 'ダイヤ', 'スタイル', 'リズム', 'プログラム', 4),
(6, 'お父さまに、あさっての午前１１時にうかがうと（　　　　　）ください。', NULL, 'お届け', 'お渡し', 'お伝え', 'お配り', 3),
(7, '弟は、バイオリンのコンクールで（　　　　　　）になったことがある。', NULL, '三回', '三目', '三位', '三部', 3),
(8, '年に一度の祭の日は、町（　　　　　）が活気に満ちている。', NULL, '全身', '全体', '全力', '全集', 2),
(9, 'むだな抵抗はやめて、（　　　　　　）武器をすてて出てきなさい。', NULL, 'げんに', 'ただちに', 'ついに', 'めったに', 2),
(10, '冷蔵庫の奥から古い肉を出し、鼻を（　　　　　）においをかいでみた。', NULL, 'ふり向いて', '付き合って', 'あてはめて', '近づけて', 4);

-- --------------------------------------------------------

--
-- テーブルの構造 `tests`
--

CREATE TABLE `tests` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `score` int(11) DEFAULT NULL,
  `timeSpent` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- テーブルのデータのダンプ `tests`
--

INSERT INTO `tests` (`id`, `user_id`, `score`, `timeSpent`) VALUES
(1, 1, 8, 30),
(2, 1, 7, 120),
(3, 1, 7, 5),
(4, 1, 5, 66),
(5, 1, 10, 80),
(6, 1, 3, 88),
(7, 1, 10, 60),
(8, 1, 6, 13),
(9, 1, 2, 4),
(10, 1, 4, 4),
(11, 1, 2, 5),
(12, 1, 4, 5);

-- --------------------------------------------------------

--
-- テーブルの構造 `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- テーブルのデータのダンプ `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'thanh', 'abc123@gmail.com', NULL, '$2y$10$rEfgGbQX9ZBslR04EL.6f.5Nn8ZZ1V/TcjMKduRaZsvT7OEbAIXA.', NULL, '2019-11-05 07:10:48', '2019-11-05 07:10:48'),
(2, 'thanh', 'nvt502@gmail.com', NULL, '$2y$10$HQ922KS4Oq/0zxc3KpPsnOoYIupBuxRXhXMVpFjYwzseIjIGVkY0W', NULL, '2019-11-06 03:57:12', '2019-11-06 03:57:12');

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- テーブルのインデックス `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`QnId`);

--
-- テーブルのインデックス `tests`
--
ALTER TABLE `tests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tests_user_id_foreign` (`user_id`);

--
-- テーブルのインデックス `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- ダンプしたテーブルのAUTO_INCREMENT
--

--
-- テーブルのAUTO_INCREMENT `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- テーブルのAUTO_INCREMENT `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- テーブルのAUTO_INCREMENT `questions`
--
ALTER TABLE `questions`
  MODIFY `QnId` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- テーブルのAUTO_INCREMENT `tests`
--
ALTER TABLE `tests`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- テーブルのAUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- ダンプしたテーブルの制約
--

--
-- テーブルの制約 `tests`
--
ALTER TABLE `tests`
  ADD CONSTRAINT `tests_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
