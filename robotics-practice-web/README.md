# EECS 106A 机器人学练习台

这是一个本地 Web 练习系统，覆盖前面总结的 10 个核心章节。每章包含 5 个题组，共 50 个题组、100 道题：

- 每个题组 1 道问答题
- 每个题组 1 道编程题
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
