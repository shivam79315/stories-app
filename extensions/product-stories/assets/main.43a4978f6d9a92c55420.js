!(function (e, A) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = A())
    : "function" == typeof define && define.amd
      ? define([], A)
      : "object" == typeof exports
        ? (exports.AppReelsList = A())
        : (e.AppReelsList = A());
})(self, () =>
  (() => {
    "use strict";
    var e,
      A = {
        828: (e, A, t) => {
          t.r(A), t.d(A, { default: () => B });
          var r = t(540),
            n = t(356),
            o = t(389);
          const i = function (e) {
            var A = e.videos,
              t = e.openModal,
              i = e.isSmallScreen,
              l = {
                video: {
                  width: i ? "80px" : "160px",
                  height: i ? "80px" : "170px",
                  objectFit: "cover",
                  objectPosition: "50% 20%",
                  borderRadius: i ? "50%" : "10px",
                },
                gridCell: { display: "flex", justifyContent: "center" },
                outerDiv: {
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                },
              };
            return r.createElement(
              n.Z,
              null,
              r.createElement(
                "div",
                { style: l.outerDiv },
                A.map(function (e, A) {
                  return r.createElement(
                    o.o,
                    { key: A, align: "center" },
                    r.createElement(
                      "div",
                      { style: l.gridCell },
                      r.createElement("video", {
                        onClick: function () {
                          return t();
                        },
                        autoPlay: !0,
                        muted: !0,
                        playsInline: !0,
                        loop: !0,
                        style: l.video,
                        src: e.reel.reel_url,
                      }),
                    ),
                  );
                }),
              ),
            );
          };
          var l = t(312),
            a = t.n(l),
            c = t(113),
            u = t(35),
            s = t.n(u);
          t(583);
          const d = function (e) {
            var A = e.videos,
              t = e.isOpen,
              n = e.closeModal,
              o = e.toggleMute,
              i = e.isMuted;
            return r.createElement(
              a(),
              {
                isOpen: t,
                onRequestClose: n,
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
              r.createElement("button", { onClick: n }, "close"),
              r.createElement(
                c.RC,
                {
                  spaceBetween: 50,
                  slidesPerView: 1,
                  loop: !0,
                  style: { width: "100%", height: "100%" },
                },
                A.map(function (e, A) {
                  return r.createElement(
                    c.qr,
                    {
                      key: A,
                      style: {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                    },
                    r.createElement(s(), {
                      stories: [
                        {
                          url: e.reel.reel_url ? e.reel.reel_url : void 0,
                          type: "video",
                          muted: i,
                        },
                      ],
                      width: 400,
                      height: 600,
                      style: { objectFit: "cover", borderRadius: "10px" },
                    }),
                  );
                }),
              ),
              r.createElement(
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
                    zIndex: "99999",
                  },
                },
                i ? "Unmute" : "Mute",
              ),
            );
          };
          var f = (0, r.createContext)();
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
                    l = [],
                    a = !0,
                    c = !1;
                  try {
                    if (((o = (t = t.call(e)).next), 0 === A)) {
                      if (Object(t) !== t) return;
                      a = !1;
                    } else
                      for (
                        ;
                        !(a = (r = o.call(t)).done) &&
                        (l.push(r.value), l.length !== A);
                        a = !0
                      );
                  } catch (e) {
                    (c = !0), (n = e);
                  } finally {
                    try {
                      if (
                        !a &&
                        null != t.return &&
                        ((i = t.return()), Object(i) !== i)
                      )
                        return;
                    } finally {
                      if (c) throw n;
                    }
                  }
                  return l;
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
          const B = function () {
            var e = g((0, r.useState)(!1), 2),
              A = e[0],
              t = e[1],
              n = g((0, r.useState)(!0), 2),
              o = n[0],
              l = n[1],
              a = g((0, r.useState)(!1), 2),
              c = a[0],
              u = a[1],
              s = (0, r.useContext)(f).attachedReels;
            return (
              console.log("reelVideos are:::", s),
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
              }, []),
              r.createElement(
                r.Fragment,
                null,
                r.createElement(i, {
                  videos: s,
                  openModal: function () {
                    (document.body.style.overflow = "hidden"), u(!0);
                  },
                  isSmallScreen: A,
                }),
                r.createElement(d, {
                  videos: s,
                  isOpen: c,
                  closeModal: function () {
                    (document.body.style.overflow = ""), u(!1);
                  },
                  toggleMute: function () {
                    l(function (e) {
                      return !e;
                    });
                  },
                  isMuted: o,
                }),
              )
            );
          };
        },
        85: (e) => {
          e.exports =
            "data:application/font-woff;charset=utf-8;base64, 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";
        },
      },
      t = {};
    function r(e) {
      var n = t[e];
      if (void 0 !== n) return n.exports;
      var o = (t[e] = { id: e, exports: {} });
      return A[e].call(o.exports, o, o.exports, r), o.exports;
    }
    (r.m = A),
      (e = []),
      (r.O = (A, t, n, o) => {
        if (!t) {
          var i = 1 / 0;
          for (u = 0; u < e.length; u++) {
            for (var [t, n, o] = e[u], l = !0, a = 0; a < t.length; a++)
              (!1 & o || i >= o) && Object.keys(r.O).every((e) => r.O[e](t[a]))
                ? t.splice(a--, 1)
                : ((l = !1), o < i && (i = o));
            if (l) {
              e.splice(u--, 1);
              var c = n();
              void 0 !== c && (A = c);
            }
          }
          return A;
        }
        o = o || 0;
        for (var u = e.length; u > 0 && e[u - 1][2] > o; u--) e[u] = e[u - 1];
        e[u] = [t, n, o];
      }),
      (r.n = (e) => {
        var A = e && e.__esModule ? () => e.default : () => e;
        return r.d(A, { a: A }), A;
      }),
      (r.d = (e, A) => {
        for (var t in A)
          r.o(A, t) &&
            !r.o(e, t) &&
            Object.defineProperty(e, t, { enumerable: !0, get: A[t] });
      }),
      (r.o = (e, A) => Object.prototype.hasOwnProperty.call(e, A)),
      (r.r = (e) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      }),
      (() => {
        r.b = document.baseURI || self.location.href;
        var e = { 792: 0 };
        r.O.j = (A) => 0 === e[A];
        var A = (A, t) => {
            var n,
              o,
              [i, l, a] = t,
              c = 0;
            if (i.some((A) => 0 !== e[A])) {
              for (n in l) r.o(l, n) && (r.m[n] = l[n]);
              if (a) var u = a(r);
            }
            for (A && A(t); c < i.length; c++)
              (o = i[c]), r.o(e, o) && e[o] && e[o][0](), (e[o] = 0);
            return r.O(u);
          },
          t = (self.webpackChunkAppReelsList =
            self.webpackChunkAppReelsList || []);
        t.forEach(A.bind(null, 0)), (t.push = A.bind(null, t.push.bind(t)));
      })(),
      (r.nc = void 0);
    var n = r.O(void 0, [224, 765, 70, 689], () => r(828));
    return r.O(n);
  })(),
);
