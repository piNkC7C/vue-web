# 官网类前端项目

本项目是官网类的前端工程。本项目基于优秀的开源框架 [芋道源码 (ruoyi-vue-pro)](https://gitee.com/zhijiantianya/ruoyi-vue-pro) / [vue-element-plus-admin](https://gitee.com/kailong110120130/vue-element-plus-admin) 进行二次开发与深度定制，以满足官网的品牌展示、用户交互及特定业务需求。

## 🛠 技术栈

本项目沿用了原框架的主流前端技术栈，确保了项目的高效开发与良好维护性：

- **核心框架**: [Vue 3](https://cn.vuejs.org/) (Composition API)
- **构建工具**: [Vite 4](https://cn.vitejs.dev/)
- **UI 组件库**: [Element Plus](https://element-plus.org/zh-CN/)
- **开发语言**: [TypeScript 5](https://www.typescriptlang.org/)
- **状态管理**: [Pinia](https://pinia.vuejs.org/)
- **路由管理**: [Vue Router 4](https://router.vuejs.org/)
- **原子 CSS**: [UnoCSS](https://uno.antfu.me/)
- **工具库**: [VueUse](https://vueuse.org/)

## 🚀 快速启动

### 环境要求

- **Node.js**: >= 16.18.0
- **包管理器**: pnpm >= 8.6.0 (本项目强制/推荐使用 pnpm)

### 1. 克隆项目

```bash
git clone <你的项目仓库地址>
cd glks-web
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 本地开发运行

```bash
pnpm dev
```

启动后，可在浏览器中访问控制台输出的本地地址（如 `http://localhost:80`）查看官网效果。

### 4. 生产环境构建

```bash
pnpm build
```

构建完成后，打包好的文件会生成在 `dist` 目录下，将其部署到 Nginx 或其他静态服务器即可。

## 📁 目录结构简介

针对官网项目，主要关注以下核心目录：

```text
glks-web/
├── src/
│   ├── api/            # 接口请求封装
│   ├── assets/         # 静态资源 (Logo、背景图、字体等)
│   ├── components/     # 全局公共组件
│   ├── layout/         # 页面布局结构
│   ├── router/         # 路由配置 (官网各页面导航)
│   ├── store/          # Pinia 状态管理
│   ├── views/          # 页面视图 (官网核心页面如首页、关于我们、产品展示等)
│   ├── App.vue         # 根组件
│   └── main.ts         # 项目入口文件
├── public/             # 原生静态文件 (favicon 等)
├── .env.development    # 开发环境变量
├── .env.production     # 生产环境变量
├── vite.config.ts      # Vite 构建配置
└── package.json        # 依赖与脚本配置
```

## 💡 开发建议

1. **样式调整**：官网通常对 UI 和动画要求较高，建议充分利用 `UnoCSS` 进行快速的样式排版，对于复杂动画可结合自定义 CSS 编写。
2. **响应式设计**：官网需要兼容 PC 和移动端，开发时请注意响应式布局的适配。
3. **SEO 优化**：如果官网对 SEO 有较高要求，可以在后续考虑引入 SSR（服务端渲染）方案或在构建时使用预渲染插件。

## 🤝 致谢

特别感谢 [芋道源码](https://gitee.com/zhijiantianya/ruoyi-vue-pro) 提供的高质量底层框架结构，为本项目的快速成型提供了极大的便利。
