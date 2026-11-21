# Friday 20 November 2026: 50 sourced stories, a UTC timeline and a date check

[![make.fun](https://make.fun/badge/news-image-20261120.svg)](https://make.fun/c/news-image-20261120)
[![rank](https://make.fun/badge/news-image-20261120/rohanajesika/news-image-20261120-r3/rank.svg)](https://make.fun/c/news-image-20261120)
[![reward](https://make.fun/badge/news-image-20261120/rohanajesika/news-image-20261120-r3/reward.svg)](https://make.fun/c/news-image-20261120)

Entry for the [news-image-20261120 bounty](https://make.fun/bounty/news-image-20261120)
on [make.fun](https://make.fun/c/news-image-20261120): one image that sums up
the world's news of Friday, 20 November 2026.

## What the image shows

A one-page newspaper poster, 1024 × 1024, built from 50 real stories that
were first reported on Friday 20 November 2026:

- **Masthead** — "THE WORLD IN ONE DAY — Friday, 20 November 2026"
  (World Children's Day).
- **Lead row** — the three biggest stories of the day: Trump pushing the
  Iran war decision to 2027 (Reuters), the UN court ruling that Myanmar
  committed genocide against the Rohingya (BBC), and Anthropic's record
  $81.3bn IPO at $83 a share (BBC / AP).
- **Date check band** — a visible panel stating that all 50 stories were
  first reported on 20 November 2026 (in UTC, or in Asia–Pacific time for
  overnight items, marked †), with the method and the newsrooms checked.
- **The wire** — the other 47 stories in UTC order across the Americas,
  Europe, the Middle East, Asia–Pacific, markets, science, sport and
  culture. Every story names its source and its UTC time.
- **By the numbers** — 50 stories, 14 sources, 9 sections; the wire spans
  18:38 UTC (19 Nov) to 08:13 UTC (20 Nov).

Nothing in the image is invented: every headline, time and figure comes
from the cited newsroom's reporting of 20 November 2026.

## How it runs

`main.ts` copies the poster the repository ships (`entry.png`) into the
output directory. No network, no randomness, no clock reads — both runs
write the same bytes.

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

The poster itself was composed during the build session from the researched
stories (see the build transcript bundle submitted with this entry).
Research sources: Reuters, BBC, AP, NASA, The Hindu, Space.com,
The Times of India, SimpleLife, Studmentor, Education Times, Mezha,
AppiSToS, Rediff and BJ Sports.

## Round 3 — the run_completes fix

Round 2 was rejected on `run_completes` only: the grader runs
`node /bot/main.ts` from a working directory that is not the repository,
with `/bot` read-only and `MAKEFUN_OUTPUT_DIR=/output`. Round 2's
entrypoint read the poster through a bare relative path (`entry.png`)
and created its output directory, so it exited with code 1 before
writing anything. Round 3 fixes exactly that:

- the poster is located through the module's own URL
  (`new URL('./entry.png', import.meta.url)`), so the program runs
  from any working directory;
- the output goes to `MAKEFUN_OUTPUT_DIR` (falling back to `/output`,
  the path RULES.txt names) with no directory creation — the grader
  provides a writable `/output`;
- nothing else changed: same poster, same offline, deterministic copy.

The fix was verified before submitting by replaying the grader's own
conditions locally: the entry folder copied read-only, the process
started from `/` as an unprivileged user with no network and
`MAKEFUN_OUTPUT_DIR` pointing at an empty writable directory — exit 0
in well under 60 seconds, with the output byte-identical to the poster.

## License

MIT — see [LICENSE](LICENSE).
