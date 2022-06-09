// Minimum cost to reach end of array array when a maximum jump of K index is allowed
// Given an array arr[] of N integers and an integer K, one can move from an index i to any other j if j ≤ i + k. The cost of moving from one index i to the other index j is abs(arr[i] – arr[j]). Initially we start from the index 0 and we need to reach the last index i.e. N – 1. The task is to reach the last index in the minimum cost possible.

// Examples:

// Input: arr[] = {10, 30, 40, 50, 20}, k = 3
// Output: 30
// 0 -> 1 -> 4
// the total cost will be: |10-30| + |30-20| = 30

// Input: arr[] = {40, 10, 20, 70, 80, 10}, k = 4
// Output: 30
