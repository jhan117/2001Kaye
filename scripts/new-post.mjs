import fs from 'fs';
import path from 'path';

const title = process.argv[2] || '새 글';
const slug = title.toLowerCase().replace(/[^a-z0-9가-힣]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || `post-${Date.now()}`;
const date = new Date().toISOString().split('T')[0];

const content = `---
title: "${title}"
description: "새로운 글의 설명입니다."
pubDate: ${date}
category: "Uncategorized"
tags: ["Tag1", "Tag2"]
draft: true
---

여기에 글을 작성하세요.`;

const filePath = path.join(process.cwd(), 'src', 'content', 'posts', `${slug}.md`);

if (fs.existsSync(filePath)) {
  console.error('이미 존재하는 파일입니다.');
  process.exit(1);
}

fs.mkdirSync(path.dirname(filePath), { recursive: true });
fs.writeFileSync(filePath, content);
console.log(`새 글이 생성되었습니다: ${filePath}`);
