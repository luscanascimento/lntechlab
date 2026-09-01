const fs = require('fs');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

async function createResume() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 dimensions in points
  const { width, height } = page.getSize();

  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  const marginX = 36;
  let currentY = height - 34;

  const colorPrimary = rgb(11 / 255, 15 / 255, 25 / 255); // #0B0F19
  const colorBlue = rgb(0 / 255, 82 / 255, 255 / 255);    // #0052FF
  const colorText = rgb(35 / 255, 45 / 255, 60 / 255);   // #232D3C
  const colorMuted = rgb(90 / 255, 105 / 255, 125 / 255); // #5A697D
  const colorBorder = rgb(220 / 255, 228 / 255, 238 / 255); // #DCE4EE

  function drawHorizontalLine(y) {
    page.drawLine({
      start: { x: marginX, y },
      end: { x: width - marginX, y },
      thickness: 0.75,
      color: colorBorder,
    });
  }

  function drawSectionHeader(title) {
    currentY -= 7;
    drawHorizontalLine(currentY + 5);
    page.drawText(title, {
      x: marginX,
      y: currentY - 5,
      size: 9.5,
      font: fontBold,
      color: colorBlue,
    });
    currentY -= 14;
  }

  // 1. Header Name
  const nameText = 'LUCAS GABRIEL FERREIRA DO NASCIMENTO';
  const nameWidth = fontBold.widthOfTextAtSize(nameText, 15);
  page.drawText(nameText, {
    x: (width - nameWidth) / 2,
    y: currentY,
    size: 15,
    font: fontBold,
    color: colorPrimary,
  });
  currentY -= 16;

  // Subtitle (Pleno, not specialist)
  const titleText = 'Software Engineer | Full Stack & Backend (Pleno)';
  const titleWidth = fontBold.widthOfTextAtSize(titleText, 10.5);
  page.drawText(titleText, {
    x: (width - titleWidth) / 2,
    y: currentY,
    size: 10.5,
    font: fontBold,
    color: colorBlue,
  });
  currentY -= 14;

  // Contact line
  const contactText = 'São José dos Campos, SP, Brazil (Global Remote / B2B) • lucasnascimentocontato@gmail.com';
  const contactWidth = fontRegular.widthOfTextAtSize(contactText, 8.2);
  page.drawText(contactText, {
    x: (width - contactWidth) / 2,
    y: currentY,
    size: 8.2,
    font: fontRegular,
    color: colorMuted,
  });
  currentY -= 11;

  const linksText = 'linkedin.com/in/lucas-nascimento-0b773a16a • github.com/luscanascimento';
  const linksWidth = fontRegular.widthOfTextAtSize(linksText, 8.2);
  page.drawText(linksText, {
    x: (width - linksWidth) / 2,
    y: currentY,
    size: 8.2,
    font: fontRegular,
    color: colorBlue,
  });
  currentY -= 8;

  // 2. Professional Summary
  drawSectionHeader('PROFESSIONAL SUMMARY');
  const summary = [
    'Software Engineer with 5+ years of software engineering and technical support experience, specializing in full-stack web',
    'applications, resilient REST APIs, and database architecture. Proven expertise in Angular, TypeScript, Node.js (NestJS, Fastify),',
    'C# (.NET 9), Laravel, PostgreSQL, Clean Architecture, and application security (AES-256-GCM, RFC 6238 TOTP, RBAC).',
    'Experienced in distributed locks via Redis, monorepos (Nx, Turborepo), and AI tooling integration via the Model Context Protocol (MCP).'
  ];
  summary.forEach(line => {
    page.drawText(line, { x: marginX, y: currentY, size: 8.5, font: fontRegular, color: colorText });
    currentY -= 11;
  });

  // 3. Technical Skills
  drawSectionHeader('TECHNICAL SKILLS');
  const skills = [
    { label: 'Languages & Frameworks: ', val: 'TypeScript, JavaScript, Node.js (NestJS, Fastify), Angular (Signals, NgRx), C# (.NET 9), Laravel, React, Java, SQL.' },
    { label: 'Architecture & Patterns: ', val: 'Clean Architecture, Domain-Driven Design (DDD), Hexagonal Architecture, CQRS, RESTful APIs, Monorepos (Nx, Turborepo).' },
    { label: 'Databases & Caching: ', val: 'PostgreSQL, Redis (Distributed Locks, Rate Limiting), SQLite (WAL Engine), EF Core 9, Prisma ORM, Eloquent.' },
    { label: 'Security & Auth: ', val: 'Zero-Trust RBAC, BOLA Remediation, AES-256-GCM Vaults, Argon2id, RFC 4226/6238 TOTP MFA, JWT Rotation & Replay Detection.' },
    { label: 'Testing & DevOps: ', val: 'xUnit, FluentAssertions, Vitest, Jest, Playwright (E2E), Testcontainers, Docker, GitLab CI/CD, Git, Linux/Bash, MCP.' },
  ];

  skills.forEach(s => {
    page.drawText('• ', { x: marginX, y: currentY, size: 8.5, font: fontBold, color: colorBlue });
    page.drawText(s.label, { x: marginX + 8, y: currentY, size: 8.5, font: fontBold, color: colorPrimary });
    const labelW = fontBold.widthOfTextAtSize(s.label, 8.5);
    page.drawText(s.val, { x: marginX + 8 + labelW, y: currentY, size: 8.5, font: fontRegular, color: colorText });
    currentY -= 11.5;
  });

  // 4. Professional Experience
  drawSectionHeader('PROFESSIONAL EXPERIENCE');
  
  // FaberSoft
  page.drawText('FaberSoft Tecnologia', { x: marginX, y: currentY, size: 9, font: fontBold, color: colorPrimary });
  const fTitle = ' — Software Engineer (Full Stack) & Technical Support';
  page.drawText(fTitle, { x: marginX + fontBold.widthOfTextAtSize('FaberSoft Tecnologia', 9), y: currentY, size: 9, font: fontRegular, color: colorText });
  const fDate = 'May 2021 – Present (5+ yrs) | São José dos Campos, Brazil';
  page.drawText(fDate, { x: width - marginX - fontRegular.widthOfTextAtSize(fDate, 8), y: currentY, size: 8, font: fontRegular, color: colorMuted });
  currentY -= 11.5;

  const faberPoints = [
    { head: 'Full Stack Development (Angular, Laravel, PostgreSQL): ', body: 'Architect and develop core web features, maintaining production enterprise applications with modular architecture; manage database migrations and complex SQL query optimizations.' },
    { head: 'System Maintenance & Bug Remediation: ', body: 'Implement frontend components and RESTful endpoints, reducing technical debt, resolving edge-case bugs, and collaborating via GitLab CI/CD version control workflows.' },
    { head: 'Technical Support & Hardware Diagnostics: ', body: 'Delivered L2/L3 technical support for enterprise users, ERP systems, and mobile barcode/data collectors; delivered remote diagnostics via WhatsApp/VoIP to resolve critical operational blockers.' }
  ];

  faberPoints.forEach(p => {
    page.drawText('• ', { x: marginX + 4, y: currentY, size: 8.2, font: fontBold, color: colorBlue });
    page.drawText(p.head, { x: marginX + 12, y: currentY, size: 8.2, font: fontBold, color: colorPrimary });
    const hw = fontBold.widthOfTextAtSize(p.head, 8.2);
    
    // Simple wrap
    const words = p.body.split(' ');
    let line = '';
    let isFirstLine = true;
    for (const w of words) {
      const test = line + (line ? ' ' : '') + w;
      const testW = fontRegular.widthOfTextAtSize(test, 8.2);
      const maxW = isFirstLine ? (width - marginX - (marginX + 12 + hw)) : (width - 2 * marginX - 12);
      if (testW > maxW && line.length > 0) {
        page.drawText(line, { x: isFirstLine ? (marginX + 12 + hw) : (marginX + 12), y: currentY, size: 8.2, font: fontRegular, color: colorText });
        currentY -= 10;
        line = w;
        isFirstLine = false;
      } else {
        line = test;
      }
    }
    if (line) {
      page.drawText(line, { x: isFirstLine ? (marginX + 12 + hw) : (marginX + 12), y: currentY, size: 8.2, font: fontRegular, color: colorText });
      currentY -= 10.5;
    }
  });

  // Ruston Alimentos
  currentY -= 2;
  page.drawText('Ruston Alimentos', { x: marginX, y: currentY, size: 9, font: fontBold, color: colorPrimary });
  const rTitle = ' — Logistics & Inventory Operations Assistant';
  page.drawText(rTitle, { x: marginX + fontBold.widthOfTextAtSize('Ruston Alimentos', 9), y: currentY, size: 9, font: fontRegular, color: colorText });
  const rDate = 'Sep 2018 – May 2021 (2 yrs 9 mos) | Jacareí, Brazil';
  page.drawText(rDate, { x: width - marginX - fontRegular.widthOfTextAtSize(rDate, 8), y: currentY, size: 8, font: fontRegular, color: colorMuted });
  currentY -= 11.5;

  page.drawText('• ', { x: marginX + 4, y: currentY, size: 8.2, font: fontBold, color: colorBlue });
  page.drawText('Managed warehouse stock control, audits, and replenishment using ABC Curve analysis, FIFO (PEPS), and PDCA cycle', {
    x: marginX + 12, y: currentY, size: 8.2, font: fontRegular, color: colorText
  });
  currentY -= 10;
  page.drawText('methodologies to eliminate inventory discrepancies.', {
    x: marginX + 12, y: currentY, size: 8.2, font: fontRegular, color: colorText
  });
  currentY -= 11;

  // 5. Featured Open-Source Projects
  drawSectionHeader('FEATURED OPEN-SOURCE PROJECTS');
  const projects = [
    {
      title: 'FinanceHub',
      tech: ' — Multi-Tenant Financial Platform | NestJS 11, Angular 21, Flutter 3, Prisma 6, PostgreSQL, Redis, MCP',
      repo: 'github.com/luscanascimento/financial-system',
      desc: 'Engineered an Nx Monorepo financial platform with RFC 4226/6238 TOTP MFA and Redis distributed mutex locks to prevent double-entry ledger race conditions; integrated an AI Model Context Protocol (MCP) server; 100% pass rate across 134+ tests.'
    },
    {
      title: 'Task Kanban Flow',
      tech: ' — Multi-Tenant Kanban System | Fastify, SQLite WAL, Angular 21 Zoneless, AES-256-GCM, Turborepo',
      repo: 'github.com/luscanascimento/task-kanban-flow',
      desc: 'Architected a Fastify REST backend with BOLA remediation, an AES-256-GCM secrets vault, and an accessible Angular 21 Design System (@tkf/ui) verified by 242 automated Jest/Playwright tests.'
    },
    {
      title: 'OrderFlow API',
      tech: ' — Enterprise Sales & Order Management REST API | .NET 9, C# 13, EF Core 9, PostgreSQL, xUnit',
      repo: 'github.com/luscanascimento/orderflow-api',
      desc: 'Designed a pragmatic Clean Architecture .NET 9 Web API with real-time stock validation, automated inventory deduction, and price snapshots; verified by 28 automated xUnit unit and integration tests (100% pass rate).'
    }
  ];

  projects.forEach(pr => {
    page.drawText(pr.title, { x: marginX, y: currentY, size: 8.8, font: fontBold, color: colorPrimary });
    const tw = fontBold.widthOfTextAtSize(pr.title, 8.8);
    page.drawText(pr.tech, { x: marginX + tw, y: currentY, size: 8.2, font: fontRegular, color: colorText });
    currentY -= 10;
    page.drawText(pr.repo, { x: marginX + 8, y: currentY, size: 8, font: fontOblique, color: colorBlue });
    currentY -= 10;

    // Wrap description
    const pwords = pr.desc.split(' ');
    let pline = '';
    for (const w of pwords) {
      const test = pline + (pline ? ' ' : '') + w;
      const testW = fontRegular.widthOfTextAtSize(test, 8.2);
      if (testW > (width - 2 * marginX) && pline.length > 0) {
        page.drawText(pline, { x: marginX, y: currentY, size: 8.2, font: fontRegular, color: colorText });
        currentY -= 9.5;
        pline = w;
      } else {
        pline = test;
      }
    }
    if (pline) {
      page.drawText(pline, { x: marginX, y: currentY, size: 8.2, font: fontRegular, color: colorText });
      currentY -= 11;
    }
  });

  // 6. Education
  drawSectionHeader('EDUCATION');
  page.drawText('Higher Technology Degree in Systems Analysis and Development (Tecnólogo ADS)', { x: marginX, y: currentY, size: 8.5, font: fontBold, color: colorPrimary });
  page.drawText(' — UNIP', { x: marginX + fontBold.widthOfTextAtSize('Higher Technology Degree in Systems Analysis and Development (Tecnólogo ADS)', 8.5), y: currentY, size: 8.5, font: fontRegular, color: colorText });
  const edDate1 = '2024 – 2026 (Final Semester / Expected Dec 2026)';
  page.drawText(edDate1, { x: width - marginX - fontRegular.widthOfTextAtSize(edDate1, 8), y: currentY, size: 8, font: fontRegular, color: colorMuted });
  currentY -= 11.5;

  page.drawText('High School Diploma (Ensino Médio)', { x: marginX, y: currentY, size: 8.5, font: fontBold, color: colorPrimary });
  page.drawText(' — EE Hermínia Silva de Mesquita', { x: marginX + fontBold.widthOfTextAtSize('High School Diploma (Ensino Médio)', 8.5), y: currentY, size: 8.5, font: fontRegular, color: colorText });
  const edDate2 = 'Graduated 2015';
  page.drawText(edDate2, { x: width - marginX - fontRegular.widthOfTextAtSize(edDate2, 8), y: currentY, size: 8, font: fontRegular, color: colorMuted });

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('public/Lucas_Nascimento_Resume.pdf', pdfBytes);
  fs.writeFileSync('/mnt/c/Users/Sirbu/Downloads/Lucas_Nascimento_Resume.pdf', pdfBytes);
  console.log('PDF saved successfully in public/ and /mnt/c/Users/Sirbu/Downloads/ !');
}

createResume().catch(console.error);
