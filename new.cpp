def solution(M, R, D):
    # Maximum items we can have = Initial items (M) + One purchase per day (D)
    max_possible_items = M + D
    
    # Case 1: If required sales (R) is more than max possible items
    if R > max_possible_items:
        return "NO"
    
    # Case 2: If we have enough initial items to meet the requirement
    if M >= R:
        return "YES"
    
    # Case 3: Check if we can reach R items with daily purchases
    items_needed_to_buy = R - M  # How many more items we need
    if D >= items_needed_to_buy:  # Do we have enough days to buy them?
        return "YES"
        
    return "NO"

# Input reading
M = int(input())  # Store capacity
R = int(input())  # Required units to sell
D = int(input())  # Days limit

# Get and print result
out = solution(M, R, D)
print(out)
