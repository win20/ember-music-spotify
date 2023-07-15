rm -r deployment-package.zip
cd  venv/lib/python3.11/site-packages
zip -r ../../../../deployment-package.zip .
cd ../../../..
zip deployment-package.zip getLyricsFromUrl.py
