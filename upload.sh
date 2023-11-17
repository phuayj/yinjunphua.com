#!/bin/bash

export PYTHON_VERSION=3.9.7
eval "$(pyenv init -)"
aws s3 sync --exclude '.DS_Store' --exclude '*/.DS_Store' --exclude 'upload.sh' --exclude '.gitignore' --exclude '.git/*' . s3://yinjunphua.com