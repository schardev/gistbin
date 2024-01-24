/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self';",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com;",
            "style-src 'self' 'unsafe-inline';",
            "img-src *;",
            "font-src 'self';",
          ].join(""),
        },
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ],
    },
  ],
};

export default nextConfig;
