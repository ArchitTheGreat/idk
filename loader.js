(async () => {
  const base = "https://cdn.jsdelivr.net/gh/ArchitTheGreat/screenshot-to-site-sculpt@main/dist/";

  // Load CSS first
  const cssList = await fetch(base)
    .then(r => r.text())
    .then(html => {
      // crude parse: find all .css files from the index listing
      return Array.from(html.matchAll(/href="([^"]+\.css)"/g)).map(m => m[1]);
    });

  cssList.forEach(file => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = base + file;
    document.head.appendChild(link);
  });

  // Load JS (Vite usually outputs 1 main file + chunks)
  const jsList = await fetch(base)
    .then(r => r.text())
    .then(html => {
      return Array.from(html.matchAll(/src="([^"]+\.js)"/g)).map(m => m[1]);
    });

  for (const file of jsList) {
    await import(base + file);
  }
})();
