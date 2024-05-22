const compareFunc = require("compare-func");

module.exports = {
  writerOpts: {
    transform: (commit, context) => {
      // 创建 commit 的新副本
      let newCommit = {...commit};

      // 处理 BREAKING CHANGES 注意事项
      if (newCommit.notes) {
        newCommit.notes = newCommit.notes.map(note => {
          // 创建 note 的新副本
          let newNote = {...note};
          if (newNote.title) {
            newNote.title = "BREAKING CHANGES";
          }
          return newNote;
        });
      }

      // 根据 commit 类型更改类型名称
      const commitTypeMap = {
        feat: "✨ Features | 新功能",
        fix: "🐛 Bug Fixes | Bug 修复",
        perf: "⚡ Performance Improvements | 性能优化",
        revert: "⏪ Reverts | 回退",
        docs: "📝 Documentation | 文档",
        style: "💄 Styles | 风格",
        refactor: "♻ Code Refactoring | 代码重构",
        test: "✅ Tests | 测试",
        build: "👷‍ Build System | 构建",
        ci: "🔧 Continuous Integration | CI 配置",
        chore: "🎫 Chores | 其他更新"
      };

      // 检查并更新 commit 类型
      if (commitTypeMap[newCommit.type]) {
        newCommit.type = commitTypeMap[newCommit.type];
      }

      // 移除 * 作用域
      if (newCommit.scope === "*") {
        newCommit.scope = "";
      }

      // 缩短 commit hash
      if (typeof newCommit.hash === "string") {
        newCommit.hash = newCommit.hash.substring(0, 7);
      }

      // 处理 issue 和 user 提及
      if (context.repository && context.host && newCommit.subject) {
        let url = `${context.host}/${context.owner}/${context.repository}/issues/`;
        newCommit.subject = newCommit.subject.replace(
          /#([0-9]+)/g,
          `[#$1](${url}$1)`
        );

        newCommit.subject = newCommit.subject.replace(
          /\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g,
          `[@$1](${context.host}/$1)`
        );
      }

      // 过滤掉已在 subject 中提及的 references
      if (newCommit.references) {
        newCommit.references = newCommit.references.filter(ref => {
          return !ref.issue.match(/[0-9]+/g) || !newCommit.subject.includes(`#${ref.issue}`);
        });
      }

      return newCommit;
    },
    groupBy: "type",
    commitGroupsSort: "title",
    commitsSort: ["scope", "subject"],
    noteGroupsSort: "title",
    notesSort: compareFunc
  }
};