import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

(async () => {
    try {
        const templatePath = toAbsolute('dist/index.html');
        const serverEntryPath = toAbsolute('dist-server/entry-server.js');

        // Read index.html template (empty shell)
        const template = fs.readFileSync(templatePath, 'utf-8');

        // Import rendered app
        const { render } = await import('file://' + serverEntryPath); // 'file://' is important for ESM
        const { html, helmet } = render();

        // Inject App Structure
        let appHtml = template.replace(
            '<div id="root"></div>',
            `<div id="root">${html}</div>`
        );

        // Inject Meta Tags
        const headContent = `${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}${helmet.script.toString()}`;
        appHtml = appHtml.replace('</head>', `${headContent}</head>`);

        // Save final file
        fs.writeFileSync(templatePath, appHtml);
        console.log('✅ Pre-rendering completed!');
    } catch (e) {
        console.error('❌ Error during pre-rendering:', e);
        process.exit(1);
    }
})();
