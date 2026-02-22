import { CookieGetOptions, CookieSetOptions } from 'universal-cookie';

interface NextCookiesContext {
    req?: {
        headers: {
            cookie?: string;
        };
    };
}
interface CookieOptions extends CookieGetOptions, CookieSetOptions {
}
declare function nextCookies(ctx: NextCookiesContext, options?: CookieGetOptions): Record<string, string | undefined>;

declare function useCookies(options?: CookieGetOptions): readonly [
    Record<string, string | undefined>,
    (key: string, value: string, cookieOptions?: CookieSetOptions) => void,
    (key: string, cookieOptions?: CookieSetOptions) => void
];
declare function useCookie(key: string, defaultValue?: string, options?: CookieSetOptions): readonly [string | undefined, (value: string) => void, () => void];

export { type CookieOptions, nextCookies as default, nextCookies as getCookies, useCookie, useCookies };
