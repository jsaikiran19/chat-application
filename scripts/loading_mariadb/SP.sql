use chats;

DELIMITER $$
CREATE PROCEDURE `addNewUser`(IN user_mail text)
BEGIN
	INSERT INTO users_email(email) VALUES (user_mail);
	COMMIT;
END$$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `addOrg`(IN org_name text)
BEGIN
    INSERT INTO org(name) VALUES (org_name);
    COMMIT;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `addUserOrgDetails`(IN orgID int(11) , IN userID int(11))
BEGIN
	IF NOT EXISTS (SELECT 1 FROM users_org_details WHERE org_id = orgID AND uid = userID and is_active = 0)
	THEN
		INSERT INTO users_org_details (org_id,uid) VALUES (orgID,userID);
	ELSE 
		UPDATE users_org_details
		SET is_active = 1
		WHERE org_id = orgID and uid = userID;
	END IF;
    
    COMMIT;
END$$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `getOrg`()
BEGIN
    SELECT org_id,name FROM org;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `getUser`(IN user_mail text)
BEGIN
	SELECT uid,email,`password`
    FROM users_email 
    WHERE email = user_mail;
END$$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `getUserOrgDetails`(IN userID int(11))
BEGIN
	SELECT uid,GROUP_CONCAT(uo.org_id) as org_id,GROUP_CONCAT(o.name) as `name`
	FROM users_org_details uo
    JOIN org o ON uo.org_id = o.org_id
	WHERE uid = userID and is_active = 1
	GROUP BY uid;
END$$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `getUserProfile`(IN var_uid text)
BEGIN
	SELECT uid,first_name,last_name,status,profile_picture
    FROM users
    WHERE uid = var_uid;
END$$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `updateUserProfile`(IN var_uid text,IN var_first_name text,IN var_last_name text,IN var_status text,IN var_profile_picture blob)
BEGIN
	IF NOT EXISTS (SELECT 1 FROM users WHERE uid = var_uid)
    THEN
		INSERT INTO users (uid,first_name,last_name,status,profile_picture) VALUES
				(var_uid,var_first_name,var_last_name,var_status,var_profile_picture);
	ELSE
		UPDATE users
		SET first_name = var_first_name,last_name=var_last_name,status=var_status,profile_picture = var_profile_picture
		WHERE uid = var_uid;
	END IF;
    
    COMMIT;
END$$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `getOrgLevelUsers`(IN orgID text)
BEGIN
	SELECT org_id,GROUP_CONCAT(uo.uid) uid,GROUP_CONCAT(coalesce(first_name,email)) first_name
	FROM users_org_details uo
    LEFT JOIN users u ON uo.uid = u.uid
    LEFT JOIN users_email ue ON ue.uid = uo.uid
    WHERE org_id = orgID and is_active = 1
	GROUP BY org_id;
END$$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE `getChatId`(IN orgID text, IN uidArray text)
BEGIN
	DECLARE active_count INT;
	IF NOT EXISTS (SELECT 1 FROM user_id_channels WHERE org_id = orgID AND uid_array = uidArray)
    THEN
		INSERT INTO user_id_channels (org_id,uid_array) VALUES (orgID,uidArray);
	END IF;
    
    COMMIT;
    
	DROP TEMPORARY TABLE IF EXISTS temp;
	CREATE TEMPORARY TABLE temp AS
	select SUBSTRING_INDEX(uidArray,",",1) as users
	UNION
	SELECT SUBSTRING_INDEX(uidArray,",",-1) as users;

	SELECT SUM(is_active) into active_count
	FROM users_org_details uo
	JOIN temp t ON uo.uid = t.users 
	WHERE org_id = orgID AND is_active = 1;
    
    SELECT channel_id,org_id,uid_array
    FROM user_id_channels
    WHERE org_id = orgID AND uid_array = uidArray AND active_count = 2;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `update_user_org_details`(IN var_org text,IN var_uid text,IN var_active text)
BEGIN
	UPDATE users_org_details
	SET is_active = var_active
	WHERE org_id = var_org and uid = var_uid;
    
    COMMIT;
END$$
DELIMITER ;
