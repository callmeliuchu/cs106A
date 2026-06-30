# EECS 106A 机器人学练习台

这是一个本地 Web 作业整理和提交系统，按 EECS C106A/206A Fall 2023 的 HW0-HW9 组织。题目来自已下载的作业 PDF 和 starter code，不再使用自编练习题。

- 每个作业对应一个导航项
- 每个 PDF problem 对应一个题组
- 有 starter code 的作业会列出对应代码任务
- 页面顶部可以直接打开本地 PDF/ZIP 资料
- 学生提交区
- 教师批改区
- JSON 导出/导入
- 可选 AI 提示和 AI 辅助批改

## 启动

```bash
cd "robotics-practice-web"
node server.mjs
```

然后打开：

```text
http://localhost:5177
```

## AI 配置

服务端会读取：

```text
~/.claude/settings.json
```

优先使用其中的 `env.OPENAI_BASE_URL` 和 `env.OPENAI_API_KEY`，调用 OpenAI-compatible 的 `/v1/chat/completions` 接口。DeepSeek 兼容这个接口时可以直接使用。

密钥只在本地 Node 服务端读取，不会写入前端代码、localStorage 或导出的提交文件。

## 数据存储

学生提交和教师批改结果默认保存在浏览器 `localStorage`。教师端可以导出 JSON 备份，也可以导入之前导出的 JSON。

## 作业资料

服务端会通过 `/materials/...` 读取相邻目录：

```text
../eecs106a-fa23-homework
```
