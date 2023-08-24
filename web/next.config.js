/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [ //permitir que o projeto consiga puxar imagens externas do git
      'avatars.githubusercontent.com',
    ]
  }
}

module.exports = nextConfig
