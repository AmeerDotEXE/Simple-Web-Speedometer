const CACHED_ASSETS = [
	"/index.html",
	"/script.js",
	"/style.css"
];

async function openAssetsCache() {
	return await caches.open("SM_Cached_Assets");
}

async function preCache() {
	const cache = await openAssetsCache();
	return cache.addAll(CACHED_ASSETS);
}

self.addEventListener("install", event => {
	event.waitUntil(preCache());
});

async function fetchCachedAssets(event) {
	try {
		const response = await fetch(event.request);
		return response;
	}
	catch {
		const cache = await openAssetsCache();
		return cache.match(event.request);
	}
}

self.addEventListener("fetch", event => {
	event.respondWith(fetchCachedAssets(event));
});
