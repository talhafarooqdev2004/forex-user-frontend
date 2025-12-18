export function fetcher(...args: Parameters<typeof fetch>) {
    const [url, options = {}] = args;

    return fetch(url, {
        ...options,
        cache: 'no-store',
        headers: {
            ...options.headers,
            'Cache-Control': 'no-cache',
        },
    })
        .then((res) => {
            if (!res.ok) throw Error(res.statusText);
            return res.json();
        });
}

export function fetcherWithToken(
    token: string,
    ...args: Parameters<typeof fetch>
) {
    return fetch(args[0], {
        ...args[1],
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => {
            if (!res.ok) {
                throw Error(res.statusText);
            }

            return res.json();
        })
        .catch((error) => {
            console.error(error);
            throw error;
        });
}