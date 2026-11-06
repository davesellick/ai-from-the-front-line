# AI Native is a Lie

Here is how I actually use GenAI to transform my firm.

Live at `/ai-native`, which redirects to this folder. 47 slides plus backup screens after Thank you. The live walkthrough is slide 33.

- One click per slide: each slide plays its own animation, so there are no timings to learn. `data-first` and `data-gap` set the pace. `?steps=manual` gives one click per step.
- N opens speaker notes. `?notes` opens a presenter window that follows the projector.
- `?slide=N` opens a slide. `?steps=all` opens every slide finished, for review and print.
- `deck-steps.js` is the click-step engine on top of the shared `deck-stage.js`.
- `soundcheck.html` is the three-look comparison that led to this design.

Screens are Circle demo captures. Recount the headline numbers on The system slide before each talk.
- `?epic=a`, `b`, `c` or `d` runs one of the four motion options in `deck-epic.css` and `deck-epic.js`. Without it the deck is unchanged.
