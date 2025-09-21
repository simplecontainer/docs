---
sidebar_position: 1
---
# Object naming
There are three identifiers helping identify objects:
- Prefix
- Kind
- Group
- Name

eg. simplecontainer/v1/kind/group/name

This helps localization of the objects and restricting the scope of the objects.

## Format
The following string is called format and is unique identifier of the object. All the objects are represented via their 
short-format to enable intuitive and quick actions.

Examples:

- `smrctl restart containers/example/example-busybox-1`
- `smrctl edit containers/example/busybox`
- `smrctl gitops refresh gitops/examples/plain-manual`
- `smrctl gitops refresh gitops/examples/plain-manual`
- etc.

Format is also used in the referencing CertKey or HtttpAuth for gitops objects, dependencies, resources, configuration and server side rendering.