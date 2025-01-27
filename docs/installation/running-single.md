---
sidebar_position: 2
---

# Running single node

The simplecontainer can run as a single node or in cluster mode.

If it is not mandatory to have multiple nodes, high availability, and disaster recovery in place for the application,
single node can be configured to handle container orchestration.

## How to run single node?

To run single node of simplecontainer on the machine run the snippet below.

```bash text title="Starting simplecontainer node with control plane exposed on the smr.example.com"
smrmgr start -a smr-node-1 -d smr.example.com
```

This starts the simplecontainer node and control plane listens on the `0.0.0.0:1443` which means all interfaces,
and is accessible from the internet if machine has the public IP.

Ports exposed when started using command above:

- `0.0.0.0:1443->1443/tcp` (Simplecontainer control plane)
- `0.0.0.0:9212->9212/tcp` (RAFT protocol control plane sharing state)
- `:::1443->1443/tcp` (Simplecontainer control plane ipv6)
- `127.0.0.1:2379->2379/tcp` (Etcd exposed only on the localhost)

Option `-a` is mandatory and is used for specifying name of the node. It must be unique so be careful.

Options `-d` specifies that node generates certificates for mTLS which are only valid for the `smr.example.com`.

To connect to this node on another machine there is easy option:

```cgo title="Exporting context for the smr.example.com, smr CLI uses context to connect to control plane"
smrmgr export <<< https://smr.example.com:1443
cat $HOME/smr/smr/contexts/$(smr context).key
```

This exports contexts and encrypt it using AES with key specified on the path `$HOME/smr/smr/contexts/$(smr context).key`.

:::warning
Specify correct host, port and include https:// for the control plane endpoint when exporting. If the 
port you choose is different change it accordingly. Control plane is always exposed using the https.
:::

To import context on the another machine run the commands below.

```cgo title="Copy paste smrmgr export output and $HOME/smr/smr/contexts/$(smr context).key as key for decryption"
smrmgr import PASTE_OUTPUT <<< PASTE_KEY
```

If the key is not specified it will listen on `stdin` for decryption key.

Now control plane should be accessible.

```cgo title="The smr ps command is used to list all containers in the cluster"
smr ps
NODE  GROUP  NAME  DOCKER NAME  IMAGE  IP  PORTS  DEPS  ENGINE STATE  SMR STATE  
```