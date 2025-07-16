/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: [
      'lookaside.instagram.com',
      'alegumeaday.com',
      'www.eatingwell.com',
      'www.livingchirpy.com',
      'www.spendwithpennies.com',
      'flavorfulife.com',
      'images.squarespace-cdn.com',
      'lookaside.fbsbx.com',
      'www.tiktok.com',
      'scitechdaily.com',
      'static01.nyt.com',
      'www.wikihow.com',
      'www.dvcinquirer.com',
      'foodandjourneys.net', 
      'knifeandsoul.com',
      'boldappetite.com',
      'cookingmydreams.com', // <-- add this line
    ],
  },
};

module.exports = nextConfig;
