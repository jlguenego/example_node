Creation of the HTTPS certificate.
=====================================

```
$> cd ../https
$> ./getCA.sh
```

Then 
1. open Chrome (or Firefox) and add the `rootCA.pem` file to the *Trusted Root Certification Authority*.
2. start the server `npm start`
3. Open Chrome on 'https://localhost:8443

It should be good !!!

