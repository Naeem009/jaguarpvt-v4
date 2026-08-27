export const THEME_STORAGE_KEY = "jaguar-theme";

export type Theme = "light" | "dark";

/** Apply the viewer's system color scheme before paint. Ignores any saved manual override. */
export const themeInitScript = `(function(){
  try {
    localStorage.removeItem("${THEME_STORAGE_KEY}");
    var dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var root = document.documentElement;
    root.classList.toggle("dark", dark);
    root.classList.toggle("light", !dark);
    root.style.colorScheme = dark ? "dark" : "light";
  } catch (e) {}
})();`;
