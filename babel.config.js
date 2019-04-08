module.exports = function(api) {
  api.cache(true);

  const presets = ["@babel/env", "@babel/preset-typescript"];
  const plugins = [
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread",
    [
      "module-resolver",
      {
        alias: {
          "@services": "./src/services",
          "@resolvers": "./src/resolvers",
          "@data": "./src/data",
          "@handlers": "./src/handlers",
          "@utils": "./src/utils",
          "@interfaces": "./src/interfaces",
        },
      },
    ],
  ];

  return {
    presets,
    plugins,
  };
};
