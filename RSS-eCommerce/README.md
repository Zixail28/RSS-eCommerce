# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## The `.prettierrc` File

The `.prettierrc` file contains configuration settings for the Prettier tool, which automatically formats code in your project, making it more readable and consistent.

### Settings:

- `ignore`: List of files and folders that Prettier should ignore when formatting.
- `jsxBracketSameLine`: Determines whether the closing bracket of JSX should be on the same line as the last element.
- `printWidth`: Maximum line length.
- `singleQuote`: Use single quotes instead of double quotes.
- `trailingComma`: Add a trailing comma after the last element in objects and arrays.
- `tabWidth`: The width of tabs.
- `semi`: Add semicolons at the end of expressions.
- `bracketSpacing`: Add spaces around curly braces.
- `singleAttributePerLine`: Split JSX attributes onto separate lines.

This file allows you to configure the code style for your project, facilitating collaboration among developers and maintaining a consistent coding style.