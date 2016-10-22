# awk
```
1 2 3
A B C
```

```
$1 $2 $3	$1=1, $2=2, $3=3, $0=1 2 3
$1 $2 $3	$1=A, $2=B, $3=C, $0=A B C
```

awk -F "|" '{print $29}' hmzd.txt > hmzd_p.txt

cat hmzd_p.txt | sort | uniq > hmzd_p1.txt

简单的四则运算计算器

ANTLR
