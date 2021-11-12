# prisma-bug-example

Run postgres with docker with the following:

```
docker run --name postgres-db -e POSTGRES_PASSWORD=test -p 5432:5432 -d postgres
```

Export the DATABASE_URL

```
export DATABASE_URL="postgresql://postgres:test@localhost:5432/mydb?schema=public"
```
