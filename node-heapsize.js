const v8 = require('v8');

const heapData = v8.getHeapStatistics();

console.log('HEAP Data : ', heapData);

console.log ('total_heap_size', heapData.total_heap_size / (1024 * 1024) );
console.log ('total_heap_size_executable', heapData.total_heap_size_executable / (1024 * 1024) );
console.log ('total_physical_size', heapData.total_physical_size / (1024 * 1024) );
console.log ('total_available_size', heapData.total_available_size / (1024 * 1024) );
console.log ('used_heap_size', heapData.used_heap_size / (1024 * 1024) );
console.log ('heap_size_limit', heapData.heap_size_limit / (1024 * 1024) );
