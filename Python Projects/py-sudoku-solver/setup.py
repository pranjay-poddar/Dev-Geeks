import setuptools

with open('README.md', 'r') as fh:
    long_description = fh.read()

setuptools.setup(
    name='py-sudoku',
    version='1.0.3',
    author='Jeff Sieu',
    author_email='jeffsieu@gmail.com',
    description='A Python Sudoku solver',
    long_description=long_description,
    long_description_content_type='text/markdown',
    url='https://github.com/jeffsieu/py-sudoku',
    keywords=['SUDOKU'],
    packages=['sudoku'],
    classifiers=[
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 3',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
    ],
    python_requires='>=2.7',
)
