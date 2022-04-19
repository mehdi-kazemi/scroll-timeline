import { StyleParser, RegexMatcher } from "./scroll-timeline-css-parser";

const parser = new StyleParser();

function initMutationObserver() {
  const sheetObserver = new MutationObserver((entries) => {
    for (const entry of entries) {
      for (const addedNode of entry.addedNodes) {
        if (addedNode instanceof HTMLStyleElement) {
          handleStyleTag(addedNode);
        }
        if (addedNode instanceof HTMLLinkElement) {
          handleLinkedStylesheet(addedNode);
        }
      }
    }

    // TODO: Not a good idea to proxy all elements.
    // Not adding proxy affects tests that there is no animation,
    // but there is change for 'animation', 'animation-timeline', etc via style
    // like this: e.style['animation-timeline'] = "none, auto"
    // document.querySelectorAll("body *").forEach(element => {
    //   addProxyForElement(element);
    // });
  });

  sheetObserver.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  /**
   * @param {HtmlStyleElement} el style tag to be parsed
   */
  function handleStyleTag(el) {
    // Don’t touch empty style tags.
    if (el.innerHTML.trim().length === 0) {
      return;
    }
    let newSrc = parser.transpileStyleSheet(el.innerHTML, true);
    newSrc = parser.transpileStyleSheet(newSrc, false);
    el.innerHTML = newSrc;
  }

  function handleLinkedStylesheet(el) {
    // TODO
  }

  document.querySelectorAll("style").forEach((tag) => handleStyleTag(tag));
  document
    .querySelectorAll("link")
    .forEach((tag) => handleLinkedStylesheet(tag));
}

// This implementation is based on https://drafts.csswg.org/scroll-animations-1/
// TODO: Should update accordingly when new spec lands.
function getSourceElement(source) {
  const matches = RegexMatcher.SOURCE_ELEMENT.exec(source);
  const SOURCE_CAPTURE_INDEX = 1;
  if (matches) {
    return document.getElementById(matches[SOURCE_CAPTURE_INDEX]);
  } else if (source === "auto") {
    return document.scrollingElement;
  } else {
    return null;
  }
}

// This implementation is based on https://drafts.csswg.org/scroll-animations-1/
// 'scroll-offsets' are likely to be deprecated,
// TODO: Should update accordingly when new spec lands.
function convertOneScrollOffset(part) {
  if (part == 'auto') return new CSSKeywordValue('auto');

  const matchesOffsetWithSuffix = RegexMatcher.OFFSET_WITH_SUFFIX.exec(part);
  const VALUE_CAPTURE_INDEX = 1;
  const UNIT_CAPTURE_INDEX = 2;
  if (matchesOffsetWithSuffix) {
    return new CSSUnitValue(parseInt(matchesOffsetWithSuffix[VALUE_CAPTURE_INDEX]), matchesOffsetWithSuffix[UNIT_CAPTURE_INDEX]);
  }

  const matchesElementOffset = RegexMatcher.ELEMENT_OFFSET.exec(part);
  const SOURCE_CAPTURE_INDEX = 1;
  const EDGE_CAPTURE_INDEX = 2;
  const THRESHOLD_CAPTURE_INDEX = 3;
  if (matchesElementOffset) {
    if (document.getElementById(matchesElementOffset[SOURCE_CAPTURE_INDEX])) {
      return {
        target: document.getElementById(matchesElementOffset[SOURCE_CAPTURE_INDEX]),
        ...(matchesElementOffset.length >= 3 ? { edge: matchesElementOffset[EDGE_CAPTURE_INDEX] } : {}),
        ...(matchesElementOffset.length >= 4 ? { threshold: parseFloat(matchesElementOffset[THRESHOLD_CAPTURE_INDEX]) } : {})
      };
    }
  }

  return null;
}

function isDescendant(child, parent) {
  while (child) {
    if (child == parent) return true;
    child = child.parentNode;
  }
  return false;
}

// This implementation is based on https://drafts.csswg.org/scroll-animations-1/
// 'scroll-offsets' are likely to be deprecated,
// TODO: Should update accordingly when new spec lands.
function getScrollOffsets(source, offsets) {
  let scrollOffsets = undefined;

  if (offsets) {
    if (offsets == "none") {
      // do nothing
    } else {
      scrollOffsets = offsets.split(",")
        .map(part => part.trim())
        .filter(part => part != '')
        .map(part => convertOneScrollOffset(part))
        .filter(offset => offset);

      // If the available scroll-offsets are not valid,
      // so we won't create the scrollTimeline,
      for (let off of scrollOffsets) {
        if (off.target && off.target instanceof Element &&
          (window.getComputedStyle(off.target, null).display == "none" || !isDescendant(off.target, source))) {
          return null;
        }
      }
      if (scrollOffsets.length == 0) {
        return null;
      }
    }
  }

  return scrollOffsets;
}

function createScrollTimeline(name) {
  const options = parser.scrollTimelineOptions.get(name);
  if (!options) return null;

  const sourceElement = getSourceElement(options.source);
  const scrollOffsets = getScrollOffsets(sourceElement, options['scroll-offsets']);

  if (scrollOffsets !== null) {
    const scrollTimeline = new ScrollTimeline({
      ...(sourceElement ? { source: getSourceElement(options.source) } : {}),
      ...(scrollOffsets ? { scrollOffsets: scrollOffsets } : {}),
      ...(options.orientation != "auto" ? { orientation: options.orientation } : {}),
    });
    return scrollTimeline;
  } else {
    return null;
  }
}

export function initCSSPolyfill() {
  initMutationObserver();

  // We are not wrapping capturing 'animationstart' by a 'load' event,
  // because we may lose some of the 'animationstart' events by the time 'load' is completed.
  window.addEventListener('animationstart', (evt) => {
    evt.target.getAnimations().filter(anim => anim.animationName === evt.animationName).forEach(anim => {
      const timelineName = parser.getScrollTimelineName(anim.animationName, evt.target);
      if (timelineName) {
        const scrollTimeline = createScrollTimeline(timelineName);

        // If there is a scrollTimeline name associated to this animation,
        // cancel it, whether we create a new animation or not
        // depends on the fact that whether that scrollTimeline was valid or not

        // Current approach (cancelling current animation and creating a new one) results in a
        // programmatic animation and not a CSS animation.
        // As a result, composite-order will be incorrect.
        // TODO: Don't cancel animation, pause and create a proxy for it instead,
        // this way the native animation is still a CSS animation.
        // Furthermore, we are not potentially creating a cancel event or a new animation start event.
        anim.cancel();
        if (scrollTimeline) {
          if (anim.timeline != scrollTimeline) {
            const target = anim.effect.target;
            const keyframes = anim.effect.getKeyframes();
            target.animate(keyframes, { timeline: scrollTimeline });
          }
        } else {
          // animation-timeline:none, or unknown timeline
          // or invalid scroll-offsets
        }
      }
    });
  });
}
