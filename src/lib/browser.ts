export const isBraveBrowser = (): boolean => {
  // @ts-ignore - navigator.brave exists but TypeScript doesn't know about it
  return navigator && navigator.brave !== undefined;
}; 