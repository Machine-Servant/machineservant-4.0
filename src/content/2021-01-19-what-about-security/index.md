---
date: '2021-01-19'
title: 'What About Security?'
author: 'Evan Stern'
featuredImage: ./featured.jpg
tags: ['Security', 'GatsbyJS', 'Tech']
keywords: ['security', 'web security', 'best practices']
published: true
---

One of the most frequently asked questions I get is "How can I ensure my website (or application) is secure?" And, boy, do I wish that was a question with an easy answer.

In this post I'll do my best to explain some of the nuances of web security and offer some recommendations from personal experience.

![Laptop, Book, and Phone in Chains](./laptop-book-phone-in-chains.jpg)

# It boils down to complexity

Essentially, things get harder the bigger and more complicated your website or web application gets. For a simple website with minimal moving parts, no back-end or database, and statically generated content, taking some very basic steps can keep you fairly well secure. For more complicated applications that require user interaction, produce dynamic content, or need to take laws and regulations into account security can become exponentially more difficult.

To make things a bit easier to talk about, let's break projects down into two separate catagories: **static** and **dynamic**.

## Static Websites

Static websites have essentially no moving parts. They written in, or generated into, pure HTML and CSS with some JavaScript sprinkled in for good measure. There are no privately hosted databases or back-end processes running, and any dynamic data is loaded from 3rd party API endpoints that are secured by their owners.

This website is an example of a static website. It is created using a static site generator (GatsbyJS) and things like form handling, scheduling meetings, and the comments section below are all 3rd party integrations who's security I do not have to worry about because I trust that the owners of those services are themselves secure.

Most of the business landing pages, and small websites I work on fall into this category.

Now, just because things are simple doesn't mean that there isn't any work to do to ensure security. There is still one major security feature that all websites (and web applications) need to implement:

### HTTPS

Have you ever seen a website URL that starts with `https://`, or maybe you've seen that little padlock icon next to the URL bar? Those are clues indicating that the site at that address secured using an encryption protocol. In order to set up a secure website using the HTTPS scheme the owner of the domain must essentially prove that they are who they say they. This means that when you see that icon you can be relatively sure that you aren't being spoofed by some bad actor pretending to be someone else.

Additionally, communication between yourself and the sever hosting the website can be considered secure because that communication will be encrypted.

## Dynamic Websites

A dynamic website or web application expects to gather information from the user in order to generate content. Generally these are more complicated projects and require database back-ends, network storage, user identity management, and any number of other features that all need special attention where security is concerned.

This is where things get super complicated. Books, lectures, and entire courses are dedicated to the art of web security.

I have had experience creating applications in the medical, financial, and data privacy industries. Each of these projects require special attention to their own specific needs (HIPPA/GDPR compliance, tenant based database encryption, credit card storage, and so on). Identifying possible security vulnerabilities and implementing the appropriate solution is a major challenge for any website with a significant level of complexity.

![Happy Man Sitting with His Laptop](./good-news.jpg)

# The Good News

Sounds like a lot, right? It is!

But there's good news too. Most of the kinds of issues one will expect with a dynamic web application are well known and documented. I tend to use a [checklist](https://github.com/0xRadi/OWASP-Web-Checklist) to cover the major points. Not every item in the checklist is applicable to every project and not every security measure is accounted for but it is a good staring place.

# Conclusion

Depending on your needs, your security vulnerabilities will grow or shrink.

At MachineServant we have a ton of experience working on projects of all levels of complexity. Security is a top priority for us. Throughout the development process you can expect to be notified about security features being implemented and there will be an ongoing discussion regarding new security measures that may be needed as features are delivered.

Good web security isn't easy, or simple, but it **is** achievable.
