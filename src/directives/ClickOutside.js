export default {
  beforeMount: (el, binding) => {
    el.clickOutsideEvent = function (event) {
      // Burada, tıklanan elementin bu element olmadığını kontrol ediyoruz
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event); // Direktifin değerini çağır
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted: (el) => {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};
