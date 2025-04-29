export interface ServerError extends Error {
  status?: number;
  code?: string;
} 