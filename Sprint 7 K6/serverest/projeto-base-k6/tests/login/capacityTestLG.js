import { sleep } from 'k6';
import http from 'k6/http';
import { SharedArray } from 'k6/data';

import {BaseChecks, 
  BaseRest, 
  ENDPOINTS, 
  testConfig,
  userId } from '../../support/base/baseTest.js';

export const options = testConfig.options.capacityThreshold;

const base_uri = testConfig.environment.hml.url;
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

  export function setup(responseData){
    const res = baseRest.post(ENDPOINTS.USER_ENDPOINT, payload);

    baseChecks.checkStatusCode(res, 201);

    console.log(responseData);
    return {responseData: res.json() };
    
    
  }


export default function ()  {
  let userIndex = __ITER % data.length;
  let user = data[userIndex];
  console.log(user);

  const urlRes = baseRest.post(ENDPOINTS.LOGIN_ENDPOINT, user);

  baseChecks.checkStatusCode(urlRes, 200)
  
  sleep(1);
};

export function teardown(responseData){
  const userId = responseData.responseData._id
  const res = baseRest.del(ENDPOINTS.LOGIN_ENDPOINT + `${userId}`)

  baseChecks.checkStatusCode(res, 200)

  console.log(`teardown deletando usuario com ID ${userId}`);

  console.log(responseData);
  
}
