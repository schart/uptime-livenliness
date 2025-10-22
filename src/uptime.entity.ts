import { siteEntityInterface } from './uptime.types';

export let sites: siteEntityInterface[] = [
  { status: 'DOWN', host: 'https://google.com', lastUpdate: '' },
  { status: 'DOWN', host: 'https://chatgpt.com', lastUpdate: '' },
  { status: 'DOWN', host: 'https://claude.com', lastUpdate: '' },
  { status: 'DOWN', host: 'https://youtube.com', lastUpdate: '' },
];
