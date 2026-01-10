
import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import { spawn } from "child_process";

// Explicit color values matching globals.css for PDF generation
const pdfStyles = `
    /* Force CSS variables to explicit values for PDF rendering */
    :root {
        --background: #FAFAF8;
        --foreground: #1A1A1A;
        --muted: #F5F3F0;
        --muted-foreground: #6B6B6B;
        --accent: #B8860B;
        --accent-secondary: #D4A84B;
        --accent-muted: rgba(184, 134, 11, 0.06);
        --accent-foreground: #FFFFFF;
        --border: #E8E4DF;
        --border-hover: #D4CEC7;
        --card: #FFFFFF;
        --font-display: 'Playfair Display', Georgia, serif;
        --font-body: 'Source Sans 3', system-ui, sans-serif;
        --font-mono: 'IBM Plex Mono', monospace;
    }

    @page { 
        margin: 0.5in; 
        size: letter; 
    }

    /* Hide non-print elements */
    header, footer, .no-print, [class*="noPrint"] { display: none !important; }
    button, a[download], [class*="downloadBtn"] { display: none !important; }
    
    /* Remove body pseudo-elements (texture overlay) */
    body::before, body::after { display: none !important; }

    body {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        background: white !important;
        padding: 0 !important;
        margin: 0 !important;
    }

    /* Resume Body */
    [class*="resumeBody"] {
        background: white !important;
        padding: 0 !important;
        margin: 0 !important;
        min-height: auto !important;
    }

    /* Resume Container */
    [class*="resumeContainer"] {
        max-width: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
        box-shadow: none !important;
        border: none !important;
        border-radius: 0 !important;
        background: white !important;
    }

    /* Header Section */
    [class*="resumeHeader"] {
        background: #1A1A1A !important;
        color: white !important;
        padding: 1rem 1.5rem !important;
        margin-bottom: 1rem !important;
        border-radius: 4px !important;
        display: flex !important;
        justify-content: space-between !important;
        align-items: flex-start !important;
    }

    [class*="headerLeft"] h1 {
        font-family: 'Playfair Display', Georgia, serif !important;
        font-size: 1.75rem !important;
        font-weight: 400 !important;
        color: white !important;
        margin: 0 !important;
        letter-spacing: -0.02em !important;
    }

    [class*="headerLeft"] p {
        font-family: 'Source Sans 3', system-ui, sans-serif !important;
        font-size: 0.9rem !important;
        color: #B8860B !important;
        font-weight: 500 !important;
        margin: 0.25rem 0 0 !important;
    }

    [class*="headerRight"] {
        text-align: right !important;
        font-size: 0.8rem !important;
        color: #CCCCCC !important;
    }

    [class*="headerRight"] div {
        margin-bottom: 0.125rem !important;
    }

    [class*="portfolioLink"] {
        color: #B8860B !important;
        font-weight: 500 !important;
    }

    /* Clearance Banner */
    [class*="clearanceBanner"] {
        background: rgba(184, 134, 11, 0.1) !important;
        border-left: 3px solid #B8860B !important;
        padding: 0.5rem 0.75rem !important;
        margin-bottom: 1rem !important;
        font-family: 'IBM Plex Mono', monospace !important;
        font-weight: 500 !important;
        color: #B8860B !important;
        text-transform: uppercase !important;
        font-size: 0.7rem !important;
        letter-spacing: 0.1em !important;
    }

    /* Sections */
    [class*="section"] {
        margin-bottom: 0.75rem !important;
        padding: 0 !important;
        break-inside: avoid !important;
    }

    [class*="sectionTitle"] {
        font-family: 'IBM Plex Mono', monospace !important;
        font-size: 0.65rem !important;
        font-weight: 500 !important;
        text-transform: uppercase !important;
        letter-spacing: 0.15em !important;
        border-bottom: 1px solid #E8E4DF !important;
        padding-bottom: 0.35rem !important;
        margin: 0 0 0.5rem 0 !important;
        color: #B8860B !important;
    }

    [class*="section"] > p {
        margin: 0 0 0.35rem 0 !important;
        font-size: 0.8rem !important;
        line-height: 1.5 !important;
        color: #6B6B6B !important;
    }

    /* Job Entries */
    [class*="jobEntry"] {
        margin-bottom: 0.6rem !important;
        break-inside: avoid !important;
    }

    [class*="jobHeader"] {
        display: flex !important;
        justify-content: space-between !important;
        font-weight: 600 !important;
        margin-bottom: 0.15rem !important;
        font-size: 0.85rem !important;
        color: #1A1A1A !important;
    }

    [class*="jobCompany"] {
        font-family: 'Playfair Display', Georgia, serif !important;
        color: #1A1A1A !important;
        font-size: 0.85rem !important;
        font-weight: 600 !important;
    }

    [class*="jobDate"] {
        font-family: 'IBM Plex Mono', monospace !important;
        color: #6B6B6B !important;
        font-weight: 400 !important;
        font-size: 0.7rem !important;
        letter-spacing: 0.02em !important;
    }

    /* Job Lists */
    [class*="jobList"] {
        margin: 0.15rem 0 0 !important;
        padding-left: 1rem !important;
    }

    [class*="jobList"] li {
        margin-bottom: 0.1rem !important;
        font-size: 0.75rem !important;
        line-height: 1.4 !important;
        color: #6B6B6B !important;
    }

    /* Skills Grid */
    [class*="skillsGrid"] {
        display: grid !important;
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 0.5rem !important;
    }

    [class*="skillItem"] strong {
        display: block !important;
        margin-bottom: 0.1rem !important;
        font-family: 'Playfair Display', Georgia, serif !important;
        font-size: 0.75rem !important;
        font-weight: 600 !important;
        color: #1A1A1A !important;
    }

    [class*="skillItem"] span {
        font-size: 0.7rem !important;
        color: #6B6B6B !important;
    }

    /* Certifications Text */
    [class*="certText"] {
        font-size: 0.75rem !important;
        margin: 0.25rem 0 0 0 !important;
        color: #6B6B6B !important;
    }

    /* Typography resets for PDF */
    * {
        box-sizing: border-box !important;
    }

    ul, ol {
        margin: 0.1rem 0 !important;
    }
`;

async function generateResumeCV() {
    console.log("🚀 Starting Resume & CV PDF Generation...");

    // Start a temporary Next.js server
    const port = 3001;
    const baseUrl = `http://localhost:${port}`;
    let serverProcess: ReturnType<typeof spawn> | undefined;

    console.log("🚀 Starting temporary Next.js server...");
    serverProcess = spawn("npm", ["run", "start", "--", "-p", port.toString()], {
        stdio: "inherit",
        detached: false,
        cwd: process.cwd(),
        env: { ...process.env, PORT: port.toString() }
    });

    // Wait for server to be ready
    console.log("⏳ Waiting for server to boot (10s)...");
    await new Promise(r => setTimeout(r, 10000));

    const browser = await chromium.launch({
        args: ["--disable-web-security"]
    });

    try {
        const context = await browser.newContext({ bypassCSP: true });
        const page = await context.newPage();
        const outputDir = path.join(process.cwd(), "public", "documents");
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // 1. Generate Resume PDF
        console.log(`📄 Generating Resume PDF from ${baseUrl}/resume...`);
        try {
            await page.goto(`${baseUrl}/resume`, { waitUntil: "networkidle", timeout: 60000 });
        } catch (e) {
            console.warn("⚠️ Timeout or error loading page, attempting print anyway...");
        }

        // Wait for fonts to load
        await page.waitForTimeout(2000);

        // Inject comprehensive PDF styles
        await page.addStyleTag({ content: pdfStyles });

        await page.pdf({
            path: path.join(outputDir, "resume.pdf"),
            format: "Letter",
            printBackground: true,
            preferCSSPageSize: false,
        });
        console.log("✅ Resume PDF saved to public/documents/resume.pdf");

        // 2. Generate CV PDF
        console.log(`📄 Generating CV PDF from ${baseUrl}/cv...`);
        try {
            await page.goto(`${baseUrl}/cv`, { waitUntil: "networkidle", timeout: 60000 });
        } catch (e) {
            console.warn("⚠️ Timeout or error loading CV page, attempting print anyway...");
        }

        // Wait for fonts to load
        await page.waitForTimeout(2000);

        // Inject PDF styles for CV as well
        await page.addStyleTag({ content: pdfStyles });

        await page.pdf({
            path: path.join(outputDir, "cv.pdf"),
            format: "Letter",
            printBackground: true,
            preferCSSPageSize: false,
        });
        console.log("✅ CV PDF saved to public/documents/cv.pdf");

    } catch (error) {
        console.error("❌ Error generating PDFs:", error);
        process.exit(1);
    } finally {
        await browser.close();
        if (serverProcess) {
            console.log("🛑 Stopping server...");
            serverProcess.kill();
        }
    }
}

generateResumeCV();
