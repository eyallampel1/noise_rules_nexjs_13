#!/bin/sh

# Path to the directory where you want to create the files and the zip file
dir="uploads"

# create file.bat and file.vbs in the specified directory
touch "$dir/file.bat"
touch "$dir/file.vbs"

# Add content to file.bat
echo "echo Hello, World!" > "$dir/file.bat"

# Add content to file.vbs
echo "MsgBox \"Hello, World!\"" > "$dir/file.vbs"

# create a file with current date and time
zipFileName=$(date +"%Y_%m_%d_TIME_%H_%M_%S").zip

# Full path to the zip file
zipFilePath="$dir/$zipFileName"

# zip both files into one zip file and give that zip file a unique name with current date and time
# since file.bat and file.vbs are in the $dir directory, you need to include $dir in the zip command
zip -r -j -q "$zipFilePath" "$dir/file.bat" "$dir/file.vbs"

# output the name of the zip file
echo "$zipFileName" > zip_output.txt