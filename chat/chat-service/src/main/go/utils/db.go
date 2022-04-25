package utils

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gocql/gocql"
	_ "github.com/gocql/gocql"
	"log"
)

// Remove this and add env file for prod
const (
	username = "root"
	password = "password"
	hostname = "127.0.0.1:3306"
)

func dsn(dbName string) string {
	return fmt.Sprintf("%s:%s@tcp(%s)/%s", username, password, hostname, dbName)
}

// use this function for prod.
//func dsn(dbName string) string {
//	return fmt.Sprintf("%s:%s@tcp(%s)/%s",
//		os.Getenv("username"), os.Getenv("password"),
//		os.Getenv("hostname"), dbName)
//}

// OpenMySqlConnection is used to connect the MySQL database
func OpenMySqlConnection() *sql.DB {
	log.Println("Database Connecting...")

	connectionDetails := dsn("chats")
	Db, err := sql.Open("mysql", connectionDetails)
	if err != nil {
		panic(err.Error())
	}

	err = Db.Ping()
	if err != nil {
		panic(err.Error())
	}
	log.Println("Database Connected...")

	return Db
}

var Session *gocql.Session

// OpenCassandraConnection is used to connect the MySQL database
func OpenCassandraConnection() *gocql.Session {
	log.Println("Cassandra Connecting...")

	Cluster := gocql.NewCluster("127.0.0.1:9042")
	Cluster.Keyspace = "chats"
	Session, err := Cluster.CreateSession()
	if err != nil {
		panic(err.Error())
	}

	log.Println("Cassandra Connected...")

	return Session
}
