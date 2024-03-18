{
  description = "nix";

  inputs = {
    nixpkgs.url = "nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }: {
    devShell.x86_64-linux = let
      pkgs = import nixpkgs { system = "x86_64-linux"; };
    in with pkgs; mkShell {
      buildInputs = [ nodejs ];
    };
  };
}
