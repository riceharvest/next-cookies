import Cookies from 'universal-cookie';
import { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * @opensourceframework/next-cookies
 * Get the cookies on both the client & server
 *
 * @original-author Matthew Mueller
 * @original-repo https://github.com/hoangvvo/next-cookies
 * @license MIT
 */

var UniversalCookie = Cookies.default || Cookies;
function nextCookies(ctx, options) {
  const header = ctx?.req?.headers?.cookie;
  const uc = new UniversalCookie(header);
  return uc.getAll(options);
}
function useCookies(options) {
  const isBrowser = () => typeof window !== "undefined";
  const [cookies, setCookies] = useState(() => {
    if (!isBrowser()) return {};
    return new UniversalCookie().getAll(options);
  });
  useEffect(() => {
    const uc = new UniversalCookie();
    const handleChange = () => {
      setCookies(uc.getAll(options));
    };
    uc.addChangeListener(handleChange);
    return () => {
      uc.removeChangeListener(handleChange);
    };
  }, [options]);
  const set = useCallback((key, value, cookieOptions) => {
    const uc = new UniversalCookie();
    uc.set(key, value, cookieOptions);
  }, []);
  const remove = useCallback((key, cookieOptions) => {
    const uc = new UniversalCookie();
    uc.remove(key, cookieOptions);
  }, []);
  return useMemo(() => [cookies, set, remove], [cookies, set, remove]);
}
function useCookie(key, defaultValue, options) {
  const [cookies, setCookie, removeCookie] = useCookies();
  const value = cookies[key] !== void 0 ? cookies[key] : defaultValue;
  const set = useCallback(
    (newValue) => {
      setCookie(key, newValue, options);
    },
    [key, options, setCookie]
  );
  const remove = useCallback(() => {
    removeCookie(key, options);
  }, [key, options, removeCookie]);
  return useMemo(() => [value, set, remove], [value, set, remove]);
}
var index_default = nextCookies;

export { index_default as default, nextCookies as getCookies, useCookie, useCookies };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map