---
sidebar_position: 6
---

# HttpAuth Usage

The `HttpAuth` struct models **HTTP authentication credentials** (username & password), which can be referenced by other
definitions such as `Gitops` for secure access to repositories.

---

# YAML Examples for `HttpAuth`

## 1. Minimal Example

```yaml
kind: httpauth
prefix: simplecontainers.io/v1
meta:
  group: security
  name: minimal-httpauth
spec:
  username: "username"   
  password: "password"
```

---

## 2. Reference

```yaml
kind: httpauth
prefix: simplecontainers.io/v1
meta:
  group: <your-group>
  name: <your-httpauth-name>
  labels:
    <key>: <value>
spec:
  username: <username>
  password: <password>
```