function parseJSON(response: Response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  (error as any).response = response;
  throw error;
}

export default function request(url: string, options: RequestInit) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}
