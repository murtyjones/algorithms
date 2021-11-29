## Formula

x = left * 10^n/2 + right
y = left * 10^n/2 + right

a = xleft * yleft
d = xright * yright
e = (xleft + xright) * (yleft + yright) - a - d

then xy = a * 10^n + e * 10^(n/2) + d

## Example

Input: `1234` * `4321`
Expected output: `5,332,114`

### recursion=0

a = 12 * 43
b = 34 * 21
e = (12 + 34) * (43 + 21) - a - d
  = 46 * 64 - a - d

### recursion=1

#### a = 12 * 43

n = length of 12 or 43 = 2

a = 1 * 4 = 4
d = 2 * 3 = 6
e = (1 + 2) * (4 + 3) - a - d
  = 11

**Subproblem answer** = 4 * 10^n + 11 * 10^n/2 + 6
		      = 516

#### d = 34 * 21

n = length of 34 or 21 = 2

a = 3 * 2 = 6
d = 4 * 1 = 4
e = (3 + 4) * (2 + 1) - a - d
  = 11

**Subproblem answer** = 6 * 10^n + 11 * 10^n/2 + 4
		      = 714

#### e = 46 * 64 - a - d

n = length of 46 or 64 = 2

a = 4 * 6 = 24
d = 6 * 4 = 24
e = (4 + 6) * (6 + 4) - a - d
  = 52

**Subproblem answer** = 24 * 10^n + 52 * 10^n/2 + 24 - a - d
                      = 1,714
(Note to self: we subtract a and d "twice" here because this subproblem is solving for `e`)

...back to the top level

n = length of 1234 or 4321 = 4

a = 516
d = 714 
e = 1714

**Final answer** = 516 * 10^n + 1714 * 10^n/2 + 714
		 = 516 * 10^4 + 1714 * 10^(4/2) + 714
		 = 5,332,114


Implementation: https://jsbin.com/cakajoroto/edit?js,console
