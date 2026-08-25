# Proof of Human

A fake "I am not a robot" verification widget that turns into a tile-matching identification game. Built to look like a real captcha embedded in a sign-in page, not a flashy demo.

## What it does

The page shows a basic sign-in form with a checkbox that says "I am not a robot." Clicking it runs a short fake verification delay, then opens a challenge modal. You're asked to select all the tiles matching a given item across three rounds. Get through all three and the checkbox marks itself verified, the sign-in button activates, and a small confirmation note appears.

## Files

index.html-page structure and content
style.css-all styling
script.js-the checkbox logic, challenge generation, and round handling

The HTML file links to the other two by relative path, so keep all three in the same folder.

## My Goal

Just to entertain you with some random game to play when you are bored

## Running it

No build step or server needed. Just open index.html in a browser.

Or

Use this global link => https://vardaansworld-star.github.io/Proof-of-Human/

## Notes

- The "images" in the grid are emoji, not real photos, so there's nothing to source or license.


- Round difficulty increases slightly as you go (more matching tiles to find).
- Three wrong attempts in a row resets the challenge back to round one.
