const { types } = require('./.cz-config.cjs');

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-case': [0, 'always', ['lower-case', 'upper-case']],
    'type-enum': [0, 'always', types.map(({ value }) => value)]
  }
};
