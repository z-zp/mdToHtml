
# JavsScript 算法
一些简单又有趣的jacaScript算法，让锈逗的脑壳转起来。
[更多JavaScript 算法与数据结构](https://github.com/trekhleb/javascript-algorithms/blob/master/README.zh-CN.md)

## 排序

A | B | C
--|--|--
A1 | B1 | C1
A2 | B2 | C2
A3 | B3 | C3

### 冒泡排序
  ```
  function bubbleSort(arr) {
    var i = arr.length-1;  //初始时,最后位置保持不变
    while ( i> 0) {
        var pos= 0; //每趟开始时,无记录交换
        for (var j= 0; j< i; j++)
            if (arr[j]> arr[j+1]) {
                pos= j; //记录交换的位置
                var tmp = arr[j]; arr[j]=arr[j+1];arr[j+1]=tmp;
            }
        i= pos; //为下一趟排序作准备
     }
     return arr;
}
  ```
 ![冒泡排序](http://upload-images.jianshu.io/upload_images/9809555-c45a843e156b3e7b?imageMogr2/auto-orient/strip) 

### 选择排序
```
function selectionSort(arr) {
    var len = arr.length;
    var minIndex, temp;
    for (var i = 0; i < len - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {     //寻找最小的数
                minIndex = j;                 //将最小数的索引保存
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}

```
 ![选择排序](http://upload-images.jianshu.io/upload_images/9809555-403db33779ae29b9?imageMogr2/auto-orient/strip) 

### 插入排序
```
function binaryInsertionSort(array) {
    if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
        console.time('二分插入排序耗时：');

        for (var i = 1; i < array.length; i++) {
            var key = array[i], left = 0, right = i - 1;
            while (left <= right) {
                var middle = parseInt((left + right) / 2);
                if (key < array[middle]) {
                    right = middle - 1;
                } else {
                    left = middle + 1;
                }
            }
            for (var j = i - 1; j >= left; j--) {
                array[j + 1] = array[j];
            }
            array[left] = key;
        }
        console.timeEnd('二分插入排序耗时：');

        return array;
    } else {
        return 'array is not an Array!';
    }
}
```
![插入排序](http://upload-images.jianshu.io/upload_images/9809555-285d9750df8245f9?imageMogr2/auto-orient/strip)

 ### 快速排序


```
var quickSort = function(arr) {
　　if (arr.length <= 1) { return arr; }
　　var pivotIndex = Math.floor(arr.length / 2);
　　var pivot = arr.splice(pivotIndex, 1)[0];
　　var left = [];
　　var right = [];
　　for (var i = 0; i < arr.length; i++){
　　　　if (arr[i] < pivot) {
　　　　　　left.push(arr[i]);
　　　　} else {
　　　　　　right.push(arr[i]);
　　　　}
　　}
　　return quickSort(left).concat([pivot], quickSort2(right));
};
```

 ![快速排序](http://upload-images.jianshu.io/upload_images/9809555-5b0e2d10e2dc6a2b?imageMogr2/auto-orient/strip)
## 质数(千万2s)
```
function prime(n){
  let time = Date.now()
  let Memo = Array(n).fill(-1)
  let sqrt = Math.ceil(Math.sqrt(n))
  let res = []
  for(let i = 2;i<=sqrt;i++){
    if(Memo[i]===1) continue
    for(let j=2;j<= n/i;j++){
      if(Memo[i*j] === -1){
        Memo[i*j] = 1
      }
    }
  }
  for(let i=2;i<=n;i++){
    Memo[i] === -1 && res.push(i)
  }
  console.log(Date.now()-time)
  return res
}
```
![image.png](https://upload-images.jianshu.io/upload_images/9809555-595aff81b6cd18ad.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


 ## 斐波那契数列(Fibonacci sequence)
 ```

function fibonacciClosedForm(position) {
  const topMaxValidPosition = 75;
  if (position < 1 || position > topMaxValidPosition) {
    throw new Error(`Can't handle position smaller than 1 or greater than ${topMaxValidPosition}`);
  }
  const sqrt5 = Math.sqrt(5);
  const phi = (1 + sqrt5) / 2;
  return Math.floor((phi ** position) / sqrt5 + 0.5);
}
// 动态规划
function fibonacciNth(n) {
  let currentValue = 1;
  let previousValue = 0;
  if (n === 1) {
    return 1;
  }
  let iterationsCounter = n - 1;

  while (iterationsCounter) {
    currentValue += previousValue;
    previousValue = currentValue - previousValue;
    iterationsCounter -= 1;
  }
  
  return currentValue;
}
// 递归
function fibonacciNth(n) {
  if(n<=0){
    return n
  }
  let Memo = []
  for(let i=0;i<=n;i++){
    Memo[i]= -1
  }
  return fib(n,Memo)
}
function fib(n,Memo){
  if(Memo[n] !== -1) return Memo[n]
  if(n<2) {
    Memo[n] = 1
  }else {
    Memo[n]=fib( n-1,Memo)+fib(n-2,Memo)
  }
  return Memo[n]
}
 ```
![image.png](https://upload-images.jianshu.io/upload_images/9809555-5c640c7b655de29d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

 ### 爬楼梯 一共10级楼梯，每次可以走一步或两步，求一共多少种走法
```
var fib = function (n){
  if(n == 1){
    return 1;
  }else if(n==2){
    return 2;
  }else if(n>2){
    return fib(n-1) + fib(n-2);
  }
}
```
### 细胞分裂 1个细胞，一个小时分裂一次，生命周期是3小时，求n小时后容器内，有多少细胞
```
function cellNumber(hour){
    let firstCycle = function (hour){
        if(hour===0){return 1;} //初始的那个细胞
        return firstCycle(hour-1)+secondCycle(hour-1)+thirdCycle(hour-1);
    }
    let secondCycle = function(hour){
        if(hour===0){return 0;} //一个小时之后才会生成
        return firstCycle(hour-1);
    }
    let  thirdCycle = function(hour){
        if(hour===0||hour===1){return 0;} //前两小时还没生成
        return secondCycle(hour-1);
    }
    return firstCycle(hour)+secondCycle(hour)+thirdCycle(hour)
}



```
el:2

第一周期(0h) | 第二周期(1h) | 第三周期(2h) 
-- |:-:|:-:
a(2)           | + b(2) | + c(2) 
a(1)+b(1)+c(1) | + a(1) | + b(1) 
a(0)+a(1)      | + a(0) | + a(1) 
a(0)+a(0)      | + a(0) | + a(0) 
1   + 1        | + 1    | + 1    


## 判断2次方数
```    
function isPowerOfTwo(number){
    if (number < 1) {
        return false;
    }  
    return (number & (number - 1)) === 0;
}
```
## 素数检测
```
function trialDivision(number) {
    if (number % 1 !== 0) {
      return false;
    }
  
    if (number <= 1) {
      return false;
    }
  
    if (number <= 3) {
      return true;
    }
  
    if (number % 2 === 0) {
      return false;
    }
  
    const dividerLimit = Math.sqrt(number);
    for (let divider = 3; divider <= dividerLimit; divider += 2) {
      if (number % divider === 0) {
        return false;
      }
    }
  
    return true;
  }
```
## 整数拆分
### 拆分为因试和
```
n=1+f(n-1);
n=2+f(n-2);
·····
n=(n-1)+f(1);
n=n+f(0)
```
$f(n)=f(n−1)+f(n−2)+……+f(1)+f(0)$(其中$f(0)=1$)  公式①

数学公式推导： 
$f(n+1)=f(n)+f(n−1)+……+f(2)+f(1)$  公式②

由②-①得 
$f(n+1)−f(n)=f(n)−f(0)$

$f(n+1)=2f(n)−1$

$f(n+1)−1=2[f(n)−1]$


于是可以解得
$f(n)=2^{(n−1)}，n>=1$
![image.png](https://upload-images.jianshu.io/upload_images/9809555-2f975a89cfe690b9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


```
function integerPartition(number) {
  let res_num= 0
  let res = []
  let p = 0
  resolve(number)
  console.log("total num of res:",res_num)
  function resolve(number){
    if(number<=0){
      console.log(res.slice(0,p))
      res_num ++
    }
    for(let i=1;i<=number;i++){
      res[p] = i
      p++
      resolve(number-i)
      p--
    }
  } 
}
```
![image.png](https://upload-images.jianshu.io/upload_images/9809555-028894c12940a223.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
看输出可以发现，112，211，13，31，其实是重复的，其实我们只要保证，所以都按照由大到小排序就能保证不再重复，新加一个参数min_number,限制for循环的初始值，从而达到这个目的，思想跟前面排序的思想类似。

```
function integerPartition(number) {
  let res_num= 0
  let res = []
  let p = 0
  resolve(number,1)
  console.log("total num of res:",res_num)
  function resolve(number, min_number){
    if(number<=0){
      console.log(res.slice(0,p))
      res_num ++
    }
    for(let i=min_number;i<=number;i++){
      res[p] = i
      p++
      resolve(number-i,i)
      p--
    }
  } 
}
```
![image.png](https://upload-images.jianshu.io/upload_images/9809555-837c058fa3a6b354.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 拆分为因试积
```
function integerPartition(number) {
  let res= []
  let num = 0
  let p = 0
  resolve(number,2)
  console.log("total num of res:",num)
  function resolve(number, min_number){
    if(number<2){
      num++
      console.log(res.slice(0,p))
    }
    for(let i = min_number;i<=number;i++){
      if(number%i==0)
        {
            res[p]=i;
            p++; 
            resolve(number/i,i);
            p--;        
        }
    }
  }
}
```
![image.png](https://upload-images.jianshu.io/upload_images/9809555-92ae226b6929d72c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 洗牌
```
function fisherYates(originalArray) {
  const array = originalArray.slice(0); //不改变原数据
  for (let i = (array.length - 1); i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}
```
## 幂集
### 回溯解决(不断将下一个元素添加到子集)
```
function powerset(arr){
    var ps = [[]];
    for(var i=0;i<arr.length;i++){
        for(var j=0,len=ps.length;j<len;j++){
            ps.push(ps[j].concat(arr[i]));
        }
    }
    return ps;
}
```
### 按位解决
1代表存在，0代表不存在

 1/0 |abc | 子集
-|-|-
0|000|{}
1|001|{c}
2|010|{b}
3|011|{c,b}
4|100|{a}
5|101|{a,c}
6|110|{a,b}
7|111|{a,b,c}

## 组合求和
```
function combinationSumRecursive(
  chooseArr,
  sum,
  res = [],
  now = [],
  start = 0
) {
  if (sum < 0) return res
  if (sum === 0) {
    res.push(now.slice())
    return res;
  }
  for (let candidateIndex = start; candidateIndex < chooseArr.length; candidateIndex += 1) {
    const currentCandidate = chooseArr[candidateIndex]
    now.push(currentCandidate)
    combinationSumRecursive(
      chooseArr,
      sum - currentCandidate,
      res,
      now,
      candidateIndex
    )
    now.pop()
  }
  return res
}
```
![image.png](https://upload-images.jianshu.io/upload_images/9809555-45ce35e716744c24.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 雨水收集问题
![image.png](https://upload-images.jianshu.io/upload_images/9809555-87301314a06e8a2d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
function dpRainTerraces(terraces) {
  let waterAmount = 0;

  const leftMaxLevels = new Array(terraces.length).fill(0);
  const rightMaxLevels = new Array(terraces.length).fill(0);

  [leftMaxLevels[0]] = terraces;
  for (let terraceIndex = 1; terraceIndex < terraces.length; terraceIndex += 1) {
    leftMaxLevels[terraceIndex] = Math.max(
      terraces[terraceIndex],
      leftMaxLevels[terraceIndex - 1],
    );
  }

  rightMaxLevels[terraces.length - 1] = terraces[terraces.length - 1];
  for (let terraceIndex = terraces.length - 2; terraceIndex >= 0; terraceIndex -= 1) {
    rightMaxLevels[terraceIndex] = Math.max(
      terraces[terraceIndex],
      rightMaxLevels[terraceIndex + 1],
    );
  }

  for (let terraceIndex = 0; terraceIndex < terraces.length; terraceIndex += 1) {
    const currentTerraceBoundary = Math.min(
      leftMaxLevels[terraceIndex],
      rightMaxLevels[terraceIndex],
    );
    if (currentTerraceBoundary > terraces[terraceIndex]) {
      waterAmount += currentTerraceBoundary - terraces[terraceIndex];
    }
  }

  return waterAmount;
}
```
