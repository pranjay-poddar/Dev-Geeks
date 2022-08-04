#!/usr/bin/env python3

import os
from fnmatch import fnmatch
from pylovepdf.ilovepdf import ILovePdf
from pathlib import Path
import shutil
import glob
import time
import zipfile
import re
import sys
import configparser


BASE_DIR = os.path.dirname(os.path.realpath(__file__))
ALL_PDFS_PATTERN = "*.pdf"
COMPRESSED_PDFS_PATTERN = "*compress*.pdf"
COMPRESSED_ZIP_PATTERN = "*compress*.zip"
REGEX_ADDED_COMPRESSED_FILE_NAME = "_compress_\d\d\-\d\d\-\d\d\d\d"
pdf_files = []
compressed_pdfs = []
output_errors = ""


# obtain public key from the .env file
config = configparser.ConfigParser()
config.read(BASE_DIR+'/.env')
public_key = config['ILOVEPDF_USER_INFO']['PUBLIC_KEY']

# path found as first argument
if len(sys.argv) > 1 and os.path.exists(Path(sys.argv[1]).resolve()):
    ACTION_PATH = sys.argv[1]
else:  # path not found or not defined (use the current working directory)
    ACTION_PATH = os.getcwd()

for path, subdirs, files in os.walk(ACTION_PATH):  # find all the pdfs
    for name in files:
        if fnmatch(name, ALL_PDFS_PATTERN):
            pdf_files.append(os.path.join(path, name))

ilovepdf = ILovePdf(public_key, verify_ssl=True)
task = ilovepdf.new_task('compress')

for file in pdf_files:  # upload all the pdfs
    print("Uploading: " + file)
    task.add_file(file)
    task.set_output_folder(ACTION_PATH)
    task.file.set_metas('Title', file)
task.execute()
task.download()
task.delete_current_task()

time.sleep(3)  # wait for the task to finish

# unzip the downloaded compressed pdf files
zip_file_location = glob.glob(ACTION_PATH + "/" + COMPRESSED_ZIP_PATTERN)[0]
with zipfile.ZipFile(zip_file_location, 'r') as zip_ref:
    zip_ref.extractall(ACTION_PATH)
time.sleep(3)
compressed_pdfs = glob.glob(os.path.join(ACTION_PATH, COMPRESSED_PDFS_PATTERN))

# replace the recently compressed files to their original file location
for original_file in pdf_files:
    for compressed in compressed_pdfs:
        compressed_file = re.sub(
            REGEX_ADDED_COMPRESSED_FILE_NAME, '', compressed)
        if compressed_file[compressed_file.rindex("/")::] in original_file:
            if os.path.exists(Path(original_file).resolve()) and os.path.exists(Path(compressed).resolve()):
                print("Replacing " + compressed + " to " + original_file)
                shutil.move(Path(compressed), Path(original_file))
            else:  # file couldn't be replaced
                output_errors += "\n\033[1;31;40mError:\033[0m Couldn't replace: " + \
                    compressed + " to " + original_file + '\n'

# show all errors all together
if len(output_errors) > 0:
    print(
        "\n\033[91mFILES THAT COULDN'T BE REPLACED AND THEY MANUALLY HAVE TO BE REPLACED\033[0m")
    print(output_errors)

# delete zip file
os.remove(zip_file_location)
