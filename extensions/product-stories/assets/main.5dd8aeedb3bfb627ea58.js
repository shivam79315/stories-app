!(function (e, A) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = A(require("React"), require("ReactDOM")))
    : "function" == typeof define && define.amd
      ? define(["React", "ReactDOM"], A)
      : "object" == typeof exports
        ? (exports.AppReelsList = A(require("React"), require("ReactDOM")))
        : (e.AppReelsList = A(e.React, e.ReactDOM));
})(self, (e, A) =>
  (() => {
    "use strict";
    var t,
      r = {
        847: (e, A, t) => {
          t.r(A), t.d(A, { default: () => m });
          var r = t(883),
            n = t.n(r),
            o = t(356),
            i = t(389);
          const a = function (e) {
            var A = e.videos,
              t = e.openModal,
              r = e.isSmallScreen,
              a = {
                video: {
                  width: r ? "80px" : "160px",
                  height: r ? "80px" : "170px",
                  objectFit: "cover",
                  objectPosition: "50% 20%",
                  borderRadius: r ? "50%" : "10px",
                },
                gridCell: { display: "flex", justifyContent: "center" },
              };
            return n().createElement(
              o.Z,
              null,
              n().createElement(
                i.o,
                { align: "center", gap: "500" },
                A.map(function (e, A) {
                  return n().createElement(
                    i.o,
                    { key: A, align: "center" },
                    n().createElement(
                      "div",
                      { style: a.gridCell },
                      n().createElement("video", {
                        onClick: function () {
                          return t();
                        },
                        autoPlay: !0,
                        muted: !0,
                        playsInline: !0,
                        loop: !0,
                        style: a.video,
                        src: e.src,
                      }),
                    ),
                  );
                }),
              ),
            );
          };
          var l = t(312),
            c = t.n(l),
            u = t(113),
            s = t(35),
            d = t.n(s);
          t(583);
          const f = function (e) {
            var A = e.videos,
              t = e.isOpen,
              r = e.closeModal,
              o = e.toggleMute,
              i = e.isMuted;
            return n().createElement(
              c(),
              {
                isOpen: t,
                onRequestClose: r,
                style: {
                  overlay: { backgroundColor: "#303030e6", zIndex: "99999" },
                  content: {
                    width: "100vw",
                    height: "100vh",
                    border: "none",
                    backgroundColor: "transparent",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  },
                },
                ariaHideApp: !1,
                contentLabel: "Video Modal",
              },
              n().createElement("button", { onClick: r }, "close"),
              n().createElement(
                u.RC,
                {
                  spaceBetween: 50,
                  slidesPerView: 1,
                  loop: !0,
                  style: { width: "100%", height: "100%" },
                },
                A.map(function (e, A) {
                  return n().createElement(
                    u.qr,
                    {
                      key: A,
                      style: {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                    },
                    n().createElement(d(), {
                      stories: [{ url: e.src, type: e.type, muted: i }],
                      width: 400,
                      height: 600,
                      style: { objectFit: "cover" },
                    }),
                  );
                }),
              ),
              n().createElement(
                "button",
                {
                  onClick: o,
                  style: {
                    position: "absolute",
                    bottom: "20px",
                    right: "20px",
                    padding: "10px 20px",
                    backgroundColor: "#303030",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  },
                },
                i ? "Unmute" : "Mute",
              ),
            );
          };
          function g(e, A) {
            return (
              (function (e) {
                if (Array.isArray(e)) return e;
              })(e) ||
              (function (e, A) {
                var t =
                  null == e
                    ? null
                    : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
                      e["@@iterator"];
                if (null != t) {
                  var r,
                    n,
                    o,
                    i,
                    a = [],
                    l = !0,
                    c = !1;
                  try {
                    if (((o = (t = t.call(e)).next), 0 === A)) {
                      if (Object(t) !== t) return;
                      l = !1;
                    } else
                      for (
                        ;
                        !(l = (r = o.call(t)).done) &&
                        (a.push(r.value), a.length !== A);
                        l = !0
                      );
                  } catch (e) {
                    (c = !0), (n = e);
                  } finally {
                    try {
                      if (
                        !l &&
                        null != t.return &&
                        ((i = t.return()), Object(i) !== i)
                      )
                        return;
                    } finally {
                      if (c) throw n;
                    }
                  }
                  return a;
                }
              })(e, A) ||
              (function (e, A) {
                if (e) {
                  if ("string" == typeof e) return p(e, A);
                  var t = {}.toString.call(e).slice(8, -1);
                  return (
                    "Object" === t && e.constructor && (t = e.constructor.name),
                    "Map" === t || "Set" === t
                      ? Array.from(e)
                      : "Arguments" === t ||
                          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
                        ? p(e, A)
                        : void 0
                  );
                }
              })(e, A) ||
              (function () {
                throw new TypeError(
                  "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
                );
              })()
            );
          }
          function p(e, A) {
            (null == A || A > e.length) && (A = e.length);
            for (var t = 0, r = Array(A); t < A; t++) r[t] = e[t];
            return r;
          }
          delete globalThis["use strict"];
          const m = function () {
            var e = g((0, r.useState)(!1), 2),
              A = e[0],
              t = e[1],
              o = g((0, r.useState)(!0), 2),
              i = o[0],
              l = o[1],
              c = g((0, r.useState)(!1), 2),
              u = c[0],
              s = c[1];
            (0, r.useEffect)(function () {
              var e = function () {
                t(window.innerWidth < 768);
              };
              return (
                e(),
                window.addEventListener("resize", e),
                function () {
                  return window.removeEventListener("resize", e);
                }
              );
            }, []);
            var d = [
              {
                src: "https://marketplace.canva.com/EAGBfD2okv0/1/0/450w/canva-brown-coffee-good-morning-instagram-reel-7YrP1-1ccZw.mp4",
                type: "video",
              },
              {
                src: "https://marketplace.canva.com/EAGDx_6KYaU/1/0/450w/canva-green-and-white-nature-mobile-video-nROjWUjFoig.mp4",
                type: "video",
              },
            ];
            return n().createElement(
              n().Fragment,
              null,
              n().createElement(a, {
                videos: d,
                openModal: function () {
                  (document.body.style.overflow = "hidden"), s(!0);
                },
                isSmallScreen: A,
              }),
              n().createElement(f, {
                videos: d,
                isOpen: u,
                closeModal: function () {
                  (document.body.style.overflow = ""), s(!1);
                },
                toggleMute: function () {
                  l(function (e) {
                    return !e;
                  });
                },
                isMuted: i,
              }),
            );
          };
        },
        85: (e) => {
          e.exports =
            "data:application/font-woff;charset=utf-8;base64, d09GRgABAAAAAAZgABAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAGRAAAABoAAAAci6qHkUdERUYAAAWgAAAAIwAAACQAYABXR1BPUwAABhQAAAAuAAAANuAY7+xHU1VCAAAFxAAAAFAAAABm2fPczU9TLzIAAAHcAAAASgAAAGBP9V5RY21hcAAAAkQAAACIAAABYt6F0cBjdnQgAAACzAAAAAQAAAAEABEBRGdhc3AAAAWYAAAACAAAAAj//wADZ2x5ZgAAAywAAADMAAAD2MHtryVoZWFkAAABbAAAADAAAAA2E2+eoWhoZWEAAAGcAAAAHwAAACQC9gDzaG10eAAAAigAAAAZAAAArgJkABFsb2NhAAAC0AAAAFoAAABaFQAUGG1heHAAAAG8AAAAHwAAACAAcABAbmFtZQAAA/gAAAE5AAACXvFdBwlwb3N0AAAFNAAAAGIAAACE5s74hXjaY2BkYGAAYpf5Hu/j+W2+MnAzMYDAzaX6QjD6/4//Bxj5GA8AuRwMYGkAPywL13jaY2BkYGA88P8Agx4j+/8fQDYfA1AEBWgDAIB2BOoAeNpjYGRgYNBh4GdgYgABEMnIABJzYNADCQAACWgAsQB42mNgYfzCOIGBlYGB0YcxjYGBwR1Kf2WQZGhhYGBiYGVmgAFGBiQQkOaawtDAoMBQxXjg/wEGPcYDDA4wNUA2CCgwsAAAO4EL6gAAeNpj2M0gyAACqxgGNWBkZ2D4/wMA+xkDdgAAAHjaY2BgYGaAYBkGRgYQiAHyGMF8FgYHIM3DwMHABGQrMOgyWDLEM1T9/w8UBfEMgLzE////P/5//f/V/xv+r4eaAAeMbAxwIUYmIMHEgKYAYjUcsDAwsLKxc3BycfPw8jEQA/gZBASFhEVExcQlJKWkZWTl5BUUlZRVVNXUNTQZBgMAAMR+E+gAEQFEAAAAKgAqACoANAA+AEgAUgBcAGYAcAB6AIQAjgCYAKIArAC2AMAAygDUAN4A6ADyAPwBBgEQARoBJAEuATgBQgFMAVYBYAFqAXQBfgGIAZIBnAGmAbIBzgHsAAB42u2NMQ6CUAyGW568x9AneYYgm4MJbhKFaExIOAVX8ApewSt4Bic4AfeAid3VOBixDxfPYEza5O+Xfi04YADggiUIULCuEJK8VhO4bSvpdnktHI5QCYtdi2sl8ZnXaHlqUrNKzdKcT8cjlq+rwZSvIVczNiezsfnP/uznmfPFBNODM2K7MTQ45YEAZqGP81AmGGcF3iPqOop0r1SPTaTbVkfUe4HXj97wYE+yNwWYxwWu4v1ugWHgo3S1XdZEVqWM7ET0cfnLGxWfkgR42o2PvWrDMBSFj/IHLaF0zKjRgdiVMwScNRAoWUoH78Y2icB/yIY09An6AH2Bdu/UB+yxopYshQiEvnvu0dURgDt8QeC8PDw7Fpji3fEA4z/PEJ6YOB5hKh4dj3EvXhxPqH/SKUY3rJ7srZ4FZnh1PMAtPhwP6fl2PMJMPDgeQ4rY8YT6Gzao0eAEA409DuggmTnFnOcSCiEiLMgxCiTI6Cq5DZUd3Qmp10vO0LaLTd2cjN4fOumlc7lUYbSQcZFkutRG7g6JKZKy0RmdLY680CDnEJ+UMkpFFe1RN7nxdVpXrC4aTtnaurOnYercZg2YVmLN/d/gczfEimrE/fs/bOuq29Zmn8tloORaXgZgGa78yO9/cnXm2BpaGvq25Dv9S4E9+5SIc9PqupJKhYFSSl47+Qcr1mYNAAAAeNptw0cKwkAAAMDZJA8Q7OUJvkLsPfZ6zFVERPy8qHh2YER+3i/BP83vIBLLySsoKimrqKqpa2hp6+jq6RsYGhmbmJqZSy0sraxtbO3sHRydnEMU4uR6yx7JJXveP7WrDycAAAAAAAH//wACeNpjYGRgYOABYhkgZgJCZgZNBkYGLQZtIJsFLMYAAAw3ALgAeNolizEKgDAQBCchRbC2sFER0YD6qVQiBCv/H9ezGI6Z5XBAw8CBK/m5iQQVauVbXLnOrMZv2oLdKFa8Pjuru2hJzGabmOSLzNMzvutpB3N42mNgZGBg4GKQYzBhYMxJLMlj4GBgAYow/P/PAJJhLM6sSoWKfWCAAwDAjgbRAAB42mNgYGBkAIIbCZo5IPrmUn0hGA0AO8EFTQAA";
        },
        883: (A) => {
          A.exports = e;
        },
        845: (e) => {
          e.exports = A;
        },
      },
      n = {};
    function o(e) {
      var A = n[e];
      if (void 0 !== A) return A.exports;
      var t = (n[e] = { id: e, exports: {} });
      return r[e].call(t.exports, t, t.exports, o), t.exports;
    }
    (o.m = r),
      (t = []),
      (o.O = (e, A, r, n) => {
        if (!A) {
          var i = 1 / 0;
          for (u = 0; u < t.length; u++) {
            for (var [A, r, n] = t[u], a = !0, l = 0; l < A.length; l++)
              (!1 & n || i >= n) && Object.keys(o.O).every((e) => o.O[e](A[l]))
                ? A.splice(l--, 1)
                : ((a = !1), n < i && (i = n));
            if (a) {
              t.splice(u--, 1);
              var c = r();
              void 0 !== c && (e = c);
            }
          }
          return e;
        }
        n = n || 0;
        for (var u = t.length; u > 0 && t[u - 1][2] > n; u--) t[u] = t[u - 1];
        t[u] = [A, r, n];
      }),
      (o.n = (e) => {
        var A = e && e.__esModule ? () => e.default : () => e;
        return o.d(A, { a: A }), A;
      }),
      (o.d = (e, A) => {
        for (var t in A)
          o.o(A, t) &&
            !o.o(e, t) &&
            Object.defineProperty(e, t, { enumerable: !0, get: A[t] });
      }),
      (o.o = (e, A) => Object.prototype.hasOwnProperty.call(e, A)),
      (o.r = (e) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      }),
      (() => {
        o.b = document.baseURI || self.location.href;
        var e = { 792: 0 };
        o.O.j = (A) => 0 === e[A];
        var A = (A, t) => {
            var r,
              n,
              [i, a, l] = t,
              c = 0;
            if (i.some((A) => 0 !== e[A])) {
              for (r in a) o.o(a, r) && (o.m[r] = a[r]);
              if (l) var u = l(o);
            }
            for (A && A(t); c < i.length; c++)
              (n = i[c]), o.o(e, n) && e[n] && e[n][0](), (e[n] = 0);
            return o.O(u);
          },
          t = (self.webpackChunkAppReelsList =
            self.webpackChunkAppReelsList || []);
        t.forEach(A.bind(null, 0)), (t.push = A.bind(null, t.push.bind(t)));
      })(),
      (o.nc = void 0);
    var i = o.O(void 0, [224, 618, 689], () => o(847));
    return o.O(i);
  })(),
);
