# Puppeteer Deterministic Screenshot

Are Puppeteer screenshots deterministic given the same input HTML? Let's find
out by setting up Github Actions to run the same Puppeteer screenshot generating
script and comparing the binary files.

## Deterministic Across OSs

It is impossible for the screenshots to be deterministic across OSs due to the
different text rendering technologies employed by the different OSs.

This work is not exploring this, but there might be an angle in forcing the same
font across OSs and forcing software rendering in Chrome, which might fall back
onto the same text renderer.

## Deterministic Across Runs on the Same OS

This is what we're after: if the same script is ran twice on the same machine
and the same HTML is used, will the generated screenshot file be the same?

Is this true for all OSs?

| OS      | Result                               |
|---------|--------------------------------------|
| Windows | Screenshots are the same across runs |
| Linux   | ?                                    |
| macOS   | ?                                    |

## Bonus: Git Changes

Git won't track the screenshot as changed if it changes only in metadata, but
not the binary data.

## To-Do

### Consider looking into the software rendering angle described above

### Fix the GitHub Actions Git push failing due to concurency issues (probably)

Maybe store in GitHub Actions artifacts as an alternative, but I'd like to fix
this too, as it should come in handy.
