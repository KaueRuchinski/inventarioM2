import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

export const options = {
  vus: 1, // Key for Smoke test. Keep it at 2, 3, max 5 VUs
  duration: '30s', // This can be shorter or just a few iterations
};



const data = new SharedArray('Users', function () {
  const jsonData = JSON.parse(open('../data/static/user.json'));
  return jsonData.users; 
});


export default function ()  {
  let userIndex = __ITER % data.length;
  let user = data[userIndex];
  console.log(user);

  const urlRes = http.get('http://localhost:3000/login');
  sleep(1);
 
};