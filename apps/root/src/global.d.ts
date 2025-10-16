declare const System: {
  import: (name: string) => Promise<any>;
  config: (config: any) => void;
};
