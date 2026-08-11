---
title: "Galeria de Versões — Arquivo de Históricos"
date: "2026-08-11"
layout: gallery
---

# Galeria de Versões

Esta galeria reúne snapshots do histórico do site — cada versão corresponde a um commit no repositório. A ideia é expor o processo, as decisões estéticas e tecnológicas ao longo do tempo: uma exposição de versões.

Estética: inspiração em sites premiados (Awwwards) — tipografia limpa com contraste, uso de fontes monoespaçadas e geométricas do universo arte+tech (por exemplo: Inter, Space Mono, Orbitron). Recomendo carregar fontes via Google Fonts no layout principal e usar um grid de cartões com imagens/thumbnail.

Organização nesta branch:
- data/versions.json — metadados das versões (commits)
- gallery/index.md — esta página
- gallery/versions/ — páginas individuais por commit

Rendering simples: cada página em gallery/versions/ é Markdown com metadados do commit. Se você quiser que a galeria seja dinâmica, podemos adicionar um script simples que consome data/versions.json e gera o grid.

## Como apareço aqui
Os arquivos desta branch são pensados para serem um espaço experimental separado do ramo principal. Podemos excluir a branch depois ou abrir um pull request para mesclar.

## Próximos passos sugeridos
1. Eu gerei páginas individuais para cada commit (links abaixo). Se quiser, adiciono thumbnails e trechos de diff.
2. Adicionar CSS global (fonts, grid) ao site principal ou a um layout que o GitHub Pages reconheça.

## Versões

