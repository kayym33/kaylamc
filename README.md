# kaylamc.uk

My portfolio, in t1ld3's style. Plain HTML, CSS and JS with no build step,
served by GitHub Pages at https://kaylamc.uk.

## Changing it

All the words are in **`content.js`**: the intro, what I'm doing now,
projects, "more" (certificates, hackathons, hobbies), skills, links and the
CV. A section with nothing in it stays hidden.

- **A project:** copy one of the entries in `projects`. Screenshots go in
  `images/` (made with pretend data, never real accounts).
- **Something under "more":** `{ title, detail, link }`.
- **LinkedIn or email:** add `["linkedin", "https://..."]` or
  `["email", "mailto:..."]` to `links`.
- **A CV:** put the PDF in this folder and set `cv: "file-name.pdf"`.

To preview: `python3 -m http.server 8000` here, then open
http://localhost:8000.

`index.html` has a Content-Security-Policy that allows its one inline
script by hash. If you change that script, update the hash:

```bash
python3 -c "import re,hashlib,base64;s=open('index.html').read();print(base64.b64encode(hashlib.sha256(re.search(r'<script>(.*?)</script>',s,re.S).group(1).encode()).digest()).decode())"
```
