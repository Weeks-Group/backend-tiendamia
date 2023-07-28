## BACKEND TEST TIENDAMIA

### Endpoints Documents: 
https://documenter.getpostman.com/view/24657020/2s9XxsWcMv#ae97b10d-e8fd-47a1-9a46-f463a9dc30f6


### Install:
This repository use Docker, only you need to run and create this is :

- create .env :
	PORT:  Port to using get up the backend. ej: 5000
	DATABASE_URL="postgresql://user:passworld@url:PORT_POSTGRES/test-tiendamia?schema=public"
	PD : In case using postgres docker is this : "postgresql://postgres:postgres@postgres_tiendamia:5432/test-tiendamia?schema=public"

- Execute docker-compose up -d 

## Dump data
When your get up backend for first time, you can create mook data with endpoint dump (look in postman).
This create items, clients and orders by defaults.