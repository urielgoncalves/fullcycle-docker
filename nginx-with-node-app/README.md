# Note
- This is just for Docker study purposes

# Running
- Clone the repo
- In the terminal, go to the nginx-with-node-app directory
- Run `docker compose up`
- Run `curl localhost:8080` or access the same address via the browser
  - It returns an HTML

# Flow

- Nginx &rarr; NodeJS app &rarr; MySql database
- Nginx is the reverse proxy
- The NodeJS app is accessed via Nginx
- When the app is loaded, a record is inserted into the database
  - The response to the call lists all records added so far
- During the docker-compose process, the App waits until the Mysql container is healthy

# References

- https://docs.docker.com/compose/compose-file/05-services/#healthcheck