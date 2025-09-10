---
sidebar_position: 2
---

# Containers Usage

This document explains how to use the `Containers` struct with YAML. It includes minimal, intermediate, and advanced examples that show different features such as dependencies, readiness checks, volumes, init containers, replicas, and more.

---

## 1. Minimal Example
A simple container definition with only the required fields:

```yaml
kind: containers
prefix: simplecontainers.io/v1
meta:
  group: applications
  name: my-app
spec:
  image: nginx
  tag: "1.25"
```

---

## 2. With Environment Variables and Ports
A web service that exposes a port and sets environment variables:

```yaml
kind: containers
prefix: simplecontainers.io/v1
meta:
  group: applications
  name: web-service
  labels:
    tier: frontend
spec:
  image: nginx
  tag: "1.25"
  envs:
    - ENV=production
    - LOG_LEVEL=debug
  ports:
    - container: "80"
      host: "8080"
```

---

## 3. With Dependencies
This container waits for a database service before starting:

```yaml
kind: containers
prefix: simplecontainers.io/v1
meta:
  group: applications
  name: api-service
spec:
  image: my-api
  tag: "2.0"
  dependencies:
    - name: database
      group: storage
      prefix: simplecontainers.io/v1
      timeout: 60s
```

---

## 4. With Readiness Check
A worker container with a readiness probe:

```yaml
kind: containers
prefix: simplecontainers.io/v1
meta:
  group: applications
  name: worker
spec:
  image: worker-app
  tag: latest
  readiness:
    - name: healthcheck
      type: http
      url: http://localhost:8080/health
      method: GET
      timeout: 10s
```

---

## 5. With Volumes and File Permissions
Mounting a hostPath volume with file permissions:

```yaml
kind: containers
prefix: simplecontainers.io/v1
meta:
  group: applications
  name: config-demo
spec:
  image: alpine
  tag: "3.18"
  command: ["/bin/sh", "-c"]
  args: ["cat /app/config/config.yaml && sleep 3600"]
  volumes:
    - name: config-volume
      type: hostPath
      hostPath: /etc/myapp
      mountPoint: /app/config
      subPath: /
      fileInfo:
        owner: 1000
        group: 1000
        permissions: 420   # octal 0644
```

---

## 6. With Replicas and Scaling
Scaling a service to multiple replicas:

```yaml
kind: containers
prefix: simplecontainers.io/v1
meta:
  group: applications
  name: scalable-api
spec:
  image: my-scalable-api
  tag: "2.3"
  replicas: 5
  ports:
    - container: "8080"
      host: "8080"
```

---

## 7. With Capabilities and Security Context
Granting specific Linux capabilities and controlling privileges:

```yaml
kind: containers
prefix: simplecontainers.io/v1
meta:
  group: applications
  name: privileged-service
spec:
  image: sys-tool
  tag: latest
  capabilities:
    - NET_ADMIN
    - SYS_TIME
  privileged: true
  user: "1000"
  groupAdd:
    - "2000"
    - "3000"
```

---

## 8. Multi-Network Example
Attaching the container to multiple networks:

```yaml
kind: containers
prefix: simplecontainers.io/v1
meta:
  group: applications
  name: multi-network-service
spec:
  image: my-service
  tag: "1.2"
  networks:
    - group: frontend
      name: public-net
    - group: backend
      name: private-net
```

---

## 9. Full Example (Combined Features)
A complete manifest demonstrating multiple features:

```yaml
kind: containers
prefix: simplecontainers.io/v1
meta:
  group: applications
  name: full-stack
  labels:
    tier: backend
spec:
  image: my-backend
  tag: "1.5"
  envs:
    - DB_HOST=db-service
    - CACHE_HOST=redis
  ports:
    - container: "8080"
      host: "8080"
  volumes:
    - name: data-volume
      type: hostPath
      hostPath: /var/data
      mountPoint: /app/data
  dependencies:
    - name: db-service
      group: storage
      timeout: 90s
  readiness:
    - name: api-check
      type: http
      url: http://localhost:8080/health
      method: GET
      timeout: 5s
  replicas: 3
  capabilities:
    - NET_ADMIN
    - SYS_TIME
  privileged: false
  network_mode: bridge
```

---

## 10. Reference

```yaml
kind: containers
prefix: simplecontainers.io/v1
meta:
  group: <your-group>
  name: <your-service>
  labels:
    <key>: <value>
spec:
  image: <image-name>
  tag: <image-tag>
  envs: []
  entrypoint: []
  args: []
  dependencies: []
  readiness: []
  networks: []
  ports: []
  volumes: []
  configuration: {}
  resources: []
  configurations: []
  replicas: 1
  capabilities: []
  user: ""
  groupAdd: []
  privileged: false
  network_mode: bridge
  spread: null
  nodes: []
  dns: []
```
