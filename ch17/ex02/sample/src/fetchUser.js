import https from 'https';

export function fetchUser() {
  return new Promise((resolve, reject) => {
    https
      .get('https://jsonplaceholder.typicode.com/users/1', (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(JSON.parse(data)));
      })
      .on('error', reject);
  });
}
