---
date: '2020-11-16'
title: 'PurgeCSS, Tailwind, Gatsby, and Dependencies'
author: 'Evan Stern'
featuredImage: ./featured.jpg
tags:
  [
    'bit',
    'Web Development',
    'Library',
    'GatsbyJS',
    '3rd Party',
    'PurgeCSS',
    'Tailwind',
    'Tech',
  ]
keywords:
  [
    'Tailwind',
    'TailwindCSS',
    'Gatsby',
    'PurgeCSS',
    'GatsbyJS',
    'CSS',
    'machineservant',
    'node_modules',
    'dependencies',
  ]
published: true
---

This is a very specific use case, I'm aware, but what happens when you
combine have a project that uses _TailwindCSS_, _Gatsby_, and _PurgeCSS_ and
then combine that with a 3rd party dependency that is also written using
_Tailwind_ classes?

The answer: strange stuff happens.

# The Setup

Let's say you have a _Gatsby_ project that is set up to use _TailwindCSS_. I
won't go into detail about how you'd set such a project up as you can find
articles about that easily. You'll most likely want to purge any unused CSS
from _Tailwind_ at build time. There are two common ways of doing this.

## Using Tailwind to purge the CSS files

Probably the easiest way to purge your CSS files is to use _Tailwind_'s built
in `purge` flag. This can be done by editing your `tailwind.config.js` file
and simply adding something like this:

```javascript
// tailwind.config.js

module.exports = {
  purge: ['./src/**/*.tsx'],
};
```

The above code snippet will cover purging your CSS in any of the matched files.

_(By the way, in Tailwind 2.0 the above strategy will be replaced by something
called "purge layers". You can read about it
[here](https://tailwindcss.com/docs/upcoming-changes#purge-layers-by-default))_

## Using PurgeCSS

The built in _Tailwind_ setup works pretty well for most use cases but
doesn't allow for any customization for things like custom prefixes or
ignoring patterns.

If you need more than what the out of the box solution offers, you'll be
going with _PurgeCSS_.

There are a number of ways to do this but my preference is to use
[gatsby-plugin-purgecss](https://www.gatsbyjs.com/plugins/gatsby-plugin-purgecss/).
You can set that up like so:

```javascript
// gatsby-config.js

module.exports = {
  // ...
  plugins: [
    // ...
    // highlight-start
    {
      resolve: 'gatsby-plugin-purgecss',
      options: {
        tailwind: true,
      },
    },
    // highlight-end
  ],
};
```

# Adding a Dependency That Uses Tailwind

Now that we're purging our CSS, what happens if we throw a monkey wrench into
the mix and import a dependency that uses _Tailwind_ classes to style itself?

Why would this happen? Well, I ran into this because _MachineServant_
packages up common components and exports them to `bit.dev` for consumption
by other projects we manage. Since _Tailwind_ is commonly used in all our
projects it was easy to style things using _Tailwind_ classes. As long as
there is a stylesheet around that can resolve those class names, everything
works just fine.

## The Dependency

Let's assume that we are going to import a very simple dependency defined as
such:

```typescript
// @mycomponents/button.tsx
import React from 'react';

type ButtonProps = {
  label: string;
};

export const Button: React.FC = ({ label }) => (
  <button className="hidden rounded-lg bg-blue-800 py-2 px-4 text-white sm:block">
    {label}
  </button>
);
```

Notice that we are using the classes `css+>hidden sm:block`. This should hide
the button by default (in mobile, for example) and then show it for any
screen size `sm` or larger.

We import it into our project somewhere and then use it:

```typescript
// App.tsx
import React from 'react';
import { Button } from '@mycomponents/button.tsx'; // highlight-line

export const App: React.FC = () => (
  <main>
    <Button label="My Button" />
  </main>
);
```

# So, What Happens?

What happens depends on whether or not you build the project.

## In Development

In development mode, this works just fine. We have a button, it shows up for
any screen size `sm` or larger and it is hidden otherwise. Everything looks
and works just like you'd expect.

## In Production

In a production build, however, the button is just simply not visible no
matter what the screen size is.

## What Is Happening?

Basically, what's happening is that _PurgeCSS_ is purging the `css+>sm:block`
selector when it runs during a production build. This means that all that is
ever computed is the `css+>hidden` class.

Why does this happen? Because _PurgeCSS_ doesn't know about your dependencies
and it isn't looking at them as source files when determining what should or
shouldn't be purged.

## How Do We Fix It?

It took some digging into the `gatsby-plugin-purgecss` documentation to
figure it out but you can solve this by telling the plugin what content you
want to include in the purge calculations.

In our example, we have a dependency named `@mycomponents/button`, so we need
to tell _PurgeCSS_ about it.

You can do that by extending the default `content` option in the
`gatsby-plugin-purgecss` definition in the `gatsby-config.js` file like so:

```javascript
// gatsby-config.js

module.exports = {
  // ...
  plugins: [
    // ...
    {
      resolve: 'gatsby-plugin-purgecss',
      options: {
        tailwind: true,
        // highlight-start
        content: [
          // This is the default configuration, make sure to include it
          path.join(process.cwd(), 'src/**/!(*.d).{ts,js,jsx,tsx}'),

          // This is the dependency
          path.join(
            process.cwd(),
            'node_modules/@mycomponents/button/**/!(*.d).{ts,js,jsx,tsx}'
          ),
        ],
        // highlight-end
      },
    },
  ],
};
```

Essentially, just add a path to the `content` option list that points to the
component that needs to be scanned when _PurgeCSS_ does its thing.

Obviously, the string you add to `content` can be any glob pattern you like.
This is a very specific example but you could create more inclusive glob
patterns to grab more in one definition if you'd like.

# Conclusion

I'm relatively certain that there are other ways to make this work than what
I just outlined. But, I did a lot of searching and didn't see any other
solutions. Hopefully, this will help someone out who gets stuck on this like
I did.
