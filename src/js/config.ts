export let config;

if (process.env.localConfig === 'production') {
  config = {
    apiUrl: 'https://vaccine.skyreglis.studio'
  };
} else {
  config = {
    apiUrl: 'http://127.0.0.1:3244/api/rest'
  };
}

config = {
  ...config
};
