# Deniz & Pip — code-switching voice prototype

A playable prototype of **adaptive code-switched language learning**: instead of dropping a
beginner into full target-language immersion, the conversation starts mostly in their own
language and the scaffolding is removed as they demonstrate they can cope.

Two characters carry the mechanic:

- **Deniz** runs the coffee shop and speaks **only the target language**.
- **Pip** is the tutor and speaks **only the learner's own language**.

That is the whole idea. In text you can use colour to show which language is which; in audio
you cannot, and a single voice sliding between two languages is confusing for a beginner. With
two speakers the learner never has to work out which language a sound belongs to — they know by
*who said it*. The scaffolding ladder stops being an abstract setting and becomes **how much of
each turn belongs to Pip**. Level 0 is Pip narrating with Deniz saying one word; level 5 is Pip
silent but still on screen. Progress is a character receding rather than a number going up.

## Run it

Open `index.html`. No build step, no dependencies, no server required — though speech
recognition needs `https://` or `localhost`, so use GitHub Pages or a local server rather than
`file://` if you want the microphone.

```
python3 -m http.server 8000   # then visit http://localhost:8000
```

## What is real and what is faked

This is a **scripted engine, not a language model.** Every partner line, accepted answer and
repair is authored content. Nothing calls an LLM at runtime.

That is deliberate. The prototype exists to answer one question — *will a beginner produce a
word in the target language at all, or freeze?* — and that question is not about generative
flexibility. A scripted prototype answers it faster, costs nothing per session, and takes model
variance out of the result. The LLM is how you scale this to a hundred scenarios; it is not the
thing under test.

**Genuinely implemented:**

- Six scaffolding levels, moving up and down on performance streaks
- Per-atom mastery state: `weak → recognition → emerging → strong → mastered`
- Ten error classes, including word-order, morphological and native-language fallback
- Repair-then-immediate-retry (a follow-up beat fires only if the previous one failed)
- The same construction recombined across contexts (café → the shop next door)
- Speech synthesis per character, with Deniz's speech rate scaling with the level
- Speech recognition with an n-best match and a confidence floor
- Live instrumentation of production, independence, think-time and talk-time split

**Faked or absent:** content generation, free conversation, anything off-script,
pronunciation scoring, spaced retrieval across sessions, and any state that survives a reload.

## The rule worth keeping

**Low recogniser confidence is never a wrong answer.** Below the threshold the learner is asked
again and the turn is not graded. The matcher also checks every alternative the recogniser
returns, not just the top one.

Speech recognisers are worse at accented child speech than at anything else they hear. Without
this rule, a system that scores production ends up marking children wrong for having an
accent — the exact opposite of the point. It costs nothing to implement and it is the
difference between an encouraging tutor and a discouraging one.

## Instrumentation

The right-hand rail measures the hypothesis, not vanity:

| Metric | Why |
|---|---|
| Independent target turns / min | North star — production the learner did unaided |
| Time to first production | The risk window is the opening turns |
| Spoken vs typed | A learner who *says* it is not doing the same thing as one who types it |
| Mean recogniser confidence | Watch for words the recogniser systematically fails on |
| Time before speaking | The closest thing to a confidence measure you get for free |
| Native fallbacks, freezes, help opened | The escape hatches are counted, not removed |

Opening a gloss or taking a hint marks that turn *supported*, so reading is never scored as
producing. **Export log** writes the full per-turn record as JSON.

## Running it as a test

- **Recruit real beginners.** Testing on someone who already speaks the target language tells
  you nothing.
- **Run the control arm.** Set *Adaptation: off* at level 3 for half your testers — target
  language with support, no ladder. If production rates match, the ladder is not earning its
  complexity.
- **Watch the first ninety seconds.** If they have not produced by then, the design has already
  lost.

## Adding a language pack

A pack is plain data in `index.html` — no code changes. Three ship by default
(English→Turkish, Spanish→English, Turkish→English):

```js
"en-tr": {
  label:"English → Turkish", native:"English", target:"Turkish",
  nativeLang:"en-GB", targetLang:"tr-TR", nCode:"EN", tCode:"TR",
  scenario:"Ordering in Deniz's café",
  nativeMarkers:[/* words that mean the learner answered in their own language */],
  atoms:{ "kahve":"coffee", /* … */ },
  beats:[{
    id:"b1",
    newAtoms:["kahve","istiyorum"],
    lines:{ 0:"Welcome! What would you like?",          // by scaffolding level
            1:"**Hoş geldiniz!** What would you like?", // **…** = Deniz / target language
            3:"**Hoş geldiniz! Ne istersiniz?**" },
    ask:{ 0:"Coffee is **kahve**. Say it.", 2:"Order a coffee." },
    ideal:"Kahve istiyorum.", gloss:"I want coffee.",
    accept:["kahve istiyorum","bir kahve lutfen","kahve"],
    repair:"Almost — say **Kahve istiyorum**."
  }]
}
```

`**double asterisks**` mark target-language text. The renderer turns them into the coloured,
tappable spans *and* routes those segments to Deniz's voice; everything else goes to Pip. So
`"**Hoş geldiniz!** What would you like?"` plays as the shopkeeper greeting in Turkish and the
tutor glossing in English, with no extra authoring.

Answer matching normalises case, punctuation and diacritics, so a learner without a Turkish
keyboard is not penalised. `accept` entries should be written diacritic-free.

## Where the model goes next

Keep the engine and put the LLM behind three narrow interfaces rather than handing it the
conversation:

- **Author-time** — generate beats offline into the JSON shape above, with a human accepting
  them. Content stays reviewable and cacheable.
- **Turn-time** — paraphrase an authored line to fit the learner's interests, constrained to
  atoms already in state.
- **Judge-time** — classify a free-text answer the matcher cannot resolve, returning one of the
  ten error classes rather than free prose.

Scaffolding decisions, mastery updates and the difficulty budget stay in code, where they can
be tested.

## Known limits

- Speech recognition is Chrome/Edge/Safari only, and embedded frames usually block the
  microphone. The banner at the top of the page reports what the browser actually granted.
- Turkish text-to-speech voice quality varies by operating system; macOS and iOS are best.
- Splitting a mixed sentence into two speakers occasionally leaves a short fragment on its own
  ("…, and"). Fine for a prototype, worth authoring around for real content.
- Nothing persists. Reloading starts a new session.

In production none of the browser speech work applies — that belongs to the realtime voice
pipeline. Read this repo as a spec for that, not as an implementation of it.
