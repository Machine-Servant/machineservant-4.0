---
date: '2019-09-23'
title: 'Publishing Posts with Remark'
author: 'Evan Stern'
featuredImage: ./featured.jpg
tags:
  ['MachineServant', 'Web Development', 'GatsbyJS', 'Remark', 'React', 'Tech']
keywords: ['GatsbyJS', 'RemarkJS', 'Blog', 'Post', 'Publish', 'Draft']
published: true
---

At the time of writing this post, MachineServant uses
[Remark](https://www.gatsbyjs.org/packages/gatsby-transformer-remark/) for
blog posts. It's super simple to use and keeps the blog posts directly inline
with the code for the web site. All my posts are written in "markdown"and
translated via Remark. For me, as a developer, this is very convenient
although I would assume that if I were to develop a web site for a
non-technical customer I would most likely be looking at using a CMS.

Remark uses markdown "front matter" to add meta data about your posts. Here
is a quick look at the front matter from a typical post on MachineServant.

```markdown
---
date: '2019-09-17'
title: 'Publishing Posts with Remark'
featuredImage: ./gatsby.png
tags: ['MachineServant', 'Web Development', 'GatsbyJS', 'Remark']
---
```

As you can see, this is the front matter for this post! Notice that the tags
listed above show up at the bottom of the page and the image noted is
displayed at the top. The title and date are also displayed.

Using Remark, this front matter can be queried via GraphQL. Here's the query
I use to pull back all the blog posts that are shown on the main [blog
page](/blog):

```typescript
export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          excerpt(pruneLength: 160)
        }
      }
    }
  }
`;
```

This pulls back all the information I need in order to display a list of all
my blog posts. You can see I'm specifically pulling back information about
the front matter in the "frontmatter" section of the query.

# Filtering published posts

Sometimes it's useful to have a post you're working on not be displayed in
the blog post list because it is still a draft. Well, it's pretty easy to add
that functionality by using the front matter!

First, we add a new "published" attribute to our front matter:

```markdown
---
date: '2019-09-17'
title: 'Publishing Posts with Remark'
featuredImage: ./gatsby.png
tags: ['MachineServant', 'Web Development', 'GatsbyJS', 'Remark']
published: false
---
```

**Now we must restart gatsby develop**

We must make sure to restart gatsby so that the new front matter is picked up.

After we have added the new front matter and restarted gatsby it's a pretty
simple matter to add a filter to our query to filter out any blog posts that
are not published yet:

```typescript
export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { published: { eq: true } } }
      limit: 2000
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          excerpt(pruneLength: 160)
        }
      }
    }
  }
`;
```

The new `filter` line in the `allMarkdownRemark` section does the magic. Now
the query only returns posts that have been marked as published!

And that's it! We now have a blog list that only shows published blog posts.
When we are ready to let people see our new post we can simply flip the
`published` front matter to `true` and it magically shows up.

Thanks for reading!
