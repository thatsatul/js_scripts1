// Check if the given number K is enough to reach the end of an array
// Given an array arr[] of n elements and a number K. The task is to determine if it is possible to reach the end of the array by doing the below operations:

// Traverse the given array and,

// If any element is found to be non-prime then decrement the value of K by 1.
// If any element is prime then refill the value of K to its initial value.
// If it is possible to reach the end of array with (K > 0), then print YES otherwise print NO.

// Examples:

// Input : K = 2   ,  arr[]={ 6, 3, 4, 5, 6} ;
// Output : Yes
// Explanation :
//  1- arr[0] is not prime, so K = K-1 = 1
//  2- arr[1] is prime so K will be refilled to its 
//     initial value. Therefore,  K = 2.
//  3- arr[2] is not prime.
//     Therefore,  K = 2-1 = 1
//  4- arr[3] is prime so K will be refilled to its 
//     initial value. Therefore,  K = 2.
//  5- arr[4] is not prime.
//     Therefore,  K = 2-1 = 1
//  6- Since the end of the array is reached with K>=0
//     So output is YES

// Input :  n=6 , k=3;
//          arr[]={ 1, 2, 10, 4, 6, 8};
// Output : No

// Smallest Pair Sum in an array
// Given an array of distinct integers arr[], the task is to find a pair which has the minimum sum and print the sum.

// Examples:

// Input: arr[] = {1, 2, 3}
// Output: 3
// The pair (1, 2) will have the minimum sum pair i.e. 1 + 2 = 3

// Input: arr[] = {3, 5, 6, 2}
// Output: 5