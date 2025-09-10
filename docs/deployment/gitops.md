---
sidebar_position: 5
---

# GitOps

**Simplecontainer** enables the GitOps approach for deploying containers on single or cluster Docker daemon hosts with Simplecontainer-enabled nodes.  

This allows pulling the latest changes from your Git repository instead of pushing changes to nodes via CLI - with other benefits 
of using GitOps pattern.

---

## Prerequisites

First, ensure that Simplecontainer is running and the CLI (`smrctl`) is configured. If you haven’t done this yet, start there.

**Simplecontainer** (Simplecontainer manager, a.k.a smr) runs in standalone or cluster mode and supports GitOps, secrets, reconciliation, and YAML definitions for Docker.

Clone the examples repository to begin exploring and using the provided configurations.

```bash
git clone https://github.com/simplecontainer/examples
```

---

## GitOps Manual Sync for Simplecontainer

An example of a manual GitOps definition:

```yaml
kind: gitops
meta:
  group: examples
  name: plain-manual
spec:
  repoURL: "https://github.com/simplecontainer/examples"
  revision: "main"
  directoryPath: "/tests/minimal"
```

Applying this definition using will create GitOps object on the node:

```bash
smrctl apply examples/tests/gitops-apps/definitions/gitops-plain.yaml
object proposed for apply: gitops
```

The command above should produce next state:

```bash
smrctl ps gitops
RESOURCE                      REVISION  SYNCED        AUTO SYNC  STATUS  
──────────────────────────────────────────────────────────────────────────
gitops/examples/plain-manual  main      Never synced  false      drifted 
```

Because `automaticSync` is not enabled, trigger of the sync is manual process:

```bash
smrctl gitops sync gitops/examples/plain-manual
```
```bash
smrctl ps
```
```bash
NODE                    RESOURCE                              PORTS  IMAGE STATE  ENGINE STATE      SMR STATE     
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────
smr-development-node-1  containers/example/example-busybox-1  -      pulled       running (docker)  running (14s)
```

```bash
smrctl ps gitops
```
```bash
RESOURCE                      REVISION  SYNCED   AUTO SYNC  STATUS 
────────────────────────────────────────────────────────────────────
gitops/examples/plain-manual  main      64f879e  false      insync
```

```bash
smrctl gitops repositories
```
```bash
RESOURCE                      REPOSITORY                                   COMMIT   REVISION 
──────────────────────────────────────────────────────────────────────────────────────────────
gitops/examples/plain-manual  https://github.com/simplecontainer/examples  64f879e  main
```

```bash
smrctl gitops definitions gitops/examples/plain-manual 
```
```bash
RESOURCE                      DEFINITIONS                 DRIFTED  LAST SYNC 
──────────────────────────────────────────────────────────────────────────────
gitops/examples/plain-manual  containers/example/busybox  InSync   1m15s
```

Simplecontainer reconciles definitions to the Docker daemon and creates containers accordingly.

---

## GitOps Auto Sync for Simplecontainer

For automatic syncing, use:

```yaml
kind: gitops
meta:
  group: examples
  name: plain-auto
spec:
  repoURL: "https://github.com/simplecontainer/examples"
  revision: "main"
  automaticSync: true
  directoryPath: "/tests/minimal"
```

This enables auto-sync so that changes in the repo are applied automatically without CLI intervention.

---

## GitOps App-of-Apps Pattern

“App-of-Apps” pattern can also be leveraged to bootstrap multiple GitOps definitions:

```yaml
kind: gitops
meta:
  group: examples
  name: app-of-apps
spec:
  repoURL: "https://github.com/simplecontainer/examples"
  revision: "main"
  directoryPath: "tests/gitops-app-of-apps"
```

Apply with:

```bash
smrctl apply examples/tests/gitops-app-of-apps
object proposed for apply: gitops
```
```bash
sc ps gitops
RESOURCE                             REVISION  SYNCED        AUTO SYNC  STATUS              
─────────────────────────────────────────────────────────────────────────────────────────────
gitops/examples/app-of-apps          main      64f879e       true       insync              
gitops/examples/plain-auto           main      64f879e       true       insync              
gitops/examples/plain-manual-spread  main      Never synced  false      definitions_invalid 
gitops/examples/plain-manual         main      Never synced  false      drifted
```

```bash
smrctl ps
NODE                    RESOURCE                              PORTS  IMAGE STATE  ENGINE STATE      SMR STATE     
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────
smr-development-node-1  containers/example/example-busybox-1  -      pulled       running (docker)  running (41s) 
```

Listing containers with `smrctl ps` will confirm deployments similar to previous examples.

---

## Real-Time Dashboard Insight

Using the Simplecontainer [dashboard](https://github.com/simplecontainer/dashboard-oss), you can monitor GitOps objects in real time, including their status, resources, and definitions visually.

---

**© 2025 Simplecontainer**