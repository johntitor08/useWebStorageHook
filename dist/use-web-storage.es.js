import { useState as p, useEffect as w, useCallback as d } from "react";
function v(t, r, f = "local", c = null) {
  const o = f === "session" ? window.sessionStorage : window.localStorage, [a, n] = p(() => {
    try {
      const e = o.getItem(t);
      if (!e)
        return r;
      const s = JSON.parse(e);
      return s.expiry && Date.now() > s.expiry ? (o.removeItem(t), r) : s.data;
    } catch (e) {
      return console.error("useWebStorage read error:", e), r;
    }
  });
  w(() => {
    try {
      const e = {
        data: a,
        expiry: c ? Date.now() + c : null
      };
      o.setItem(t, JSON.stringify(e));
    } catch (e) {
      console.error("useWebStorage write error:", e);
    }
  }, [t, a, o, c]), w(() => {
    const e = (s) => {
      if (s.key === t)
        if (s.newValue) {
          const m = JSON.parse(s.newValue);
          m.expiry && Date.now() > m.expiry ? (o.removeItem(t), n(r)) : n(m.data);
        } else
          n(r);
    };
    return window.addEventListener("storage", e), () => window.removeEventListener("storage", e);
  }, [t, o, r]);
  const g = d(() => {
    o.removeItem(t), n(r);
  }, [t, o, r]), u = d(() => {
    o.clear(), n(r);
  }, [o, r]);
  return [a, n, g, u];
}
export {
  v as useWebStorage
};
