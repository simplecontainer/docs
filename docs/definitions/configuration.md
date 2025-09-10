---
sidebar_position: 4
---

# Configuration Usage

This document explains how to use the `ConfigurationDefinition` struct with YAML. It includes minimal, intermediate, and advanced examples that show how to represent configuration objects as YAML manifests.

---

## 1. Minimal Example

A simple configuration object with just the required fields:

```yaml
kind: configuration
prefix: simplecontainers.io/v1
meta:
  group: configs
  name: app-config
spec:
  data: {}
```

---

## 2. Basic Key/Value Config

Store application settings:

```yaml
kind: configuration
prefix: simplecontainers.io/v1
meta:
  group: configs
  name: web-settings
spec:
  data:
    LOG_LEVEL: debug
    MAX_CONNECTIONS: "100"
    ENABLE_CACHE: "true"
```

---

## 3. Database Configuration

Pass DB connection details to services:

```yaml
kind: configuration
prefix: simplecontainers.io/v1
meta:
  group: database
  name: db-config
spec:
  data:
    DB_HOST: postgres
    DB_PORT: "5432"
    DB_USER: admin
    DB_PASS: secret
```

---

## 4. Feature Flags

Enable/disable features at runtime:

```yaml
kind: configuration
prefix: simplecontainers.io/v1
meta:
  group: feature-flags
  name: new-ui
spec:
  data:
    ENABLE_NEW_UI: "true"
    BETA_USERS_ONLY: "false"
```

---

## 5. Runtime-Linked Configuration

Link config with runtime metadata:

```yaml
kind: configuration
prefix: simplecontainers.io/v1
meta:
  group: applications
  name: runtime-config
  labels:
    app: backend
spec:
  data:
    THREADS: "4"
    TIMEOUT: "30s"
```

---

## 6. Full Example

A configuration with multiple sections:

```yaml
kind: configuration
prefix: simplecontainers.io/v1
meta:
  group: applications
  name: full-config
  labels:
    env: production
    team: backend
spec:
  data:
    LOG_LEVEL: info
    DB_HOST: prod-db
    DB_PORT: "5432"
    REDIS_HOST: redis-cache
    REDIS_PORT: "6379"
    FEATURE_X_ENABLED: "true"
    FEATURE_Y_ENABLED: "false"
```

---

## 7. YAML Template (Fill-in-the-Blanks)

A reusable starting point for developers:

```yaml
kind: configuration
prefix: simplecontainers.io/v1
meta:
  group: <your-group>
  name: <your-config-name>
  labels:
    <key>: <value>
spec:
  data:
    <KEY>: <VALUE>
    <KEY>: <VALUE>
```

---

## 🔄 Usage in Go

You can load any of these YAML manifests into the `ConfigurationDefinition` struct with:

```go
var cfg v1.ConfigurationDefinition
err := yaml.Unmarshal(yamlBytes, &cfg)
if err != nil {
    panic(err)
}

ok, err := cfg.Validate()
if !ok {
    fmt.Println("Validation failed:", err)
}
```

---

With these YAML examples, you can define reusable configuration objects that can be validated, serialized, and consumed by your Go application.
