# RizzStudio — Full Guide

Native macOS app (SwiftUI + AppKit, borderless plugin-style window) that reads an Ableton Live set's
**Session** or **Arrangement** playlist, analyses every song, programs a **granular lightshow** with AI
(your local **Claude Code** or **Codex** CLI — no API key) and exports it **into Ableton** as DMX-over-MIDI,
so Ableton alone drives the lights through **TouchDesigner → Art-Net / sACN / DMX**.

(Formerly *Touchableton*. Integration names are unchanged so existing rigs keep working: the virtual MIDI
port and Live Control Surface are still called **Touchableton**, as are the TouchDesigner receiver `.tox`, the Syphon
sender prefix and the Swift target; settings and caches carry over.)

## Workflow

1. **Open** an `.als` → every audio clip becomes a playlist song; analysis runs automatically (< 1 s/song).
   **Or open audio files** (mp3, wav, aiff, m4a, flac — Open, drag & drop, or *New Project from Audio*): a song on its
   own is enough. Several files become a playlist that plays back to back (each at its own tempo); **Add Audio** /
   right-click → *Remove from Playlist* edit it. The project reopens on next launch. Everything works the same except
   the two "copy of the .als" exports; Sync to Live places the clips as if the songs start at bar 1 back to back.
   **Cover art**: the playlist and song header show each song's cover — the picture embedded in the file's tags
   (ID3 / MP4 / FLAC), or, if there is none, the best title/artist match from Apple's iTunes Search API (toggle in
   Settings; sends only artist + title). Covers are cached in Application Support; right-click → *Refresh Cover Art*.
2. **Plan** — AI (or the built-in rules) labels sections and writes one cue per section: feel
   (aggressive · energetic · groovy · smooth · soothing · ambient), mover patterns, mover dimmer FX, gobo,
   colour mode, wash / strobe / lasers / pixels / FX, transition, accent hits.
   - The AI also sees **beat-level detail** (per-beat energy and kick / clap / hats hits) around every change and
     silence, may **name any cue** it likes ("Impact", "Vocal Hook", "Switch-Up" — the label still decides how the
     engine treats it; rename any section in the inspector), and can add **free programming**: beat-accurate lane
     blocks beyond the presets (shown on the lanes like manual blocks; replaced on the next AI plan, your own
     blocks are kept).
   - **Drops are numbered** — Drop 1, Drop 2 … (repeated sections too: Chorus 2) — and later drops are programmed
     bigger: higher energy, harder character, more fixtures and accents.
   - **Pre-drop** = the 1–2 bar moment right before a drop (drum roll, impact or silent gap), not the whole riser
     (that's the build). It's detected from snare rolls, gaps, the kick cutting out and energy dips, and lit as its
     own moment (strobe roll on the snare, white impact, or darkness), with a blackout on the last beat.
   - **Brief** (song header, or right-click a song): a direction for the AI plus **reference links** (YouTube /
     Instagram / Vimeo / .mp4 / image pages) and images. With Claude Code the links are opened in your Chrome via
     the **chrome-use** skill — it watches / screenshots them and borrows the palette, fixture use and pacing.
3. **Programmer** splits every section into **1/2/3/4/8-bar chunks** (Auto: 2 bars when aggressive, 8 when
   soothing). Each chunk gets its own character from the audio and its own pattern, speed, sync
   (unison / spread / mirror / alternate), dimmer FX (flicker, pulse, strobe-chase, chase, breathe, dim…),
   gobo (dots / star / ring / rotate / shake) and colours. Aggressive passages = fast unison snaps,
   circles, ballyhoo, flicker, shaking gobos. Phrase ends get accents; builds accelerate into drops.
4. **Silences**: sudden stops (e.g. cuts inside a drop) are detected at 1/16-note resolution — the whole rig
   blacks out for the gap and flashes back on the return.
5. **Perform mode**: virtual DMX patch (moving heads, washes, strobes, blinders, lasers, pixel bars,
   haze/CO2/sparkular/confetti/flames), drag-to-position stage, DMX monitor, live output on the virtual
   MIDI port **“Touchableton”** (+ optional direct Art-Net). Paused = blackout.
6. **Swing**: the analyser measures where off-beat attacks land (paired-attack timing in the hats/melody/bassline
   bands, on Ableton's warp grid) → straight or swung 8ths/16ths (0–100% toward triplet), per bar. Strobes, flicker,
   chases and pixel steps follow the swung grid. Shown as the GROOVE chip.
7. **Locked vs Layered groups**: per section (Auto by mood, or Lock / Layer in the inspector, `lock_groups` from AI).
   Locked = every group turns over on the same chunks (hard drops). Layered = wash / pixels / lasers run on their own
   phrase lengths and phases (e.g. movers 4 bars, pixels 4 bars offset by 2, wash 8, lasers 16).
8. **Timeline**: scroll to pan, ⌘/⌥-scroll or pinch to zoom at the cursor, overview strip (drag), zoom −/+ / Fit,
   Follow playhead, double-click a section to zoom to it. Lanes show what each group really does, bar by bar.
   - **Click the bar ruler** to move the playhead (drag to scrub). Clicking anything else **selects** it: a section,
     a chunk, a lane block — it never moves the playhead.
   - **Spectrum row**: hover shows a magnifier; **drag right to zoom in, left to zoom out** around that moment.
   - **Range select**: drag across any lane / row. The RANGE inspector gives exact start / end, Play, Zoom, Program
     (lane by hand), Make Section, and **AI cue for this range** — describe the look you want; the AI checks the
     beats around your selection, moves it onto the musical event you meant (e.g. back one beat to a snare pickup),
     and returns a cue: a new named section when it's a structural part, otherwise beat-accurate lane blocks — plus
     any extra programming and hits. Right-click a lane → *Ask AI for a Cue Over…* this block / section / range.
     esc clears the range.
9. **Solo / Mute**: per light group (timeline lanes + Perform strip) and per fixture, plus master BLACKOUT — live
   preview and outputs only (exports unaffected). Muted movers keep their position.
10. **Colour scheme per song**: Plan colours, a Custom palette (presets: Neon, Fire, Ice, Sunset…), or live colours
    sampled from the **LED wall video**; copy to all songs. Exports use the custom/fallback palette.
11. **Stage layouts**: presets (Club, Festival Main Stage, Warehouse, Concert, DJ Booth Compact, Video Wall Focus) and
    your own saved layouts (Perform → Layouts).
12. **AI stage layout** (Perform → ✦ AI): drop a rough sketch / plan / venue photo and describe the setup; your
    local Claude Code or Codex reads the image (Claude: Read tool only, confined to a temp folder; Codex: `--image`)
    and returns rows of fixtures + a setup guide (rigging, power & data, focus, safety, how to run it) + usage tips.
    The app auto-addresses everything, appends the DMX patch table, previews it on the realistic stage, and Apply
    replaces the rig (guide kept as **Rig Notes**). `Touchableton --layout "<description>" --image sketch.png`.
13. **Realistic fixtures**: the stage preview draws photoreal fixture images (Resources/Fixtures — original
    renders generated for this app, unlit + lit versions with emitter positions): beams leave the actual lens,
    LED faces tint to the cue colour, pixel cells sit in the batten's pixel window, truss is tiled. Toggle REALISTIC.
14. **LED Wall** (Perform mode): a fixture that shows TouchDesigner video live over **Syphon** — pixelated to
   its LED resolution (cols × rows), with LED grid, stage colour spill and a DMX master channel that follows
   the show (black in silences / when paused). In TD, `touchableton_videoout` (select TOP → Syphon Spout Out,
   sender “Touchableton LED Wall”) publishes any TOP; the app auto-connects to a sender named “Touchableton…”.
15. **Instrument following**: the analyser splits each song into percussive and tonal parts (median-filter
    HPSS) and detects every hit per lane — **kick, clap/snare, hats, percussion, bassline, lead/melody**
    (shown in the timeline's RHYTHM row). Per chunk each group follows a lane that is really playing (e.g. washes
    on the kick, strobes on claps — so a snare roll in a build accelerates the strobe — pixels on hats, movers and
    lasers on lead notes); if that instrument stops for 2 beats the group falls back to the beat grid. The AI sees
    hits per bar and can set `follow` per cue; the inspector's FOLLOW pickers override it.
16. **Re-analyse** (song header): re-runs the analysis for one song and snaps its section boundaries to the music —
    drops/choruses to the bar where kick + bass re-enter, other sections to the strongest change on the song's own
    phrase grid (detects pickup bars, so 8-bar phrases needn't start on bar 1). AI plans are snapped the same way.
17. **Sync to Ableton Live** (Export menu / Perform → Export to Ableton): writes the lightshow straight into the
    set that is open in Live — one `LS DMX Ch N` MIDI track per DMX MIDI channel (routed to the chosen port, default
    *IAC Driver (Bus 1)*, on that channel), one clip per song at the song's arrangement position and/or in its
    Session scene, plus a locator per section. Re-syncing replaces the previous LS clips. It works through a small
    Control Surface script (Resources/LiveScript/Touchableton → *User Library/Remote Scripts*; the sheet installs it,
    then pick Control Surface "Touchableton" once in Live's Link, Tempo & MIDI settings). The app ↔ Live link is
    JSON over localhost UDP (11017 / 11018). "Save as .als copy instead" writes the same into a copy of the set.
18. **Real-world rig behaviour**: the rig comes from the stage layout — every fixture type in the patch is
    programmed (haze runs all show; blinders hit drop downbeats, 8-bar phrases, accents and swell into drops; CO2,
    sparks and flames fire on drops; confetti once on the biggest drop). Lasers are kept for drops/choruses.
    Moving heads obey pan/tilt speed limits (~300°/s pan, ~250°/s tilt): fast patterns shrink to what a head can
    reach, snaps travel and size themselves to the time before the next hit, chunk changes glide, and heads hold
    position outside the show. `--bake --usage` reports active time per fixture type and the fastest head move.
19. **Laser pattern library** (Model/Lasers.swift): parametric patterns — shape (fan, sheet, tunnel, wave, zigzag,
    cross, star, dots, beam) + rays + animated spread / rotation / X / Y / intensity (sine, triangle, saw, ramp,
    square, random, bounce). 24 built-ins (Fan Breathe, Converge, Burst Open, Swirl Tunnel, Vortex, Sweep Up-Down,
    Liquid Sky, Sheet Lift, Starfield…). The AI picks `laser_patterns` per cue and can invent `custom_lasers`,
    which are saved to `~/Library/Application Support/Touchableton/laser-patterns.json` and offered to later plans
    (✦ in the inspector). Laser DMX: Intensity, Shape, X, Y, Spread, Rotation, Colour, Rays.
20. **Blinders are their own light group** (not FX): modes auto, hits, accents, swell, pulse (kick), strobe (claps),
    chase, glow, off — timeline row with solo/mute, inspector picker, AI `blinders` field. The preview draws them
    as tungsten hits that outshine everything.
21. **Manual lane programming** (Model/LaneEdits.swift): any lane — movers, colour, wash, strobe, blinders, lasers,
    pixels, FX — can be programmed by hand where the automatic programme isn't right. A manual block overrides only
    its own lane for its bars; everything else stays automatic, and blocks survive re-planning (stored in the plan).
    - **Right-click a lane**: set the mode / pattern / laser pattern / speed / dimmer / gobo / colours / follow
      right there (turns the auto block into a manual one), program this beat / bar / block / section, split the
      block at the cursor or the playhead, duplicate, copy / paste, stretch to the section, bypass, revert to auto,
      clear the lane, snap grid, undo / redo.
    - Lanes edit like video-editor tracks: **drag any block's edge to trim it** — automatic blocks too (they become
      manual on the first move). Where two blocks touch, dragging the edge **rolls** both (hold ⇧ to trim only one).
      Drag a manual block to move it; **⌘-drag** empty lane space to draw one; **double-click** to take a block over.
      Drag a **section boundary** on the SECTION row to lengthen / shorten sections. Snap to bar / beat / 1/8 / 1/16
      (hold ⌥ for 1/16); the pointer turns into a trim cursor over draggable edges.
    - Inspector: type an exact START / END (`33`, `33.2`, `33.2.3` = bar.beat.16th) or LENGTH in bars, or nudge.
    - Selected block → **LANE EDIT** inspector (every parameter, exact start / end, notes). Keys: ⌫ delete, ⌘C / ⌘V,
      ⌘D duplicate, ⌘Z / ⇧⌘Z undo / redo, esc deselect. Manual blocks show framed with ✎ on the timeline.
22. **Visualisers** (SPECTRUM · VU · HITS toggles in the transport bar, Plan and Perform): a log-frequency spectrum
    analyser with peak caps, a stereo VU / peak meter in dBFS, and per-instrument pads (kick, clap/snare, hats,
    percussion, bass, lead) that flash on every detected hit with a 2-second scrolling history — all computed at
    the playhead, so they follow scrubbing too.
23. **Panels**: the playlist collapses to a rail of cover icons (status LED + number; hover for the name, right-click
    for the song menu) and the right pane (stage + inspector, or Perform's outputs) hides — title-bar sidebar
    buttons, the panels' own buttons, or View → ⌥⌘L / ⌥⌘R. Remembered across launches.
24. **Light show video** (Export → Light Show Video, ⌥⌘E, or *Render Video* in Perform): renders the selected song's
    stage preview frame by frame — the exact show the outputs play — to an H.264 `.mp4` with the song's audio.
    Whole song / current section / 30 s from the playhead, 720p / 1080p / 4K, 24 / 30 / 60 fps, optional captions
    (title, artist, section, time, RizzStudio mark). Progress + time left, cancel, then Play / Show in Finder.
25. **Stems** (transport → STEMS · Separate, or right-click a song): splits a song into drums / bass / vocals /
    other with **Demucs** (Meta's htdemucs). If it isn't installed, a **one-click setup** creates a private Python
    environment in Application Support (Demucs + PyTorch + the model, ~2 GB; a Python 3.10–3.13 from the Mac, or one
    fetched with uv) and then separates the song; Settings shows the status and can remove it. Separation runs on the
    Apple-silicon GPU (falls back to the CPU) with live progress. The instrument lanes are then re-detected on the stems (kick / clap / hats / perc from drums, bassline
    from bass, lead from vocals + other) — much cleaner than splitting the mix. Each stem can be **soloed / muted**
    in playback (S / M chips; MIX goes back to the original). Settings: separate automatically. Stems are
    16-bit WAVs in Application Support (≈ 40 MB per stem per 4 minutes); right-click → Delete Stems frees them.
26. **Special effects, one lane each**: HAZE, CO2, SPARKS, CONFETTI and FLAMES are separate timeline lanes (own
    solo / mute), so they can be programmed independently and fire together. Each block picks a mode — Auto (the
    engine's choice), Off, Once, Every 8 Bars, Every Bar, Every Beat, Off-Beats, Accents, Chase L→R, Follow
    Instrument (kick, clap…), Hold — plus shot length, output / haze density, and for flames an aim / nozzle pattern
    (straight, sweep, fan, cross, wave, alternate, random). The AI programs these lanes too. Old single-FX blocks are
    split into the new lanes automatically.
    - **Flamethrower types** (Perform → fixture): *Static* (vertical jet, 1 ch), *Moving* (Output + Pan + Tilt, aimed
      ±60° along the pattern) and *Fixed points* (2–12 nozzles at set angles over ±40°, one channel each; the pattern
      picks which fire). Changing type re-addresses the unit if it would overlap. The Festival layout has all three.
    - **Realistic preview**: flames, CO2, confetti and haze play real footage (clips on black, composited additively —
      ignition, sustain while held, natural burn-out / fall); sparks are a particle simulation (white-hot streaks
      cooling to amber under gravity). Perform → **FX Clips**: import your own clip, or **Find Online** — Claude Code
      searches free stock sites (Pixabay, Pexels, Mixkit…) with chrome-use and downloads one (licence noted next to
      it). Clips live in `~/Library/Application Support/Touchableton/fx/`; bundled defaults can go in
      `Resources/FX/<flames|co2|confetti|haze>.mp4`. Without a clip the effect is drawn procedurally.
27. **Positioning fixtures** (Perform): fixture editor → POSITION — exact X / Y (%), 1 % nudges, Centre, Mirror,
    and **Move on Stage**: a transform gizmo on the stage; drag anywhere to move the fixture (relative, it never
    jumps), with snapping to the centre line and other fixtures' rows / columns (cyan guides), ⇧ = 5 % grid,
    ⌥ = fine, arrow keys nudge, ⏎ / esc done. EDIT LAYOUT shows a handle on every fixture (double-click one for the
    gizmo).
28. **3D moving heads**: every moving head is drawn as a 3D fixture in a perspective view from the crowd — base, a yoke
    that turns with pan (540°) and a head that tilts in it (270°), exactly as the DMX says. Beams are real cones in
    the room: onto the floor (lit spot + gobo), up into the rig, or out over the audience, with a lens flare when a
    head looks straight at you. Heads in the upper half of the stage hang from the truss; floor heads stand upright.
    Fixtures stay where the layout puts them.
    Stage preview: beam widths, strobe flares and laser lines scale with the canvas (full screen and video
    renders keep the editor's proportions); strobes draw as a translucent flash with a glow and a short throw.
29. **Fixture profiles — real DMX personalities** (Perform → PROFILES): the engine and preview work in the app's
    generic layout; every output (Art-Net, MIDI → TouchDesigner, Ableton export / sync) is remapped to each fixture's
    real channel layout at its real address. Pick a profile per **fixture type** and every fixture of that type is
    configured at once (per-fixture overrides in the fixture editor). Channel functions: copy a show channel
    (scaled / inverted), fixed value, 16-bit pan / tilt with the fixture's real range + invert / swap, shutter
    (closed / open / strobe range), colour wheel (nearest slot to the show colour), gobo wheel, CMY, colour ×
    dimmer for fixtures without a dimmer, white from RGB, on / off outputs, and pyro arm / safety channels.
    Profiles come from: the **Open Fixture Library** (search or paste a link — exact modes for thousands of
    fixtures), **AI** from a prompt, an attached **datasheet** (PDF / screenshot) or a **web page** (chrome-use),
    or **by hand / trial and error**: the **Test on Rig** tab plays patterns through the profile (Open White, Pan /
    Tilt sweeps, colours, gobos, strobe, dimmer ramp), a **channel finder** lights one channel at a time on every
    fixture of the type, and raw sliders send values to all of them. Re-address packs DMX addresses to the real
    channel counts. Pyro arm channels stay SAFE unless armed live (with confirmation; resets every launch; never
    armed in exports). Profiles are saved in a library and travel with the rig.
30. **About RizzStudio** (app menu): version / build, what's inside, this session's stats, system and connection
    info (copyable), acknowledgements.
31. **Export → Ableton**, then close the app.

## Ableton ⇄ TouchDesigner protocol (DMX over MIDI)

```
slot s = (universe-1)*512 + (address-1)      (4 universes max)
MIDI channel = s/128 + 1, note = s%128, velocity 1..127 = DMX 0..255 while held, no note = 0
```

- **Arrangement Show (.mid)** — type-1 MIDI, one track per channel (`LS DMX Ch1…`); drop at bar 1, set each
  track's *MIDI To* = IAC Driver Bus 1, channel N. DJ overlaps hand over at the overlap midpoint.
- **Session Clips per Song** — clip-relative DMX clips to launch alongside each audio clip.
- **TouchDesigner Kit** — `Touchableton_Receiver.tox`, `touchableton_receiver.py`, `patch.csv`, `SETUP.txt`.
- Lean export: fine channels dropped, pixel bars at 1/8 + 16 levels; resolution 1/8 · 1/16 · 1/32.

TouchDesigner receiver (`touchableton_receiver` COMP): `midi_devices → midi_in → decode (Script CHOP) →
universe1 → dmx_out`. Custom pars: Source (Touchableton app / IAC Ableton), MIDI channels, Send DMX,
Interface (Art-Net/sACN), address, universe.

## AI engines (Settings → AI Engine)

| Engine | Command | Notes |
|---|---|---|
| Claude Code | `claude -p --output-format json --model claude-opus-5-5` (tools disabled) | needs **2.1.280+** (`claude update`, button in Settings) |
| Codex | `codex exec --output-schema … --sandbox read-only` | effort low/medium/high |

Never hangs: per-attempt timeout (default 4 min, process killed), Cancel button, fallback chain
(chosen model → CLI default model → other CLI → rules). Runs via `zsh -l` so Finder-launched apps see your PATH.

## Headless

```sh
.build/release/Touchableton --analyze "Set.als" --songs 3 [--match rumble] [--bake --out x.mid] [--plan --backend codex]
.build/release/Touchableton --syphon-test        # list Syphon senders + grab one LED-wall frame
.build/release/Touchableton --audio track.wav [--bpm 124]   # tempo / swing of a bare audio file
.build/release/Touchableton --analyze "Set.als" --match silk --bake --groups   # locked/layered report
```

