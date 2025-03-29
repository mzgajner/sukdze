FROM oven/bun:1-alpine AS frontend-build

RUN mkdir -p /usr/src/sukdze-client
WORKDIR /usr/src/sukdze-client

COPY ./frontend /usr/src/sukdze-client
RUN bun install --frozen-lockfile
RUN bun run build

FROM alpine:latest

COPY --from=frontend-build /usr/src/sukdze-client/dist/* /pb/pb_public

ARG PB_VERSION=0.26.5

RUN apk add --no-cache \
    unzip \
    ca-certificates

# download and unzip PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_arm64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

# uncomment to copy the local pb_migrations dir into the image
COPY ./pb_migrations /pb/pb_migrations

EXPOSE 80

# start PocketBase
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:80"]
