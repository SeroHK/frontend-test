# A Challenge

Hello and thanks for trying out with us!

You will find here a few tests. These are composed of some basic yet bit challenging problems we've had to solve on the job.
This will also allow you to have a glimpse of what we work on at 99.co and see if that's interesting to you.
Finally, this'll provide us with insights on your working style.

## Submission

You have 7 days to complete the challenge.

Please fork this (from within [CodeSandbox link here](https://codesandbox.io/s/github/alexbiediger/frontend-test)) and once you complete, send us back the forked CodeSandbox link to nafhul.arsyad@99.co, rizqireza.valhevi@99.co, ilmiyantif@99.co and mochamad.redja@99.co

## Questions

### React

1. Hide description until the button is clicked

2. Because of SEO we want to only hide description after page load

3. Anonymize all phone numbers: first 4 numbers visible, replace following 4 with X (e.g. 8111 XXXX or 8123 XXXX)
   Note Singapore phone number format is always 8 numbers long.
   See [Number Ranges on wikipedia](https://en.wikipedia.org/wiki/Telephone_numbers_in_Singapore#Number_ranges) for precise rules.

4. Line returns (new lines) in the description text should be displayed on page. The text must NOT be all in one line.

5. Clicking on phone number reveals the real number

### Styling

1. Implement the [following design](https://www.figma.com/file/zT67hKBce1jfyZPkx5cGrg/FE-challenge---Project-card-design).
   Note: you will have to register on Figma if you don't already have an account

2. Main pic is too heavy, please suggest ways to reduce its weight.




## Answers & Notes

### React Implementation
- SEO & Description: Description starts rendered so search crawlers can parse it in initial HTML/SSR. In `useEffect`, it hides after client mount until the user clicks "See description".

- Phone Numbers: Singapore numbers are 8 digits starting with 3, 6, 8, or 9. Handled with regex using word boundaries (`\b`) so CEA numbers like `R0123456` or year `2021` aren't affected. Numbers render as interactive spans that toggle between masked (`8234 XXXX`) and revealed on click.

- Line Breaks: Handled with CSS `white-space: pre-line` on `.description-text`.


### Styling Q2: Ways to reduce main pic weight
The current image URL requests `w=2000&q=100`:

1. Resize on CDN: A 500px card doesn't need a 2000px image. Dropping to `w=600` (or `w=800` for 2x retina) and `q=80` instead of 100 will cut the file size by ~80% with no noticeable visual difference.

2. Modern Formats: Leverage `auto=format` or `<picture>` to serve WebP / AVIF to supported browsers.

3. Responsive Images: Use `srcset` and `sizes` so mobile devices don't download desktop-size images.

4. Lazy Loading: Add `loading="lazy"` so images below the fold aren't fetched before they're in view.
