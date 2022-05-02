package handlers

import (
	"chat/utils"
	"encoding/json"
	"github.com/gorilla/mux"
	"net/http"
)

func Ping(responseWriter http.ResponseWriter, request *http.Request) {
	response := APIResponseStruct{
		Code:     http.StatusOK,
		Status:   http.StatusText(http.StatusOK),
		Message:  "Success",
		Response: nil,
	}
	ReturnResponse(responseWriter, request, response)
}

//LoginUser will get userID and orgId relation.
func LoginUser(responseWriter http.ResponseWriter, request *http.Request) {
	var UserDetails UserDetailsBase

	// Handling incoming variables.
	decoder := json.NewDecoder(request.Body)
	requestDecoderError := decoder.Decode(&UserDetails)
	defer request.Body.Close()

	// response logic.

	if requestDecoderError != nil {
		response := APIResponseStruct{
			Code:     http.StatusBadRequest,
			Status:   http.StatusText(http.StatusBadRequest),
			Message:  "Request failed to complete, we are working on it",
			Response: nil,
		}
		ReturnResponse(responseWriter, request, response)
	} else {
		DBDetail := GetUserQueryHandler(UserDetails)
		//compare passwords
		PassErr := utils.ComparePasswords(UserDetails.UserPassword, DBDetail.UserPassword)
		if PassErr != nil {
			response := APIResponseStruct{
				Code:     http.StatusNotFound,
				Status:   http.StatusText(http.StatusNotFound),
				Message:  "Password does not match",
				Response: nil,
			}
			ReturnResponse(responseWriter, request, response)
		}

		if DBDetail.UserMail != "" {
			response := APIResponseStruct{
				Code:     http.StatusOK,
				Status:   http.StatusText(http.StatusOK),
				Message:  "Success",
				Response: DBDetail,
			}
			ReturnResponse(responseWriter, request, response)
		} else {
			response := APIResponseStruct{
				Code:     http.StatusBadRequest,
				Status:   http.StatusText(http.StatusBadRequest),
				Message:  "User does not exists",
				Response: nil,
			}
			ReturnResponse(responseWriter, request, response)
		}
	}
}

//GetUserOrgDetails will get userID and orgId relation.
func GetUserOrgDetails(responseWriter http.ResponseWriter, request *http.Request) {
	// Handling incoming variables.
	userId := mux.Vars(request)["userId"]

	// response logic.
	Orgs := GetUserOrgDetailsQueryHandler(userId)

	if Orgs.Uid != "" {
		response := APIResponseStruct{
			Code:     http.StatusOK,
			Status:   http.StatusText(http.StatusOK),
			Message:  "Success",
			Response: Orgs,
		}
		ReturnResponse(responseWriter, request, response)
	} else {
		response := APIResponseStruct{
			Code:     http.StatusBadRequest,
			Status:   http.StatusText(http.StatusBadRequest),
			Message:  "User does not exists",
			Response: nil,
		}
		ReturnResponse(responseWriter, request, response)
	}
}

//GetUserProfile will get userID and User Profile relation.
func GetUserProfile(responseWriter http.ResponseWriter, request *http.Request) {
	// Handling incoming variables.
	userId := mux.Vars(request)["userId"]

	// response logic.
	row := GetUserProfileQueryHandler(userId)
	var response APIResponseStruct
	if row.Uid != "" {
		response = APIResponseStruct{
			Code:     http.StatusOK,
			Status:   http.StatusText(http.StatusOK),
			Message:  "Success",
			Response: row,
		}
	} else {
		response = APIResponseStruct{
			Code:     http.StatusBadRequest,
			Status:   http.StatusText(http.StatusBadRequest),
			Message:  "User does not exists",
			Response: row,
		}
	}

	ReturnResponse(responseWriter, request, response)
}

//UpdateUserProfile will update user profile with new parameters
func UpdateUserProfile(responseWriter http.ResponseWriter, request *http.Request) {
	var userProfileRequestPayload UserProfileRequestPayloadStruct

	// Handling incoming variables.
	decoder := json.NewDecoder(request.Body)
	requestDecoderError := decoder.Decode(&userProfileRequestPayload)
	defer request.Body.Close()

	// Error Handling for input data.
	if requestDecoderError != nil {
		response := APIResponseStruct{
			Code:     http.StatusBadRequest,
			Status:   http.StatusText(http.StatusBadRequest),
			Message:  "Request failed to complete, we are working on it",
			Response: nil,
		}
		ReturnResponse(responseWriter, request, response)
	} else {
		if userProfileRequestPayload.FirstName != "" && userProfileRequestPayload.LastName != "" &&
			userProfileRequestPayload.Status != "" && userProfileRequestPayload.ProfilePicture != "" {
			UpdateUserProfileQueryHandler(userProfileRequestPayload)
			response := APIResponseStruct{
				Code:     http.StatusOK,
				Status:   http.StatusText(http.StatusOK),
				Message:  "Success",
				Response: userProfileRequestPayload,
			}
			ReturnResponse(responseWriter, request, response)
		} else {
			response := APIResponseStruct{
				Code:     http.StatusBadRequest,
				Status:   http.StatusText(http.StatusBadRequest),
				Message:  "Please provide all inputs",
				Response: nil,
			}
			ReturnResponse(responseWriter, request, response)
		}
	}
}

//GetOrg will get userID and User Profile relation.
func GetOrg(responseWriter http.ResponseWriter, request *http.Request) {
	// response logic.
	row := GetOrgQueryHandler()
	var response APIResponseStruct
	if len(row) > 0 {
		response = APIResponseStruct{
			Code:     http.StatusOK,
			Status:   http.StatusText(http.StatusOK),
			Message:  "Success",
			Response: row,
		}
	} else {
		response = APIResponseStruct{
			Code:     http.StatusBadRequest,
			Status:   http.StatusText(http.StatusBadRequest),
			Message:  "Orgs does not exists",
			Response: row,
		}
	}

	ReturnResponse(responseWriter, request, response)
}

//AddUserOrgDetails will add userID and org combination.
func AddUserOrgDetails(responseWriter http.ResponseWriter, request *http.Request) {
	var UserOrgDetailsRequestPayload UserOrgDetailsBase

	// Handling incoming variables.
	decoder := json.NewDecoder(request.Body)
	requestDecoderError := decoder.Decode(&UserOrgDetailsRequestPayload)
	defer request.Body.Close()

	// Error Handling for input data.
	if requestDecoderError != nil {
		response := APIResponseStruct{
			Code:     http.StatusBadRequest,
			Status:   http.StatusText(http.StatusBadRequest),
			Message:  "Request failed to complete, we are working on it",
			Response: nil,
		}
		ReturnResponse(responseWriter, request, response)
	} else {
		if UserOrgDetailsRequestPayload.Uid != "" && UserOrgDetailsRequestPayload.OrgId != "" {
			err := AddUserOrgDetailsQueryHandler(UserOrgDetailsRequestPayload.OrgId, UserOrgDetailsRequestPayload.Uid)
			if err != nil {
				response := APIResponseStruct{
					Code:     http.StatusBadRequest,
					Status:   http.StatusText(http.StatusBadRequest),
					Message:  err.Error(),
					Response: UserOrgDetailsRequestPayload,
				}
				ReturnResponse(responseWriter, request, response)
			} else {
				response := APIResponseStruct{
					Code:     http.StatusOK,
					Status:   http.StatusText(http.StatusOK),
					Message:  "Success",
					Response: UserOrgDetailsRequestPayload,
				}
				ReturnResponse(responseWriter, request, response)
			}
		} else {
			response := APIResponseStruct{
				Code:     http.StatusBadRequest,
				Status:   http.StatusText(http.StatusBadRequest),
				Message:  "Please provide all inputs",
				Response: nil,
			}
			ReturnResponse(responseWriter, request, response)
		}
	}
}

//AddOrg will add org.
func AddOrg(responseWriter http.ResponseWriter, request *http.Request) {
	var OrgDetailsRequestPayload OrgDetailsBase

	// Handling incoming variables.
	decoder := json.NewDecoder(request.Body)
	requestDecoderError := decoder.Decode(&OrgDetailsRequestPayload)
	defer request.Body.Close()

	// Error Handling for input data.
	if requestDecoderError != nil {
		response := APIResponseStruct{
			Code:     http.StatusBadRequest,
			Status:   http.StatusText(http.StatusBadRequest),
			Message:  "Request failed to complete, we are working on it",
			Response: nil,
		}
		ReturnResponse(responseWriter, request, response)
	} else {
		if OrgDetailsRequestPayload.OrgName != "" {
			err := AddNewOrgQueryHandler(OrgDetailsRequestPayload.OrgName)
			if err != nil {
				response := APIResponseStruct{
					Code:     http.StatusBadRequest,
					Status:   http.StatusText(http.StatusBadRequest),
					Message:  err.Error(),
					Response: OrgDetailsRequestPayload,
				}
				ReturnResponse(responseWriter, request, response)
			} else {
				response := APIResponseStruct{
					Code:     http.StatusOK,
					Status:   http.StatusText(http.StatusOK),
					Message:  "Success",
					Response: OrgDetailsRequestPayload,
				}
				ReturnResponse(responseWriter, request, response)
			}
		} else {
			response := APIResponseStruct{
				Code:     http.StatusBadRequest,
				Status:   http.StatusText(http.StatusBadRequest),
				Message:  "Please provide all inputs",
				Response: nil,
			}
			ReturnResponse(responseWriter, request, response)
		}
	}
}

//AddUser will add user.
func AddUser(responseWriter http.ResponseWriter, request *http.Request) {
	var UserDetailsRequestPayload UserDetailsBase

	// Handling incoming variables.
	decoder := json.NewDecoder(request.Body)
	requestDecoderError := decoder.Decode(&UserDetailsRequestPayload)
	defer request.Body.Close()

	// Error Handling for input data.
	if requestDecoderError != nil {
		response := APIResponseStruct{
			Code:     http.StatusBadRequest,
			Status:   http.StatusText(http.StatusBadRequest),
			Message:  "Request failed to complete, we are working on it",
			Response: nil,
		}
		ReturnResponse(responseWriter, request, response)
	} else {
		if UserDetailsRequestPayload.UserMail != "" && UserDetailsRequestPayload.UserPassword != "" {
			PasswordHash, passErr := utils.CreatePassword(UserDetailsRequestPayload.UserPassword)

			if passErr != nil {
				response := APIResponseStruct{
					Code:     http.StatusBadRequest,
					Status:   http.StatusText(http.StatusBadRequest),
					Message:  passErr.Error(),
					Response: nil,
				}
				ReturnResponse(responseWriter, request, response)
			}

			err := AddNewUserQueryHandler(UserDetailsRequestPayload.UserMail, PasswordHash)

			if err != nil {
				response := APIResponseStruct{
					Code:     http.StatusBadRequest,
					Status:   http.StatusText(http.StatusBadRequest),
					Message:  err.Error(),
					Response: UserDetailsRequestPayload,
				}
				ReturnResponse(responseWriter, request, response)
			} else {
				response := APIResponseStruct{
					Code:     http.StatusOK,
					Status:   http.StatusText(http.StatusOK),
					Message:  "Success",
					Response: UserDetailsRequestPayload,
				}
				ReturnResponse(responseWriter, request, response)
			}
		} else {
			response := APIResponseStruct{
				Code:     http.StatusBadRequest,
				Status:   http.StatusText(http.StatusBadRequest),
				Message:  "Please provide all inputs",
				Response: nil,
			}
			ReturnResponse(responseWriter, request, response)
		}
	}
}

//GetOrgLevelUsers will get all the users in that org.
func GetOrgLevelUsers(responseWriter http.ResponseWriter, request *http.Request) {
	// Handling incoming variables.
	OrgId := mux.Vars(request)["OrgId"]

	// response logic.
	Users := GetOrgUserDetailsQueryHandler(OrgId)

	if Users.OrgId != "" {
		response := APIResponseStruct{
			Code:     http.StatusOK,
			Status:   http.StatusText(http.StatusOK),
			Message:  "Success",
			Response: Users,
		}
		ReturnResponse(responseWriter, request, response)
	} else {
		response := APIResponseStruct{
			Code:     http.StatusBadRequest,
			Status:   http.StatusText(http.StatusBadRequest),
			Message:  "Organization does not exists",
			Response: nil,
		}
		ReturnResponse(responseWriter, request, response)
	}
}

//GetMessages will get chats between 2 users.
func GetMessages(responseWriter http.ResponseWriter, request *http.Request) {
	var ChatIdStructRequestPayload ChatIdStructBase

	// Handling incoming variables.
	decoder := json.NewDecoder(request.Body)
	requestDecoderError := decoder.Decode(&ChatIdStructRequestPayload)
	defer request.Body.Close()

	// Error Handling for input data.
	if requestDecoderError != nil {
		response := APIResponseStruct{
			Code:     http.StatusBadRequest,
			Status:   http.StatusText(http.StatusBadRequest),
			Message:  "Request failed to complete, we are working on it",
			Response: nil,
		}
		ReturnResponse(responseWriter, request, response)
	} else {
		if ChatIdStructRequestPayload.OrgId != "" &&
			ChatIdStructRequestPayload.FromUser != "" && ChatIdStructRequestPayload.ToUser != "" {
			row := GetChatIdQueryHandler(ChatIdStructRequestPayload)
			if row.ChatID != "" {
				// Write the code for querying Cassandra.
				// Function call for getting chats
				var Chats []ChatMessageStruct

				type ChatMessage struct {
					Message []ChatMessageStruct `json:"messages"`
				}

				Chats = GetMessagesQueryHandler(row.ChatID, ChatIdStructRequestPayload.IsMeta)

				var ChatMessages ChatMessage

				if Chats == nil {
					ChatMessages.Message = make([]ChatMessageStruct, 0)
					response := APIResponseStruct{
						Code:     http.StatusOK,
						Status:   http.StatusText(http.StatusOK),
						Message:  "Success",
						Response: ChatMessages,
					}
					ReturnResponse(responseWriter, request, response)
				} else {
					ChatMessages.Message = Chats

					response := APIResponseStruct{
						Code:     http.StatusOK,
						Status:   http.StatusText(http.StatusOK),
						Message:  "Success",
						Response: ChatMessages,
					}
					ReturnResponse(responseWriter, request, response)
				}
			} else {
				response := APIResponseStruct{
					Code:     http.StatusBadRequest,
					Status:   http.StatusText(http.StatusBadRequest),
					Message:  "Chat does not exists between users",
					Response: nil,
				}
				ReturnResponse(responseWriter, request, response)
			}
		} else {
			response := APIResponseStruct{
				Code:     http.StatusBadRequest,
				Status:   http.StatusText(http.StatusBadRequest),
				Message:  "Please provide all inputs",
				Response: nil,
			}
			ReturnResponse(responseWriter, request, response)
		}
	}
}

//PutMessage will insert chats between 2 users.
func PutMessage(responseWriter http.ResponseWriter, request *http.Request) {
	var ChatIdStructRequestPayload ChatIdStructBase

	// Handling incoming variables.
	decoder := json.NewDecoder(request.Body)
	requestDecoderError := decoder.Decode(&ChatIdStructRequestPayload)
	defer request.Body.Close()

	// Error Handling for input data.
	if requestDecoderError != nil {
		response := APIResponseStruct{
			Code:     http.StatusBadRequest,
			Status:   http.StatusText(http.StatusBadRequest),
			Message:  "Request failed to complete, we are working on it",
			Response: nil,
		}
		ReturnResponse(responseWriter, request, response)
	} else {
		if ChatIdStructRequestPayload.OrgId != "" &&
			ChatIdStructRequestPayload.FromUser != "" && ChatIdStructRequestPayload.ToUser != "" {
			row := GetChatIdQueryHandler(ChatIdStructRequestPayload)
			if row.ChatID != "" {
				// Putting data in Cassandra.
				PutMessageQueryHandler(row.ChatID, ChatIdStructRequestPayload)
				response := APIResponseStruct{
					Code:     http.StatusOK,
					Status:   http.StatusText(http.StatusOK),
					Message:  "Success",
					Response: nil,
				}
				ReturnResponse(responseWriter, request, response)
			} else {
				response := APIResponseStruct{
					Code:     http.StatusBadRequest,
					Status:   http.StatusText(http.StatusBadRequest),
					Message:  "Request failed to complete, we are working on it",
					Response: nil,
				}
				ReturnResponse(responseWriter, request, response)
			}
		}
	}
}

//RemoveUser will remove user from the given org.
func RemoveUser(responseWriter http.ResponseWriter, request *http.Request) {
	var RemoveUserRequestPayload RemoveUserStruct

	// Handling incoming variables.
	decoder := json.NewDecoder(request.Body)
	requestDecoderError := decoder.Decode(&RemoveUserRequestPayload)
	defer request.Body.Close()

	if requestDecoderError != nil {
		response := APIResponseStruct{
			Code:     http.StatusBadRequest,
			Status:   http.StatusText(http.StatusBadRequest),
			Message:  "Request failed to complete, we are working on it",
			Response: nil,
		}
		ReturnResponse(responseWriter, request, response)
	} else {
		if RemoveUserRequestPayload.OrgID != "" && RemoveUserRequestPayload.UserID != "" {
			err := RemoveUserQueryHandler(RemoveUserRequestPayload)
			if err != nil {
				response := APIResponseStruct{
					Code:     http.StatusBadRequest,
					Status:   http.StatusText(http.StatusBadRequest),
					Message:  err.Error(),
					Response: nil,
				}
				ReturnResponse(responseWriter, request, response)
			} else {
				response := APIResponseStruct{
					Code:     http.StatusOK,
					Status:   http.StatusText(http.StatusOK),
					Message:  "Success",
					Response: RemoveUserRequestPayload,
				}
				ReturnResponse(responseWriter, request, response)
			}
		} else {
			response := APIResponseStruct{
				Code:     http.StatusBadRequest,
				Status:   http.StatusText(http.StatusBadRequest),
				Message:  "Please provide all inputs",
				Response: nil,
			}
			ReturnResponse(responseWriter, request, response)
		}
	}
}
