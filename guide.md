---
notPost: true
hideHeader: true
hideFooter: true
---
```md
To whoever uses this blog.
==========================

This is a heavily customized blog based on vuepress and vuepress-plugin-blog.

Setup
-----
Run the following script.

  git clone https://github.com/re-xyr/blog.git
  cd blog
  npm install

Create a new post
-----------------
Posts are all markdown files created under directory `posts/` with a fixed
filename format. I've made a script for this.

  npm run new <post-identifier> "Your Post Title"

You can put any markdown and HTML in posts.

LaTeX
-----
I use plain regex matching and KaTeX for LaTeX rendering.

- Inline Math:
    Left parenthesis, Dollar sign, Your LaTeX code, Right Parenthesis.
- Display Math:
    Left parenthesis, Left parenthesis, Dollar sign, Your LaTeX code, Right
    parenthesis, Right Parenthesis.

Custom components
-----------------
Create vue components under `.vuepress/components/`. Do whatever you want.
You can directly refer to them in posts.
I already created a custom component `<Unfinished/>` to add to the end of a
post, to indicate that the post is not yet finished.

Resources
---------
Put all your static resources in `.vuepress/public/<any-file>`. Then refer to
them in posts by `/<any-file>`.

Frontmatter
-----------
This is the basic frontmatter structure.

  ---
  title: Your Post's Title                   # Your post's title
  date: Fri Jul 31 2020 21:29:40 GMT+0800    # creation date
  category:                                  # Categories, at least one
    - A                                   
    - B
    - C
  # Things below this line are OPTIONAL
  hidden: true     # this post will not be shown in the posts list if true
  hideHeader: true # global header (incl. title and navbar) hidden if true
  hideFooter: true # global footer (incl. copyright & permalink) hidden if true
  ---

Run locally with hot reload
---------------------------
Run the following script.

  npm run dev

Vuepress's hot reload has some known problems:

- Will not respond to new files;
- Will not respond to frontmatter changes.

Build to static files
---------------------
Run the following script.

  npm run build

The generated files will be in `.vuepress/dist`.

Automatic Deploy
----------------
You can configure the deploy script `.github/workflows/deploy.yml` by changing
the user email on line 25, the username on line 26, the commit message on line
28 and the (MOST IMPORTANT) repository URL on line 29.
Remember to fill your GitHub Token into the secret field `GH_TOKEN`.

Pagination
---------
The default pagination is 10 posts per page. Configure this by changing the
`lengthPerPage` field in `.vuepress/config.js`.

Styling
-------
Add global styles in `.vuepress/theme/index.styl`. You can directly write CSS.

Individual pages
----------------
Theoretically, you can create individual pages (which are not posts) everywhere,
but I recommend only creating them on the top level. Individual pages will NOT
be shown on the post list.
The "about" link on the navbar and the "copyright" link on the footer both link
to the individual page `about.md`.

Custom domain
-------------
Edit the `CNAME` file to make your github page running on your custom domain.

Permalink
---------
Permalink is in the footer. The domain is hardcoded, so you'll have to change it
manually.

Other site metadata
-------------------
You can find them and edit them in `.vuepress/config.js`.

By the way
----------
I've created a very threatening 404 page.

Further customization
---------------------
Do whatever you want.
```