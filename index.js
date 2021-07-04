/*
deepCopy
*/
const deepCopy = (data) => {
  if (!(data instanceof Object)) {
    return data;
  }
  let res;
  if (Array.isArray(data)) {
    res = [];
    data.forEach((item) => {
      res.push(deepCopy(item));
    });
  } else {
    res = Object.entries(data).reduce((prev, [key, value]) => {
      return {
        ...prev,
        [key]: deepCopy(value),
      };
    }, {});
  }
  return res;
};

/*
Q1. 去掉一组整型数组中重复的值
 */
Array.prototype.excludeDuplicated = function () {
  return Array.from(new Set(this));
};

Array.prototype.excludeDuplicated = function () {
  let arr = [];
  let index = this.length - 1;
  while (index) {
    arr.indexOf(this[index]) < 0 && arr.push(this[index]);
    index--;
  }
  return arr;
};

Array.prototype.excludeDuplicated = function () {
  // 利用对象的键值不会重复
  return Object.keys(
    this.reduce((prev, current) => {
      prev[current] = true;
      return prev;
    }, {})
  ).map((item) => parseInt(item));
};

/*
Q2. 统计一个字符串出现最多的字母
 */

String.prototype.maxTimeStr = function () {
  const timeMap = new Map();
  // 首先统计每一个字符串出现的次数，并且将这个数据存入map
  for (let index = 0; index < this.length; index++) {
    timeMap.has(this[index])
      ? timeMap.set(this[index], timeMap.get(this[index]) + 1) // 如果已经有了这一项，将统计+1
      : timeMap.set(this[index], 1); // 如果没有记录 那么初始化为1
  }
  // Map.prototype.entires方法：返回一个数组 其中每一项是 [key, value]
  // 经过sort排序后 数组第一项即为统计数量最多的字符
  return [...timeMap.entries()].sort((prev, current) => current[1] - prev[1])[0][0]; // 第一项的第一个元素即为字符
};

/*
Q3. 排序算法
 */

// 冒泡排序
Array.prototype.sortArray = function () {
  // 临时变量 用来交换
  let temp;
  // 需要 length - 1次循环才能保证所有项都经过了比较
  for (let i = this.length - 1; i >= 0; i--) {
    // 因为每一次循环都可以保证会把遍历到的最大值最右侧
    // 所以下一次循环都可以少比较一次 所以循环条件可以变为 j < i
    for (let j = 0; j < i; j++) {
      if (this[j] > this[j + 1]) {
        temp = this[j];
        this[j] = this[j + 1];
        this[j + 1] = temp;
      }
    }
  }
  return this;
};

// 快速排序
Array.prototype.sortArray = function () {
  // 递归终止的条件
  if (this.length <= 1) {
    return this;
  }
  // 选择一个基准 一般是取中间的 或者第一位
  const base = this[0];
  const left = [];
  const right = [];
  // 因为取了第一项作为了基准 所以就没有必要自己和自己比较了 因此循环从 i = 1 开始
  for (let i = 1; i < this.length; i++) {
    // 碰到比基准大的向左边推
    if (this[i] <= base) {
      left.push(this[i]);
    } else {
      // 碰到比基准小的向右边推
      right.push(this[i]);
    }
  }
  return [...left.sortArray(), base, ...right.sortArray()];
};

// 选择排序 （个人觉得是最符合人类思维的排序） 1.每次从数组中寻找最小的元素 然后插入新数组
// 直到最后一个元素被放入第一位
Array.prototype.sortArray = function () {
  const res = [];
  let times = this.length;
  while (times >= 0) {
    let min = Infinity;
    let index = 0;
    for (let i = 0; i < this.length; i++) {
      if (this[i] < min) {
        min = this[i];
        index = i;
      }
    }
    times--;
    res.push(min);
    this.splice(index, 1);
  }
  return res.slice(0, times);
};

console.log([1, 1, 3, 2, 2, 3, 3].excludeDuplicated());
console.log('xxxx213111111111111111xa12222x78798asxsdanvb'.maxTimeStr());

const originArr = Array.from({ length: 10 }, () => {
  return Math.floor(Math.random() * 1000);
});
console.log(deepCopy(originArr), originArr.sortArray());

/*
  https://leetcode-cn.com/problems/set-mismatch/
  错误的集合
*/
function findErrorNums(nums) {
  // 创建一个map 用来记录每个字符出现的次数
  const hashMap = new Map();
  let res = [0, 0];
  for (let num of nums) {
    hashMap.set(num, hashMap.has(num) ? hashMap.get(num) + 1 : 1);
  }
  for (let i = 0; i < nums.length; i++) {
    // 结果中应该存在的数字 num
    const num = i + 1;
    const count = hashMap.get(num) || 0;
    // 如果没有出现则说明这个就是要找的
    if (count === 0) {
      res[1] = num;
      // 如果出现了两次，说明这个就是错误的重复的数字
    } else if (count === 2) {
      res[0] = num;
    }
  }
  return res;
}

const xxx = findErrorNums([3, 2, 2]);

console.log(xxx, 'xxx');

/*
找到需要补充粉笔的学生编号
https://leetcode-cn.com/problems/find-the-student-that-will-replace-the-chalk/submissions/
 */

function chalkReplacer(chalk, k) {
  // 计算出单次循环完整需要的粉笔数量
  const total = chalk.reduce((prev, current) => prev + current, 0);
  // 取余的数量就是需要补充前最后一次剩余的粉笔数量
  let rest = k % total;
  // 模拟最后一次的情况 判断比较是哪一个index需要去补充
  for (let i = 0; i < chalk.length; i++) {
    rest -= chalk[i];
    if (rest < 0) {
      return i;
    }
  }
}

/*
Q4. 获得指定下标的斐波那契数
*/
function fibonacci(num) {
  // 递归终结条件
  if (num === 0 || num === 1) {
    return 1;
  } else {
    // 递归开始
    return fibonacci(num - 1) + fibonacci(num - 2);
  }
}

/*
  斐波那契数列前num项
 */
function getFibonacci(num) {
  // 创建指定长度的Array
  const res = Array.from({ length: num - 1 });
  // 通过获取指定位数的斐波那契函数来获取
  for (let i = 0; i < num; i++) {
    res[i] = fibonacci(i);
  }
  return res;
}

/*
二维数组中的查找
 */
function search2D(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === target) {
        return true;
      }
    }
  }
  return false;
}

console.log(
  search2D(
    [
      [1, 2, 3],
      [10000, 21123, 2132],
      [123, 32, 213, 4891],
    ],
    21123
  )
);

/*
 替换空格
*/
function replaceEmpty(str) {
  return str.replace(/\s/g, '%20');
}

/*
  验证一个数是否是素数
 */

function isPrime(num) {
  if (num === 2) {
    return true;
  }
  const max = Math.ceil(Math.sqrt(num));
  for (let i = 2; i <= max; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

console.log(
  Array.from({ length: 100 }, (v, k) => k + 1)
    .slice(1)
    .map((item) => ({
      num: item,
      isPrime: isPrime(item),
    }))
    .filter((it) => it.isPrime)
    .map((it) => it.num)
);
