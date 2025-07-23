export function animatePress(
  setState: any,
  index: number,
  key: string,
  delay = 150
) {
  setState((prev: any[]) =>
    prev.map((item, i) => (i === index ? { ...item, [key]: true } : item))
  );
  setTimeout(() => {
    setState((prev: any[]) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: false } : item))
    );
  }, delay);
}

export function toggleStateAt(setState: any, index: number, key: string) {
  setState((prev: any[]) =>
    prev.map((item, i) => (i === index ? { ...item, [key]: !item[key] } : item))
  );
}

export function removeItemAtIndex(
  index: number,
  setStates: ((s: any) => void)[]
) {
  for (const setState of setStates) {
    setState((prev: any[]) => prev.filter((_, i) => i !== index));
  }
}

export function addItem(item: any, setStates: ((s: any) => void)[]) {
  for (const setState of setStates) {
    setState((prev: any[]) => [...prev, item]);
  }
}
