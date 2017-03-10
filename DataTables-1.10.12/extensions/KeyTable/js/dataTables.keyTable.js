*message.txt*   For Vim version 8.0.  Last change: 2017 Jan 02


		  VIM REFERENCE MANUAL    by Bram Moolenaar


This file contains an alphabetical list of messages and error messages that
Vim produces.  You can use this if you don't understand what the message
means.  It is not complete though.

1. Old messages		|:messages|
2. Error messages	|error-messages|
3. Messages		|messages|

==============================================================================
1. Old messages			*:messages* *:mes* *message-history*

The ":messages" command can be used to view previously given messages.  This
is especially useful when messages have been overwritten or truncated.  This
depends on the 'shortmess' option.

	:messages		Show all messages.

	:{count}messages	Show the {count} most recent messages.

	:messages clear		Clear all messages.

	:{count}messages clear	Clear messages, keeping only the {count} most
				recent ones.

The number of remembered messages is fixed at 20 for the tiny version and 200
for other versions.

								*g<*
The "g<" command can be used to see the last page of previous command output.
This is especially useful if you accidentally typed <Space> at the hit-enter
prompt.  You are then back at the hit-enter prompt and can then scroll further
back.
Note: If the output has been stopped with "q" at the more prompt, it will only
be displayed up to this point.
The previous command output is cleared when another command produces output.
The "g<" output is not redirected.

If you are using translated messages, the first printed line tells who
maintains the messages or the translations.  You can use this to contact the
maintainer when you spot a mistake.

If you want to find help on a specific (error) message, use the ID at the
start of the message.  For example, to get help on the message: >

	E72: Close error on swap file

or (translated): >

	E72: Errore durante chiusura swap file

Use: >

	:help E72

If you are lazy, it also works without the shift key: >

	:help e72

==============================================================================
2. Error messages				*error-messages* *errors*

When an error message is displayed, but it is removed before you could read
it, you can see it again with: >
  :echo errmsg
Or view a list of recent messages with: >
  :messages
See `:messages` above.


LIST OF MESSAGES
			*E222* *E228* *E232* *E256* *E293* *E298* *E304* *E317*
			*E318* *E356* *E438* *E439* *E440* *E316* *E320* *E322*
			*E323* *E341* *E473* *E570* *E685*  >
  Add to read buffer
  makemap: Illegal mode
  Cannot create BalloonEval with both message and callback
  Hangul automata ERROR
  block was not locked
  Didn't get block nr {N}?
  ml_upd_block0(): Didn't get block 0??
  pointer block id wrong {N}
  Updated too many blocks?
  get_varp ERROR
  u_undo: line numbers wrong
  undo list corrupt
  undo line missing
  ml_get: cannot find line {N}
  cannot find line {N}
  line number out of range: {N} past the end
  line count wrong in block {N}
  Internal error
  Internal error: {function}
  fatal error in cs_manage_matches

This is an internal error.  If you can reproduce it, please send in a bug
report. |bugs|

>
  ATTENTION
  Found a swap file by the name ...

See |ATTENTION|.

							*E92*  >
  Buffer {N} not found

The buffer you requested does not exist.  This can also happen when you have
wiped out a buffer which contains a mark or is referenced in another way.
|:bwipeout|

							*E95*  >
  Buffer with this name already exists

You cannot have two buffers with the same name.

							*E72*  >
  Close error on swap file

The |swap-file|, that is used to keep a copy of the edited text, could not be
closed properly.  Mostly harmless.

							*E169*  >
  Command too recursive

This happens when an Ex command executes an Ex command that executes an Ex
command, etc.  The limit is 200 or the value of 'maxfuncdepth', whatever is
larger.  When it's more there probably is an endless loop.  Probably a
|:execute| or |:source| command is involved.

							*E254*  >
  Cannot allocate color {name}

The color name {name} is unknown.  See |gui-colors| for a list of colors that
are available on most systems.

							*E458*  >
  Cannot allocate colormap entry, some colors may be incorrect

This means that there are not enough colors available for Vim.  It will still
run, but some of the colors will not appear in the specified color.  Try
stopping other applications that use many colors, or start them after starting
gvim.
Browsers are known to consume a lot of colors.  You can avoid this with
netscape by telling it to use its own colormap: >
	netscape -install
Or tell it to limit to a certain number of colors (64 should work well): >
	netscape -ncols 64
This can also be done with a line in your Xdefaults file: >
	Netscape*installColormap: Yes
or >
	Netscape*maxImageColors:  64
<
							*E79*  >
  Cannot expand wildcards

A filename contains a strange combination of characters, which causes Vim to
attempt expanding wildcards but this fails.  This does NOT mean that no
matching file names could be found, but that the pattern was illegal.

							*E459*  >
  Cannot go back to previous directory

While expanding a file name, Vim failed to go back to the previously used
directory.  All file names being used may be invalid now!  You need to have
execute permission on the current directory.

							*E190* *E212*  >
  Cannot open "{filename}" for writing
  Can't open file for writing

For some reason the file you are writing to cannot be created or overwritten.
The reason could be that you do not have permission to write in the directory
or the file name is not valid.

							*E166*  >
  Can't open linked file for writing

You are trying to write to a file which can't be overwritten, and the file is
a link (either a hard link or a symbolic link).  Writing might still be
possible if the directory that contains the link or the file is writable, but
Vim now doesn't know if you want to delete the link and write the file in its
place, or if you want to delete the file itself and write the new file in its
place.  If you really want to write the file under this name, you have to
manually delete the link or the file, or change the permissions so that Vim
can overwrite.

							*E46*  >
  Cannot change read-only variable "{name}"

You are trying to assign a value to an argument of a function |a:var| or a Vim
internal variable |v:var| which is read-only.

							*E90*  >
  Cannot unload last buffer

Vim always requires one buffer to be loaded, otherwise there would be nothing
to display in the window.

							*E40*  >
  Can't open errorfile <filename>

When using the ":make" or ":grep" commands: The file used to save the error
messages or grep output cannot be opened.  This can have several causes:
- 'shellredir' has a wrong value.
- The shell changes directory, causing the error file to be written in another
  directory.  This could be fixed by changing 'makeef', but then the make
  command is still executed in the wrong directory.
- 'makeef' has a wrong value.
- The 'grepprg' or 'makeprg' could not be executed.  This cannot always be
  detected (especially on MS-Windows).  Check your $PATH.

 >
  Can't open file C:\TEMP\VIoD243.TMP

On MS-Windows, this message appears when the output of an external command was
to be read, but the command didn't run successfully.  This can be caused by
many things.  Check the 'shell', 'shellquote', 'shellxquote', 'shellslash' and
related options.  It might also be that the external command was not found,
there is no different error message for that.

							*E12*  >
  Command not allowed from exrc/vimrc in current dir or tag search

Some commands are not allowed for security reasons.  These commands mostly
come from a .exrc or .vimrc file in the current directory, or from a tags
file.  Also see 'secure'.

							*E74*  >
  Command too complex

A mapping resulted in a very long command string.  Could be caused by a
mapping that indirectly calls itself.

>
  CONVERSION ERROR

When writing a file and the text "CONVERSION ERROR" appears, this means that
some bits were lost when converting text from the internally used UTF-8 to the
format of the file.  The file will not be marked unmodified.  If you care
about the loss of information, set the 'fileencoding' option to another value
that can handle the characters in the buffer and write again.  If you don't
care, you can abandon the buffer or reset the 'modified' option.

							*E302*  >
  Could not rename swap file

When the file name changes, Vim tries to rename the |swap-file| as well.
This failed and the old swap file is now still used.  Mostly harmless.

							*E43* *E44*  >
  Damaged match string
  Corrupted regexp program

Something inside Vim went wrong and resulted in a corrupted regexp.  If you
know how to reproduce this problem, please report it. |bugs|

							*E208* *E209* *E210*  >
  Error writing to "{filename}"
  Error closing "{filename}"
  Error reading "{filename}"

This occurs when Vim is trying to rename a file, but a simple change of file
name doesn't work.  Then the file will be copied, but somehow this failed.
The result may be that both the original file and the destination file exist
and the destination file may be incomplete.

>
  Vim: Error reading input, exiting...

This occurs when Vim cannot read typed characters while input is required.
Vim got stuck, the only thing it can do is exit.  This can happen when both
stdin and stderr are redirected and executing a script that doesn't exit Vim.

							*E47*  >
  Error while reading errorfile

Reading the error file was not possible.  This is NOT caused by an error
message that was not recognized.

							*E80*  >
  Error while writing

Writing a file was not completed successfully.  The file is probably
incomplete.

							*E13* *E189*  >
  File exists (add ! to override)
  "{filename}" exists (add ! to override)

You are protected from accidentally overwriting a file.  When you want to
write anyway, use the same command, but add a "!" just after the command.
Example: >
	:w /tmp/test
changes to: >
	:w! /tmp/test
<
							*E768*  >
  Swap file exists: {filename} (:silent! overrides)

You are protected from overwriting a file that is being edited by Vim.  This
happens when you use ":w! filename" and a swapfile is found.
- If the swapfile was left over from an old crashed edit session you may want
  to delete the swapfile.  Edit {filename} to find out information about the
  swapfile.
- If you want to write anyway prepend ":silent!" to the command.  For example: >
	:silent! w! /tmp/test
< The special command is needed, since you already added the ! for overwriting
  an existing file.

							*E139*  >
  File is loaded in another buffer

You are trying to write a file under a name which is also used in another
buffer.  This would result in two versions of the same file.

							*E142*  >
  File not written: Writing is disabled by 'write' option

The 'write' option is off.  This makes all commands that try to write a file
generate this message.  This could be caused by a |-m| commandline argument.
You can switch the 'write' option on with ":set write".

							*E25*  >
  GUI cannot be used: Not enabled at compile time

You are running a version of Vim that doesn't include the GUI code.  Therefore
"gvim" and ":gui" don't work.

							*E49*  >
  Invalid scroll size

This is caused by setting an invalid value for the 'scroll', 'scrolljump' or
'scrolloff' options.

							*E17*  >
  "{filename}" is a directory

You tried to write a file with the name of a directory.  This is not possible.
You probably need to append a file name.

							*E19*  >
  Mark has invalid line number

You are using a mark that has a line number that doesn't exist.  This can
happen when you have a mark in another file, and some other program has
deleted lines from it.

							*E219* *E220*  >
  Missing {.
  Missing }.

Using a {} construct in a file name, but there is a { without a matching } or
the other way around.  It should be used like this: {foo,bar}.  This matches
"foo" and "bar".

							*E315*  >
  ml_get: invalid lnum: {number}

This is an internal Vim error.  Please try to find out how it can be
reproduced, and submit a bug report |bugreport.vim|.

							*E173*  >
  {number} more files to edit

You are trying to exit, while the last item in the argument list has not been
edited.  This protects you from accidentally exiting when you still have more
files to work on.  See |argument-list|.  If you do want to exit, just do it
again and it will work.

							*E23* *E194*  >
  No alternate file
  No alternate file name to substitute for '#'

The alternate file is not defined yet.  See |alternate-file|.

							*E32*  >
  No file name

The current buffer has no name.  To write it, use ":w fname".  Or give the
buffer a name with ":file fname".

							*E141*  >
  No file name for buffer {number}

One of the buffers that was changed does not have a file name.  Therefore it
cannot be written.  You need to give the buffer a file name: >
	:buffer {number}
	:file {filename}
<
							*E33*  >
  No previous substitute regular expression

When using the '~' character in a pattern, it is replaced with the previously
used pattern in a ":substitute" command.  This fails when no such command has
been used yet.  See |/~|.  This also happens when using ":s/pat/%/", where the
"%" stands for the previous substitute string.

							*E35*  >
  No previous regular expression

When using an empty search pattern, the previous search pattern is used.  But
that is not possible if there was no previous search.

							*E24*  >
  No such abbreviation

You have used an ":unabbreviate" command with an argument which is not an
existing abbreviation.  All variations of this command give the same message:
":cunabbrev", ":iunabbrev", etc.  Check for trailing white space.

>
  /dev/dsp: No such file or directory

Only given for GTK GUI with Gnome support.  Gnome tries to use the audio
device and it isn't present.  You can ignore this error.

							*E31*  >
  No such mapping

You have used an ":unmap" command with an argument which is not an existing
mapping.  All variations of this command give the same message: ":cunmap",
":unmap!", etc.  A few hints:
- Check for trailing white space.
- If the mapping is buffer-local you need to use ":unmap <buffer>".
  |:map-<buffer>|

							*E37* *E89*  >
  No write since last change (add ! to override)
  No write since last change for buffer {N} (add ! to override)

You are trying to |abandon| a file that has changes.  Vim protects you from
losing your work.  You can either write the changed file with ":w", or, if you
are sure, |abandon| it anyway, and lose all the changes.  This can be done by
adding a '!' character just after the command you used.  Example: >
	:e other_file
changes to: >
	:e! other_file
<
							*E162*  >
  No write since last change for buffer "{name}"

This appears when you try to exit Vim while some buffers are changed.  You
will either have to write the changed buffer (with |:w|), or use a command to
abandon the buffer forcefully, e.g., with ":qa!".  Careful, make sure you
don't throw away changes you really want to keep.  You might have forgotten
about a buffer, especially when 'hidden' is set.

>
  [No write since last change]

This appears when executing a shell command while at least one buffer was
changed.  To avoid the message reset the 'warn' option.

							*E38*  >
  Null argument

Something inside Vim went wrong and resulted in a NULL pointer.  If you know
how to reproduce this problem, please report it. |bugs|

							*E172*  >
  Only one file name allowed

The ":edit" command only accepts one file name.  When you want to specify
several files for editing use ":next" |:next|.

						*E41* *E82* *E83* *E342*  >
  Out of memory!
  Out of memory!  (allocating {number} bytes)
  Cannot allocate any buffer, exiting...
  Cannot allocate buffer, using other one...

Oh, oh.  You must have been doing something complicated, or some other program
is consuming your memory.  Be careful!  Vim is not completely prepared for an
out-of-memory situation.  First make sure that any changes are saved.  Then
try to solve the memory shortage.  To stay on the safe side, exit Vim and
start again.

Buffers are only partly kept in memory, thus editing a very large file is
unlikely to cause an out-of-memory situation.  Undo information is completely
in memory, you can reduce that with these options:
- 'undolevels'  Set to a low value, or to -1 to disable undo completely.  This
  helps for a change that affects all lines.
- 'undoreload' Set to zero to disable.

							*E339*  >
  Pattern too long

This happens on systems with 16 bit ints: The compiled regexp pattern is
longer than about 65000 characters.  Try using a shorter pattern.
It also happens when the offset of a rule doesn't fit in the space available.
Try simplifying the pattern.

							*E45*  >
  'readonly' option is set (add ! to override)

You are trying to write a file that was marked as read-only.  To write the
file anyway, either reset the 'readonly' option, or add a '!' character just
after the command you used.  Example: >
	:w
changes to: >
	:w!
<
							*E294* *E295* *E301*  >
  Read error in swap file
  Seek error in swap file read
  Oops, lost the swap file!!!

Vim tried to read text from the |swap-file|, but something went wrong.  The
text in the related buffer may now be corrupted!  Check carefully before you
write a buffer.  You may want to write it in another file and check for
differences.

							*E192*  >
  Recursive use of :normal too deep

You are using a ":normal" command, whose argument again uses a ":normal"
command in a recursive way.  This is restricted to 'maxmapdepth' levels.  This
example illustrates how to get this message: >
	:map gq :normal gq<CR>
If you type "gq", it will execute this mapping, which will call "gq" again.

							*E22*  >
  Scripts nested too deep

Scripts can be read with the "-s" command-line argument and with the ":source"
command.  The script can then again read another script.  This can continue
for about 14 levels.  When more nesting is done, Vim assumes that there is a
recursive loop somewhere and stops with this error message.

							*E319*  >
  Sorry, the command is not available in this version

You have used a command that is not present in the version of Vim you are
using.  When compiling Vim, many different features can be enabled or
disabled.  This depends on how big Vim has chosen to be and the operating
system.  See |+feature-list| for when which feature is available.  The
|:version| command shows which feature Vim was compiled with.

							*E300*  >
  Swap file already exists (symlink attack?)

This message appears when Vim is trying to open a swap file and finds it
already exists or finds a symbolic link in its place.  This shouldn't happen,
because Vim already checked that the file doesn't exist.  Either someone else
opened the same file at exactly the same moment (very unlikely) or someone is
attempting a symlink attack (could happen when editing a file in /tmp or when
'directory' starts with "/tmp", which is a bad choice).

							*E432*  >
  Tags file not sorted: {file name}

Vim (and Vi) expect tags files to be sorted in ASCII order.  Binary searching
can then be used, which is a lot faster than a linear search.  If your tags
files are not properly sorted, reset the |'tagbsearch'| option.
This message is only given when Vim detects a problem when searching for a
tag.  Sometimes this message is not given, even though the tags file is not
properly sorted.

							*E460*  >
  The resource fork would be lost (add ! to override)

On the Macintosh (classic), when writing a file, Vim attempts to preserve all
info about a file, including its resource fork.  If this is not possible you
get this error message.  Append "!" to the command name to write anyway (