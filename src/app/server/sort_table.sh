#!/bin/bash

# Check if the correct number of arguments is provided
if [ "$#" -ne 2 ]; then
  echo "Usage: $0 ruleSeverity.txt table-data.txt"
  exit 1
fi

# Extract the severity rules
severityFile="$1"
declare -A severityMap
index=0
while IFS= read -r line; do
  severityMap["$line"]=$index
  index=$((index+1))
done < "$severityFile"

# Sort the table based on the severity of in-class and out-of-class noise rules
tableFile="$2"
{
  # Print the header first
  head -n 1 "$tableFile"

  # Process the rows, skipping the header
  tail -n +2 "$tableFile" | awk -F' +' -v severity="$(declare -p severityMap)" '
    BEGIN {
      eval "declare -A severityMap=" severity
    }
    {
      print $0 " " severityMap[$2] " " severityMap[$3]
    }
  ' | sort -k4,4n -k5,5n | cut -d' ' -f1-3
} > sorted_table.txt

echo "Sorted table saved to sorted_table.txt"