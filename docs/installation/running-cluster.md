---
sidebar_position: 3
---

# Running cluster mode

The simplecontainer can run as a single node or in cluster mode.

Cluster mode enables multiple docker daemons to run containers and simplecontainer orchestrates them.

## How to run cluster mode?

This scenario assumes there are two nodes (virtual machines) connected over internet.

- `Node 1`: `node-1.simplecontainer.io` -> Points to `Node 1` IP address
- `Node 2`: `node-2.simplecontainer.io` -> Points to `Node 2` IP address

### Node 1

First step is to start simplecontainer for the node 1.

```bash
smrmgr start -a smr-agent-1 -d node-1.simplecontainer.io
```

This starts the simplecontainer node and control plane listens on the `0.0.0.0:1443` which means all interfaces,
and is accessible from the internet if machine has the public IP.

Option `-a` is mandatory and is used for specifying name of the node. It must be unique so be careful.

Option `-d` specifies that node generates certificates for mTLS which are only valid for the `node-1.simplecontainer.io`.

To connect to the nodes, simplecontainer relies on the contexts (think kube config) - there is easy option to export it and share it:

```cgo
smrmgr export <<< https://node-1.simplecontainer.io:1443
cat $HOME/smr/contexts/$(smr context).key
```

This exports contexts and encrypt it using AES with key specified on the path `$HOME/smr/contexts/$(smr context).key`.

:::warning
Specify correct host, port and include https:// for the control plane endpoint when exporting. If the
port you choose is different change it accordingly. Control plane is always exposed using the https.
:::

### Node 2

First step is to import context on the node 2 from node 1.

```cgo
smrmgr import PASTE_OUTPUT <<< PASTE_KEY
```

If the key is not specified it will listen on `stdin` for decryption key.
This will import context and fetch certificates from the node it got context from.

Start the simplecontainer for the node 2 and ask to join the cluster with client certificates from node 1.

```cgo
smrmgr start -a smr-agent-2 -d node-2.simplecontainer.io -j -z https://node-1.simplecontainer.io:1443
```

- Option `-j` specifies node that will be asked to join the starting node to the cluster - should be the same as the node from
contexts are imported from.
- Option `-z` specifies URL of the node which we will ask to join the cluster
- 
Now control plane should be accessible.

```cgo title="The smr ps command is used to list all containers in the cluster"
smr ps
NODE  GROUP  NAME  DOCKER NAME  IMAGE  IP  PORTS  DEPS  ENGINE STATE  SMR STATE  
```