let highlight = require('highlight.js')

let code = `
show_exit_code() {
    local ex=$?

    if [ $ex -ne 0 ]
    then
        echo -e "\\033[0;31m$ex\\033[0m"
    fi
}

PROMPT_COMMAND="show_exit_code;$PROMPT_COMMAND"
`

let highlighted = highlight.highlight('bash', code).value

console.log(highlighted)


