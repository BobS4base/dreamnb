-- Cloudflare D1 数据库 Schema — 留言板
-- 使用方式：
--   1. 创建数据库:  npx wrangler d1 create dreamnb-guestbook
--   2. 执行初始化:  npx wrangler d1 execute dreamnb-guestbook --file=schema.sql
--   3. 绑定到 Pages: 在 Cloudflare Dashboard 中设置 D1 绑定

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL DEFAULT '匿名',
  content TEXT NOT NULL,
  ip TEXT NOT NULL DEFAULT 'unknown',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 创建索引以加速按时间排序查询
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);