#!/bin/bash

. ./venv/bin/activate

aws s3 sync --exclude 'venv/*' --exclude '.DS_Store' --exclude '*/.DS_Store' --exclude 'upload.sh' --exclude '.gitignore' --exclude '.git/*' . s3://yinjunphua.com