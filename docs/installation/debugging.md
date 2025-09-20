---
sidebar_position: 1
---

# Debugging startup issues

## Running simplecontainer as the root
Running start commands as the root user will not start and configure simplecontainer correct.
```cgo
smrmgr start 
```
The command above needs to run as the user who is not root and has correct access to the `/var/run/docker.sock`.

## Docker socket access is not correctly configured
Simplecontainer relies on the `/var/run/docker.sock` to communicate with the docker engine.

### Option 1: Make user owner of the socket (Temporary solution)
```cgo
sudo chown $USER /var/run/docker.sock
```

### Option 2: Add user to the group that has access to the /var/run/docker.sock (Permanent solution)
```cgo
GROUP_NAME=$(stat -c '%G' /var/run/docker.sock)
sudo usermod -aG "$GROUP_NAME" "$USER"
```