module.exports = {
  linters: {
    "**/*.+(js,ts)": ["eslint . --fix", "git add"],
    "**/*.+(js|md|ts|json|yml|yaml)": ["prettier --write", "git add"],
  },
};
