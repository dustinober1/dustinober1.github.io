#!/usr/bin/env python3
"""
Generate PDF from markdown whitepaper files using weasyprint.
Creates professional-looking PDFs with custom styling.
"""

import sys
import re
import markdown
from pathlib import Path
from weasyprint import HTML, CSS

# Professional PDF styling
PDF_CSS = """
@page {
    size: letter;
    margin: 1in 1in 1in 1in;
    
    @bottom-center {
        content: counter(page);
        font-family: 'Georgia', serif;
        font-size: 10pt;
        color: #666;
    }
}

body {
    font-family: 'Georgia', serif;
    font-size: 11pt;
    line-height: 1.6;
    color: #1a1a1a;
    max-width: 100%;
}

h1 {
    font-size: 24pt;
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

/* Subtitle/Author styling */
p:first-of-type {
    font-style: italic;
    text-align: center;
    font-size: 12pt;
    color: #4a5568;
    margin-bottom: 6pt;
}

p:nth-of-type(2) {
    text-align: center;
    font-size: 10pt;
    color: #718096;
    margin-bottom: 24pt;
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

/* About the Author section */
h3:last-of-type {
    margin-top: 36pt;
    border-top: 2px solid #1a365d;
    padding-top: 18pt;
}
"""


def convert_markdown_to_html(md_content: str) -> str:
    """Convert markdown to HTML with extensions."""
    md = markdown.Markdown(
        extensions=[
            'fenced_code',
            'tables',
            'nl2br',
        ]
    )
    return md.convert(md_content)


def generate_pdf(markdown_path: Path, output_path: Path):
    """Generate PDF from markdown file."""
    print(f"Reading markdown from: {markdown_path}")
    md_content = markdown_path.read_text(encoding='utf-8')
    
    # Convert to HTML
    html_content = convert_markdown_to_html(md_content)
    
    # Wrap in full HTML document
    full_html = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Whitepaper</title>
    </head>
    <body>
        {html_content}
    </body>
    </html>
    """
    
    # Generate PDF
    print(f"Generating PDF: {output_path}")
    HTML(string=full_html).write_pdf(
        output_path,
        stylesheets=[CSS(string=PDF_CSS)]
    )
    print(f"✓ PDF generated successfully: {output_path}")


def main():
    if len(sys.argv) < 2:
        print("Usage: python generate-pdf.py <markdown_file> [output_file]")
        print("Example: python generate-pdf.py whitepapers/markdown/02_The\\ Disconnected\\ Pipeline.md")
        sys.exit(1)
    
    markdown_path = Path(sys.argv[1])
    
    if not markdown_path.exists():
        print(f"Error: File not found: {markdown_path}")
        sys.exit(1)
    
    # Default output path
    if len(sys.argv) >= 3:
        output_path = Path(sys.argv[2])
    else:
        # Generate output filename based on input
        stem = markdown_path.stem
        # Extract number prefix if present (e.g., "02_The Disconnected Pipeline" -> "02")
        match = re.match(r'^(\d+)_(.+)$', stem)
        if match:
            num = match.group(1)
            name = match.group(2).replace(' ', '-').lower()
            output_name = f"{num}-{name}.pdf"
        else:
            output_name = f"{stem}.pdf"
        
        output_path = markdown_path.parent.parent / "pdf" / output_name
    
    # Ensure output directory exists
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    generate_pdf(markdown_path, output_path)


if __name__ == "__main__":
    main()
