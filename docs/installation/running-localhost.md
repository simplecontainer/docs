---
sidebar_position: 4
---

# Running single node exposed only on localhost

Simplecontainer can expose control plane only to the local so no outside connection can reach the control plane.

## How to run single node on localhost?

It is simple and easy.

```cgo
smrmgr start -a smr-node -x "--dynamic.hostport=127.0.0.1:1443 --dynamic.overlayport=127.0.0.1:9212"
```

Changing control plane port implies that connection string needs to be updated too:

```cgo
smrmgr start -a smr-node -c localhost:1444 -x "--dynamic.hostport=127.0.0.1:1444 --dynamic.overlayport=127.0.0.1:9212"
```

Now node is started and can be used only from the same machine. Context is already added to the smr by smrmgr.

```cgo title="The smr ps command is used to list all containers in the cluster"
smr ps
NODE  GROUP  NAME  DOCKER NAME  IMAGE  IP  PORTS  DEPS  ENGINE STATE  SMR STATE  
```