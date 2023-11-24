def incr(a):
    return a + 1


nums = [1, 2, 3, 4, 5]
print(list(map(incr, nums)))
print(list(map(lambda n: 1 + n, nums)))
# ----------------------------------------

print(list(map(lambda x, y: max(x, y), [10, 2, 3], [2, 3, 40])))


# ----------------------------------------

def is_prime(n):
    flag = False
    for i in range(2, n - 1):
        if n % i == 0: flag = True
    return not flag


(print(all(list(map(lambda x: is_prime(x), [3, 5, 7, 11, 17])))))

# ----------------------------------------


def is_atom(s):
    if isinstance(s, (int, float, bool)):
        return 1
    else:
        return 0


def atoms_amount(s):
    return sum(map(is_atom, s))


print(atoms_amount([1, 2, 3, 4, 5, "hyff"]))

# ----------------------------------------


def atoms_amount(s):
    return sum(map(lambda x: 1 if isinstance(x, (int, float, bool)) else 0, s))


print(atoms_amount([1, 2, 3, 4, 5, "hyff"]))

# ----------------------------------------


def Fibbomachi_sequence(a, b):
    while True:
        yield a
        b, a = a, a + b


a = Fibbomachi_sequence(0, 1)
for i in range(1, 10):
    print(next(a))
# ----------------------------------------


def geom_progr(b1, q):
    return lambda n: [b1 * q ** i for i in range(n)][-1]


geom = geom_progr(1, 2)
print(geom(7))

