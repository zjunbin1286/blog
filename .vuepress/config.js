const sidebar = require("./siderbar.js");
module.exports = {
  title: "CoderBin's blog",
  description: "请稍等......",
  dest: "public",
  base: "/blog/",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/avatar.png"
      }
    ],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],

  theme: "reco",
  themeConfig: {
    subSidebar: 'auto',
    "nav": [
      {
        "text": "Home",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "TimeLine",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "Docs",
        "icon": "reco-message",
        "items": [
          {
            "text": "vue",
            "link": "/docs/vue.js/",
          },
          {
            "text": "VueRoter",
            "link": "/docs/VueRouter/"
          }
        ]
      },
      {
        "text": "Contact",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/zjunbin1286",
          },
          {
            "text": "Gitee",
            "link": "https://gitee.com/zhu-junbin",
          }
        ]
      }
    ],
    sidebar,
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "Category"
      },
      "tag": {
        "location": 3,
        "text": "Tag"
      }
    },
    "friendLink": [
      {
        "title": "gitee链接",
        "desc": "Enjoy when you can, and endure when you must.",
        "email": "",
        "link": "https://gitee.com/zhu-junbin"
      },
      {
        "title": "No cross, no crown.",
        "desc": "Ordinary people think merely of how they will spend time, a man of intellect tries to use it.",
        "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        "link": "https://vuepress-theme-reco.recoluan.com"
      }
    ],
    "logo": "/avatar.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "CoderBin",
    "authorAvatar": "/avatar.png",
    "record": "xxxx",
    "startYear": "2021"
  },
  "markdown": {
    "lineNumbers": true
  },
  // 安装的插件放在这里
  plugins: [
    // 复制弹窗插件
    ["vuepress-plugin-nuggets-style-copy", {
        copyText: "复制代码",
        tip: {
            content: "复制成功!"
        }
      }
    ],
    [
       // 当出现中文时，使用拼音路由跳转
       'permalink-pinyin', {
        lowercase: true, // Converted into lowercase, default: true
        separator: '-' // Separator of the slug, default: '-'
      }
    ],
    
    [
     
      // 2d看板娘
      'vuepress-plugin-helper-live2d', {
        // 是否开启控制台日志打印(default: false)
        log: false,
        live2d: {
          // 是否启用(关闭请设置为false)(default: true)
          enable: true,
          // 模型名称(default: hibiki)>>>取值请参考：
          // https://github.com/JoeyBling/hexo-theme-yilia-plus/wiki/live2d%E6%A8%A1%E5%9E%8B%E5%8C%85%E5%B1%95%E7%A4%BA
          model: 'koharu',
          display: {
            position: "right", // 显示位置：left/right(default: 'right')
            width: 115, // 模型的长度(default: 135)
            height: 270, // 模型的高度(default: 300)
            hOffset: 83, //  水平偏移(default: 65)
            vOffset: -40, //  垂直偏移(default: 0)
          },
          mobile: {
            show: false // 是否在移动设备上显示(default: false)
          },
          react: {
            opacity: 1 // 模型透明度(default: 0.8)
          }
        }
      }
    ],
    
  ]


}