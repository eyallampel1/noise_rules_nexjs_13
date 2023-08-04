#!/bin/sh
len=$#
if [ $len -lt 1 ]; then
    echo "Usage: $0 <path to constraint file>"
    exit 2
fi

awk -F';' '{print $3}' $1 >out66.txt

sed -i '/^$/d' out66.txt

awk '!a[$0]++' out66.txt>out77.txt

awk '/^Constraint class$/,/^Index$/' out77.txt>out88.txt

sed -i -n -e '2,$p' out88.txt

sed -i '$ d' out88.txt

mv out88.txt out.txt
rm out66.txt out77.txt

cat out.txt