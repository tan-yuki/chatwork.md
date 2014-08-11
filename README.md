chatwork.md
===========

This is a Chrome extension that supports your markdown style in [chatwork](http://www.chatwork.com/ja/)

- Use this extension __AT YOUR OWN RISK__

### How to use

You can use the markdown at the chat message surrounded by `[m] ~ [/m]`.

#### Example

<pre>
[m]
chatwork.md
====

- This is chrome extension
- This supports your markdown life
- This escapes all emoticons
  - :)
  - :p
  - (nod)

```php
$message = 'hogehoge';
$markdown = Markdown::parse($message);
```
[/m]
</pre>

![Sample usage for chatwork.md](/image/example-01.png)

## How to install

Use this `crx` file:

```
crx/chatworkmd.crx
```

Drag & Drop this file into your chrome extension page.

## TODO

See [issues](https://github.com/tan-yuki/chatwork.md/issues).
