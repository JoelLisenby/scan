CREATE TABLE `scans` (
  `id` int(10) UNSIGNED NOT NULL,
  `date` datetime NOT NULL,
  `url` text NOT NULL,
  `result` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `scans`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `scans`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;