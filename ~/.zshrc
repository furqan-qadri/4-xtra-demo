# Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

# Path to your oh-my-zsh installation.
export ZSH="/Users/furqanqadri/.oh-my-zsh"

# Theme
ZSH_THEME="powerlevel10k/powerlevel10k"

# Plugins (reduced for better performance)
plugins=(
  git
  zsh-autosuggestions
  zsh-syntax-highlighting
)

source $ZSH/oh-my-zsh.sh

# ============================================
# PATH CONFIGURATION (consolidated)
# ============================================
export PATH="$PATH:/Users/furqanqadri/.nexustools"
export PATH="$PATH:/Users/furqanqadri/tools/flutter/bin"
export PATH="/opt/homebrew/opt/mysql-client/bin:$PATH"
export PATH="$HOME/.local/bin:$PATH"

# ============================================
# LAZY LOADING NVM (Performance Optimization)
# ============================================
export NVM_DIR="$HOME/.nvm"

# Lazy load nvm (much faster!)
nvm() {
  unset -f nvm
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
  nvm "$@"
}

# Optional: Auto-use .nvmrc if present (comment out if not needed)
# autoload -U add-zsh-hook
# load-nvmrc() {
#   local node_version="$(nvm version)"
#   local nvmrc_path="$(nvm_find_nvmrc)"
#   if [ -n "$nvmrc_path" ]; then
#     local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")
#     if [ "$nvmrc_node_version" = "N/A" ]; then
#       nvm install
#     elif [ "$nvmrc_node_version" != "$node_version" ]; then
#       nvm use
#     fi
#   elif [ "$node_version" != "$(nvm version default)" ]; then
#     echo "Reverting to nvm default version"
#     nvm use default
#   fi
# }
# add-zsh-hook chpwd load-nvmrc
# load-nvmrc

# ============================================
# ALIASES
# ============================================
alias python=/usr/bin/python3

# ============================================
# OTHER CONFIGURATIONS
# ============================================
# Load local environment (if exists)
[ -f "$HOME/.local/bin/env" ] && . "$HOME/.local/bin/env"

# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh

# Remove duplicate zsh-syntax-highlighting source (already loaded via plugin)
# source /Users/furqanqadri/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh 