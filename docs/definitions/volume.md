---
sidebar_position: 8
---
# Volume Usage

This document explains the **`Volume`** contract, its structure, validation rules, and usage examples in **YAML**.

## YAML Examples

### 1. Minimal Local Volume
```yaml
kind: Volume
prefix: dev
meta:
  group: storage
  name: app-data
spec:
  driver: local
```

---

### 2. Volume with Driver Options
```yaml
kind: Volume
prefix: prod
meta:
  group: storage
  name: shared-cache
spec:
  driver: local
  driver_opts:
    type: tmpfs
    device: tmpfs
    o: size=512m
```

---

### 3. NFS Volume Example
```yaml
kind: Volume
prefix: prod
meta:
  group: storage
  name: nfs-data
  labels:
    environment: production
    team: infra
spec:
  driver: nfs
  driver_opts:
    type: nfs
    o: addr=10.0.0.5,rw
    device: ":/exports/data"
```