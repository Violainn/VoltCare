/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Export static HTML to `out` for GitHub Pages deployment
  output: "export",
  // When deploying to GitHub Pages under a repository (user.github.io/RepoName),
  // set basePath and assetPrefix so static assets are referenced correctly.
  basePath: "/VoltCare",
  assetPrefix: "/VoltCare",
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'randomuser.me' },
      { protocol: 'https', hostname: 'api.dicebear.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
  },
};

export default nextConfig;
