package handlers

import (
	utils "chat/utils"
	"fmt"
	"log"
	"strings"
)

// GetUserQueryHandler gets details about user and org
func GetUserQueryHandler(UserDetail UserDetailsBase) UserDetailsStruct {
	var UserDetails UserDetailsStruct

	db := utils.OpenMySqlConnection()
	query := fmt.Sprintf("CALL getUser(\"%s\")", UserDetail.UserMail)
	rows, err := db.Query(query)
	if err != nil {
		panic(err.Error())
	}
	for rows.Next() {
		err = rows.Scan(&UserDetails.Uid, &UserDetails.UserMail, &UserDetails.UserPassword)
		if err != nil {
			panic(err.Error())
		}
	}
	db.Close()

	log.Println("Database Connection Closed...")

	return UserDetails
}

// GetUserOrgDetailsQueryHandler gets details about user and org
func GetUserOrgDetailsQueryHandler(userId string) UserOrgDetailsStruct {
	var UserOrgDetails UserOrgDetailsBase
	var orgArray []string

	db := utils.OpenMySqlConnection()
	query := "CALL getUserOrgDetails(" + userId + ")"
	rows, err := db.Query(query)
	for rows.Next() {
		err = rows.Scan(&UserOrgDetails.Uid, &UserOrgDetails.OrgId)
		if err != nil {
			panic(err.Error())
		}
		orgArray = strings.Split(UserOrgDetails.OrgId, ",")
	}

	db.Close()

	log.Println("Database Connection Closed...")

	return UserOrgDetailsStruct{UserOrgDetails.Uid, orgArray}
}

// GetUserProfileQueryHandler gets details about user and org
func GetUserProfileQueryHandler(userId string) UserProfileDetailsStruct {
	var UserProfileDetails UserProfileDetailsStruct

	db := utils.OpenMySqlConnection()
	query := "CALL getUserProfile(" + userId + ")"
	rows, err := db.Query(query)
	for rows.Next() {
		err = rows.Scan(&UserProfileDetails.Uid, &UserProfileDetails.FirstName, &UserProfileDetails.LastName,
			&UserProfileDetails.Status, &UserProfileDetails.ProfilePicture)
		if err != nil {
			panic(err.Error())
		}
	}

	db.Close()

	log.Println("Database Connection Closed...")

	return UserProfileDetails
}

//UpdateUserProfileQueryHandler upserts user profile
func UpdateUserProfileQueryHandler(userProfileRequestPayload UserProfileRequestPayloadStruct) {

	db := utils.OpenMySqlConnection()
	query := fmt.Sprintf("CALL updateUserProfile(\"%s\",\"%s\",\"%s\",\"%s\",\"%s\")",
		userProfileRequestPayload.Uid, userProfileRequestPayload.FirstName,
		userProfileRequestPayload.LastName, userProfileRequestPayload.Status, userProfileRequestPayload.ProfilePicture)
	log.Println(query)
	_, err := db.Query(query)

	if err != nil {
		panic(err.Error())
	}

	db.Close()

	log.Println("Database Connection Closed...")
}

//GetOrgQueryHandler get all the org.
func GetOrgQueryHandler() []OrgStruct {
	var Orgs []OrgStruct
	db := utils.OpenMySqlConnection()
	query := "CALL getOrg()"
	rows, err := db.Query(query)
	if err != nil {
		panic(err.Error())
	}

	for rows.Next() {
		var Org OrgStruct
		err = rows.Scan(&Org.OrgID, &Org.Name)
		Orgs = append(Orgs, Org)
	}

	db.Close()

	log.Println("Database Connection Closed...")

	return Orgs
}

//AddUserOrgDetailsQueryHandler add user to org.
func AddUserOrgDetailsQueryHandler(Uid string, OrgId string) error {
	db := utils.OpenMySqlConnection()
	query := fmt.Sprintf("CALL addUserOrgDetails(\"%s\",\"%s\")", Uid, OrgId)
	_, err := db.Query(query)
	if err != nil {
		return err
	}

	db.Close()

	log.Println("Database Connection Closed...")

	return nil
}

//AddNewUserQueryHandler add user.
func AddNewUserQueryHandler(UserMail string, Password string) error {
	db := utils.OpenMySqlConnection()
	query := fmt.Sprintf("CALL addNewUser(\"%s\",\"%s\")", UserMail, Password)
	_, err := db.Query(query)
	if err != nil {
		return err
	}

	db.Close()

	log.Println("Database Connection Closed...")

	return nil
}

//AddNewOrgQueryHandler add org.
func AddNewOrgQueryHandler(Org string) error {
	db := utils.OpenMySqlConnection()
	query := fmt.Sprintf("CALL addOrg(\"%s\")", Org)
	_, err := db.Query(query)
	if err != nil {
		return err
	}

	db.Close()

	log.Println("Database Connection Closed...")

	return nil
}

// GetOrgUserDetailsQueryHandler gets details about user and org
func GetOrgUserDetailsQueryHandler(OrgId string) OrgUserDetailsStruct {
	var UserOrgDetails UserOrgDetailsBase
	var uidArray []string

	db := utils.OpenMySqlConnection()
	query := "CALL getOrgLevelUsers(" + OrgId + ")"
	rows, err := db.Query(query)
	for rows.Next() {
		err = rows.Scan(&UserOrgDetails.OrgId, &UserOrgDetails.Uid)
		if err != nil {
			panic(err.Error())
		}
		uidArray = strings.Split(UserOrgDetails.Uid, ",")
	}

	db.Close()

	log.Println("Database Connection Closed...")

	return OrgUserDetailsStruct{UserOrgDetails.OrgId, uidArray}
}

//GetChatIdQueryHandler get all the org.
func GetChatIdQueryHandler(ChatIdStructRequestPayload ChatIdStructBase) ChatIdStruct {
	// initialize variables
	var UidArray string
	if ChatIdStructRequestPayload.FromUser < ChatIdStructRequestPayload.ToUser {
		UidArray = ChatIdStructRequestPayload.FromUser + "," + ChatIdStructRequestPayload.ToUser
	} else {
		UidArray = ChatIdStructRequestPayload.ToUser + "," + ChatIdStructRequestPayload.FromUser
	}

	var ChatStruct ChatIdStruct
	db := utils.OpenMySqlConnection()
	query := fmt.Sprintf("CALL getChatId(\"%s\",\"%s\")", ChatIdStructRequestPayload.OrgId, UidArray)
	rows, err := db.Query(query)
	if err != nil {
		panic(err.Error())
	}

	for rows.Next() {
		err = rows.Scan(&ChatStruct.ChatID, &ChatStruct.OrgId, &ChatStruct.UserIds)
	}

	db.Close()

	log.Println("Database Connection Closed...")

	return ChatStruct
}

//GetMessagesQueryHandler get messages for the given chat id.
func GetMessagesQueryHandler(ChatID string) []ChatMessageStruct {
	// initialize variables
	var Chats []ChatMessageStruct
	var Chat ChatMessageStruct

	Cassandra := utils.OpenCassandraConnection()
	query := fmt.Sprintf("SELECT channel_id,messsage,author_id,cast(time_sent as text) as time_sent from messages where channel_id = '%s';", ChatID)
	log.Println(query)
	rows := Cassandra.Query(query).Iter().Scanner()
	for rows.Next() {
		rows.Scan(&Chat.ChatId, &Chat.Message, &Chat.FromUser, &Chat.TimeSent)
		Chats = append(Chats, Chat)
	}

	return Chats
}

//PutMessageQueryHandler inserts chats between users.
func PutMessageQueryHandler(ChatID string, ChatIdStructRequestPayload ChatIdStructBase) {
	// initialize variables
	Cassandra := utils.OpenCassandraConnection()

	query := fmt.Sprintf("INSERT INTO messages (channel_id,time_sent,message_id,author_id,messsage) "+
		"VALUES ('%s', toTimestamp(now()), now(),'%s','%s');",
		ChatID, ChatIdStructRequestPayload.FromUser, ChatIdStructRequestPayload.Message)
	Cassandra.Query(query).Exec()
}
