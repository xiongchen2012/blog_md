1. **暴力遍历数组**

    ```javascript
    //遍历数组,把没有的元素推进新数组
    function unique(arr){
        var newArr = [];
        var item;
        for(var i = 0, len = arr.length; i < len; i++){
            item = arr[i];
            if(newArr.indexOf(item) === -1){
                newArr.push(item);
            }
        }
        return newArr;
    }
    ```

2. **利用数组的reduce方法遍历**

   ```javascript
   //本质和第1种没差别，遍历方式不同而已
   function unique(arr){
       return arr.reduce(function(prev, next){
           if(prev.indexOf(next) === -1){
               prev.push(next);
       	}
       	return prev;
     	}, []);
   }
   ```

3. **forEach循环遍历**

   ```javascript
   //本质和第1种没差别，也是遍历方式不同
   function unique(arr){
       var newArr = [];
       arr.forEach(function(item){
           if(newArr.indexOf(item) === -1){
               newArr.push(item);
           }
       });
       return newArr;
   }
   ```

4. **索引判断法**

   ```javascript
   // 利用数组indexOf的特点，它会找到数组中第一个该元素值的索引 
   // 所以我们可以判断数组元素的indexOf索引判断和元素本身的索引是否相同 
   // 如果相同，代表这是数组第一次出现的该元素值
   function unique(arr){
       var newArr = [arr[0]];
       var item;
       for(var i = 1, len = arr.length; i < len; i++){
           item = arr[i];
       	if(arr.indexOf(item) === i){
         		newArr.push(item);
       	}
     	}
     	return newArr;
   }
   ```



5. **排序去邻**

   ```javascript
   // 先调用数组的sort方法,目的不是给数组元素排序,所以也不需要为sort添加处理函数 
   // 排序的目的是为了把相同的值聚在一起
   // 这样只需要判断数组元素值和上一个是否相同就可以了
   function unique(arr){
     	var newArr = [arr[0]];
     	var item;
     	arr.sort();
     	for(var i = 1, len = arr.length; i < len; i++){
       	item = arr[i];
       	if(item !== arr[i - 1]){
         		newArr.push(item);
       	}
     	}
     	return newArr;
   }
   ```


6. **利用Set集合特性**

   ```javascript
   //利用ES6的Set方法不能有重复值的特性去重
   function unique(arr){
     	return [...new Set(arr)];
   }
   ```
