interface Shorthash {
  unique(str: string): string;
}

declare var Shorthash: Shorthash;

declare module "shorthash" {
  export = Shorthash;
}
