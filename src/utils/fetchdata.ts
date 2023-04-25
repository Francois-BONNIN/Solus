const getCustomFetch = (
  baseUrl: string,
  defaultRequestOptions: RequestInit
) => {
  const { headers, ...rest } = defaultRequestOptions;

  const fetch = async (url: string, config: RequestInit) => {
    const promise = window.fetch(baseUrl + url, {
      ...rest,
      ...config,
      headers: {
        ...headers,
        ...config.headers,
      },
    });

    const response = await promise;
    if (!response.ok) {
      return Promise.reject(await response.json().catch(() => undefined));
    }
    return response.json();
  };

  return {
    get: (url: string, config?: RequestInit) => {
      return fetch(url, {
        ...config,
        method: "GET",
      });
    },
    post: (url: string, data: unknown, config?: RequestInit) => {
      return fetch(url, {
        ...config,
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    put: (url: string, data: unknown, config?: RequestInit) => {
      return fetch(url, {
        ...config,
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
  };
};

const api = getCustomFetch(import.meta.env.VITE_URL_BACKEND_API, {
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
