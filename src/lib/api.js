
export async function getUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  return response.json();
}
export async function getGraphData() {
  return {
    "data": {
      "target1": [
        [1.0, 1545.174000],
        [1.1, 154.5177600],
        [0.2, 15.45181200]
      ],
      "target2": [
        [2.11, 15451.74000],
        [1.222, 154.5177600],
        [0.1, 1545.181200]
      ]
    }
  };
}
