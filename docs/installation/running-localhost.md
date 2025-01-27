---
sidebar_position: 4
---

# Running on localhost

Simplecontainer can expose control plane only to the local so no outside connection can reach the control plane.

## How to run single node on localhost?

It is simple and easy.

```cgo
smrmgr start -a smr-node -e localhost:1443
```

Now node is started and can be used only from the same machine. Context is already added to the smr by smrmgr.

```cgo title="The smr ps command is used to list all containers in the cluster"
smr ps
NODE  GROUP  NAME  DOCKER NAME  IMAGE  IP  PORTS  DEPS  ENGINE STATE  SMR STATE  
```