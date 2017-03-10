 clicking the left mouse button works
   like pressing <Space>.  This makes it impossible to select text though.
-> For the GUI clicking the left mouse button in the last line works like
   pressing <Space>.
{Vi: only ":" commands are interpreted}

If you accidentally hit <Enter> or <Space> and you want to see the displayed
text then use |g<|.  This only works when 'more' is set.

To reduce the number of hit-enter prompts:
- Set 'cmdheight' to 2 or higher.
- Add flags to 'shortmess'.
- Reset 'showcmd' and/or 'ruler'.

If your script causes the hit-enter prompt and you don't know why, you may
find the |v:scrollstart| variable useful.

Also see 'mouse'.  The hit-enter message is highlighted with the |hl-Question|
group.


						*more-prompt* *pager*  >
  -- More --
  -- More -- SPACE/d/j: screen/page/line down, b/u/k: up, q: quit

This message is given when the screen is filled with messages.  It is only
given when the 'more' option is on.  It is highlighted with the |hl-MoreMsg|
group.

Type					effect ~
     <CR> or <NL> or j or <Down>	one more line
     d					down a page (half a screen)
     <Space> or f or <PageDown>		down a screen
     G					down all the way, until the hit-enter
					prompt

     <BS> or k or <Up>			one line back (*)
     u					up a page (half a screen) (*)
     b or <PageUp>			back a screen (*)
     g					back to the start (*)

     q, <Esc> or CTRL-C			stop the listing
     :					stop the listing and enter a
					     command-line
    <C-Y>				yank (copy) a modeless selection to
					the clipboard ("* and "+ registers)
    {menu-entry}			what the menu is defined to in
					Cmdline-mode.
    <LeftMouse> (**)			next page

Any other key causes the meaning of the keys to be displayed.

(*)  backwards scrolling is {not in Vi}.  Only scrolls back to where messages
     started to scroll.
(**) Clicking the left mou