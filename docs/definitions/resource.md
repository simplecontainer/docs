---
sidebar_position: 5
---

# Resource Usage

The `Resource` struct models generic resource objects with arbitrary key-value data. 
It can be used to store configuration, secrets, or metadata needed by services, jobs, 
or infrastructure components.

Resources can be mounted as files inside containers.

---

# YAML Examples for `Resource`

## 1. Minimal Resource

```yaml
kind: resource
prefix: simplecontainers.io/v1
meta:
  group: infra
  name: minimal-resource
spec:
  data: {}
```

---

## 2. Key-Value Resource

```yaml
kind: resource
prefix: simplecontainers.io/v1
meta:
  group: configs
  name: app-resource
spec:
  data:
    config.yaml: |
      test: 123
      location: east
```

---

## 5. Reference

```yaml
kind: resource
prefix: simplecontainers.io/v1
meta:
  group: <your-group>
  name: <your-resource-name>
  labels:
    <key>: <value>
spec:
  data:
    <KEY>: <VALUE>
```
