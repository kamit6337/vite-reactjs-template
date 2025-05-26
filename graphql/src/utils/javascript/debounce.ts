/* eslint-disable @typescript-eslint/no-explicit-any */
function debounce<T extends (...args: any[]) => void | Promise<void>>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(async () => {
      await func(...args);
    }, delay);
  };
}

export default debounce;
