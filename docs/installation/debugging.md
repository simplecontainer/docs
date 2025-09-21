---
sidebar_position: 5
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

:::warning
When changing ownership of the socket, security aspect needs to be taken into consideration.
:::

### Option 1: Make user owner of the socket (Temporary solution)
```cgo
sudo chown $USER /var/run/docker.sock
```
This will change the ownership for the `docker.sock` for the current session and will allow communication to it. 
Reboot will clear permissions and this needs to be done again.

### Option 2: Add user to the group that has access to the /var/run/docker.sock (Permanent solution)
```cgo
GROUP_NAME=$(stat -c '%G' /var/run/docker.sock)
sudo usermod -aG "$GROUP_NAME" "$USER"
```
Assiging current user to the group, that has permissions `docker.sock`, will survive reboots and will enable access of the 
current user to the `docker.sock`. When starting simplecontainer node container - all group user has will be appended to the 
container itself and will solve all permission issues over socket.
