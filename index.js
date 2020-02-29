'use strict'

const { PuppeteerExtraPlugin } = require('puppeteer-extra-plugin')

/**
 * Dispatch already registered actions (via devToolsOptions actioncreators) during E2E tests
 *
 *
 * @example
 * const browser = await puppeteer.launch({
 *   headless: false
 * });
 *
 * const page = await browser.newPage();
 * await (page as any).connectToStore();
 * await page.dispatch('actionname', 'param1', 'paramN')
 */
class Plugin extends PuppeteerExtraPlugin {
  constructor(opts = {}) {
    super(opts);
    this.connected = false;
  }

  get name() {
    return 'aurelia-store';
  }

  async dispatch(action, ...params) {
    if (typeof action !== "string" && typeof action !== "function") {
      throw new Error("The provided action has to be either a function or string");
    }

    await this.evaluate((action, params) => {
      window.storeCallback({
        payload: {
          args: [{}, ...params],
          name: typeof action === "function" ? action.name : action,
        },
        type: "ACTION",
      })
    }, action, params);
  }

  async connectToStore() {
    if (this.connected) {
      throw new Error("Already connected to Aurelia Store");
    }

    await this.evaluateOnNewDocument(() => {
      window.devToolsExtension = true;
      window.__REDUX_DEVTOOLS_EXTENSION__ = {
        connect: () => ({
          init: () => { /**/ },
          send: () => { /**/ },
          subscribe: (cb) => {
            window.storeCallback = cb;
          }
        }),
      };
    });

    this.connected = true;
  }

  async onPageCreated(page) {
    page.dispatch = this.dispatch.bind(page);
    page.connectToStore = this.connectToStore.bind(page);
  }
}

module.exports = function (pluginConfig) {
  return new Plugin(pluginConfig)
}
