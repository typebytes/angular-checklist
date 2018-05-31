---
title: Big lists are normalised
---
# Big lists are normalised

The easiest way to store data into the store is through arrays. When you perform a backend call, you probably get an array back as a result anyway and you can just add this to the store. 
The big downside to this approach is that, if you want to for example remove an element from the array, you first have to find the element before you can remove it. This means that the big O notation of finding an element like that is O(n). While for smaller lists, this might not be a problem, but as list get bigger and bigger and the number of interactions on this list 