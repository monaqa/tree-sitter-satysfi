# tree-sitter-satysfi

[SATySFi](https://github.com/gfngfn/SATySFi) grammar for [tree-sitter](https://github.com/tree-sitter/tree-sitter)

## Neovim でのインストール方法

[nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter) をインストールした上で、
`$XDG_CONFIG_HOME/nvim/init.lua` などの設定ファイルに以下を記載する。

```lua
local parser_config = require "nvim-treesitter.parsers".get_parser_configs()
parser_config.satysfi = {
  install_info = {
    url = "https://github.com/nvim-treesitter/nvim-treesitter", -- local path or git repo
    files = {"src/parser.c", "src/scanner.c"}
  },
  filetype = "satysfi", -- if filetype does not agrees with parser name
}

require'nvim-treesitter.configs'.setup {
  ensure_installed = {
      'satysfi',
  },
  highlight = {
      enable = true,
  },
  -- if you use indent.scm
  -- indent = {
  --     enable = true,
  -- },
  -- if you use https://github.com/andymass/vim-matchup
  -- matchup = {
  --   enable = true,
  -- },
}
```

その後、 `queries/` 以下のファイルを `$XDG_CONFIG_HOME/nvim/after/queries/satysfi/` 以下にコピー。
（おそらく `runtimepath` 下に適切に配置されていればよさそう）
