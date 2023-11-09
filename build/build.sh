rm -rf dist/build
npx uni build -p app
appid=$(< src/manifest.json grep -vE "\/\*|^\s+\/\/" | jq -r .appid)
if [ -d dist/build/app ]; then
    cd dist/build || exit
    rm -rf "$appid".*
    mv app "$appid"
    cd "$appid" || exit
    zip -r "$appid".zip ./
    mv "$appid".zip ../"$appid".wgt
    cd ..
    zip  "$appid".wgt.zip "$appid".wgt
    cp -f "$appid".wgt.zip ~/Downloads/
fi
