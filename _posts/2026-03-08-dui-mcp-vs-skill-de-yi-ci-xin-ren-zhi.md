---
layout: post
title: 对 MCP vs Skill 的一次新认知
tags: [AI, MCP, Skill]
---

# 对 MCP vs Skill 的一次新认知

最近看到一篇自动化测试的公众号文章，里面提到一个观点：Playwright 的 MCP 效果比 Skill 差。

这个点让我重新思考了之前一直纠结的问题——MCP 和 Skill 到底有啥区别？

回想起之前我一直觉得 MCP 和 Skill 都是 Anthropic 提出的不错的概念，是不同维度的东西（虽然部分能力重合），理论上都能让 AI 比较好地完成任务。

但在 Playwright 这个具体场景下，我有了新的认知：**MCP 如果封装了很多原子能力，且需要被大模型频繁调用，效果会差于 Skill（API/CLI）。**

## 一个实战例子

假设一个任务：在必应搜索前 10 条结果的链接，并打开每个链接截图。

### MCP 版本（35+ 次 LLM 调用）

```
需要 35+ 次 LLM 调用！每次调用都消耗 Token、等待响应。
如果中间有任何错误，还要加上截图、分析、重试...
```

- 搜索关键词 → LLM 决定调用搜索 API
- 获取 10 条结果 → 每条都要单独处理
- 打开第 1 条 → 等待页面加载 → 截图
- 分析截图 → 判断是否成功
- 打开第 2 条 → 等待页面加载 → 截图
- ...（重复 10 次）

每个步骤都要汇报给 LLM，效率极低。

### Skill 版本（1 次 LLM 调用）

```
只需要 1 次 LLM 调用生成代码，本地执行 0 次 LLM 调用。
生成代码包含循环和错误处理。
```

```javascript
// Skill 生成的代码
const results = await search('关键词');
for (const link of results) {
  try {
    await page.goto(link);
    await page.screenshot({ path: `screenshot-${index}.png` });
  } catch (error) {
    console.error(`Failed to load ${link}:`, error);
  }
}
```

一次对话，自主执行，效率高。

## 为什么 MCP 在这个场景下表现差？

### 频繁交互的开销

- **Token 消耗**：32 个工具函数占用 13,600 Tokens（占 200k 容量的 8%），还没开始干活，8% 的脑容量就被吃了！
- **网络延迟**：每次 API 调用都要等待响应

## 生活化比喻

**MCP = 步步请示的快递员**

```
快递员："老板，我现在在小区门口，下一步去哪？"
老板："去 3 号楼"
快递员：（走到 3 号楼）
快递员："老板，到了，下一步？"
老板："去 501"
快递员：（爬到 501）
快递员："老板，到了，下一步？"
老板："敲门"
快递员：（敲门）
快递员："老板，没人，怎么办？"

每一步都要汇报，效率低。
```

**Skill = 带任务清单的快递员**

```
老板："你去送个快递，清单在这：
1. 去 3 号楼 501
2. 敲门
3. 没人的话贴条拍照"

快递员：（拿到清单，开始执行）
走到 3 号楼 ✓
爬到 501 ✓
敲门 ✗ 没人
贴条 ✓
拍照 ✓

快递员："老板，任务完成，照片在这。"

一次对话，自主执行，效率高。
```

## 总结

MCP 如果封装了很多原子能力，且需要被大模型频繁调用，效果差于 Skill，还不如将这些能力实现成 cli 或 api，skill 会组合调用。

---

*叠个 buff，以上纯属个人见解，欢迎交流讨论*

*参考资源：*
- 原文链接：https://mp.weixin.qq.com/s/N3RKHP3Eb8ZDVPMQlgjqKA
- Playwright MCP: @executeautomation/playwright-mcp-server
- Playwright Skill: https://github.com/lackeyjb/playwright-skill
