import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.RENDER_EXTERNAL_URL || process.env.NEXT_PUBLIC_APP_URL || 'https://kairos.sathyabama.ac.in').replace(/\/$/, '');
  const now = new Date();

  const publicRoutes = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/tracks', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/rules', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/sponsors', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/refer-sponsor', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/resources', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/dashboard', priority: 0.85, changeFrequency: 'hourly' as const },
    { path: '/leaderboard', priority: 0.9, changeFrequency: 'always' as const },
    { path: '/on-campus', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/online-qualifier', priority: 0.85, changeFrequency: 'daily' as const },
    { path: '/register', priority: 0.95, changeFrequency: 'daily' as const },
    { path: '/team/create', priority: 0.85, changeFrequency: 'daily' as const },
    { path: '/team/join', priority: 0.85, changeFrequency: 'daily' as const },
    { path: '/portal/pass', priority: 0.75, changeFrequency: 'daily' as const },
    { path: '/members', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/members/leadership', priority: 0.75, changeFrequency: 'monthly' as const },
    { path: '/stage', priority: 0.7, changeFrequency: 'daily' as const },
    { path: '/csat', priority: 0.6, changeFrequency: 'weekly' as const },
  ];

  return publicRoutes.map(route => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
