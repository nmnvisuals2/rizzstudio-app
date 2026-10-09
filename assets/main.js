// Mobile nav toggle + scroll reveal. No dependencies.
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Background hero video: respect reduced-motion.
  var bg = document.querySelector(".hero-bg");
  if (bg && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    bg.removeAttribute("autoplay"); bg.pause();
  }

  // Walkthrough lightbox with a custom player (no native controls).
  var modal = document.getElementById("video-modal");
  if (modal) {
    var video = modal.querySelector("video");
    var track = modal.querySelector(".vm-track");
    var fill = modal.querySelector(".vm-fill");
    var knob = modal.querySelector(".vm-knob");
    var time = modal.querySelector(".vm-time");
    var opener = null, idleTimer = null;
    var fmt = function (t) { t = Math.max(0, Math.floor(t || 0)); return Math.floor(t / 60) + ":" + ("0" + t % 60).slice(-2); };

    var paint = function () {
      var d = video.duration || 35, p = Math.min(1, video.currentTime / d);
      fill.style.width = knob.style.left = (p * 100) + "%";
      track.setAttribute("aria-valuenow", Math.round(p * 100));
      time.textContent = fmt(video.currentTime) + " / " + fmt(d);
    };
    var toggle = function () { video.paused ? video.play() : video.pause(); };
    var wake = function () {
      modal.classList.remove("idle");
      clearTimeout(idleTimer);
      idleTimer = setTimeout(function () { if (!video.paused) modal.classList.add("idle"); }, 2200);
    };
    var open = function (e) {
      opener = e.currentTarget;
      modal.hidden = false;
      document.body.style.overflow = "hidden";
      video.currentTime = 0;
      video.play().catch(function () {});
      modal.querySelector(".vm-close").focus();
      wake();
    };
    var close = function () {
      video.pause();
      if (document.fullscreenElement) document.exitFullscreen();
      modal.hidden = true;
      document.body.style.overflow = "";
      if (opener) opener.focus();
    };

    document.querySelectorAll("[data-video-open]").forEach(function (b) { b.addEventListener("click", open); });
    modal.querySelectorAll("[data-video-close]").forEach(function (b) { b.addEventListener("click", close); });
    modal.querySelector(".vm-big").addEventListener("click", toggle);
    modal.querySelector(".vm-toggle").addEventListener("click", toggle);
    video.addEventListener("click", toggle);
    video.addEventListener("play", function () { modal.classList.add("playing"); wake(); });
    video.addEventListener("pause", function () { modal.classList.remove("playing", "idle"); });
    video.addEventListener("ended", function () { modal.classList.remove("playing", "idle"); });
    video.addEventListener("timeupdate", paint);
    video.addEventListener("loadedmetadata", paint);
    modal.addEventListener("mousemove", wake);
    modal.addEventListener("touchstart", wake, { passive: true });

    var seekTo = function (clientX) {
      var r = track.getBoundingClientRect();
      var p = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
      if (video.duration) { video.currentTime = p * video.duration; paint(); }
    };
    track.addEventListener("pointerdown", function (e) {
      track.classList.add("drag");
      track.setPointerCapture(e.pointerId);
      seekTo(e.clientX);
    });
    track.addEventListener("pointermove", function (e) { if (track.classList.contains("drag")) seekTo(e.clientX); });
    track.addEventListener("pointerup", function () { track.classList.remove("drag"); });
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { video.currentTime += 5; e.preventDefault(); }
      if (e.key === "ArrowLeft") { video.currentTime -= 5; e.preventDefault(); }
    });
    modal.querySelector(".vm-fs").addEventListener("click", function () {
      var stage = modal.querySelector(".vm-stage");
      if (document.fullscreenElement) document.exitFullscreen();
      else if (stage.requestFullscreen) stage.requestFullscreen();
      else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();   // iOS Safari
    });
    document.addEventListener("keydown", function (e) {
      if (modal.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === " " && e.target === document.body) { toggle(); e.preventDefault(); }
      if (e.key === "Tab") {                                                  // keep focus inside the dialog
        var f = modal.querySelectorAll("button, [tabindex]");
        if (e.shiftKey && document.activeElement === f[0]) { f[f.length - 1].focus(); e.preventDefault(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { f[0].focus(); e.preventDefault(); }
      }
    });
  }

  // App tour tabs (Plan / Timeline / Perform).
  var tabs = document.querySelectorAll('.tour-tabs [role="tab"]');
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", on ? "true" : "false");
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
    });
  });

  var items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("in"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  items.forEach(function (el) { io.observe(el); });
})();
