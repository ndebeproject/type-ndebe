# Rebuild the desktop Keyman candidate

Use the official Keyman compiler (this candidate was built with 18.0.252):

```
kmc --no-error-reporting build ndebe_2026.kmn
kmc --no-error-reporting build ndebe_2026.kps
```

Before rebuilding the package, copy the current `../desktop/NdebeRounded-Regular.ttf` and `../desktop/NdebeSoftBold-Regular.ttf` here. The KPS includes those exact files. Preserve the owner-approved editable-document embedding setting.

The KMN source mirrors `Typing Update/generate-keyman.cjs`, generated from Type Ndebe's current shared input mapping. Regenerate the KMN there if the mapping changes, then copy it here and rebuild.

Package structure reference: https://help.keyman.com/developer/18.0/reference/file-types/kps
Compiler reference: https://help.keyman.com/developer/current-version/reference/kmc/cli/reference

No native install test has been performed. This package targets desktop systems; it does not include a touch layout. Do not install automatically as part of a build.
