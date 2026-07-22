// Cloudflare Pages Function — 留言板 API
// GET  /api/guestbook  → 获取所有留言
// POST /api/guestbook  → 添加新留言

/**
 * @param {import('@cloudflare/workers-types').PagesFunction} context
 */
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // GET: 获取留言列表
  if (request.method === 'GET') {
    try {
      const page = parseInt(url.searchParams.get('page') || '1', 10);
      const pageSize = 20;
      const offset = (page - 1) * pageSize;

      const countResult = await env.DB.prepare(
        'SELECT COUNT(*) as total FROM messages'
      ).first();

      const { results } = await env.DB.prepare(
        'SELECT id, name, content, created_at FROM messages ORDER BY created_at DESC LIMIT ? OFFSET ?'
      ).bind(pageSize, offset).all();

      return new Response(JSON.stringify({
        messages: results,
        total: countResult?.total || 0,
        page,
        pageSize,
      }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: '获取留言失败' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
  }

  // POST: 添加留言
  if (request.method === 'POST') {
    try {
      const body = await request.json();

      const name = (body.name || '匿名').trim().slice(0, 50);
      const content = (body.content || '').trim();

      if (!content) {
        return new Response(JSON.stringify({ error: '留言内容不能为空' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      if (content.length > 20000) {
        return new Response(JSON.stringify({ error: '留言内容最多20000个字符' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      const ip = request.headers.get('CF-Connecting-IP')
        || request.headers.get('X-Forwarded-For')
        || 'unknown';

      const result = await env.DB.prepare(
        "INSERT INTO messages (name, content, ip, created_at) VALUES (?, ?, ?, datetime('now', '+8 hours'))"
      ).bind(name, content, ip).run();

      if (result.success) {
        return new Response(JSON.stringify({ success: true, message: '留言成功！' }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      } else {
        return new Response(JSON.stringify({ error: '留言提交失败' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }
    } catch (err) {
      return new Response(JSON.stringify({ error: '留言提交失败，请稍后再试' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
}