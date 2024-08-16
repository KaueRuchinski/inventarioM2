import { check } from "k6";

export class BaseChecks {
    checkStatusCode(response, expectedStatus = 200) {
        check( response, {
            'status code check': (r) => r.status === expectedStatus
        })
    }
    checkRes(response, expectedStatus = 'Cadastro realizado com sucesso'){
      check( response, {
        'create user message is correct': (r) => r.message === expectedStatus
      })  
    }

    checkError(response, maxErrorRate) {
        const totalResquest = __ITER + 1;
        const errorRate = (__ITER - response.status === 200 ? 1 : 0) / totalResquest;

        check(response, {
          'Verificaçaõ da taxa de erro': () => errorRate <= maxErrorRate

        });
    }

    checkResTime(response, maxTime) {
      check(response, {
        'Verificação do tempo de resposta': (r) => r.timings.duration <= maxTime

      });
    }

}

