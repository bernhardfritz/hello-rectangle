import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import topLevelAwait from 'vite-plugin-top-level-await';

export default defineConfig(({ command }) => ({
  base: './',
  plugins: [
    topLevelAwait(),
    ...[
      command === 'serve'
        ? createHtmlPlugin({
            inject: {
              tags: [
                {
                  injectTo: 'head-prepend',
                  tag: 'script',
                  children: `// REGISTER ERROR OVERLAY
const showErrorOverlay = (err) => {
// must be within function call because that's when the element is defined for sure.
const ErrorOverlay = customElements.get('vite-error-overlay');
// don't open outside vite environment
if (!ErrorOverlay) {
return;
}
console.log(err);
const overlay = new ErrorOverlay(err);
document.body.appendChild(overlay);
};

window.addEventListener('error', showErrorOverlay);
window.addEventListener('unhandledrejection', ({ reason }) =>
showErrorOverlay(reason),
);
`,
                },
              ],
            },
          })
        : [],
    ],
  ],
}));
