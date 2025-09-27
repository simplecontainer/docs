---
sidebar_position: 4
---

# Running single node exposed only on localhost

Simplecontainer can expose control plane only to the localhost so no outside connection can reach the control plane.

:::warning
First check all prerequisites!
:::

## How to run single node on localhost?

It is simple and easy.

:::warning
The command smrmgr start must be run as non-root user otherwise the deployment will fail.
:::

```cgo
smrmgr start -c "--port.control 127.0.0.1:1443 --port.overlay 127.0.0.1:9212"
```

Now node is started and can be used only from the same machine. Context is already imported by smrmgr.

```cgo title="The smrctl ps command is used to list all containers in the cluster"
smrctl ps
NODE         RESOURCE                             PORTS IMAGE STATE ENGINE STATE     SMR STATE       
─────────────────────────────────────────────────────────────────────────────────────────────────────
```