
export async function getUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  return response.json();
}
export async function getGraphData(param) {
  const response = {
    data: {
      target1: [
        [1.0, 1545.174000, '2018-12-20 13:59'],
        [1.1, 154.5177600, '2018-12-30 13:59'],
        [0.2, 15.45181200, '2018-12-25 13:59']
      ],
      target2: [
        [2.11, 15451.74000, '2018-12-22 13:59'],
        [1.222, 154.5177600, '2018-12-23 13:59'],
        [0.1, 1545.181200, '2018-12-03 13:59']
      ]
    }
  };

  for (const c in response.data) {
    if (c) {
      const newobj = [];
      response.data[c].map((val) => {
        if (val[2] >= param.minDate && val[2] <= param.maxDate) newobj.push(val);
        return val;
      });
      response.data[c] = newobj;
    }
  }
  return response;
}
