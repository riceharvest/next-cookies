'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Cookies = require('universal-cookie');
var react = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var Cookies__default = /*#__PURE__*/_interopDefault(Cookies);

/**
 * @opensourceframework/next-cookies
 * Get the cookies on both the client & server
 *
 * @original-author Matthew Mueller
 * @original-repo https://github.com/hoangvvo/next-cookies
 * @license MIT
 */

var UniversalCookie = Cookies__default.default.default || Cookies__default.default;
function nextCookies(ctx, options) {
  const header = ctx?.req?.headers?.cookie;
  const uc = new UniversalCookie(header);
  return uc.getAll(options);
}
function useCookies(options) {
  const isBrowser = () => typeof window !== "undefined";
  const [cookies, setCookies] = react.useState(() => {
    if (!isBrowser()) return {};
    return new UniversalCookie().getAll(options);
  });
  react.useEffect(() => {
    const uc = new UniversalCookie();
    const handleChange = () => {
      setCookies(uc.getAll(options));
    };
    uc.addChangeListener(handleChange);
    return () => {
      uc.removeChangeListener(handleChange);
    };
  }, [options]);
  const set = react.useCallback((key, value, cookieOptions) => {
    const uc = new UniversalCookie();
    uc.set(key, value, cookieOptions);
  }, []);
  const remove = react.useCallback((key, cookieOptions) => {
    const uc = new UniversalCookie();
    uc.remove(key, cookieOptions);
  }, []);
  return react.useMemo(() => [cookies, set, remove], [cookies, set, remove]);
}
function useCookie(key, defaultValue, options) {
  const [cookies, setCookie, removeCookie] = useCookies();
  const value = cookies[key] !== void 0 ? cookies[key] : defaultValue;
  const set = react.useCallback(
    (newValue) => {
      setCookie(key, newValue, options);
    },
    [key, options, setCookie]
  );
  const remove = react.useCallback(() => {
    removeCookie(key, options);
  }, [key, options, removeCookie]);
  return react.useMemo(() => [value, set, remove], [value, set, remove]);
}
var index_default = nextCookies;

exports.default = index_default;
exports.getCookies = nextCookies;
exports.useCookie = useCookie;
exports.useCookies = useCookies;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map