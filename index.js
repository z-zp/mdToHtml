const fs = require("fs");
const path = require("path");
const marked = require("marked");
const ejs = require('ejs')

const filepath = path.join(__dirname, 'test.md');

const template = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Md to Html</title>
</head>
<body>
    <%- html %>
    <%#输出非转义的数据html到模板%>
</body>
</html>`

fs.watch(filepath,( function () {
    var count = 0;
    return function(){
        count++;
        console.log("文件" + filepath + " 内容刚刚改变。。第" + count + "次" );
        fs.readFile(filepath, "utf8", (err, data) => {

            if (err) {
                console.log(err);
                return;
            }
            let html = marked(data);
            let pageHtml = ejs.render(template, { html })
            console.log(data, html, pageHtml)
        
        
        
        
        
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

