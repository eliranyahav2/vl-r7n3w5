const CACHE="videolab-v12";
const FILES=["./","./index.html","./manifest.webmanifest","./xlsx.full.min.js","./voice-01.m4a","./voice-02.m4a","./voice-03.m4a","./voice-04.m4a","./voice-05.m4a","./voice-06.m4a","./voice-07.m4a","./voice-08.m4a","./voice-09.m4a","./voice-10.m4a","./voice-11.m4a","./voice-12.m4a","./voice-13.m4a","./voice-14.m4a","./voice-15.m4a","./voice-16.m4a","./voice-17.m4a","./voice-18.m4a","./voice-19.m4a","./voice-20.m4a","./voice-21.m4a","./voice-22.m4a","./voice-23.m4a",
  "./icon-512.png","./icon-192.png","./icon-180.png","./icon-96.png","./icon-48.png"];
self.addEventListener("install",e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET") return;
  e.respondWith(
    (e.request.mode==="navigate" || /\/(index\.html)?$/.test(new URL(e.request.url).pathname)
       ? fetch(e.request.url,{cache:"no-cache"}) : fetch(e.request)).then(r=>{
      const copy=r.clone();
      caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});
      return r;
    }).catch(()=>caches.match(e.request).then(m=>m||caches.match("./index.html")))
  );
});
