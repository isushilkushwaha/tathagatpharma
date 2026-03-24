// const withPWA = require("next-pwa")({
//   dest: "public",
// });

// const nextConfig = {
//   reactStrictMode: true,
// };

// module.exports = withPWA(nextConfig);


const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development", // ✅ IMPORTANT
});

const nextConfig = {
  reactStrictMode: true,
};

module.exports = withPWA(nextConfig);