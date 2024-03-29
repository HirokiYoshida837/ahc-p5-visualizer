/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    compiler: {
        styledComponents: true
    }
}

module.exports = nextConfig

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     reactStrictMode: true,
//     output: 'export',
//     swcMinify: false,
//     pageExtensions: ['page.tsx'],
//     /** @param {import('webpack').Configuration} [config] */
//     webpack(config) {
//         return config
//     },
//     experimental: {
//         esmExternals: false,
//         appDir: false,
//     },
//     trailingSlash: true,
//     compiler: {
//         styledComponents: true,
//     },
//     images: {
//         unoptimized: true,
//     },
// }
//
// module.exports = nextConfig//
