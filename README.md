# dreamnb — 个人博客与作品集

基于 **Astro** 构建的个人网站，部署在 **Cloudflare Pages**。

## 功能

- 📝 博客文章（支持标签、封面、精选）
- 🎨 作品集展示（支持分类、链接）
- 📹 Bilibili 视频嵌入
- 🖼️ 图片上传管理
- 🌙 暗色/亮色主题自动切换
- 📱 响应式设计
- ✏️ Decap CMS 后台管理（浏览器中写文章）
- 📡 RSS 订阅

## 开发

```bash
# 安装依赖
npm install

# 本地开发
npm run dev

# 构建
npm run build

# 预览构建结果
npm run preview
```

## 部署到 Cloudflare Pages

### 方式一：直接上传（无需 Git）

1. 运行 `npm run build` 生成 `dist/` 文件夹
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. 左侧菜单 → Workers & Pages → Pages → 创建
4. 选择 **"上传资产"** → 上传 `dist/` 文件夹
5. 部署完成后，在 **"自定义域"** 绑定你的域名

### 方式二：连接 Git 仓库（推荐，自动部署）

1. 将代码推送到 GitHub 仓库
2. 在 Cloudflare Pages 选择 **"连接到 Git"**
3. 选择仓库 → 构建设置选择 **Astro**（框架预设）
4. 环境变量无需额外配置
5. 每次 push 自动部署

## 后台管理（Decap CMS）

1. 将代码 push 到 GitHub 仓库
2. 访问 `https://你的域名/admin`
3. 使用 GitHub 账号登录
4. 在浏览器中写文章、传图片

> ⚠️ 首次使用前，需要将 `public/admin/config.yml` 中的 `repo` 改为你的 GitHub 仓库地址

## Bilibili 视频嵌入

在 Markdown 文章中嵌入 Bilibili 视频：

```html
<iframe src="//player.bilibili.com/player.html?bvid=BV1GJ411x7hQ&page=1&autoplay=0&high_quality=1" width="100%" height="400" allowfullscreen></iframe>
```

或者使用组件：

```astro
<VideoEmbed bvid="BV1GJ411x7hQ" />
```

## 目录结构

```
dreamnb/
├── public/
│   ├── admin/            # Decap CMS 后台
│   │   ├── index.html
│   │   └── config.yml
│   └── uploads/images/   # 上传的图片
├── src/
│   ├── components/       # 组件
│   ├── content/          # 内容（Markdown）
│   │   ├── blog/         # 博客文章
│   │   └── portfolio/    # 作品集
│   ├── layouts/          # 布局模板
│   ├── pages/            # 页面
│   └── styles/           # 样式
├── astro.config.mjs
├── package.json
└── README.md
```

## 技术栈

- [Astro](https://astro.build)
- [Cloudflare Pages](https://pages.cloudflare.com)
- [Decap CMS](https://decapcms.org)