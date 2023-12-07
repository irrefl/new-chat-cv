import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

const dev = process.argv.includes('dev');
const basePath = dev ? '' : process.env.BASE_PATH //|| '/chat-force-cv-ia';

const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      fallback: '404.html'
    }),

    paths: {
      base: basePath,
    },

    prerender: {
      concurrency: 3,
      crawl: true,
      entries: [`/about`],
      // Update the handleHttpError function
      handleHttpError: ({ path, referrer, message }) => {
        throw new Error(`Error message: ${message}, Referrer: ${referrer}, Path: ${path}, Base Path: ${basePath}`);
      },
    },
  },
};

export default config;
