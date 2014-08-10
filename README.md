chatwork.md
===========

This is a Chrome extension that supports your markdown style in [chatwork](http://www.chatwork.com/ja/)

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

```
git clone https://github.com/tan-yuki/chatwork.md.git
cd chatwork.md/
npm install
grunt build
```

then, load `chatwork.md/dist/` directory in chrome extension page.

## TODO

See [issues](https://github.com/tan-yuki/chatwork.md/issues).
