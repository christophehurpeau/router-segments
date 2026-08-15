import pobConfig from "@pob/eslint-config";

export default [
  ...pobConfig.configs.node,
  {
    ignores: ["vite.config.ts"],
  },
];
