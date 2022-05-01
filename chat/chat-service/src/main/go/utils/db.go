package utils

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gocql/gocql"
	_ "github.com/gocql/gocql"
	"log"
	"os"
)

// use this function for prod.
func dsn(dbName string) string {
	return fmt.Sprintf("%s:%s@tcp(%s)/%s",
		os.Getenv("mariadb_username"), os.Getenv("mariadb_password"),
		os.Getenv("mariadb_hostname")+":"+os.Getenv("mariadb_port"), dbName)
}

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
	connection := fmt.Sprintf("%s:%s", os.Getenv("cassandra_hostname"), os.Getenv("cassandra_port"))

	Cluster := gocql.NewCluster(connection)
	Cluster.Keyspace = "chats"
	Session, err := Cluster.CreateSession()
	if err != nil {
		panic(err.Error())
	}

	log.Println("Cassandra Connected...")

	return Session
}
