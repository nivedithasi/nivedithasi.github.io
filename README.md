# small nook of the internet

## Visit tracking

The site includes a tiny GoatCounter hook in `assets/scripts/visit-tracker.js`.
It is enabled for hosted HTTP(S) pages and skips local development, `file:`
previews, Do Not Track, and Global Privacy Control. To change the destination,
set `goatCounterSiteCode` to your GoatCounter site code, for example:

```js
const goatCounterSiteCode = 'nivedithasi';
```

You can also paste a full GoatCounter endpoint instead:

```js
const goatCounterSiteCode = 'https://nivedithasi.goatcounter.com/count';
```

Leave `goatCounterSiteCode` empty to disable visit tracking.
