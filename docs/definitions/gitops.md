---
sidebar_position: 3
---

# Gitops Usage

The `Gitops` struct models **GitOps-based configuration management**, enabling you to synchronize repositories with your cluster using Git as the source of truth.

# YAML Examples for `Gitops`

## 1. Minimal GitOps Sync

```yaml
kind: gitops
prefix: simplecontainers.io/v1
meta:
  group: infra
  name: minimal-gitops
spec:
  repoURL: "https://github.com/example/configs.git"
  revision: "main"
  directoryPath: "/manifests"
  poolingInterval: "1m"
  automaticSync: true
```

---

## 2. GitOps with HTTP Authentication Reference

```yaml
kind: gitops
prefix: simplecontainers.io/v1
meta:
  group: infra
  name: secure-gitops
spec:
  repoURL: "https://git.example.com/secure/repo.git"
  revision: "release"
  directoryPath: "/deploy"
  poolingInterval: "30s"
  automaticSync: false
  httpAuthRef:
    prefix: simplecontainers.io/v1
    group: security
    name: my-http-auth
```

---

## 3. GitOps with TLS Certificate Reference

```yaml
kind: gitops
prefix: simplecontainers.io/v1
meta:
  group: infra
  name: tls-gitops
spec:
  repoURL: "git@git.example.com/private/repo.git"
  revision: "develop"
  directoryPath: "/overlays/dev"
  poolingInterval: "2m"
  automaticSync: true
  certKeyRef:
    prefix: simplecontainers.io/v1
    group: security
    name: git-cert
```

---

## 4. Full Example (All Fields)

```yaml
kind: gitops
prefix: simplecontainers.io/v1
meta:
  group: platform
  name: full-gitops
  labels:
    env: production
    team: devops
spec:
  repoURL: "https://github.com/org/monorepo.git"
  revision: "v1.2.3"
  directoryPath: "./services/api"
  poolingInterval: "10s"
  automaticSync: true
  certKeyRef:
    prefix: simplecontainers.io/v1
    group: security
    name: prod-cert
  httpAuthRef:
    prefix: simplecontainers.io/v1
    group: security
    name: prod-http-auth
```

---

## 5. Reference

```yaml
kind: gitops
prefix: simplecontainers.io/v1
meta:
  group: <your-group>
  name: <your-gitops-name>
  labels:
    <key>: <value>
spec:
  repoURL: <git-repo-url>
  revision: <branch-or-tag>
  directoryPath: <path-to-configs>
  poolingInterval: <interval>
  automaticSync: <true|false>
  certKeyRef:
    prefix: simplecontainers.io/v1
    group: <group>
    name: <certkey-name>
  httpAuthRef:
    prefix: simplecontainers.io/v1
    group: <group>
    name: <httpauth-name>
```