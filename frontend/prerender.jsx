import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';

import { PortfolioPage } from './app.jsx';

const outputPath = resolve('templates/_portfolio.html');
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${renderToString(<PortfolioPage />)}\n`);

console.log(`Prerendered portfolio markup to ${outputPath}`);
