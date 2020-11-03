module.exports = api => {
  const isTest = api.env('test');

  const presets = [];
  if (isTest) {
    presets.push(['@babel/preset-env', { targets: { node: 'current' } }]);
  } else {
    presets.push(['@babel/preset-env']);
  }

  presets.push(['@babel/preset-react']);

  return {
    presets
  }
}
