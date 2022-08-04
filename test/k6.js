import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: '300',
      timeUnit: '1s',
      //note: 1000 iterations per second
      duration: '60s',
      preAllocatedVUs: 20,
      maxVUs: 200
    },
  },
};

export default function () {
  let res = http.get('http://localhost:3001/qa/questions/?product_id=1');
  check(res, {
  'status was 200': (r) => r.status == 200,
  // 'body contains product_id = 1': (r) => r.body.product_id == 1
});
  sleep(1);

  res = http.get('http://localhost:3001/qa/questions/1/answers');
  check(res, {
    'status was 200': (r) => r.status == 200,
    // 'body contains question = 1': (r) => r.body.question == 1
  });
}
