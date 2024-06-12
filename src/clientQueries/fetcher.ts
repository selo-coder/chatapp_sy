/**
 *  Fetcher Type used with swr
 */
export default async function fetcher<T>(
  ...args: Parameters<typeof fetch>
): Promise<T | void> {
  const res = await fetch(...args);

  if (res.status !== 200) {
    const error = new Error(
      `An error occured while fetching the data. Status Code: ${res.status}`
    );
    error.message = res.statusText;
    throw error;
  }

  const json = await res.json();
  return json;
}
