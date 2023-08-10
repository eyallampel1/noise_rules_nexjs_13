import sys

def load_severities(file_path):
    with open(file_path, 'r') as file:
        rules = file.readlines()
    severities = {rule.strip(): idx for idx, rule in enumerate(rules)}
    
    # Debug output for severity file
    print("Reading Severity File:", file_path)
    print("--------------------------")
    for rule, idx in severities.items():
        print("Mapping rule {} to severity {}".format(rule, idx))
    print("--------------------------")
    
    return severities

def sort_table_data(severity_file, table_file):
    severities = load_severities(severity_file)

    with open(table_file, 'r') as file:
        lines = file.readlines()

    # Debug output for table file
    print("Reading Table File:", table_file)
    print("--------------------------")
    print(lines[0].strip())  # Printing the header
    print("--------------------------")

    # Preserve the header
    header = lines[0]
    data_lines = lines[1:]

    # Sort by "Out of Class Noise Rule" severity
    sorted_data = sorted(data_lines, key=lambda line: severities.get(line.split()[2], 999))

    # Debug output for processing rows
    for line in data_lines:
        out_class = line.split()[2]
        out_index = severities.get(out_class, "ERROR")
        print("Processing row: {}".format(line.strip()))
        print("Out-Class: {} -> Index: {}".format(out_class, out_index))
        print("--------------------------")

    # Save the sorted table
    with open('sorted_table.txt', 'w') as out_file:
        out_file.write(header)
        out_file.writelines(sorted_data)

    print("Sorted table saved to sorted_table.txt")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python sort_table.py ruleSeverity.txt table-data.txt")
        sys.exit(1)

    sort_table_data(sys.argv[1], sys.argv[2])