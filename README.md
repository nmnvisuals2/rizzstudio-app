<div align="center">

<img src="docs/assets/icon.png" width="128" alt="RizzStudio icon" />

# ✨ RizzStudio ✨

### Your Ableton set in, a full AI lightshow out.

<p>
  <img src="https://img.shields.io/badge/version-1.1.0-111?style=for-the-badge" alt="Version 1.1.0" />
  <img src="https://img.shields.io/badge/macOS-14%2B-111?style=for-the-badge&logo=apple&logoColor=white" alt="macOS 14+" />
  <img src="https://img.shields.io/badge/Apple%20Silicon-arm64-111?style=for-the-badge" alt="Apple Silicon" />
  <img src="https://img.shields.io/badge/Swift-SwiftUI-F05138?style=for-the-badge&logo=swift&logoColor=white" alt="SwiftUI" />
</p>
<p>
  <img src="https://img.shields.io/badge/Ableton%20Live-000?style=flat-square&logo=abletonlive&logoColor=white" alt="Ableton Live" />
  <img src="https://img.shields.io/badge/TouchDesigner-1b1b1b?style=flat-square" alt="TouchDesigner" />
  <img src="https://img.shields.io/badge/Art--Net%20%C2%B7%20sACN%20%C2%B7%20DMX-1b1b1b?style=flat-square" alt="Art-Net, sACN, DMX" />
  <img src="https://img.shields.io/badge/AI-Claude%20Code%20%7C%20Codex-D97757?style=flat-square" alt="Claude Code or Codex" />
</p>

<a href="https://github.com/nmnvisuals2/rizzstudio-app/releases/latest/download/RizzStudio-macOS.zip">
  <img src="https://img.shields.io/badge/⬇%20Download%20for%20macOS-RizzStudio.app-000?style=for-the-badge&logo=apple&logoColor=white" height="44" alt="Download RizzStudio for macOS" />
</a>

<sub><a href="https://github.com/nmnvisuals2/rizzstudio-app/releases">All releases</a> · <a href="docs/GUIDE.md">Full guide</a></sub>

</div>

---

## 🎛️ What it does

**RizzStudio** reads an Ableton Live set (or plain audio files), analyses every song and uses AI to program
a show beat by beat. It then exports that show back **into Ableton as DMX-over-MIDI**, so Ableton alone drives
your rig through **TouchDesigner → Art-Net / sACN / DMX**.

```
 🎵 .als / audio  →  🔬 analysis  →  🤖 AI plan  →  🎚️ programmer  →  🎹 Ableton MIDI  →  💡 lights
```

## ⚡ Highlights

| | |
|---|---|
| 🔬 **Instant analysis** | Tempo, key, sections, drops, swing and silences, at under 1 s per song |
| 🤖 **AI lighting designer** | Uses your local **Claude Code** or **Codex** CLI, so no API key is needed |
| 🎯 **Granular cues** | 1–8 bar chunks, with pre-drop hits, numbered drops and blackouts on cuts |
| 🕺 **Full rig** | Moving heads, washes, strobes, lasers, pixel bars, haze, CO₂, sparkulars and flames |
| 🎥 **3D stage + Perform mode** | Live preview, DMX monitor, solo/mute and master blackout |
| 📺 **LED-wall aware** | Samples colours from Syphon video |
| 🔌 **Plays nice** | Ableton, TouchDesigner receiver `.tox`, Art-Net and sACN |

## 🚀 Install

1. **[Download `RizzStudio-macOS.zip`](https://github.com/nmnvisuals2/rizzstudio-app/releases/latest/download/RizzStudio-macOS.zip)** and unzip it.
2. Drag **RizzStudio.app** into **Applications**.
3. The first time, **right-click → Open**. The app isn't notarized, so macOS will ask once. If it still refuses, run:
   ```sh
   xattr -dr com.apple.quarantine /Applications/RizzStudio.app
   ```

> 🧠 **AI planning (optional):** install [Claude Code](https://claude.com/claude-code) (2.1.280+) or the Codex CLI.
> Without one, the built-in rules engine plans the show.


## 📖 Learn more

The workflow, timeline controls, DMX protocol, AI engines, headless CLI and code layout are all covered in the
**[Full Guide →](docs/GUIDE.md)**

---

<div align="center">
<sub>Made with 💡 by <b>NMN Visuals</b> · Syphon framework © Syphon authors (BSD-2)</sub>
</div>
