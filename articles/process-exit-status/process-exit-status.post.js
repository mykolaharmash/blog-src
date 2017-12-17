let codeBlock = require('../../components/code-block/code-block.component')

let showExitStatusCode = [
  {
    code: `
show_exit_code() {
    local ex=$?

    if [ $ex -ne 0 ]
    then
        echo -e "\\033[0;31m$ex\\033[0m"
    fi
}`,
    style: 'normal'
  }
]

let showExitStatusAddPromptCode = [
  {
    code: `
show_exit_code() {
    local ex=$?

    if [ $ex -ne 0 ]
    then
        echo -e "\\033[0;31m$ex\\033[0m"
    fi
}`,
    style: 'normal'
  },
  {
    code: `
PROMPT_COMMAND="show_exit_code;$PROMPT_COMMAND"
    `,
    style: 'add'
  }
]

let sourceBashProfileCode = [
  {
    code: `source ~/.bash_profile`,
    style: 'normal'
  }
]

module.exports = function () {
  return `
<p class="post__paragraph">
  Small tip to make your bash shell experience a bit better.
</p>

<p class="post__paragraph">
  There is a nice way to stop being confused when you run a
  command and it finishes silently.
</p>

<img
  class="post__image"
  alt="Process exited without any message what happened"
  src="no-clue.png"
/>

<p class="post__paragraph">
  What just happened? Did it fail? Did it do the job but just
  haven't written any message? Mystery.
</p>

<p class="post__paragraph">
  To fix it you can write an exit code right after a command output if
  the code was not zero.
</p>

<img
  class="post__image"
  alt="Showing exist code after command output"
  src="now-i-see.png"
/>

<p class="post__paragraph">
  If you are using some popular theme for
  <a href="https://github.com/Bash-it/bash-it">Bash-it</a> you
  probably have this solved already. If not, you're going to need
  <code class="inline-code-block">PROMPT_COMMAND</code>
  environment variable.
</p>

<h2 class="post__section-title">How To</h2>
<p class="post__paragraph">
  Add new function to your
  <code class="inline-code-block">.bash_profile</code>:
</p>

<div class="post__code-block">
  <div class="code-block">
    <div class="code-block__title">
      bash
    </div>
    
    ${ codeBlock({ codeStructure: showExitStatusCode, lang: 'bash' }) } 
    
  </div>
</div>

<p class="post__paragraph">
  The function saves exit code of the last executed command
  and then writes it in red color if the code is not zero.
</p>

<p class="post__paragraph">
  Now add this function call into
  <code class="inline-code-block">PROMPT_COMMAND</code>
  variable
</p>

<div class="post__code-block">
  <div class="code-block">
    <div class="code-block__title">
      bash
    </div>
    
    ${ codeBlock({ codeStructure: showExitStatusAddPromptCode, lang: 'bash' }) } 
    
  </div>
</div>

<p class="post__paragraph">
  Bash will execute string inside the variable like
  a command right before displaying new prompt.
</p>

<p class="post__paragraph">
  Now, open new terminal tab or re-read bash configuration with a
  command:
</p>

<div class="post__code-block">
  <div class="code-block">
    <div class="code-block__title">
      bash
    </div>
    <div class="code-block__code">
    ${ codeBlock({ codeStructure: sourceBashProfileCode, lang: 'bash' }) } 
    </div>
  </div>
</div>
</div>

<h2 class="post__section-title">Links</h2>

<ul class="post__list">
  <li class="post__list-item">
    <a href="https://github.com/Bash-it/bash-it">Bash-it</a>
    — set of plugins, completions and themes for Bash
  </li>
  <li class="post__list-item">
    <a href="http://www.tldp.org/HOWTO/Bash-Prompt-HOWTO/x264.html">
      Example of using PROMPT_COMMAND
    </a>
  </li>
  <li class="post__list-item">
    <a href="https://github.com/nik-garmash/bash-it/blob/e2cd02bf29c186dbf4557d12b7a6960dc4c4e558/themes/bakke/bakke.theme.bash">
      My Bash-it theme
    </a>
  </li>
</ul>
`
}

