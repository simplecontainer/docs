---
sidebar_position: 2
---
# Containers naming
Containers are following format standard with an important distinction. Since the underlaying engine running containers
needs unique name, the following naming is used:

```cgo
simplecontainer/v1/containers/group/group-name-index
```

The final name is made of three components `group-name-index`:
- Group (taken from the meta)
- Name (taken from the meta)
- Index (calculated)

This is called generated name which is different from the name defined in the meta.

So underlying container engine will run containers using this name.

Also state is saved under the same format. Some actions are available for this format - see more client reference.
