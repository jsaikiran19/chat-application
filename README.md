# chat-application-adt

- Just run python notebooks inside script folder to load the data. If you prefer to run it via workbench, I have included .sql file.

## Install dependencies
- Make sure no app is running on port 8000,3306,9042
- Installing Golang:
```
Prerequisite:

Docker should be installed in the system. Once that is installed, the process becomes very simple.
```

```
Commands:

Go to this directory \chat\chat-service\src\main\go

Open command prompt and run these commands:
```

```
docker build -t chat:amd64 .

docker run --add-host=host.docker.internal:host-gateway -p 8000:8000 chat:amd64
```

- Installing Cassandra:
```
Windows: https://www.varunsrivatsa.dev/blog/cassandra-installation/how-to-install-cassandra-4-on-windows/

Linux: https://www.hostinger.com/tutorials/set-up-and-install-cassandra-ubuntu/
```

```
For windows and linux, process should be the same. For windows, we will be requiring WSL as Cassandra is not natively supported on windows.

Prerequisites:
System should have Java 8 and curl installed.
```

```
Steps to install Cassandra.

1. echo "deb http://downloads.apache.org/cassandra/debian 40x main" | sudo tee -a /etc/apt/sources.list.d/cassandra.sources.list

2. curl https://downloads.apache.org/cassandra/KEYS | sudo apt-key add -

3. sudo apt-get update

4. sudo apt-get install cassandra

5. sudo service cassandra start

6. sudo service cassandra status

7. nodetool status
```
- Installing MariaDB:
```
windows: https://www.mariadbtutorial.com/getting-started/install-mariadb/

linux: https://www.digitalocean.com/community/tutorials/how-to-install-mariadb-on-ubuntu-20-04
```

```
Please set credentials as follows:

user: root
password: password
```