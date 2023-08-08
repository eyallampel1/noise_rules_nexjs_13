#!/bin/bash

prev_line=""


while read -r line; do

  if [[ ! $line =~ ^$prev_line/ ]]; then
    echo "$prev_line"
  fi

  prev_line="$line"

done < out.txt | tail -n +2 > output.txt

echo "$prev_line" >> output.txt
