/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";
const withPWA = withPWAInit({
    cacheOnFrontEndNav:true,
    aggressiveFrontEndNavCaching:true,
    reloadOnOnline:true,
    swcMinify:true,
    disable: false,
    workboxOptions:{
    disableDevLogs:true,
  }
});
const nextConfig = withPWA({});

export default nextConfig;
