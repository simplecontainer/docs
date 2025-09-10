# `smrmgr` – Simplecontainer Manager Script

**Author:** [Adnan Selimovic](https://linkedin.com/in/qdnqn)
**Version:** 2.0.0

`smrmgr` is a modular management script for [simplecontainer](https://github.com/simplecontainer/smr).  
It provides commands for installing binaries, managing nodes, handling clusters, and working with systemd services.

---

## Installation

```bash
smrmgr install [<smr_version> <smrctl_version>]
```

Download and install the latest (or specified) versions of **smr** and **smrctl** binaries.  
They are installed to `/usr/local/bin`.

---

## Node Management

### Start a Node
```bash
smrmgr start [options]
```

Start a new node or join an existing cluster.

#### Options
| Option | Argument | Description | Default |
|--------|----------|-------------|---------|
| `-n`   | `<node>` | Node name | `simplecontainer-node-1` |
| `-d`   | `<domain>` | Domain for the node | `localhost` |
| `-a`   | `<ip>` | IP address (auto-detected if omitted) | – |
| `-c`   | `<args>` | Additional client arguments | `--port.control 0.0.0.0:1443 --port.overlay 0.0.0.0:9212` |
| `-i`   | `<image>` | Docker image | `quay.io/simplecontainer/smr` |
| `-t`   | `<tag>` | Docker image tag | Latest from repo |
| `-j`   | – | Join an existing cluster | – |
| `-p`   | `<peer>` | Peer address (required with `-j`) | – |
| `-s`   | – | Install as systemd service | – |
| `-T`   | `<token>` | Authentication token (first-time startup only) | – |
| `-A`   | `<action>` | Action to perform (`standalone`, `cluster-leader`, `cluster-join`) | – |
| `-h`   | – | Show help | – |

#### Example
```bash
# Start a new cluster
smrmgr start -n node-1 -d mydomain.com -a 10.0.0.1

# Join an existing cluster
smrmgr start -n node-2 -j -p 10.0.0.1

# Start with token and action
smrmgr start -n node-1 -T mytoken123 -A cluster-leader
```

---

### Stop a Node
```bash
smrmgr stop
```

Stops the current node gracefully.

---

## Service Management

### Install systemd unit
```bash
smrmgr start -d node.example.com -s
smrmgr service-install
```

Installs the `simplecontainer@username.service` unit to `/etc/systemd/system/`.

---

### Start service
```bash
sudo systemctl set-environment TOKEN_ENV='{{ .token }}'
sudo systemctl set-environment ACTION_ENV='{{ .action }}'
sudo systemctl start simplecontainer@username
```

Starts the node as a managed systemd service.  
Supports first-time startup with token and action **(Only available if using app.simplecontainer.io)**.

---

### Stop service
```bash
sudo systemctl stop simplecontainer@username
```

Stops the systemd-managed node.

---

## Commands Summary

| Command            | Description                                              |
|--------------------|----------------------------------------------------------|
| `install`          | Download and install smr & smrctl binaries               |
| `start`            | Start a new node or join existing cluster                |
| `stop`             | Stop the current node                                    |
| `service-install`  | Install systemd service unit                             |
| `service-start`    | Start the node via systemd service (used by the systemd) |
| `service-stop`     | Stop the node via systemd service (used by the systemd)  |
| `help`             | Show usage information                                   |

---

## Environment Variables

| Variable       | Description |
|----------------|-------------|
| `DEBUG=true`   | Enable debug logging |
| `NODES_DIR`    | Override nodes directory (default: `~/nodes`) |
| `NODE_NAME`    | Pre-set node name |
| `DOMAIN`       | Pre-set domain |
| `IP_ADDRESS`   | Pre-set IP |
| `NODE_ARGS`    | Override default node args |
| `CLIENT_ARGS`  | Override default client args |
| `JOIN_CLUSTER` | Default: `false` |
| `PEER_ADDRESS` | Peer node address |
| `DOCKER_IMAGE` | Docker image override |
| `DOCKER_TAG`   | Docker tag override |
| `INSTALL_SERVICE` | Default: `false` |
| `TOKEN`        | Startup token |
| `ACTION`       | Startup action |

---

## Examples

```bash
# Install smr and smrctl binaries
smrmgr install

# Start a node with defaults
smrmgr start

# Start a node with custom Docker image
smrmgr start -n node-1 -i myrepo/myimage -t latest

# Join cluster with peer node
smrmgr start -n node-2 -j -p http://192.168.1.10:1443

# Join cluster with peer node and creates configuration for the service to start later 
smrmgr start -n node-2 -j -p http://192.168.1.10:1443 -s
```