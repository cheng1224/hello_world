CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `user_name` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `level` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `card_dimension` (
  `id` int(11) NOT NULL,
  `color` int(11) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `user_name` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `out_pwd` varchar(20) DEFAULT NULL,
  `account` varchar(20) DEFAULT NULL,
  `money_total` decimal(10,0) NOT NULL DEFAULT '0',
  `is_ machine` varchar(1) DEFAULT '0',
  `tenant_id` int(11) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `last_updated` datetime DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `source` varchar(20) DEFAULT NULL,
  `attr1` varchar(45) DEFAULT NULL,
  `attr2` varchar(45) DEFAULT NULL,
  `attr3` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `customer_money` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(1) DEFAULT NULL COMMENT '0 充值、提现\n1 游戏输赢\n',
  `money` decimal(10,0) NOT NULL DEFAULT '0',
  `money_total` decimal(10,0) NOT NULL DEFAULT '0',
  `customer_id` int(11) NOT NULL,
  `tenant_id` int(11) DEFAULT NULL,
  `is_play` varchar(1) DEFAULT NULL,
  `play_type` varchar(1) DEFAULT NULL,
  `play_id` int(11) DEFAULT NULL,
  `is_add` varchar(1) DEFAULT NULL COMMENT '0 金额减少\n1 金额增加',
  `date_created` datetime DEFAULT NULL,
  `last_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(45) DEFAULT NULL,
  `send_date` datetime DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `last_updated` datetime DEFAULT NULL,
  `tenant_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `play` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(1) NOT NULL COMMENT '0 彩票类\n1 棋牌类',
  `name` varchar(20) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `start_time` datetime DEFAULT NULL COMMENT '游戏时间段，比如早上10点-晚上3点为游戏时间段，其它时间不开奖',
  `end_time` datetime DEFAULT NULL,
  `is_machine` varchar(1) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `last_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `play_bet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `play_id` varchar(45) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `bet_money` decimal(10,0) DEFAULT NULL,
  `tenant_id` int(11) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `last_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `play_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '期数',
  `category` varchar(1) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `is_open` varchar(1) DEFAULT '0' COMMENT '0 未开奖\n1 已经开奖',
  `open_date` datetime DEFAULT NULL,
  `num1` int(11) DEFAULT NULL,
  `num2` int(11) DEFAULT NULL,
  `num3` int(11) DEFAULT NULL,
  `num4` int(11) DEFAULT NULL,
  `num5` int(11) DEFAULT NULL,
  `num6` int(11) DEFAULT NULL,
  `num7` int(11) DEFAULT NULL,
  `num8` int(11) DEFAULT NULL,
  `num9` int(11) DEFAULT NULL,
  `num10` int(11) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `last_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tenant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(512) DEFAULT NULL,
  `type` varchar(32) DEFAULT NULL,
  `owner` varchar(32) DEFAULT NULL,
  `version` int(11) DEFAULT '0',
  `create_user` int(11) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `update_user` int(11) DEFAULT NULL,
  `last_updated` datetime DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `customer_type` varchar(255) DEFAULT NULL,
  `channel_source` varchar(255) DEFAULT NULL,
  `su_id` bigint(20) DEFAULT '1',
  `remark` varchar(512) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `industry` varchar(255) DEFAULT NULL,
  `customer_code` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `token` (
  `token_id` int(11) NOT NULL AUTO_INCREMENT,
  `app_id` varchar(50) DEFAULT NULL,
  `customer_id` int(11) NOT NULL,
  `tenant_id` int(11) DEFAULT NULL,
  `token` varchar(100) NOT NULL,
  `expires` int(11) NOT NULL,
  `expired_on` datetime NOT NULL,
  `device_id` varchar(200) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  `created_on` datetime DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`token_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19540 DEFAULT CHARSET=utf8;