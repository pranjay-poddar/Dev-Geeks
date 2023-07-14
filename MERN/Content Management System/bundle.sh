mkdir -p .bundle

cd .bundle
cp -a ../controllers/ controllers
cp -a ../definitions/ definitions
cp -a ../modules/ modules
cp -a ../plugins/ plugins
cp -a ../public/ public
cp -a ../resources/ resources
cp -a ../views/ views

echo "ZXhwb3J0cy5pbnN0YWxsID0gZnVuY3Rpb24oKSB7CglST1VURSgnLyonLCBmdW5jdGlvbigpIHsKCQl0aGlzLkNNU3BhZ2UoKTsKCX0pOwp9Owo=" | base64 --decode > controllers/cms-default.js

# cd definitions
# for f in *.js; do mv "$f" "`echo cms-$f`"; done

# cd ../schemas
# for f in *.js; do mv "$f" "`echo cms-$f`"; done

# cd ..
total4 --bundle cms.bundle
cp cms.bundle ../cms.bundle

cd ..
rm -rf .bundle
echo "DONE"