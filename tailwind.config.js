/** @type {import('tailwindcss').Config} */
module.exports = {
  //...
  darkMode: 'class',
  // add daisyUI plugin
 
  // daisyUI config (optional)
  daisyui: {
    styled: true,
    themes: false,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "light",
  },
}