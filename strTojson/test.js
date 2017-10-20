const strExample1 = `奴隶社会,非洲,古埃及文明,金字塔
,亚洲,两河流域文明,汉谟拉比法典
,,古印度,种姓制度
,,,佛教的创立
,欧洲,希腊,希腊城邦
,,,雅典民主
,,罗马,城邦
,,,帝国的征服与扩展
,,希腊罗马古典文化,建筑艺术
,,,公历`;



function str2json(str) {
    var stack = [{}];
    var lines = str.split('\n');
    for(var i = 0; i < lines.length; i++) {
        var dep = 0;
        for(var j = 0; j < lines[i].length; j++) {
            if(lines[i].charAt(j) == ',') {
                dep++;
            }
            else {
                break;
            }
        }
        lines[i] = lines[i].slice(dep);
        while(stack.length !== dep + 1) stack.pop();
        words = lines[i].split(',');
        if(dep === 0) {
            stack[dep][words[0]] = [];
            stack.push( stack[dep][words[0]] );
            dep++;
            words.shift();
        }
        for(var j = 0; j < words.length; j++) {
            var json = {};
            json[words[j]] = [];
            stack[dep].push(json);
            stack.push(json[words[j]]);
            dep++;
        }
    }
    return stack[0];
}

console.log(JSON.stringify(str2json(strExample1)));