# 🚨 DEPRECATED 🚨

This functionality has been added to [mailing](https://github.com/sofn-xyz/mailing) via the `mailing server` commands. The REST api is available from `mailing` as well.

Leaving this up in case it's a useful example for adding APIs not provided by mailing though. ✌️



# mailing-serverless-api

This is a little proof of concept API for compiling react email templates built with [mailing](https://github.com/successor-software/mailing).

Here's an example API call:
[https://mailing-serverless-api.vercel.app/api/render?templateName=Welcome.tsx&props=%7B%22name%22%3A%22peter%22%7D](https://mailing-serverless-api.vercel.app/api/render?templateName=Welcome.tsx&props=%7B%22name%22%3A%22peter%22%7D)

`templateName` is the name of the template

`props` is a url encoded, stringified JSON object like `encodeURIComponent(JSON.stringify({ name:"peter" }))`


To run locally:

```
yarn
npx vercel dev
```

To deploy:
```
npx vercel deploy
```
