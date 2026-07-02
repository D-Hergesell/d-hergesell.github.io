/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export estático — necessário para hospedar no GitHub Pages
  output: 'export',
  images: {
    // GitHub Pages não tem servidor de otimização de imagens
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
