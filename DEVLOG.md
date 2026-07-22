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