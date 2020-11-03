module.exports = api => {
  const isTest = api.env('test');

  const presets = [];
  if (isTest) {
    presets.push(['@babel/preset-env', { targets: { node: 'current' } }]);
  }

  presets.push(['react-app', { 'absoluteRuntime': false }]);

  return {
    presets
  }
}
