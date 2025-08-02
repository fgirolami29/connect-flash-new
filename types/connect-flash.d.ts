declare module 'connect-flash' {
  import { RequestHandler } from 'express';

  export interface Flash {
    (type: string, message: string | string[]): number;
    (type: string): string[];
    (): { [key: string]: string[] };
  }

  declare global {
    namespace Express {
      interface Request {
        flash: Flash;
      }
    }
  }

  const flash: (options?: { unsafe?: boolean }) => RequestHandler;
  export = flash;
}
