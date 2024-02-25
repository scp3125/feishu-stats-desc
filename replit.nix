{ pkgs }: {
    deps = [
        pkgs.yarn
        pkgs.esbuild
        pkgs.nodejs_20

        pkgs.nodePackages.typescript
        pkgs.nodePackages.typescript-language-server
    ];
}