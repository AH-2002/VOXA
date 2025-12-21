import createNextIntPlugin from "next-intl/plugin";
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb" as any,
    },
  },
};
const withNextIntl = createNextIntPlugin();
export default withNextIntl(nextConfig);
