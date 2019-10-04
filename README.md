<h1>
    <img width="35" valign="bottom" src="https://angular-checklist.io/assets/angular-checklist.svg">
    INote Application
</h1>

This repo contains the code for [angular-checklist.io](https://angular-checklist.io).

---

# 🤔 What is it?

INote is a curated list of items that we believe every application should follow. Over the past couple of years, we have been doing a lot of code reviews and have often seen the same mistakes being made again and again.

That's when we decided to create **INote**.

It's a curated list of best practices to avoid some common pitfalls.

Therefore, we transformed a bunch of best practices and common mistakes into _todo_ items.

The idea is that for all your projects, you can go over the checklist and see which items your projects already comply with and which you still have to put in some more effort!

To keep track of your progress, every group has a progress indicator which tells you how many items you have already checked. If the pie chart has been completely filled, congratulations 🎉 ... your project will definitely be on track to success 🏆!

# 👷 Build image docker
```js
docker build -t check-list-apps .

docker run -itd -v ${your_path}/deploy/:/etc/nginx/conf.d/ 
  -p 8888:80 -p 443:443  -u root check-list-apps

cp ${path}/nginx.conf ${path}/default.conf

docker exec -it \
    $(docker ps --filter ancestor=check-list-apps:0.0.1 --format {{.ID}}) \
    /bin/sh -c "nginx -t && nginx -s reload"
```

# Integration with S3

Open file src/app/lib/s3Config.ts - Setting S3 Configuration
```js
export const S3Config = {
  region: 'region',
  bucket : 'check-list-app',
  access_key: 'accessKey',
  secret_key: 'secretKey',
};
```

# 👨‍💻 Who is behind this project?
The core application was written by [Dominic Elm](https://twitter.com/elmd_) and [Kwinten Pisman](https://twitter.com/KwintenP).

This project is brought to you with ❤️ by [Hai Thai](https://twitter.com/Leak_Memories)

[Skype Info](thaihoanghai.it) & [Email](thaihoanghai.it@gmail.com)


# 👷 Want to contribute?

If you want to add a checklist item, file a bug, contribute some code, or improve our documentation, read up on our [contributing guidelines](CONTRIBUTING.md) and [code of conduct](CODE_OF_CONDUCT.md), and check out [open issues](/issues) as well as [open pull requests](/pulls) to avoid potential conflicts.

# 📄 Licence

MIT License


