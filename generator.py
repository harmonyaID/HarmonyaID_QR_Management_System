import click
from .resources.python.main import generate

@click.command()

@click.argument('content')
@click.argument('name')

@click.option('--style', '-s')
@click.option('--image', '-i')

def main(content, name, style, image):
    generate(content, name, style, image)

if __name__ == "__main__":
    main()