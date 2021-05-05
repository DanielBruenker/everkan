# Getting Started with Everkan Development

## Run Everkan

To run Everkan you need the following software installed:

- [nodejs](https://nodejs.org/en/)
- [Maven](https://maven.apache.org/)
- Java 11
- [docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/compose/)

---

### 1. Run (and install) the postgres database

```bash
docker-compose up
```

### 2. Run the backend 
```bash
mvn spring-boot:run
```

### 3. Run the frontend

```bash
npm run dev
```


## Test send emails

To test sending emails, [Maildev](https://github.com/maildev/maildev) can be used. 

Maildev can be installed via npm:

```bash
npm install -g maildev
```

To start the maildev server on the default port 1080 and the smtp server on port 1025 you can use the following command:

```bash
maildev
```