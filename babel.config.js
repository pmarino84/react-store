module.exports = api => {
  const isTest = api.env('test');

  const presets = [];
  let ignore = [];
  if (isTest) {
    presets.push(['@babel/preset-env', { targets: { node: 'current' } }]);
  } else {
    presets.push(["@babel/preset-env"]);
    ignore = [
      'src/**/*.test.js'
    ];
  }

  presets.push(['react-app', { 'absoluteRuntime': false }]);

  return {
    presets,
    ignore
  }
}
