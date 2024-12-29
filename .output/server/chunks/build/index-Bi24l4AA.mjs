import { ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';

const useDynamicFields = () => {
  const fields = ref([]);
  const addField = (label) => {
    const newId = Date.now();
    fields.value.push({
      id: newId,
      label,
      value: "",
      placeholder: "Enter your text here"
    });
  };
  const removeField = (id) => {
    if (fields.value.length > 0) {
      fields.value = fields.value.filter((field) => field.id !== id);
    }
  };
  return { fields, addField, removeField };
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { fields, addField, removeField } = useDynamicFields();
    const previewText = ref("");
    const downloadLink = ref(null);
    const showAddFieldModal = ref(false);
    const newFieldLabel = ref("");
    const isChasing = ref(false);
    ref(null);
    ref({ x: 0, y: 0 });
    const buttonPos = ref({ x: 100, y: 100 });
    const buttonVisible = ref(true);
    const buttonStyle = computed(() => ({
      position: "fixed",
      left: `${buttonPos.value.x}px`,
      top: `${buttonPos.value.y}px`,
      transform: "translate(-50%, -50%)",
      transition: isChasing.value ? "none" : "all 0.3s ease"
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-cyan-50 p-8 animate-fadeIn" }, _attrs))}><section class="text-center space-y-6 mb-16"><h2 class="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-500 animate-pulse"> Dynamic Text Generator </h2><p class="text-xl text-blue-600/70 max-w-2xl mx-auto"> Transform your ideas into structured content effortlessly </p></section><main class="max-w-4xl mx-auto space-y-8"><div class="backdrop-blur-sm bg-white/60 rounded-2xl p-8 shadow-lg border border-blue-100 hover:shadow-blue-100/50 transition-all duration-300"><div class="space-y-6"><!--[-->`);
      ssrRenderList(unref(fields), (field) => {
        _push(`<div class="space-y-2 p-4 rounded-xl bg-blue-50/50 hover:bg-blue-50 transition-all duration-300 group"><div class="flex justify-between items-center"><label${ssrRenderAttr("for", "field-" + field.id)} class="text-sm font-medium text-blue-700">${ssrInterpolate(field.label)}</label>`);
        if (unref(fields).length > 0) {
          _push(`<button class="opacity-0 group-hover:opacity-100 text-sm px-4 py-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-all duration-300"> Remove </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><input${ssrRenderAttr("id", "field-" + field.id)}${ssrRenderAttr("value", field.value)} type="text"${ssrRenderAttr("placeholder", field.placeholder)} class="w-full px-4 py-3 rounded-lg bg-white/80 border border-blue-100 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300"></div>`);
      });
      _push(`<!--]--><button class="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"><span class="text-xl">+</span> Add New Field </button></div></div><div class="flex gap-4"><button class="flex-1 px-6 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"> Generate Text File </button></div>`);
      if (previewText.value) {
        _push(`<div class="backdrop-blur-sm bg-white/60 rounded-2xl p-8 shadow-lg border border-blue-100 hover:shadow-blue-100/50 transition-all duration-300 space-y-4"><div class="flex justify-between items-center"><h3 class="text-lg font-medium text-blue-800">Preview</h3><div class="flex gap-4 items-center"><button class="px-4 py-1.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm">${ssrInterpolate(isChasing.value ? "Stop" : "Chase Me")}</button></div></div><div class="bg-blue-50/50 rounded-xl p-6"><pre class="text-blue-800 whitespace-pre-wrap">${ssrInterpolate(previewText.value)}</pre></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (previewText.value && buttonVisible.value) {
        _push(`<a${ssrRenderAttr("href", downloadLink.value)} download="converted.txt" class="fixed px-3 py-1.5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm shadow-md z-50 cursor-pointer select-none" style="${ssrRenderStyle(buttonStyle.value)}"> Download </a>`);
      } else {
        _push(`<!---->`);
      }
      if (showAddFieldModal.value) {
        _push(`<div class="fixed inset-0 bg-blue-900/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300"><div class="bg-white rounded-2xl p-8 shadow-2xl border border-blue-100 w-full max-w-md"><h3 class="text-xl font-medium text-blue-800 mb-6">Add New Field</h3><input${ssrRenderAttr("value", newFieldLabel.value)} type="text" placeholder="Enter field label" class="w-full px-4 py-3 rounded-lg bg-blue-50/50 border border-blue-100 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 mb-6"><div class="space-y-3"><button class="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg"> Add Field </button><button class="w-full px-4 py-3 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all duration-300"> Cancel </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Bi24l4AA.mjs.map
