if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,c)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>a(e,i),d={module:{uri:i},exports:t,require:r};s[i]=Promise.all(n.map((e=>d[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/140-3cf39dfc7ffaf241.js",revision:"3cf39dfc7ffaf241"},{url:"/_next/static/chunks/252f366e-531406baea09b096.js",revision:"531406baea09b096"},{url:"/_next/static/chunks/408-9fba4e9dc3b78fe3.js",revision:"9fba4e9dc3b78fe3"},{url:"/_next/static/chunks/6728d85a-874b815df412dd22.js",revision:"874b815df412dd22"},{url:"/_next/static/chunks/675-94783329a13d0d54.js",revision:"94783329a13d0d54"},{url:"/_next/static/chunks/816-bc2ae8eac5ed8427.js",revision:"bc2ae8eac5ed8427"},{url:"/_next/static/chunks/framework-2c79e2a64abdb08b.js",revision:"2c79e2a64abdb08b"},{url:"/_next/static/chunks/main-129e5da6b2161174.js",revision:"129e5da6b2161174"},{url:"/_next/static/chunks/pages/_app-591ad81682ad9eb5.js",revision:"591ad81682ad9eb5"},{url:"/_next/static/chunks/pages/_error-8353112a01355ec2.js",revision:"8353112a01355ec2"},{url:"/_next/static/chunks/pages/account-7ed822149e8add4f.js",revision:"7ed822149e8add4f"},{url:"/_next/static/chunks/pages/add-transaction-c45957c26008f7d1.js",revision:"c45957c26008f7d1"},{url:"/_next/static/chunks/pages/index-1e43c83342fb9bcb.js",revision:"1e43c83342fb9bcb"},{url:"/_next/static/chunks/pages/login-e358c31dafb110be.js",revision:"e358c31dafb110be"},{url:"/_next/static/chunks/pages/messages-cea1aa97503ea817.js",revision:"cea1aa97503ea817"},{url:"/_next/static/chunks/pages/messages/%5Bid%5D-c6e64156762591f5.js",revision:"c6e64156762591f5"},{url:"/_next/static/chunks/pages/profile-b563d7ab6dbb4ec8.js",revision:"b563d7ab6dbb4ec8"},{url:"/_next/static/chunks/pages/settings-90a447d505382771.js",revision:"90a447d505382771"},{url:"/_next/static/chunks/pages/transactions-d012d26f59a3449c.js",revision:"d012d26f59a3449c"},{url:"/_next/static/chunks/pages/transactions/%5Bid%5D-3b13c01271784b66.js",revision:"3b13c01271784b66"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-c4acd79e87956a0e.js",revision:"c4acd79e87956a0e"},{url:"/_next/static/css/91f2261a36e5f46f.css",revision:"91f2261a36e5f46f"},{url:"/_next/static/media/42555d87817a30a9.p.otf",revision:"de55ae52af85b8952e65d1b546992618"},{url:"/_next/static/media/654d5d8c13ebad60.p.otf",revision:"c82170e08b76657553ab939bd28e8515"},{url:"/_next/static/media/79ed5294bd2208db.p.otf",revision:"f4bca87fd0d19e61c27dc96299c75f8c"},{url:"/_next/static/media/8460ced3d816b784.p.otf",revision:"2556a4f74e2c523893e6928d6e300f1c"},{url:"/_next/static/media/95a97a83c412227e.p.otf",revision:"f7b5e589f88206b4bd5cb1408c5362e6"},{url:"/_next/static/p7hkNc-BL4fpjN0N4-EB-/_buildManifest.js",revision:"bab514064cfd35edcae62991f7d56ad2"},{url:"/_next/static/p7hkNc-BL4fpjN0N4-EB-/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/icons/android-launchericon-144-144.png",revision:"fa1963ed0340a152faa4bb02a1913d62"},{url:"/icons/android-launchericon-192-192.png",revision:"cdee7ddecb192359aa8fcd1b6ad17c1f"},{url:"/icons/android-launchericon-48-48.png",revision:"0c17f92a6a6deea3f6abc0653d25620d"},{url:"/icons/android-launchericon-512-512.png",revision:"b512b6b940d6048313925ce7e1562bf1"},{url:"/icons/android-launchericon-72-72.png",revision:"d4e8e4be9821a538948a15a6ecaf8f22"},{url:"/icons/android-launchericon-96-96.png",revision:"3d49fe212ddbbd7348709fa2e2f6a6fb"},{url:"/manifest.json",revision:"1f3195cc83708cd4e6e6386c3c92d50f"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/thirteen.svg",revision:"53f96b8290673ef9d2895908e69b2f92"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));