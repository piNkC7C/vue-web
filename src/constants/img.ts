// 线上基础路径（生产环境使用），后续图片存库后直接修改这里即可
const PROD_IMG_BASE_URL = 'https://example.com/imgs'

// 本地基础路径（开发环境使用，Vite 在 dev 模式下会从项目根目录提供服务）
const DEV_IMG_BASE_URL = '/src/assets/imgs'

// 根据 Vite 环境变量自动切换
const IMG_BASE_URL = import.meta.env.DEV ? DEV_IMG_BASE_URL : PROD_IMG_BASE_URL

export const IMG_MAP = {
  logoText: `${IMG_BASE_URL}/logo-text.png`,
  logoIcon: `${IMG_BASE_URL}/logo-icon.png`
}
