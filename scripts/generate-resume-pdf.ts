
import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import { spawn } from "child_process";

async function generateResumeCV() {
    console.log("🚀 Starting Resume & CV PDF Generation...");

    // Start a temporary Next.js server
    const port = 3001;
    const baseUrl = `http://localhost:${port}`;
    let serverProcess;

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

        await page.addStyleTag({
            content: `
                @page { margin: 0.4in; size: letter; }
                body { -webkit-print-color-adjust: exact; }
                header, footer, .no-print { display: none !important; }
                button, a[download] { display: none !important; }
                /* Force tight spacing for PDF */
                * { box-sizing: border-box; }
                .resumeContainer, [class*="resumeContainer"] { padding: 20px !important; }
                .section, [class*="section"] { margin-bottom: 10px !important; }
                .jobEntry, [class*="jobEntry"] { margin-bottom: 6px !important; }
                .sectionTitle, [class*="sectionTitle"] { margin-bottom: 6px !important; }
                ul, ol { margin: 2px 0 !important; }
                li { margin-bottom: 1px !important; }
            `
        });

        await page.pdf({
            path: path.join(outputDir, "resume.pdf"),
            format: "Letter",
            printBackground: true,
        });
        console.log("✅ Resume PDF saved to public/documents/resume.pdf");

        // 2. Generate CV PDF
        console.log(`📄 Generating CV PDF from ${baseUrl}/cv...`);
        await page.goto(`${baseUrl}/cv`, { waitUntil: "networkidle", timeout: 60000 });

        await page.pdf({
            path: path.join(outputDir, "cv.pdf"),
            format: "Letter",
            printBackground: true,
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
