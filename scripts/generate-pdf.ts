/**
 * Generate PDF from markdown whitepaper using Playwright
 * Usage: npx tsx scripts/generate-pdf.ts <markdown-file> [output-file]
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

// Professional PDF styling
const PDF_CSS = `
@page {
    size: letter;
    margin: 0.75in 1in;
}

body {
    font-family: 'Georgia', 'Times New Roman', serif;
    font-size: 11pt;
    line-height: 1.7;
    color: #1a1a1a;
    max-width: 100%;
    padding: 0;
    margin: 0;
}

h1 {
    font-size: 22pt;
    font-weight: bold;
    color: #1a365d;
    margin-top: 0;
    margin-bottom: 8pt;
    text-align: center;
    border-bottom: 2px solid #1a365d;
    padding-bottom: 12pt;
}

h2 {
    font-size: 14pt;
    font-weight: bold;
    color: #2d3748;
    margin-top: 24pt;
    margin-bottom: 12pt;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 6pt;
}

h3 {
    font-size: 12pt;
    font-weight: bold;
    color: #4a5568;
    margin-top: 18pt;
    margin-bottom: 8pt;
}

h4 {
    font-size: 11pt;
    font-weight: bold;
    color: #4a5568;
    margin-top: 12pt;
    margin-bottom: 6pt;
}

p {
    margin: 0 0 12pt 0;
    text-align: justify;
}

ul, ol {
    margin: 0 0 12pt 0;
    padding-left: 24pt;
}

li {
    margin-bottom: 6pt;
}

code {
    font-family: 'Courier New', monospace;
    font-size: 9pt;
    background-color: #f7fafc;
    padding: 2pt 4pt;
    border-radius: 2pt;
    color: #c53030;
}

pre {
    font-family: 'Courier New', monospace;
    font-size: 9pt;
    background-color: #1a202c;
    color: #e2e8f0;
    padding: 12pt;
    border-radius: 4pt;
    margin: 12pt 0;
    overflow-x: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
}

pre code {
    background-color: transparent;
    color: #e2e8f0;
    padding: 0;
}

blockquote {
    border-left: 3pt solid #4299e1;
    margin: 12pt 0;
    padding: 8pt 16pt;
    background-color: #ebf8ff;
    font-style: italic;
    color: #2b6cb0;
}

hr {
    border: none;
    border-top: 1px solid #e2e8f0;
    margin: 24pt 0;
}

strong {
    font-weight: bold;
    color: #1a202c;
}

em {
    font-style: italic;
}

a {
    color: #3182ce;
    text-decoration: underline;
}

/* Table styling */
table {
    width: 100%;
    border-collapse: collapse;
    margin: 12pt 0;
    font-size: 10pt;
}

th, td {
    border: 1px solid #e2e8f0;
    padding: 8pt;
    text-align: left;
}

th {
    background-color: #edf2f7;
    font-weight: bold;
}

/* Footer/Page numbers */
.page-footer {
    position: fixed;
    bottom: 0.25in;
    width: 100%;
    text-align: center;
    font-size: 10pt;
    color: #718096;
}
`;

async function generatePdf(markdownPath: string, outputPath: string) {
    console.log(`📄 Reading markdown from: ${markdownPath}`);

    // Read markdown
    const mdContent = fs.readFileSync(markdownPath, 'utf-8');

    // Convert to HTML
    const htmlContent = await marked(mdContent);

    // Create full HTML document
    const fullHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <style>${PDF_CSS}</style>
    </head>
    <body>
        ${htmlContent}
    </body>
    </html>
    `;

    console.log(`🖨️  Generating PDF: ${outputPath}`);

    // Launch browser and generate PDF
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.setContent(fullHtml, { waitUntil: 'networkidle' });

    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    await page.pdf({
        path: outputPath,
        format: 'Letter',
        margin: {
            top: '0.75in',
            right: '1in',
            bottom: '0.75in',
            left: '1in',
        },
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: '<div></div>',
        footerTemplate: `
            <div style="width: 100%; text-align: center; font-size: 10px; color: #718096; font-family: Georgia, serif;">
                <span class="pageNumber"></span>
            </div>
        `,
    });

    await browser.close();

    console.log(`✅ PDF generated successfully: ${outputPath}`);
}

// Main
async function main() {
    const args = process.argv.slice(2);

    if (args.length < 1) {
        console.log('Usage: npx tsx scripts/generate-pdf.ts <markdown-file> [output-file]');
        console.log('Example: npx tsx scripts/generate-pdf.ts "whitepapers/markdown/02_The Disconnected Pipeline.md"');
        process.exit(1);
    }

    const markdownPath = args[0];

    if (!fs.existsSync(markdownPath)) {
        console.error(`Error: File not found: ${markdownPath}`);
        process.exit(1);
    }

    // Generate output path
    let outputPath: string;
    let mirrorPath: string | null = null;

    if (args.length >= 2) {
        outputPath = args[1];
    } else {
        const stem = path.basename(markdownPath, '.md');
        const match = stem.match(/^(\d+)_(.+)$/);

        let outputName: string;
        if (match) {
            const num = match[1];
            const name = match[2].replace(/\s+/g, '-').toLowerCase();
            outputName = `${num}-${name}.pdf`;
        } else {
            outputName = `${stem}.pdf`;
        }

        // Primary destination: whitepapers/pdf/
        outputPath = path.join(path.dirname(markdownPath), '..', 'pdf', outputName);

        // Mirror destination for Next.js public directory
        mirrorPath = path.join(process.cwd(), 'public', 'whitepapers', 'pdf', outputName);
    }

    await generatePdf(markdownPath, outputPath);

    if (mirrorPath) {
        console.log(`🔄 Mirroring to public directory: ${mirrorPath}`);
        // Ensure public output directory exists
        const mirrorDir = path.dirname(mirrorPath);
        if (!fs.existsSync(mirrorDir)) {
            fs.mkdirSync(mirrorDir, { recursive: true });
        }
        fs.copyFileSync(outputPath, mirrorPath);
        console.log('✅ Mirror complete.');
    }
}

main().catch(console.error);
