---
sidebar_position: 5
---

# Containers deployment
## Minimal deployment
To deploy container with minimal configuration, definition below is enough:
```cgo
prefix: simplecontainer.io/v1
kind: containers
meta:
  group: example
  name: busybox
spec:
  image: busybox
  tag: latest
  replicas: 1
  entrypoint: ["sleep"]
  args: ["3600"]
```
Entrypoint and args are additional configuration so that container keeps alive.

```bash
smrctl apply  https://raw.githubusercontent.com/simplecontainer/examples/refs/heads/main/tests/minimal/definitions/Containers.yaml
```
This deploys busybox container.

## Readiness and dependency

Database is often used as the dependency for other services. This can easily be achieved.

```cgo
kind: containers
prefix: simplecontainer.io/v1
meta:
  name: mysql
  group: mysql
spec:
  image: "mysql"
  tag: "8.0"
  replicas: 1
  spread:
    spread: uniform
  envs:
    - MYSQL_ROOT_PASSWORD=(( .password ))
    - CONTAINER_NAME=(( .testing ))
  ports:
    - container: "3306"
  volumes:
    - type: bind
      hostPath: /tmp
      mountPoint: /tmp
  configurations:
    - group: mysql
      name: config
  resources:
    - group: mysql
      name: config
      key: my.cnf
      mountPoint: /etc/my.cnf
    - group: mysql
      name: config
      key: secret.config.file
      mountPoint: /etc/secret.cnf
  readiness:
    - name: "mysql"
      timeout: "60s"
      command: ["mysqladmin", "ping", "-h", "localhost", "-p(( .password ))"]
  configuration:
    username: "root"
    password: (( lookup "secret/mysql/password:password" | base64decode ))
    testing: (( lookup "runtime/container/configuration:name" ))
    testing2: (( lookup "runtime/container/configuration:name" ))
    secret: "secret"
```

To create another container that depends on the database, definition:

```cgo
kind: containers
prefix: simplecontainer.io/v1
meta:
  name: nginx
  group: nginx
  labels:
    test: testing2345
spec:
  image: "nginx"
  tag: "1.23.3"
  replicas: 2
  dependencies:
    - prefix: "simplecontainer.io/v1"
      group: "mysql"
      name: "*"
      timeout: "30s"
  ports:
    - container: "80"
    - container: "443"
  resources:
    - group: nginx
      name: config
      key: nginx-configuration
      mountPoint: /etc/nginx/conf.d/default.conf
  configuration:
    username: "root"
```

Dependencies relies on the group and name to match. Container/s that is/are referenced in the dependency needs to have it's 
own readiness completed successfully so that container will mark dependency as ready.

By default, as soon as the container is running readiness is successful.

Since container can have more replicas the wildcard `*` can be used in the name to wait for all container replicas.

Otherwise, it can be configured to match only specific instance using generated name eg. `mysql-mysql-1`. This follows naming convention.