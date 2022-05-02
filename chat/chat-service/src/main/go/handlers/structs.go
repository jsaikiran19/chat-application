package handlers

import "database/sql"

//NullString handles null values returned from DB
type NullString struct {
	sql.NullString
}

// UserOrgNameDetailsBase is a universal struct for mapping the user id and org id/name
type UserOrgNameDetailsBase struct {
	Uid     string `json:"uid"`
	OrgId   string `json:"org_id"`
	OrgName string `json:"name"`
}

// UserOrgDetailsBase is a universal struct for mapping the user id and org id
type UserOrgDetailsBase struct {
	Uid       string `json:"uid"`
	OrgId     string `json:"org_id"`
	FirstName string `json:"first_name"`
}

// UserDetailsStruct is a universal struct for mapping the user id and email
type UserDetailsStruct struct {
	UserMail     string `json:"user_email"`
	Uid          string `json:"uid"`
	UserPassword string `json:"password"`
}

// UserOrgDetailsStruct is a universal struct for mapping the user id and org id array
type UserOrgDetailsStruct struct {
	Uid        string      `json:"uid"`
	OrgDetails []OrgStruct `json:"org_details"`
}

// UserNameDetailsStruct is a universal struct for mapping the user id and org id array
type UserNameDetailsStruct struct {
	OrgId     string `json:"uid"`
	FirstName string `json:"first_name"`
}

// OrgUserDetailsStruct is a universal struct for mapping the user id and org id array
type OrgUserDetailsStruct struct {
	OrgId       string                  `json:"org_id"`
	UserDetails []UserNameDetailsStruct `json:"user_details"`
}

// UserProfileDetailsStruct is a universal struct for mapping the user id and profile description
type UserProfileDetailsStruct struct {
	Uid            string  `json:"uid"`
	FirstName      *string `json:"first_name,omitempty"`
	LastName       *string `json:"last_name,omitempty"`
	Status         *string `json:"status,omitempty"`
	ProfilePicture *string `json:"profile_picture,omitempty"`
}

// UserProfileRequestPayloadStruct is a universal struct for mapping the user id and profile description not nullable
type UserProfileRequestPayloadStruct struct {
	Uid            string `json:"uid"`
	FirstName      string `json:"first_name"`
	LastName       string `json:"last_name"`
	Status         string `json:"status"`
	ProfilePicture string `json:"profile_picture"`
}

// OrgStruct is a universal struct for mapping the org id and name of org
type OrgStruct struct {
	OrgID string `json:"org_id"`
	Name  string `json:"name"`
}

// OrgDetailsBase is a universal struct for mapping org id
type OrgDetailsBase struct {
	OrgName string `json:"name"`
}

// UserDetailsBase is a universal struct for mapping user email and password
type UserDetailsBase struct {
	UserMail     string `json:"user_mail"`
	UserPassword string `json:"password"`
}

// ChatIdStructBase is a universal struct for mapping the users
type ChatIdStructBase struct {
	OrgId    string `json:"org_id"`
	FromUser string `json:"from_user"`
	ToUser   string `json:"to_user"`
	IsMeta   string `json:"is_meta"`
	Message  string `json:"messsage"`
}

// ChatIdStruct is a universal struct for mapping the users and ChatID
type ChatIdStruct struct {
	ChatID  string `json:"channel_id"`
	OrgId   string `json:"org_id"`
	UserIds string `json:"uid_array"`
}

// ChatMessageStruct is a universal struct for mapping the chat messages
type ChatMessageStruct struct {
	ChatId   string `json:"channel_id"`
	TimeSent string `json:"time_sent"`
	FromUser string `json:"author_id"`
	Message  string `json:"messsage"`
}

// RemoveUserStruct is a struct for org id and user id
type RemoveUserStruct struct {
	OrgID  string `json:"org_id"`
	UserID string `json:"uid"`
}
