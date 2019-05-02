const axios = {
  post: () => new Promise(res => res({ message: 'Data saved.' })),
  get: () => new Promise(res => res({ data: [{ id: 'vn3RecDbwMQTjttnluZW', text: 'qaz123' }] })),
  put: () => new Promise(res => res({ message: 'Data updated.' })),
  delete: () => new Promise(res => res({ message: 'Data deleted.' })),
};

export default axios;
