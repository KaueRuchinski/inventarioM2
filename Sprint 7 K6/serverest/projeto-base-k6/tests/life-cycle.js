// 1. init code

import { sleep } from "k6";

// inicializa variaveis, define options(VUs, duration,tresholds)
let counter = 1

export function setup() {
    // 2. setup code(executa apenas uma vez antes da função principal)
    console.log(`SETUP ${counter}` );
  }
  
  export default function () {
    //3. VU CODE(Ponto de entrada dos VUs, onde realizam os testes, chamadas na API)
    console.log(`FUNÇÃO PRINCIPAL - ${counter} VU=${__VU} ITER=${__ITER}`)
    counter = counter + 1
    sleep(1)
    // 3. VU code
  }
  
  export function teardown() {
    // 4. teardown code(executa apenas 1 vez, APOS a execução da função principal)
    console.log(`TEARDOWN - ${counter}`);
  }