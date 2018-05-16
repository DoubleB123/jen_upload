import sys
import os

def main(fileName):
    fileDir = os.path.dirname(os.path.realpath('__file__'))
    fullPath = os.path.join(fileDir, 'uploads/' + fileName)

    with open(fullPath, 'r') as file:
        firstLine  = file.readline()
        return firstLine

if __name__ == "__main__":
    data = sys.argv[1]
    output = main(data)
    print(output)
