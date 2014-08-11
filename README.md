chatwork.md
===========

This is a Chrome extension that supports your markdown style in [chatwork](http://www.chatwork.com/ja/)

- Use this extension __AT YOUR OWN RISK__

### How to use

```
[m]## hogehoge

### fugafuga[/m]
```


```
### Sample source

[m]
<?php
class Message {
  private $message;
  public function __construct($message) {
    $this->message = $message;
  }

  public function toMarkdown() {
    return Markdown::parse($this->message);
  }
}
[/m]
```


## How to install

Use this `crx` file:

```
crx/chatworkmd.crx
```

Drag & Drop this file into your chrome extension page.

## TODO

See [issues](https://github.com/tan-yuki/chatwork.md/issues).
