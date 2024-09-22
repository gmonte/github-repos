const defaultConfig = require('cz-custom/cz-config-EXAMPLE');
const conventionalCommitTypes = require('conventional-commit-types');

const customizableTypes = defaultConfig.types.reduce((acc, item) => {
  const [_name, description] = item.name.split(':');
  return { ...acc, [item.value]: { description: description.trim() } };
}, {});

const customTypes = Object.entries({
  ...customizableTypes,
  ...conventionalCommitTypes.types
}).map(([key, value]) => ({
  value: key,
  name: `${key}:${Array(12 - key.length)
    .fill(' ')
    .join('')}${value.description}`
}));

module.exports = {
  ...defaultConfig,
  types: customTypes,
  scopes: undefined,
  usePreparedCommit: true,
  customScope: true
};
