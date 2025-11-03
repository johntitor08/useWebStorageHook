export declare function useWebStorage<T>(
  key: string,
  initialValue: T,
  type?: "local" | "session",
  expiryMs?: number | null
): [T, (value: T) => void, () => void, () => void];
