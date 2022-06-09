// Find pair with greatest product in array
// Given an array of n elements, the task is to find the greatest number such that it is product of two elements of given array. If no such element exists, print -1. Elements are within the range of 1 to 10^5.

// Examples :

// Input :  arr[] = {10, 3, 5, 30, 35}
// Output:  30
// Explanation: 30 is the product of 10 and 3.

// Input :  arr[] = {2, 5, 7, 8}
// Output:  -1
// Explanation: Since, no such element exists.

// Input :  arr[] = {10, 2, 4, 30, 35}
// Output:  -1

// Input :  arr[] = {10, 2, 2, 4, 30, 35}
// Output:  4

// Input  : arr[] = {17, 2, 1, 35, 30}
// Output : 35


# Python3 program to find the largest product number 
from math import sqrt 
  
# Function to find greatest number 
def findGreatest(arr, n): 
  
    # Store occurrences of all elements in hash 
    # array 
    m = dict() 
  
    for i in arr: 
        m[i] = m.get(i, 0) + 1
  
    # Sort the array and traverse all elements from 
    # end. 
    arr=sorted(arr) 
  
    for i in range(n - 1, 0, -1): 
          
        # For every element, check if there is another 
        # element which divides it. 
        j = 0
        while(j < i and arr[j] <= sqrt(arr[i])): 
  
            if (arr[i] % arr[j] == 0): 
  
                result = arr[i]//arr[j] 
  
                # Check if the result value exists in array 
                # or not if yes the return arr[i] 
                if (result != arr[j] and (result in m.keys() )and m[result] > 0): 
                    return arr[i] 
  
                # To handle the case like arr[i] = 4 and 
                # arr[j] = 2 
                elif (result == arr[j] and (result in m.keys()) and m[result] > 1): 
                    return arr[i] 
  
            j += 1
  
  
    return -1
  
# Drivers code 
arr= [17, 2, 1, 15, 30] 
n = len(arr) 
print(findGreatest(arr, n)) 
  
# This code is contributed by mohit kumar 