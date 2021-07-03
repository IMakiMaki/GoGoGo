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
