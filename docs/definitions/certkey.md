---
sidebar_position: 7
---

# CertKey Usage

The `CertKeyDefinition` struct models certificate and key material definitions, including certificate files, private keys, keystores, and related passwords. This allows secure storage and management of TLS/SSL credentials.

Current usage is only for gitops ssh authentication.

---

# YAML Examples for `CertKey

## 1. Certificate with Private Key

```yaml
kind: certkey
prefix: simplecontainers.io/v1
meta:
  group: security
  name: tls-cert
spec:
  certificate: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCg==
  privateKey: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCg==
```