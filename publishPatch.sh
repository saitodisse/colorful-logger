#!/usr/bin/env bash

while true; do
    read -p "Do you want to publish a patch? [y/n]: " yn
    case $yn in
        [Yy]* ) npm version patch; break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done

while true; do
    read -p "please, update version on bower.json. Did you do it? [y/n]: " yn
    case $yn in
        [Yy]* ) git add .; git commit -m'bower updating version'; git push; sudo npm publish .; break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done
