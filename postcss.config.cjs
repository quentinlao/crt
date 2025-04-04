// eslint-disable @typescript-eslint/no-require-imports
module.exports = {
  plugins: {
    "postcss-nested": {},
    "postcss-import": {},
    "postcss-preset-env": {
      features: {
        "nesting-rules": true,
      },
    },
  },
};
