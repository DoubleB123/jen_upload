import sys

def main(data):
    return len(data)

if __name__ == "__main__":
    data = sys.argv[1]
    output = main(data)
    print(output)
