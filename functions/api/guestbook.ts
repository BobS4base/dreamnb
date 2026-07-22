// Cloudflare Pages Function — 留言板 API
// GET  /api/guestbook  → 获取所有留言
// POST /api/guestbook  → 添加新留言

interface Env {
  DB: D1Database;
}

interface Message {
  id: number;
  name: string;
  content: string;
  ip: string;
  created_at: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);

  // CORS 头（允许跨域访问）
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // 预检请求
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // ===== GET: 获取留言列表 =====
  if (request.method === 'GET') {
    try {
      const page = parseInt(url.searchParams.get('page') || '1', 10);
      const pageSize = 20;
      const offset = (page - 1) * pageSize;

      // 查询总条数
      const countResult = await env.DB.prepare(
        'SELECT COUNT(*) as total FROM messages'
      ).first<{ total: number }>();

      // 查询留言列表（按时间倒序）
      const { results } = await env.DB.prepare(
        'SELECT id, name, content, created_at FROM messages ORDER BY created_at DESC LIMIT ? OFFSET ?'
      ).bind(pageSize, offset).all<Message>();

      return new Response(JSON.stringify({
        messages: results,
        total: countResult?.total || 0,
        page,
        pageSize,
      }), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: '获取留言失败' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
  }

  // ===== POST: 添加留言 =====
  if (request.method === 'POST') {
    try {
      const body = await request.json() as { name?: string; content?: string };

      // 校验名称
      const name = (body.name || '匿名').trim();
      if (name.length > 50) {
        return new Response(JSON.stringify({ error: '昵称最长50个字符' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      // 校验内容
      const content = (body.content || '').trim();
      if (!content) {
        return new Response(JSON.stringify({ error: '留言内容不能为空' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      // 计算字符数（中文算1个字符）
      if (content.length > 20000) {
        return new Response(JSON.stringify({ error: '留言内容最多20000个字符' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      // 获取访问者 IP
      const ip = request.headers.get('CF-Connecting-IP')
        || request.headers.get('X-Forwarded-For')
        || 'unknown';

      // 插入数据库
      const result = await env.DB.prepare(
        'INSERT INTO messages (name, content, ip, created_at) VALUES (?, ?, ?, datetime(\'now\', \'+8 hours\'))'
      ).bind(name, content, ip).run();

      if (result.success) {
        return new Response(JSON.stringify({ success: true, message: '留言成功！' }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      } else {
        throw new Error('DB insert failed');
      }
    } catch (err) {
      return new Response(JSON.stringify({ error: '留言提交失败，请稍后再试' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
  }

  // 其他方法不允许
  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
};