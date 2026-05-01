#!/usr/bin/env node
// Fetch all Qiita posts for a user and write a static JSON snapshot.
// Runs at build time so the site stays a pure static export.

import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const USER = process.env.QIITA_USER ?? "Humanophilic_development";
const OUT = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "content",
  "qiita-posts.json",
);
const PER_PAGE = 100;
const MAX_PAGES = 5;

async function fetchPage(page) {
  const url = `https://qiita.com/api/v2/users/${USER}/items?page=${page}&per_page=${PER_PAGE}`;
  const headers = { "User-Agent": "amu815.github.io/build" };
  if (process.env.QIITA_TOKEN) {
    headers.Authorization = `Bearer ${process.env.QIITA_TOKEN}`;
  }
  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`Qiita API returned ${res.status} ${res.statusText}`);
  }
  return res.json();
}

async function fetchAll() {
  const all = [];
  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const items = await fetchPage(page);
    if (!Array.isArray(items) || items.length === 0) break;
    all.push(...items);
    if (items.length < PER_PAGE) break;
  }
  return all;
}

function shape(item) {
  return {
    id: item.id,
    title: item.title,
    url: item.url,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    likes: item.likes_count ?? 0,
    stocks: item.stocks_count ?? 0,
    tags: Array.isArray(item.tags) ? item.tags.map((t) => t.name) : [],
  };
}

function placeholder() {
  return {
    user: USER,
    fetchedAt: new Date().toISOString(),
    posts: [],
    error: "fetch failed — using placeholder; the page will render an empty list",
  };
}

async function main() {
  let payload;
  try {
    const raw = await fetchAll();
    const posts = raw
      .map(shape)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    payload = {
      user: USER,
      fetchedAt: new Date().toISOString(),
      posts,
    };
    console.log(`[fetch-qiita] ${posts.length} posts fetched for ${USER}`);
  } catch (err) {
    console.warn(`[fetch-qiita] WARN: ${err.message}`);
    payload = placeholder();
  }
  await mkdir(dirname(OUT), { recursive: true });
  await writeFile(OUT, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

main().catch((err) => {
  console.error("[fetch-qiita] FATAL:", err);
  process.exit(1);
});
