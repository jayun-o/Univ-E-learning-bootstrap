a = [1,2,3,4,5,6,7,8,9]
cow = 4
result = []

for i in range(cow):
    for row in range(i):
        result.append(row)
print(result)