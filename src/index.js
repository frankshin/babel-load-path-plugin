module.exports = function ({ types: t }) {
  return {
    visitor: {
      // Identifier(path, state) {},
      // ASTNodeTypeHere(path, state) {},
      // BinaryExpression(path) {},
      ImportDeclaration(path, state) {
        const { node } = path;
        let str;
        if (!node) return;
        if (node.source.value.indexOf('allsaberjs') > 0) {
          node.specifiers.forEach((item) => {
            if (t.isImportSpecifier(item)) {
              // todo: 暂时写死，后续抽时间动态化～～
              const { name } = item.local;
              switch (name) {
                case 'getCookie':
                  str = t.identifier('allsaberjs/libs/get-cookie');
                  break;
                case 'setCookie':
                  str = t.identifier('allsaberjs/libs/set-cookie');
                  break;
                default:
                  str = null;
              }
              if (str) node.source.value = str;
            }
          });
        }
      },
    },
  };
};
