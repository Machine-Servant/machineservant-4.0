---
date: '2020-10-08'
title: 'GatsbyJS and weatherwidget.io'
author: 'Evan Stern'
featuredImage: ./featured.jpg
tags:
  [
    'MachineServant',
    'Web Development',
    'GatsbyJS',
    '3rd Party',
    'React',
    'Tech',
  ]
keywords:
  ['Gatsby', 'GatsbyJS', 'weatherwidget', 'Weather Widget', 'weatherwidget.io']
published: true
---

Embedded assets can be a pain sometimes. A lot of the time, the embed code
you are given just doesn't work out of the box. This is doubly true with
Gatsby because its server side rendering can cause hiccups with embedded
code fragments. Also, you sometimes run into situations where the embed code
contains javascript that doesn't work correctly.

I ran into just such a situation recently while working on a client's web
site. The client wanted to embed a weather tool on some of the pages and my
searching led me to [weatherwidget.io](https://weatherwidget.io). It is
extremely customizable, very easy to set up, and comes with a simple embed
code block you can add to your site.

Here's an example of the kind of code block weatherwidget.io will produce for
you:

```javascript
<a class="weatherwidget-io" href="https://forecast7.com/en/40d71n74d01/new-york/" data-label_1="NEW YORK" data-label_2="WEATHER" data-theme="original" >NEW YORK WEATHER</a>
<script>
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');
</script>
```

Not very pretty but, you know, it's minimized and it works.

Unfortunately, in Gatsby that block of code **doesn't** work. Firstly,
nothing shows up. Secondly, the JavaScript refuses to be accepted.

So how do we fix this? Well, after a bit of tinkering I was able to get to
work. I'm sure there are alternate ways to do this but in my searches I found
very few recommendations and this is what I came up with.

Behold!

```typescript
import React, { useEffect } from 'react';

export const WeatherWidget: React.FC = () => {
  useEffect(() => {
    (function (d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      const js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = 'https://weatherwidget.io/js/widget.min.js';
      js.defer = true;
      fjs.parentNode && fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'weatherwidget-io-js');
  }, []);

  return (
    <a
      className="weatherwidget-io"
      href="https://forecast7.com/en/40d71n74d01/new-york/"
      data-label_1="NEW YORK"
      data-label_2="WEATHER"
      data-theme="original"
    >
      NEW YORK WEATHER
    </a>
  );
};
```

In order to get this to work I had to do a few things:

### 1. Change `class` to `className`

Obviously. This is React, after all.

### 2. Split the JavaScript out of the code block and add it to a `useEffect` hook.

One of the problems I was having was that the javascript wasn't running at
the right time. Wrapping it in the `useEffect` function ensures that the code
block is run only after everything has mounted.

### 3. Add `defer` to the script tag

I'm actually not sure if this is necessary but it does seem to work and I've
run into issues with scripts that don't load correctly because they needed to
be deferred. So, adding the line `js.defer = true` may or may not be strictly
needed but I include it here since I did it.

And that's it! weatherwidget.io does seem to work if you restructure it a
bit. I hope this was helpful to someone who, like me, couldn't find any other
information about how to get the widget to work in Gatsby.
