import { sleep } from 'k6';
import { SharedArray } from 'k6/data';

import {BaseChecks, BaseRest } from '../support/base/baseTest.js'

export const options = {
  vus: 1, // Key for Smoke test. Keep it at 2, 3, max 5 VUs
  duration: '1s', // This can be shorter or just a few iterations
};

const base_uri = 'http://localhost:3000';
const baseRest = new BaseRest(base_uri);
const baseChecks =  new BaseChecks();

const data = new SharedArray('Users', function () {
  const jsonData = JSON.parse(open('../data/static/user.json'));
  return jsonData.users; 
});


const payload =
  {
    "nome": "Fulano da Silva",
    "email": "fulano@qa.com",
    "password": "teste",
    "administrador": "true"
  }

  export function setup(){
    const res = baseRest.post('/usuarios', payload)

    baseChecks.checkStatusCode(res, 201)
    
    return {responseData: res.json() }
  }

  


export default function ()  {
  let userIndex = __ITER % data.length;
  let user = data[userIndex];
  console.log(user);

  const urlRes = http.post('http://localhost:3000/login', user);

  baseChecks.checkStatusCode(urlRes, 200)
  
  sleep(1);
};

export function teardown(responseData){
  const userId = responseData.responseData._id
  const res = http.del(`http://localhost:3000/usuarios'/${userId}`)

  baseChecks.checkStatusCode(res, 200)

  console.log(`teardown deletando usuario com ID ${userId}`);
  
}
