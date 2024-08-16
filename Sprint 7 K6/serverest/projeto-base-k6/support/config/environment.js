export const testConfig = {
    environment: {
        hml: {
            url:"http://localhost:3000"
        }
    },
    options:{
        smokeThreshold: {
            vus: 1, 
            duration: '1s', 
            threshold: {
                http_req_duration: ['(95)< 2000'],
                http_req_failed: ['rate<0.05']
            }
          },

          spikeThreshold: {
            stages: [
                {duration: '16s', target: 500},
                {duration: '8s', target: 0}
              ],
                thresholds: {    
                http_req_duration: ['(95)< 2000'],
                http_req_failed: ['rate<0.05']
          }
        },
          
        teste: {
            setupTimeout: '600s',
            teardownTimeout: '600s',
            vus: 1,
            iterations: 1,
            thresholds: thresholds
        },
        capacityThreshold:{
            stages: [
                {duration: '2m', target: 130},
                {duration: '3m', target: 140},
                {duration: '2m', target: 0}
              ],
            threshold: {    
                http_req_duration: ['(95)< 2000'],
                http_req_failed: ['rate<0.05']
          }
        },
        enduranceThreshold:{
            stages: [
                {duration: '6s', target: 40},
                {duration: '6s', target: 40},
                {duration: '3s', target: 0}
              ],
            threshold: {    
                http_req_duration: ['(95)< 2000'],
                http_req_failed: ['rate<0.05']
          }
        },
        loadThreshold:{
            stages: [
                {duration: '10s', target: 150},
                {duration: '15s', target: 200},
                {duration: '10s', target: 300},
                {duration: '10s', target: 400},
                {duration: '10s', target: 500},
                {duration: '15s', target: 0}
              ],
            threshold: {    
                http_req_duration: ['(95)< 2000'],
                http_req_failed: ['rate<0.05']
          }
        },


    }  
    
}
