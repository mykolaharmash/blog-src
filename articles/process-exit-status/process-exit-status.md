---
title: Process Exit Status
publishDate: August 10, 2017
---

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.4.0/styles/github.min.css">

Small tip to make your bash shell experience a bit better.

There is a nice way to stop being confused when you run a command and it finishes silently.

<article-image src="./no-clue.png" alt="Process exited without any message what happened"></article-image>

What just happened? Did it fail? Did it do the job but just haven't written any message? Mystery.

To fix it you can write an exit code right after a command output if
the code was not zero.

<article-image src="./now-i-see.png" alt="Showing exist code after command output"></article-image>

If you are using some popular theme for <a href="https://github.com/Bash-it/bash-it">Bash-it</a> you probably have this solved already. If not, you're going to need <code class="inline-code-block">PROMPT_COMMAND</code> environment variable.

## How To

Add new function to your <inline-code>.bash_profile</inline-code>

<code-block lang="bash">
show_exit_code() {
    local ex=$?
    
    if [ $ex -ne 0 ]
    then
        echo -e "\\033[0;31m$ex\\033[0m"
    fi
}
</code-block>

The function saves exit code of the last executed command and then writes it in red color if the code is not zero.

Now add this function call into <inline-code>PROMPT_COMMAND</inline-code> variable

<code-block lang="bash" highlight-lines="[10]">
show_exit_code() {
    local ex=$?
    
    if [ $ex -ne 0 ]
    then
        echo -e "\\033[0;31m$ex\\033[0m"
    fi
}
 
PROMPT_COMMAND="show_exit_code;$PROMPT_COMMAND"
</code-block>

Bash will execute string inside the variable like a command right before displaying new prompt.

Now, open new terminal tab or re-read bash configuration with a command:

<code-block lang="bash">
source ~/.bash_profile
</code-block>

## Links

- [Set of plugins, completions and themes for Bash](https://github.com/Bash-it/bash-it)
- [My Bash-it theme](https://github.com/nik-garmash/bash-it/blob/349de3049b9f886285bc8d5f581ca41b2bbd50a5/themes/bakke/bakke.theme.bash)
