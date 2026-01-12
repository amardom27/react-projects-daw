function numero_aleatorio() {
  const n = parseInt(Math.random() * 3);
  console.log(parseInt(n));

  postMessage(n);

  setTimeout(numero_aleatorio, 1000);
}

numero_aleatorio();