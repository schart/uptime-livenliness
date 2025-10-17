import { siteEntityInterface } from './uptime.types';

export let sites: siteEntityInterface[] = [
  { status: 'UP', host: 'https://google.com', lastUpdate: '' },
  { status: 'UP', host: 'https://chatgpt.com', lastUpdate: '' },
  { status: 'UP', host: 'https://claude.com', lastUpdate: '' },
  { status: 'DOWN', host: 'https://youtube.com', lastUpdate: '' },
];
