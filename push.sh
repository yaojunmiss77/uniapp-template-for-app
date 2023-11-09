#!/usr/bin/env bash

# set -ex

branch=$(git symbolic-ref --short -q HEAD)

if [[ ! -n "$1" ]]; then
    echo "You have not input a branch, use the current branch:" $branch
else
    branch=$1
fi

echo "push branch: $branch"

git push origin HEAD:refs/for/$branch

exit 0
