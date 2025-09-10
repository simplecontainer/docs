---
sidebar_position: 8
---
# Network Usage

The `Network` defines container networking. It specifies how containers communicate internally and externally by selecting a **driver** and optionally assigning an **IP address pool**.

## YAML Examples

### 1. Minimal Network
```yaml
kind: network
prefix: simplecontainers.io/v1
meta:
  group: default
  name: app-network
spec:
  driver: bridge
```

---

### 2. Network With Address Pool
```yaml
kind: network
prefix: simplecontainers.io/v1
meta:
  group: dev
  name: dev-network
spec:
  driver: bridge
  ipv4addresspool: 192.168.100.0/24
```

---

### 3. Overlay Network
```yaml
kind: network
prefix: simplecontainers.io/v1
meta:
  group: production
  name: overlay-network
  labels:
    env: production
    team: networking
spec:
  driver: overlay
```

---

### 4. Full Example With Labels
```yaml
kind: network
prefix: simplecontainers.io/v1
meta:
  group: platform
  name: custom-network
  labels:
    purpose: isolated
    owner: platform-team
spec:
  driver: macvlan
  ipv4addresspool: 10.10.0.0/16
```

---

### 5. Reference
```yaml
kind: network
prefix: simplecontainers.io/v1
meta:
  group: <your-group>
  name: <your-network-name>
  labels:
    <key>: <value>
spec:
  driver: <bridge|overlay|macvlan>
  ipv4addresspool: <CIDR-notation>
```