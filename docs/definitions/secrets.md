---
sidebar_position: 7
---

# Secret Usage

The `Secret` struct models sensitive key-value pairs (API keys, passwords, tokens, certificates). 
Values are **Base64-encoded** in manifests to make them safe for transport and embedding in YAML files.


## Important notes

* **Always Base64-encode** secret values in the YAML manifest. Example: the string `admin` becomes `YWRtaW4=`.
* At runtime, decode the values before using them (e.g., in your containers definition).

---

## YAML Examples

### 1. Minimal Secret

```yaml
kind: secret
prefix: simplecontainers.io/v1
meta:
  group: default
  name: api-credentials
spec:
  data:
    username: YWRtaW4=         # base64 of 'admin'
    password: c2VjcmV0UGFzcw== # base64 of 'securePass'
```

---

### 2. Reference

```yaml
kind: secret
prefix: simplecontainers.io/v1
meta:
  group: <your-group>
  name: <your-secret-name>
  labels:
    <key>: <value>
spec:
  data:
    <KEY>: <base64-value>
    <KEY>: <base64-value>
```