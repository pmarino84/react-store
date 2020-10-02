module.exports = api => {
  const isTest = api.env('test');

  const presets = [];
  let ignore = [];
  if (isTest) {
    presets.push(['@babel/preset-env', { targets: { node: 'current' } }]);
  } else {
    ignore = [
      'src/stories/**/*',
      'src/**/*.test.js',
      'src/**/*.spec.js'
    ];
  }

  presets.push(['react-app', { 'absoluteRuntime': false }]);

  return {
    presets,
    ignore
  }
}
