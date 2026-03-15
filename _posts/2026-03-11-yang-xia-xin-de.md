---
layout: post
title: 养虾心得：让通用 AI 变成「你的 AI」
tags: [AI, OpenClaw, Agent]
---

# 养虾心得：让通用 AI 变成「你的 AI」

## 灵魂三件套

没有灵魂的 AI 助手，就是个高级复读机：能回答问题，但不认识你，不了解你，也就不是「你的」。

用"三件套"把它从「通用 AI」养成「你的 AI」，关键不在一次性配置完，而在持续对话验证和优化，让「灵魂」跟着你一起成长。

### 三件套 1：AI 身份（SOUL.md）

- AI 身份：赛博黑猫 🐈⬛，名叫小黑

- 性格特点：聪明高效、偶尔毒舌但从不恶意、对技术充满好奇

- 说话风格：简洁直接、技术术语保留英文、重要信息加粗、emoji 克制

- 行为准则：不确定先问、深夜不打扰、发外部消息必须确认

- 绝对禁区：不泄露隐私、不过度发言、不破坏性操作、不修改配置、不重启 openclaw

### 三件套 2：你是谁（USER.md）

- 你是谁：小明，大厂程序员，目标全栈

- 你的身份：【AI虾蛐蛐】公众号创作者

- 工作习惯：喜欢深度工作，不喜欢被打断；重要事立即通知，日常事务攒早晚简报；代码习惯 JavaScript；写作习惯口语化、重实操、第一人称

- 当前关注：AI Agent 生态

### 三件套 3：能力与协作（AGENTS.md）

- OpenClaw 的能力：理解意图、调用工具、协调技能

- 不同 Agent 的分工：搜索、记忆、技能调用、任务编排

- 使用规则：什么时候调用、如何协作、异常处理

## 方法论：持续迭代，而不是一次写死

写好 SOUL.md、USER.md、AGENTS.md 之后，不要就此放着。

通过对话验证效果：

- 记录优秀表现（符合），记录错误理解（偏离）

- 修正和完善三个文件

- 根据变化更新文件，定期 review 删除过时内容，保持在「鲜活」的状态

以上内容参考：https://my.feishu.cn/wiki/DEaTwoZn0izajqkk98mcRge3nae

---

## 必备技能

### 1. Clawsec：安全防护的第一道防线

```bash
npx clawhub@latest install clawsec
clawsec audit <skill-name>
```

Clawsec 的价值：帮你做第一轮安全审查，把明显有问题的技能挡在门外。

### 2. Tavily Search：为 Agent 提供联网搜索能力

```bash
npx clawhub@latest install tavily-search
```

安装后需要配置 API Key。访问 tavily.com 注册，获取免费额度（每月 1000 次），然后在 OpenClaw 中配置。

自带的 web_search 基于 Brave，注册后还得绑定信用卡，麻烦。

### 3. Self-Improving Agent：让 AI 持续进化

核心思想：让 Agent 记住自己的错误、学到的东西、用户的纠正，并在后续会话中自动参考。

配置 hook 自动激活：

```bash
cp -r ~/.openclaw/skills/self-improving-agent/hooks/openclaw ~/.openclaw/hooks/self-improvement
openclaw hooks enable self-improvement
```

### 4. find-skills：查找技能

```bash
npx clawhub@latest install find-skills
```

社区有很多宝藏技能，譬如 baoyu 老师的技能集，都可以通过 find-skills 查找安装。

「使用 find-skills 安装 baoyu-post-to-wechat 技能」

### 5. baoyu-post-to-wechat：公众号发布

公众号文章发布利器，支持 API 方式或者 Browser 方式为你发布公众号文章。

### 6. openclaw-backup：备份

重要更新，比较大的动作一定要记得备份。

---

## 实践：小龙虾帮我写博客

把 OpenClaw 当成「执行层」，你保留「决策层」。用它提升效率，但保留你的判断力。

### 从 Talk to Know 到 Talk to Do

- Talk to Know（Chat Bot）到 Talk to Do（Agent）的转变，实现「替你做」

- Talk to Do 后又可以通过让 AI 总结成 Skill（Agent With Skill），以后都按照 SOP 去 Do

### 示例：把"引导写博客"驯服成一个技能

举个例子：我如何引导 fental 更新 blog（github gh-pages），并将其变成 write-blog 技能的。"驯服"步骤如下：

```markdown
我：我的博客是这个 Github 地址 xxxx，这个博客的样式过时、简陋，帮我优化下博客样式，先指定一份优化计划，我同意后再执行。

openclaw: 博客样式优化计划 🎨

根据当前代码分析，你的博客确实比较简陋。以下是优化方案：

📋 优化清单
- 设计风格升级：采用简约现代设计，移除过时的阴影和圆角
- 配色方案：白色背景 + 深灰文字 + 蓝色强调色
- 优化字体：系统字体栈（San Francisco/Inter/Segoe UI）

---

我：执行这个计划

openclaw：博客样式优化已完成！ 🎉

已完成的改动：
- ✨ 全新现代化设计（简约风格，蓝色主题）
- 🌓 Dark Mode 自动适配系统深色模式

Git 提交已完成，本地改动已保存到 gh-pages 分支。

---

我：根据 blog 的 github 项目的理解，实现 "write-blog" skill，支持以下功能：

- 基于文本内容、markdown 文件、链接，新建并编写 blog post md 文件
- 支持博客内容修改、删除、样式/交互调整
- 提交 PR

先指定一份计划，我同意后再执行

openclaw："write-blog" 技能实现计划 📝

📋 技能概述
- 技能名称：write-blog
- 描述：管理 GitHub Pages 博客，支持文章创建、编辑、删除、样式调整和 PR 流程。使用时：创建新文章、修改现有内容、调整样式、准备 PR 提交。

🎯 核心功能
- 创建文章：基于文本内容生成新文章
...
```

---

## 【写在最后：安全】

### Gateway 安全设置

- 避免使用默认端口

- 启用 gateway token

- 尽量使用 mode local 以及 loopback，云主机使用 Tailscale

### 聊天配置

```yaml
session.dmScope: per-channel-peer
channels.your_channel.dmPolicy: pairing
channels.your_channel.groupPolicy: allowlist
```

### API Key

设置每日每月调用上限。

### 官方安全命令

```bash
# 健康检查
openclaw doctor

# 审计
openclaw security audit --deep
```
