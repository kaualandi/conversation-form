export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getTime() {
  const hour = new Date().toLocaleTimeString();
  return hour.substring(0, hour.length - 3);
}
