# dreamnb 开发日志

> 项目：个人博客与作品集网站
> 框架：Astro
> 托管：Cloudflare Pages
> 域名：通过 Cloudflare 购买
> 仓库：https://github.com/BobS4base/dreamnb

---

## 2026-07-23 首次搭建

### 项目初始化
- 创建项目目录 `D:/dreamnb`
- 安装 Node.js
- 使用 Astro 框架构建静态网站
- 移除 `@astrojs/cloudflare` 适配器（静态站不需要）
- 构建命令：`npm install && npm run build`

### 网站结构
| 路由 | 说明 |
|------|------|
| `/` | 首页（精选文章 + 精选作品，logo: dreamnb 有梦想，就是牛逼） |
| `/blog` | 博客列表 |
| `/blog/:slug` | 博客文章详情 |
| `/portfolio` | 作品集列表 |
| `/portfolio/:slug` | 作品详情 |
| `/about` | 关于页 |
| `/rss.xml` | RSS 订阅 |

### 内容管理
- 博客文章：`src/content/blog/*.md`
- 作品集：`src/content/portfolio/*.md`
- 后台：Decap CMS（`/admin` 路径，需配置 `public/admin/config.yml` 中的 `repo` 字段）

### 视频
- 使用 Bilibili 嵌入（通过 `VideoEmbed` 组件或直接写 iframe）
- 示例：`<iframe src="//player.bilibili.com/player.html?bvid=BV号&page=1&autoplay=0&high_quality=1"></iframe>`

### 图片
- 上传到 `public/uploads/images/`
- 文章中用 `/uploads/images/xxx.jpg` 引用

### Git & 部署
- Git 初始化并提交
- 远程仓库：`https://github.com/BobS4base/dreamnb.git`
- SSH 公钥已配置
- Cloudflare Pages 已连接 GitHub，自动部署（推送到 `master` 分支即触发）

### 构建验证
- 6 个页面 + RSS 全部构建成功
- 构建产物在 `dist/` 目录
- 网站已通过 Cloudflare Pages 上线，域名已绑定

### 常见问题
- 国内访问 GitHub 不稳定，使用 SSH 方式推送
- Git 代理配置（如需要）：`git config --global http.proxy http://127.0.0.1:7890`
- 清除代理：`git config --global --unset http.proxy`
- 构建命令在 PowerShell 中运行，bash 中可能找不到 npm

---

## 2026-07-23 修改 logo 标语

- 首页左上角 logo 从 `dreamnb` 改为 `dreamnb 有梦想，就是牛逼`
- 添加了 `.logo-suffix` 样式（小字、灰色）

---

## 2026-07-23 首页改版：随笔博客 + 视频板块

- 删除示例文章 `hello-world.md` 和示例作品 `my-project.md`
- 首页改为两个板块：
  - **📝 随笔博客** — 展示所有博客文章
  - **📹 视频** — 嵌入 Bilibili 视频（16:9 比例网格布局）
- 去掉作品集相关入口
- 网站描述改为"有梦想，就是牛逼"

---

## 2026-07-23 首页视频替换为用户的 Bilibili 视频

- 视频板块改为展示用户的实际视频 `BV1NvNK6GEuG`
- 添加了"去 Bilibili 关注我"按钮，链接到用户主页 `space.bilibili.com/1862853635`
- 去掉多余的示例视频占位

---

## 2026-07-23 首页全面改版：玻璃质感 + 左右分栏

- 完全重写全局样式 `global.css`：
  - 新增背景图支持（`/uploads/images/bg.jpg`），自动覆盖全屏，带毛玻璃叠加层
  - 新增 `.glass` 类 — Win7 Aero 玻璃效果（`backdrop-filter: blur()`、半透明背景、渐变边框）
  - 新增 `.glass-titlebar` — Win7 风格窗口标题栏（红黄绿三色圆点 + 标题文字）
  - 暗色模式同步适配玻璃效果
- 首页改为左右分栏布局：
  - **左侧**：📝 随笔博客（玻璃窗口，内嵌文章卡片列表，可滚动）
  - **右侧**：📹 视频（玻璃窗口，内嵌 Bilibili 视频 + 关注按钮）
- 重写 `BlogCard.astro`：玻璃卡片风格，去掉旧边框背景
- 删除原 hero 区域（"你好，我是 dreamnb" 等文案）
- 背景图占位：将图片命名为 `bg.jpg` 放入 `public/uploads/images/` 即可生效

---

## 2026-07-23 修改关于页

- 改名为"海绵宝宝"
- 去掉网站介绍和作品集等描述
- 重新设计为玻璃卡片风格，与首页统一
- 联系方式改为 GitHub + Bilibili 链接按钮
- Bilibili 链接改为 UID: 1862853635

---

## 2026-07-23 首页视频更换为 BV1yXLA6tE9g

- 首页嵌入的视频从 `BV1NvNK6GEuG` 换为 `BV1yXLA6tE9g`
- 如需解析 B站 4K 视频源文件，可用 `you-get` 工具下载

---

## 写新文章流程

1. 在 `src/content/blog/` 下新建 `.md` 文件
2. 文件头格式：
   ```yaml
   ---
   title: '文章标题'
   description: '文章简介'
   pubDate: 2026-07-23
   tags: ['标签1', '标签2']
   coverImage: '/uploads/images/xxx.jpg'
   featured: true
   ---
   ```
3. 正文写 Markdown
4. `git add . && git commit -m "新文章: xxx" && git push`
5. Cloudflare Pages 自动部署

## 作品集新建流程

同样，在 `src/content/portfolio/` 下新建 `.md` 文件，格式参考现有文件。

## 后台管理（Decap CMS）

访问 `https://域名/admin`，用 GitHub 登录后可可视化编辑。

---

## 2026-07-23 全面改版：极简博客风格（参考 yinwang.org）

### 设计变更
- 去掉 QQ 空间 / WordPress 风格，改为纯白极简设计
- 首页：文章列表只显示日期 + 标题（yinwang.org 风格）
- 文章页：简洁阅读体验，专注内容
- 全局样式：纯白背景，干净字体，无多余装饰

### 改动的文件
- `src/styles/global.css` — 完全重写，去掉玻璃效果，改为极简样式
- `src/pages/index.astro` — 极简文章列表
- `src/pages/about.astro` — 极简文本介绍
- `src/components/Header.astro` — 简化导航
- `src/components/Footer.astro` — 简化页脚
- `src/components/BlogCard.astro` — 极简卡片
- `src/layouts/BaseLayout.astro` — 调整布局
- `src/layouts/PostLayout.astro` — 简化文章排版
- `src/pages/blog/index.astro` — 简化博客列表页

---

## 2026-07-23 配置 Decap CMS 后台

### 变更
- 修复 `public/admin/config.yml`：填写仓库 `BobS4base/dreamnb`，分支 `master`
- 创建 `public/admin/index.html`：Decap CMS 入口页面
- 访问 `https://dreamnb.com/admin` 用 GitHub 登录即可在浏览器中写文章

---

## 2026-07-23 新增留言板功能

### 功能说明
- 任何人都可以留言，无需登录
- 记录昵称、内容、时间、IP 地址
- 单条留言最多 20000 字符
- 分页加载历史记录

### 新增文件
- `functions/api/guestbook.ts` — Cloudflare Pages Function，处理留言 API
- `src/pages/guestbook.astro` — 留言板页面（表单 + 历史记录）
- `schema.sql` — D1 数据库建表语句
- `wrangler.toml` — Cloudflare 配置

### 修改文件
- `src/components/Header.astro` — 导航栏新增"留言板"链接

### 部署前置条件
- 需在 Cloudflare 创建 D1 数据库并绑定到 Pages 项目
- 详见 `schema.sql` 和 `wrangler.toml`

---

## 留言板部署步骤

1. `npx wrangler login`
2. `npx wrangler d1 create dreamnb-guestbook`
3. `npx wrangler d1 execute dreamnb-guestbook --file=schema.sql`
4. 在 Cloudflare Dashboard 中绑定 D1 数据库到 Pages 项目
5. 重新部署即可

---

## 2026-07-23 全站大清理 + 首页改为个人简介

### 删除了 12 个文件/目录
- 博客相关：`blog/` 目录、`BlogCard.astro`、`PostLayout.astro`、`rss.xml.ts`、`content/config.ts`
- 留言板：`guestbook.astro`、`functions/`、`schema.sql`
- 后台管理：`public/admin/` 目录（config.yml + index.html）
- 配置：`wrangler.toml`
- 页面：`about.astro`（内容已移到首页）

### 变更
- 首页重写：海绵宝宝头像 + 个人简介 + 文字介绍（原关于页内容）
- 导航栏：只保留 logo，去掉所有链接
- 页脚：去掉 RSS 链接，只保留版权
- 清理 `global.css`：从 342 行精简到 159 行

---

## 2026-07-23 标语修改 + 首页两侧加海绵宝宝动图

### 标语
- `有梦想，就是牛逼` → `有梦想，就是nb`

### 首页布局
- 三栏 flex 布局：左侧 8 个海绵宝宝动图 | 中间个人简介 | 右侧 8 个海绵宝宝动图
- 共 16 个搞笑动图（来源：picgifs.com + gif-avatars.com）
- 响应式：小屏幕自动隐藏两侧动图

---

## 2026-07-23 新增作品欣赏页面 + 视频欣赏页面

### 作品欣赏 `/gallery`
- 首页右上角新增「作品欣赏」按钮，跳转 `/gallery`
- 5 幅超现实主义经典画作幻灯片浏览（达利、马格利特、夏加尔）
- 左右箭头切换、键盘左右键、手机触摸滑动
- 画作信息（名称、作者、年份、馆藏地）显示在底部
- 4 秒无操作自动隐藏箭头和信息栏
- 白色背景适配网站整体主题

### 视频欣赏 `/video`
- 导航栏新增「视频欣赏」按钮
- 嵌入 Bilibili 播放器（Alan Walker - Faded）
- 后续新增第二个视频（中东宝宝），支持左右箭头切换

### 版权声明
- 首页底部：`© SpongeBob All Rights Reserved`
- 作品欣赏底部：`Artworks belong to their respective artists & estates`
- 视频欣赏底部：`© SpongeBob All Rights Reserved`

### UI 优化
- 手机端动图尺寸从 48px 缩小到 36px，防止小屏溢出
- 导航栏小屏按钮缩小
- 箭头手机端位置统一为 10px
- 所有页面使用 CSS 变量，暗色模式自动适配