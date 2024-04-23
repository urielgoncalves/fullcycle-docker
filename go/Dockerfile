# 1st stage
FROM golang:1.22.2-alpine as builder

RUN mkdir -p /home/app
WORKDIR /home/app

COPY ./hello-app /home/app/

RUN go build hello.go

# 2nd stage
FROM scratch

COPY --from=builder /home/app /home/app

WORKDIR /home/app

CMD ["./hello"]