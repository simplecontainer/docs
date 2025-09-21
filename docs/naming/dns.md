---
sidebar_position: 3
---

# DNS naming
Running containers are following the rules of the underlying container engine in network perspective:
Container can be attached to the multiple networks.

When simplecontainer node is started `cluster` network is created and added to the list of the networks.

## DNS 
The DNS of all services inside simplecontainer node and/or cluster is following the next formats:
- Container FQDN `network.generated-name.private`
- Headless FQDN `network.group.name.private`

**Container FQDN** will resolve to the IP address of the specific container replica on the specific network.

**Headless FQDN** will list IP addresses of all replicas on the specific network.

## Examples
Specific DNS FQDN (Resolve IP of specific replicas):
```cgo
bridge.example-busybox-1.private
```

Headless DNS FQDN (Resolve IPs of all replicas)
```cgo
bridge.example.busybox.private
```