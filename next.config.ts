import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	reactCompiler: true
}

module.exports = {
	images: {
		remotePatterns: [new URL('https://rickandmortyapi.com/api/**')]
	}
}

export default nextConfig
