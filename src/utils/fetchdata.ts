const getCustomFetch = (
  baseUrl: string,
  defaultRequestOptions: RequestInit
) => {
  const { headers, ...rest } = defaultRequestOptions;

  const fetch = (url: string, config: RequestInit) => {
    const promise = window.fetch(baseUrl + url, {
      ...rest,
      ...config,
      headers: {
        ...headers,
        ...config.headers,
      },
    });

    return {
      json: async () => {
        const response = await promise;
        if (!response.ok) {
          return Promise.reject(await response.json().catch(() => undefined));
        }
        return response.json();
      },
      text: async () => {
        const response = await promise;
        if (!response.ok) {
          return Promise.reject(await response.text());
        }
        return response.text();
      },
    };
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
        headers: {
          ...config?.headers,
          "Content-Type": "application/json",
          Accept: "application/json",
          "custom-header": "custom-header-value",
        },
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
