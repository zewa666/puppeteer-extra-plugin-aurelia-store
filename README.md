# puppeteer-extra-plugin-aurelia-store

> A plugin for [puppeteer-extra](https://github.com/berstend/puppeteer-extra).

### Install

```bash
npm install puppeteer-extra-plugin-aurelia-store
```

### Use

```typescript
const browser = await puppeteer.launch({
  headless: false
});

const page = await browser.newPage();
await (page as any).connectToStore();
await page.dispatch('actionname', param1, paramN);
```
