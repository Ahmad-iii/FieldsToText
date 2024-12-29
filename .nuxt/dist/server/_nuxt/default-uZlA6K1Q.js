import { e as __nuxt_component_0 } from "../server.mjs";
import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import "ofetch";
import "#internal/nuxt/paths";
import "hookable";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "defu";
import "ufo";
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtPage = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-slate-50 to-blue-50" }, _attrs))}><header class="bg-white/70 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50 transition-all duration-300 hover:bg-white"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-center items-center h-16"><h1 class="text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 hover:scale-105 transition-transform duration-300"> SAHILXD </h1></div></div></header><main class="transition-all duration-300">`);
      _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
      _push(`</main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=default-uZlA6K1Q.js.map
