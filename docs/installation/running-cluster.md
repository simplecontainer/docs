---
sidebar_position: 3
---

# Running cluster mode

The simplecontainer can run as a single node or in cluster mode.

Cluster mode enables multiple docker daemons, on different machines, to run containers and simplecontainer orchestrates on top of the docker.

:::warning
First check prerequisites!
:::

## How to run cluster mode?

This scenario assumes there are two nodes (virtual machines) connected over internet.

- `Node 1`: `node-1.simplecontainer.io` -> Points to `Node 1` IP address
- `Node 2`: `node-2.simplecontainer.io` -> Points to `Node 2` IP address

### Node 1

First step is to start simplecontainer for the node 1.

:::warning
The command smrmgr start must be run as non-root user otherwise the deployment will fail.
:::

```bash
smrmgr start -n smr-node-1 -d node-1.simplecontainer.io
```

This starts the simplecontainer node and control plane listens on the `0.0.0.0:1443` which means all interfaces,
and is accessible over the internet if machine has the public IP. Control plane uses mTLS which implies that all
control plane is encrypted and secured.

Option `-n` is not mandatory but is used for specifying name of the node. It must be unique in cluster.

Option `-d` specifies that node generates certificates for mTLS which are only valid for the `node-1.simplecontainer.io`.

Ports exposed when started using command above:

- `0.0.0.0:1443->1443/tcp` (Simplecontainer control plane)
- `0.0.0.0:9212->9212/tcp` (RAFT protocol control plane sharing state)
- `:::1443->1443/tcp` (Simplecontainer control plane ipv6)
- `127.0.0.1:2379->2379/tcp` (Etcd exposed only on the localhost)

To connect to the nodes, simplecontainer relies on the contexts - which are exportable in secure manner using encryption.

### Contexts
A context defines the connection and authentication parameters required to interact with a SimpleContainer node or cluster.
Contexts make it easy to manage and switch between multiple environments.

Key capabilities:

- Context switching – seamlessly switch between different contexts by selecting the active context.
- Secure sharing – export a context in encrypted form for safe distribution.
- Encrypted imports – import encrypted contexts to quickly connect to new clusters.

```cgo title="Context needs to be imported from smr agent first (on the same machine), then can be exported to other machines"
smrctl context import $(smr agent export --node smr-node-1) -y
smrctl context export --api node-1.simplecontainer.io:1443
```

This will export context. Both encrypted context and key will be printed on the stdout.

:::warning
Specify correct hostname/IP/domain and port.
:::

### Node 2

First step is to import context via smr (**not smrctl**) on the node 2.

```cgo
smr agent import PASTE_OUTPUT PASTE_KEY
```

If the key is not specified it will listen on `stdin` for decryption key.
This will import context and fetch certificates from the node it got context from.

Start the simplecontainer for the node 2 and ask to join the cluster with client certificates from node 1.

:::warning
The command smrmgr start must be run as non-root user otherwise the deployment will fail.
:::

```cgo
smrmgr start -n smr-node-2 -d node-2.simplecontainer.io -j -p https://node-1.simplecontainer.io:1443
```

- Option `-j` specifies node that will be asked to join the starting node to the cluster - should be the same as the node from
contexts are imported from.
- Option `-p` specifies peer control plane URL which we will ask to join the cluster

Now control plane should be accessible.

```cgo title="The smrctl ps command is used to list all containers in the cluster"
smrctl ps
NODE  GROUP  NAME  DOCKER NAME  IMAGE  IP  PORTS  DEPS IMAGE STATE ENGINE STATE  SMR STATE  
```