/* global describe, it */

(function () {
  'use strict';

  describe('util', function () {
    describe('#hasMarkdownTag', function () {
      it('should return true if string has markdown tag', function () {
        expect(util.hasMarkdownTag('hogehoge\n[m]\nfoo\n[/m]')).to.be.true;
      });

      it('should return false if string has markdown tag', function () {
        expect(util.hasMarkdownTag('hogehoge\n[info]\neee\n[/info]')).to.not.be.true;
      });
    });

    describe('#revertHtmlLink', function () {
      it('should convert string contains html link in markdown tag', function () {
        var message = [
          '[m]',
          'hogehoge',
          '<a href="https://www.chatwork.com" title="https://www.chatwork.com" target="_blank" class="ui_sp_favicon_parent">https://www.chatwork.com</a>',
          'fugafuga',
          '[/m]',
        ].join('\n');

        var expected = [
          '[m]',
          'hogehoge',
          'https://www.chatwork.com',
          'fugafuga',
          '[/m]',
        ].join('\n');

        expect(util.revertHtmlLink(message)).to.equal(expected);
      });

      it('should not convert string contains html link outside of the markdown tag', function () {
        var message = [
         'hogehoge',
         '<a href="https://www.chatwork.com" title="https://www.chatwork.com" target="_blank" class="ui_sp_favicon_parent">https://www.chatwork.com</a>',
         'fugafuga',
        ].join('\n');

        expect(util.revertHtmlLink(message)).to.equal(message);
      });

      it('should convert string contains several html links in markdown tag', function () {
        var message = [
          '[m]',
          '<a href="https://www.google.co.jp" title="https://www.google.co.jp" target="_blank" class="ui_sp_favicon_parent">https://www.google.co.jp</a>',
          'hogehoge',
          '<a href="https://www.chatwork.com" title="https://www.chatwork.com" target="_blank" class="ui_sp_favicon_parent">https://www.chatwork.com</a>',
          'fugafuga',
          '[/m]',
        ].join('\n');

        var expected = [
          '[m]',
          'https://www.google.co.jp',
          'hogehoge',
          'https://www.chatwork.com',
          'fugafuga',
          '[/m]',
        ].join('\n');

        expect(util.revertHtmlLink(message)).to.equal(expected);
      });
    });

    describe('#revertEmoticon', function () {
      it('should convert string contains emoticon in markdown tag', function () {
        var message = [
          '[m]',
          'hogehoge',
          '<img src="./image/emoticon/emo_smile.gif" title="笑顔 :)" alt=":)" class="ui_emoticon">',
          '<img src="./image/emoticon/emo_nod.gif" title="うんうん (nod)" alt="(nod)" class="ui_emoticon">',
          'fugafuga',
          '[/m]',
        ].join('\n');

        var expected = [
          '[m]',
          'hogehoge',
          ':)',
          '(nod)',
          'fugafuga',
          '[/m]',
        ].join('\n');

        expect(util.revertEmoticon(message)).to.equal(expected);
      });

      it('should not convert string contains emoticon out of markdown tag', function () {
        var message = [
          'hogehoge',
          '<img src="./image/emoticon/emo_smile.gif" title="笑顔 :)" alt=":)" class="ui_emoticon">',
          '<img src="./image/emoticon/emo_nod.gif" title="うんうん (nod)" alt="(nod)" class="ui_emoticon">',
          'fugafuga',
        ].join('\n');

        expect(util.revertEmoticon(message)).to.equal(message);
      });
    });

    describe('#removeHtmlTag', function () {
      it('should remove html tag in string', function () {
        var message = 'hogehoge<strong>foo!</strong>';
        expect(util.removeHtmlTag(message)).to.equal('hogehogefoo!');
      });
    });
  });
})();
