const fs = require("fs")
const path = require("path")
const marked = require("./marked")
const katex = require('katex')
const ejs = require('ejs')


const filepath = path.join(__dirname, 'test.md');

const template = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Md to Html</title>
<link href="../hljs.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.10.1/dist/katex.min.css" integrity="sha384-dbVIfZGuN1Yq7/1Ocstc1lUEm+AT+/rCkibIcC/OmWo5f0EA48Vf8CytHzGrSwbQ" crossorigin="anonymous">

    <!-- The loading of KaTeX is deferred to speed up page rendering -->
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.10.1/dist/katex.min.js" integrity="sha384-2BKqo+exmr9su6dir+qCw08N2ZKRucY4PrGQPPWU1A7FtlCGjmEGFqXCv5nyM5Ij" crossorigin="anonymous"></script>

    <!-- To automatically render math in text elements, include the auto-render extension: -->
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.10.1/dist/contrib/auto-render.min.js" integrity="sha384-kWPLUVMOks5AQFrykwIup5lo0m3iMkkHrD0uJ4H5cjeGihAutqP0yW0J6dpFiVkI" crossorigin="anonymous"
        onload="renderMathInElement(document.body);"></script>
<script src="http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>
</head>
<body>
    <%- html %>
    <%#输出非转义的数据html到模板%>
</body>
</html>`


fs.watch(filepath, (function () {
    var count = 0;
    return function () {
        count++;
        fs.readFile(filepath, "utf8", (err, data) => {

            if (err) {
                console.log(err);
                return;
            }
            marked.setOptions({
                renderer: new marked.Renderer(),
                highlight: function (data) {
                    return require('highlight.js').highlightAuto(data).value;
                },
                pedantic: false,
                gfm: true,
                tables: true,
                breaks: false,
                sanitize: false,
                smartLists: true,
                smartypants: false,
                xhtml: false,
                latexRender: katex.renderToString.bind(katex)              
            })
            //增加的代码，用于个性化输出table
            const renderer = new marked.Renderer();
            renderer.table = function (header, body) {
                return '<table class="table">'+header+body+'</table>'
            }
            
            let html =  marked(data,{renderer: renderer});
            a  = katex.renderToString('f(n+1)−1=2[f(n)−1]', {
                throwOnError: false
            });
            console.log(a)
            let pageHtml = ejs.render(template, {
                html
            })





            // fs.mkdir  创建目录  
            fs.mkdir('Public', function (error) {
                if (error) {
                    console.log(error);
                    return false;
                }
                console.log('创建目录成功');
            })

            //fs.writeFile  写入文件（会覆盖之前的内容）（文件不存在就创建）  utf8参数可以省略  
            fs.writeFile('Public/index.html', pageHtml, 'utf8', function (error) {
                if (error) {
                    console.log(error);
                    return false;
                }
                console.log('写入成功');
            })

        })
    };
})());