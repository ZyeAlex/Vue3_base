const child_process = require('child_process');
const version = require('../package.json').version;
let branch = child_process.execSync('git branch --show-current', { encoding: 'utf-8' }).trim();
function versionPlugin() {
  return {
    name: 'vite-plugin-add-version',
    transformIndexHtml(html) {
      let scriptTag = `<meta name="version" content="${version}" />\n\t<meta name="branch" content="${branch}" />`;
      const updatedHtml = html.replace('</title>', `</title>\n\t${scriptTag}`);
      return updatedHtml; // 返回新的html字符串
    },
  };
}

export default versionPlugin;
