// eslint-disable @typescript-eslint/no-require-imports
module.exports = {
  plugins: {
    "postcss-import": {},
    "postcss-custom-media": {},
    "postcss-nested": {},
    "postcss-preset-env": {
      stage: 3,
      features: {
        "nesting-rules": true,
        "custom-media-queries": true,
      },
    },
  },
};
