module.exports = function () {
  return `
<p class="post__paragraph">
  This may seem a bit controversial, but I want to encourage you to 
  fit less information on a screen. As we are, developers,
  often tend to do right the opposite.
</p>

<p class="post__paragraph">
  I'm talking about font size in your IDE or text editor, whatever you prefer. 
</p>

<h2 class="post__section-title">12, 13, 14 pixels are too small</h2>

<p class="post__paragraph">
  Developers around me mostly use font sizes from 12 to 14 pixels.
</p>

<p class="post__paragraph">
  Those are very small fonts for a people who stare at letters 
  most of the day. Even for ones with perfect sight, which is a rare case in
  our profession, I would really suggest increasing font sizes.
</p>

<p class="post__paragraph">
  You're making pretty big effort processing those symbols and you 
  definitely don't want to have any extra strain to read them.
</p>

<h2 class="post__section-title">Bigger font makes a real difference</h2>

<p class="post__paragraph">
  I personally switched from 12px to 16px about a month ago and I feel the 
  difference literally every single day I go home from work. I feel much less
  tired, my head is not "heavy" as usual — feelings which I thought are normal
  after a day in front of a screen. They're not.
</p>

<p class="post__paragraph">
  Here is a side-by-side view of my IDE with old and new configuration.
</p>

<img
  class="post__image_fullscreen"
  alt="Side-by-side view of WebStorm IDE with 12px and 16px font sizes"
  src="ide.png"
/>

<p class="post__paragraph">
  Do I give up much extra space? Not really. I still have my 80 characters 
  within a line and vertical scrolling is not a problem at all as I mostly 
  navigate through code by jumping to specific places with a search.
</p>

<p class="post__paragraph">
  Of course, don't forget about other text-based interfaces, like terminal
  and browser's developer tools. Here are side-by-side views of those.
</p>

<img
  class="post__image_fullscreen"
  alt="Side-by-side view of iTerm 2 with 12px and 16px font sizes"
  src="terminal.png"
/>

<img
  class="post__image_fullscreen"
  alt="Side-by-side view of Chrome Developer Tools with 12px and 16px font sizes"
  src="devtools.png"
/>

<p class="post__paragraph">
  If you have an external monitor, which usually
  further away from you, go ahead and make fonts even bigger.
</p>

<p class="post__paragraph">
  At first, such giant characters may seem childish, give it a couple of hours,
  you'll get used to it very quickly.
</p>

<p class="post__paragraph">
  Try using the bigger font at least for a week and then switch back to your previous
  size. Feel how much strain it takes to read anything and then think that
  you had been doing this to your eyes for years. Switch back immediately😀
</p>

<h2 class="post__section-title">Some More on Legibility Topic</h2>

<ul class="post__list">
  <li class="post__list-item">
    <a href="https://www.smashingmagazine.com/2011/10/16-pixels-body-copy-anything-less-costly-mistake/">
      16 Pixels Font Size: For Body Copy. Anything Less Is A Costly Mistake
    </a>
  </li>
  <li class="post__list-item">
    <a href="http://blog.usabilla.com/8-guidelines-for-better-readability-on-the-web/">
      Tips for Better Readability
    </a>
  </li>
</ul>
  `
}
