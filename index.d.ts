import "puppeteer";

declare module "puppeteer" {
  export interface Page {
    /**
     * Connects to the sites Aurelia Store Redux DevTools protocol
     * @throws Error if already connected
     */
    connectToStore(): Promise<void>;
    /**
     * Dispatches an registered action (via actionCreators).
     * The current state should not be passed as argument
     *
     * @param {string | Function} action
     * @param {...any} params
     * @throws if the provided action hasn't been registered via actionCreators
     */
    dispatch(action: string | Function, ...params: any[]): Promise<void>;
  }
}

/**
 * Dispatch already registered actions (via devToolsOptions actioncreators) during E2E tests
 *
 *
 * @example
 * import puppeteer from "puppeteer-extra";
 * import storePlugin from "puppeteer-extra-plugin-aurelia-store";
 *
 * puppeteer.use(storePlugin());
 *
 * const browser = await puppeteer.launch({
 *   headless: false
 * });
 *
 * const page = await browser.newPage();
 * await (page as any).connectToStore();
 * await page.dispatch('actionname', 'param1', 'paramN')
 */
export default function puppeteer_extra_plugin_aurelia_store(pluginConfig?: any): any;
