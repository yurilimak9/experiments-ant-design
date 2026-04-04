export const API_BASE_URL = "http://localhost:8000/api/v1";

export interface ApiErrorResponse {
  name?: string;
  message: string;
  action?: string;
  status_code?: number;
}

export class ApiError extends Error {
  public action?: string;
  public status: number;
  public url: string;

  constructor(errorData: ApiErrorResponse, status: number, url: string) {
    super(errorData.message);

    this.name = errorData.name || "ApiError";
    this.action = errorData.action;
    this.status = status;
    this.url = url;
  }
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T | null> {
  const url = `${API_BASE_URL}${endpoint}`;
  const method = (options.method || "GET").toUpperCase();
  const isMutation = ["POST", "PUT", "PATCH", "DELETE"].includes(method);

  if (isMutation && !getCookie("csrftoken")) {
    await fetch(`${API_BASE_URL}/sessions/csrf/`, {
      method: "GET",
      credentials: "include",
    });
  }

  const headers = new Headers(options.headers || {});

  if (isMutation) {
    const csrfToken = getCookie("csrftoken");
    if (csrfToken) {
      headers.set("X-CSRFToken", csrfToken);
    }
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });

  if (response.status === 204) {
    return null;
  }

  if (!response.ok) {
    let errorData: ApiErrorResponse;

    try {
      errorData = await response.json();
    } catch {
      errorData = {
        message: "Ocorreu um erro inesperado na comunicação com o servidor.",
        action: "Verifique sua conexão ou tente novamente mais tarde.",
      };
    }

    throw new ApiError(errorData, response.status, url);
  }

  return response.json();
}

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }

  return null;
};
