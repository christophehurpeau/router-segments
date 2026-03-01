import pobConfig from "@pob/eslint-config";

export default [
  ...pobConfig(import.meta.url).configs.node,
  {
    ignores: ["vite.config.ts"],
  },
];
