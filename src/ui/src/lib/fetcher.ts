
export const fetcher = async <T = unknown>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  if (!res.ok) throw new Error(res.statusText);
  return res.json();
};
