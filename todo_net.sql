-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Авг 28 2017 г., 22:29
-- Версия сервера: 5.5.53
-- Версия PHP: 5.5.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `todo_net`
--

-- --------------------------------------------------------

--
-- Структура таблицы `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `projects`
--

INSERT INTO `projects` (`id`, `name`, `user_id`) VALUES
(1, 'Complete the test task for Ruby Garage', 1),
(2, 'For Home', 1),
(3, 'new todo list', 1),
(4, 'new 2d', 2),
(5, 'sad', 2),
(6, 'gfdgfdghjh6666', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `name` varchar(1000) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `deadline` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `priority` tinyint(4) NOT NULL,
  `project_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `tasks`
--

INSERT INTO `tasks` (`id`, `name`, `status`, `deadline`, `priority`, `project_id`) VALUES
(1, '1. Create new mock-up in Adobe Fireworks', 0, '2017-08-09 16:42:13', 2, 1),
(2, '2.Attentively check the file', 0, '2017-08-09 16:42:06', 3, 1),
(3, '3.Write HTML & CSS', 0, '2017-08-09 16:42:13', 1, 1),
(4, '4.Add JavaScript to implement adding / editing / removing for todo items and lists taking into account as more use cases ass possible', 0, '2017-07-18 12:22:07', 4, 1),
(5, '1. Buy a milk', 0, '2017-08-09 16:42:24', 2, 2),
(6, '2. Call Mom', 1, '2017-08-09 16:42:00', 1, 2),
(7, '3. Clean the room', 0, '2017-08-09 16:42:25', 3, 2),
(8, '4. Repair the DVD Player', 1, '2017-08-09 16:42:25', 4, 2),
(44, 'new task', 0, '2017-08-05 17:21:11', 1, 3),
(45, 'new task 2dfsdfdsfsdjkhf23!!!!! !!!as!!sd', 0, '2017-08-07 17:57:31', 2, 3),
(46, 'newline 11', 0, '2017-02-01 18:11:33', 2, 4),
(47, 'newline 22!23', 0, '2017-08-09 16:41:50', 1, 4),
(49, 'asdasgfghf', 1, '2017-08-09 16:44:12', 1, 5),
(53, 'wewewe', 0, '2017-08-11 18:02:26', 3, 4);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `salt` varchar(64) NOT NULL,
  `joined` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `salt`, `joined`) VALUES
(1, 'JohnDoe', '$2y$10$4l6lMy91HCin7xTW0/oXL.2CtP.o7R3rfQkNpeZ.uCDKa1sQqkGCa', '', '0000-00-00 00:00:00'),
(2, 'John Snow', '$2y$12$vwH2Eyz7uIMD0UN9jAdcd.LyYiAMteGks3tC3WiD185VtZwF9O.kS', '', '0000-00-00 00:00:00'),
(3, 'user1', '$2y$10$qvvb.AoXZJDHKGxerNUifOF4twrrdVPLr2U1ehw8MtjLlQYLrtJTW', '', '2017-08-28 21:40:19'),
(4, 'user2', '$2y$10$rpHtcHDRkKGLpZ5hngNWRuM3d3HeetE7TLvO220.cjVlXcpoGrVoy', '', '2017-08-28 21:44:05'),
(5, 'user3', '$2y$10$.cch0dSCheTqnTGx/tFe4u9Z9qcPIvD.NG9HfnezpZzeky3k6rtxW', '', '2017-08-28 22:19:25'),
(6, 'user4', '$2y$10$Sz1FCdjsG5tD5pZIOu6jXO9RupJaLcCZTiQgAQUzGMRvrUxvwkCU2', '', '2017-08-28 22:23:10'),
(7, 'user5', '$2y$10$Dai//geopqNG5C1jQVFVoeVCgqyy6J7Dyppk7AhYNIWa64S/rs8IO', '', '2017-08-28 22:26:30');

-- --------------------------------------------------------

--
-- Структура таблицы `users_session`
--

CREATE TABLE `users_session` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `hash` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users_session`
--

INSERT INTO `users_session` (`id`, `user_id`, `hash`) VALUES
(2, 2, '25ace679b5ab2853ad60ea3cfcf6bbfa4c316bc658a810cce7ef8d2d65c88b44'),
(3, 4, 'a3296f00717b61ab3259040d0194115e82b1a4e2ab2f711c6dd8d4b7b7ccf9fc'),
(4, 6, 'b174921aa55d3ee2399a2d18f601331bbed22c95ef7507eb89c9c24546a3b937'),
(5, 7, '4f31183d0915cdf4e3efb05f023600e6c9602ac9e4728a1328984ace5262d757');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users_session`
--
ALTER TABLE `users_session`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT для таблицы `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;
--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT для таблицы `users_session`
--
ALTER TABLE `users_session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
